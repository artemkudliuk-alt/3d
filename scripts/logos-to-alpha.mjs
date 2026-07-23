// Логотипи партнерів згенеровані з «шахматкою» замість прозорості (alpha немає).
// Робимо з яскравості маску прозорості й перефарбовуємо у кремовий:
//   node scripts/logos-to-alpha.mjs
import { readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC = "docs/design-references/masters";
const OUT = "public/media/gen";
const CREAM = { r: 237, g: 231, b: 219 };
const FLOOR = 26; // яскравість «шахматки» після інверсії — все нижче стає прозорим

for (const name of await readdir(SRC)) {
  if (!name.startsWith("logo-") || !name.endsWith(".png")) continue;

  const base = sharp(path.join(SRC, name)).resize({ width: 480, withoutEnlargement: true });
  const grey = base.clone().greyscale();
  const { min } = (await grey.stats()).channels[0];

  // діапазон корисного сигналу: від «шахматки» до найтемнішого пікселя лого
  const k = 255 / Math.max(1, 255 - min - FLOOR);
  // sharp застосовує linear до negate, тож інвертуємо прямо в коефіцієнтах
  const alpha = await grey.linear(-k, k * (255 - FLOOR)).toBuffer();
  const { width, height } = await sharp(alpha).metadata();

  const rgba = await sharp({ create: { width, height, channels: 3, background: CREAM } })
    .joinChannel(alpha)
    .png()
    .toBuffer();

  // trim окремим проходом: у sharp обрізка виконується раніше за joinChannel
  const out = path.join(OUT, name.replace(/\.png$/, ".webp"));
  const { size, height: h } = await sharp(rgba)
    .trim({ threshold: 6 })
    .webp({ quality: 90, alphaQuality: 90 })
    .toFile(out);

  console.log(`${name} → ${path.basename(out)}  ${(size / 1024).toFixed(0)} KB, h=${h} (min=${min})`);
}
