// Кладе дисплейний шрифт Unbounded (має кирилицю) у public/fonts,
// щоб сторінка не залежала від Google Fonts:
//   node scripts/fetch-display-font.mjs
import fs from "node:fs/promises";

const CSS =
  "https://fonts.googleapis.com/css2?family=Unbounded:wght@700;900&display=swap";
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36";
const WANT = ["cyrillic", "latin"]; // решта субсетів нам не потрібна

const css = await fetch(CSS, { headers: { "User-Agent": UA } }).then((r) => r.text());

// блоки виду:  /* cyrillic */ @font-face { ... font-weight: 700; src: url(...) }
const blocks = css.split("/*").slice(1);
const out = [];

for (const block of blocks) {
  const subset = block.slice(0, block.indexOf("*/")).trim();
  if (!WANT.includes(subset)) continue;

  const weight = block.match(/font-weight:\s*(\d+)/)?.[1];
  const url = block.match(/src:\s*url\(([^)]+)\)/)?.[1];
  const range = block.match(/unicode-range:\s*([^;]+);/)?.[1];
  if (!weight || !url) continue;

  const name = `unbounded-${weight}-${subset}.woff2`;
  const bytes = Buffer.from(await fetch(url).then((r) => r.arrayBuffer()));
  await fs.writeFile(`public/fonts/${name}`, bytes);
  out.push({ name, weight, range, kb: Math.round(bytes.length / 1024) });
}

console.table(out.map(({ name, weight, kb }) => ({ name, weight, kb })));
console.log(
  out
    .map(
      (f) =>
        `@font-face{font-family:"Unbounded";src:url(/fonts/${f.name}) format("woff2");font-weight:${f.weight};font-display:swap;unicode-range:${f.range}}`,
    )
    .join("\n"),
);
