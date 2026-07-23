import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

const ORIGIN = "https://lagom-development.com";
const UA = { headers: { "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148 Safari/537.36" } };

// Third-party / tracking hosts + local scripts to strip from HTML
const STRIP_HOST = /clarity\.ms|facebook\.net|facebook\.com|googletagmanager|google-analytics|doubleclick|googleadservices|ringostat|cloudflareinsights|cdn-cgi\/(challenge|rum|scripts)|gtag\/js/i;

const seen = new Set();
const queue = [];
function enqueue(u) {
  try {
    const url = new URL(u, ORIGIN);
    if (url.origin !== ORIGIN) return;
    url.hash = "";
    const key = url.pathname; // ignore query (?ver=) — same file
    if (seen.has(key)) return;
    seen.add(key);
    queue.push(url.href);
    return key;
  } catch { /* ignore */ }
}

async function save(pathname, buf) {
  const out = "public" + pathname;
  await mkdir(dirname(out), { recursive: true });
  await writeFile(out, buf);
}

// Extract same-origin asset URLs from a text blob (HTML or CSS)
function extractUrls(text) {
  const urls = [];
  // src / href
  for (const m of text.matchAll(/(?:src|href)\s*=\s*["']([^"']+)["']/gi)) urls.push(m[1]);
  // srcset
  for (const m of text.matchAll(/srcset\s*=\s*["']([^"']+)["']/gi))
    for (const part of m[1].split(",")) urls.push(part.trim().split(/\s+/)[0]);
  // css url()
  for (const m of text.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/gi)) urls.push(m[1]);
  // webpack dynamic chunk refs like .e(267) — filenames are <id>.js under the js dir
  for (const m of text.matchAll(/\.e\(\s*(\d{2,4})\s*\)/g)) urls.push(`/wp-content/themes/bamboo/assets/js/${m[1]}.js`);
  return urls.filter((u) => u && !u.startsWith("data:") && !u.startsWith("#") && !u.startsWith("mailto:") && !u.startsWith("tel:"));
}

// ---- entry set (things not always discoverable from HTML/CSS text) ----
const B = "/wp-content/themes/bamboo/assets";
[
  "/", // homepage
  `${B}/css/index.css`, `${B}/css/page-home.css`,
  `${B}/js/index.js`, `${B}/js/page-home.js`,
  "/wp-includes/js/dist/hooks.min.js", "/wp-includes/js/dist/i18n.min.js",
  "/wp-content/plugins/contact-form-7/includes/swv/js/index.js",
  "/wp-content/plugins/contact-form-7/includes/js/index.js",
  `${B}/fonts/Mulish-Variable.woff2`, `${B}/fonts/Inter-Regular.woff2`, `${B}/fonts/Inter-SemiBold.woff2`,
  // observed dynamic chunks (union of mobile + desktop) — parallax engine incl. 267 & 965
  ...[267, 297, 340, 369, 389, 396, 626, 678, 814, 846, 920, 965].map((n) => `${B}/js/${n}.js`),
  // theme icons
  ...["icon-line", "icon-def", "play", "location", "location-2", "tell", "arrow-right", "arrow-bottom", "close", "loader"].map((n) => `${B}/img/icons/${n}.svg`),
  // social svgs
  "/wp-content/uploads/2025/04/youtube.svg", "/wp-content/uploads/2025/04/tiktok.svg",
  "/wp-content/uploads/2025/04/instagram.svg", "/wp-content/uploads/2025/05/nametelegram-statedefault-backgrounddark.svg",
].forEach(enqueue);

let homeHtml = "";
const TEXT_EXT = /\.(css|js|svg)$/i;

async function fetchOne(href) {
  const url = new URL(href);
  const pathname = url.pathname === "/" ? "/home.html" : url.pathname;
  const res = await fetch(href, UA);
  if (!res.ok) { console.error("FAIL", res.status, url.pathname); return; }
  const ct = res.headers.get("content-type") || "";
  const isText = ct.includes("text") || ct.includes("javascript") || ct.includes("json") || ct.includes("svg") || TEXT_EXT.test(url.pathname) || url.pathname === "/";

  if (isText) {
    let text = await res.text();
    // discover nested assets
    for (const u of extractUrls(text)) enqueue(u);
    if (url.pathname === "/") { homeHtml = text; return; } // handled after all discovered
    // rewrite absolute origin refs to root-relative + strip ?ver in css/js
    text = text.replaceAll(ORIGIN, "").replace(/\?ver=[^"')\s]+/g, "");
    await save(pathname, Buffer.from(text));
    console.log("txt", url.pathname);
  } else {
    await save(pathname, Buffer.from(await res.arrayBuffer()));
    console.log("bin", url.pathname);
  }
}

// Process queue (queue grows as we discover). Bounded concurrency.
let idx = 0;
async function worker() {
  while (idx < queue.length) {
    const href = queue[idx++];
    await fetchOne(href).catch((e) => console.error("ERR", href, e.message));
  }
}
// keep looping while queue grows
do {
  await Promise.all(Array.from({ length: 6 }, worker));
} while (idx < queue.length);

// ---- rewrite & save home.html (SAFE: never mangle inline <script> config like window.BAMBOO) ----
// Narrow inline-tracker signatures; must NOT match the theme config script
// (<script id="index-js-extra"> contains `"ringostat":"1"`).
const STRIP_INLINE = /gtm\.start|fbq\s*\(|clarity\.ms|\bclarity\(|ttq\.load|_linkedin_|snaptr\(|googletagmanager/i;
const KEEP_INLINE = /var BAMBOO|application\/ld\+json/i;
let html = homeHtml;
// 1) strip tracker <script src>, tracker inline <script>, tracker <link>/<noscript>
html = html.replace(/<script\b[^>]*\bsrc=["'][^"']*["'][^>]*><\/script>/gi, (t) => (STRIP_HOST.test(t) ? "" : t));
html = html.replace(/<script\b(?![^>]*\bsrc=)[^>]*>[\s\S]*?<\/script>/gi, (t) => (!KEEP_INLINE.test(t) && STRIP_INLINE.test(t) ? "" : t));
html = html.replace(/<link\b[^>]*>/gi, (t) => (STRIP_HOST.test(t) ? "" : t));
html = html.replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, (t) => (STRIP_HOST.test(t) ? "" : t));
// 2) protect remaining <script> blocks from URL rewriting (config/data keep real URLs)
const _scripts = [];
html = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, (t) => (_scripts.push(t), ` SCRIPT${_scripts.length - 1} `));
// 3) rewrite asset URLs elsewhere: origin -> root-relative, drop cache-bust ver
html = html.replaceAll(ORIGIN, "").replace(/(&#0?38;|[?&])ver=[0-9]+/g, "");
// 4) restore scripts untouched
html = html.replace(/ SCRIPT(\d+) /g, (_, i) => _scripts[+i]);
await save("/home.html", Buffer.from(html));
console.log("\nSaved home.html (BAMBOO kept:", /var BAMBOO/.test(html) + "), total assets:", seen.size);
