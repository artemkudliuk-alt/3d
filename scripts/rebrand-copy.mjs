// Прибирає чужий бренд з мета-даних і першого екрана дзеркала.
// Текст решти секцій навмисно не чіпає — його переписуємо поекранно.
//   node scripts/rebrand-copy.mjs
import fs from "node:fs";

const FILE = "public/home.html";
let html = fs.readFileSync(FILE, "utf8");

const TITLE = "NextWeb Hotels — 3D-відеотури для готелів";
const DESC =
  "Інтерактивні 3D-відеотури головними зонами готелю з ефектом повної присутності. Більше прямих бронювань і глибші перегляди сторінок.";

// <title>, description, og/twitter
html = html.replace(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`);
html = html.replace(
  /(<meta (?:name|property)="(?:description|og:description|twitter:description)" content=")[^"]*/g,
  `$1${DESC}`,
);
html = html.replace(
  /(<meta (?:name|property)="(?:og:title|twitter:title)" content=")[^"]*/g,
  `$1${TITLE}`,
);
html = html.replace(/(<meta property="og:site_name" content=")[^"]*/g, "$1NextWeb Hotels");

// заголовок і кнопка першого екрана
const spans = (t) =>
  [...t]
    .map((c, i) => (c === " " ? "<span>&nbsp;</span>" : `<span style="--i: ${i};">${c}</span>`))
    .join("");

html = html.replace(
  /<h1 class="mulish-50">[^<]*<\/h1>/,
  '<h1 class="mulish-50">Перенесіть гостя у ваш готель ще до бронювання</h1>',
);
html = html.replace(
  /(<a\s+class="btn btn-orange"\s*\n?\s*href="#callback"[^>]*aria-label=")Отримати консультацію("[^>]*>\s*<div class="btn-text" aria-hidden="true">)[\s\S]*?(<\/div>)/,
  `$1Дивитись демо$2${spans("Дивитись демо")}$3`,
);

fs.writeFileSync(FILE, html);
console.log({
  title: /NextWeb Hotels/.test(html.match(/<title>[^<]*<\/title>/)?.[0] ?? ""),
  h1: html.match(/<h1 class="mulish-50">[^<]*<\/h1>/)?.[0],
  heroCta: /aria-label="Дивитись демо"/.test(html),
});
