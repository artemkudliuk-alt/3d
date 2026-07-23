// Одноразова конвертація важких PNG з media/gen у WebP:
//   node scripts/optimize-media.mjs
// Оригінали 1–2 МБ душать next/image у dev; webp дає ті самі пікселі за ~5% ваги.
import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const DIR = "public/media/gen";
const WIDTH = { "person-": 220, "logo-": 420 }; // решта — без ресайзу

const targetWidth = (name) =>
  Object.entries(WIDTH).find(([prefix]) => name.startsWith(prefix))?.[1] ?? null;

for (const name of await readdir(DIR)) {
  if (!name.endsWith(".png") || name === "og.png") continue;

  const src = path.join(DIR, name);
  if (!(await stat(src)).isFile()) continue;

  const out = src.replace(/\.png$/, ".webp");
  const width = targetWidth(name);
  const pipeline = sharp(src);
  if (width) pipeline.resize({ width, withoutEnlargement: true });

  const { size } = await pipeline.webp({ quality: 82 }).toFile(out);
  console.log(`${name} → ${path.basename(out)}  ${(size / 1024).toFixed(0)} KB`);
}
