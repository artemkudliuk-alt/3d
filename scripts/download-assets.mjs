import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

const B = "https://lagom-development.com/wp-content/uploads";
// [remote, localName]
const assets = [
  // hero
  [`${B}/2026/02/lagom-main-kv-desktop-1920x1965.webp`, "hero-desktop.webp"],
  [`${B}/2026/02/lagom-main-kv-mobile-576x1024.webp`, "hero-mobile.webp"],
  // benefits
  [`${B}/2026/03/untitled-design-436x436.webp`, "benefit-1.webp"],
  [`${B}/2026/03/04-_3_-436x259.webp`, "benefit-2.webp"],
  [`${B}/2025/12/kidmom_1-360x676.webp`, "stat-projects.webp"],
  [`${B}/2025/12/green_teritory_2-360x676.webp`, "stat-houses.webp"],
  [`${B}/2025/12/playyard_3-360x676.webp`, "stat-territory.webp"],
  // projects — LAGOM
  [`${B}/2026/03/ph_romacayman-65-768x512.webp`, "lagom-1.webp"],
  [`${B}/2026/03/ph_romacayman-102-768x512.webp`, "lagom-2.webp"],
  [`${B}/2026/03/4a5a7839-768x512.webp`, "lagom-3.webp"],
  [`${B}/2026/03/at__3646-768x512.webp`, "lagom-4.webp"],
  [`${B}/2026/03/ph_romacayman-133-768x512.webp`, "lagom-5.webp"],
  // projects — UNIQUE
  [`${B}/2026/03/lagom_0072-768x432.webp`, "unique-1.webp"],
  [`${B}/2026/03/typ-a-%E2%84%96-2-4-6-8-11-13-siryj-.jpg-lagom_0016-768x432.webp`, "unique-2.webp"],
  [`${B}/2026/03/zagalnyj-%E2%84%966-vhidna-grupa-768x530.webp`, "unique-3.webp"],
  [`${B}/2026/03/zagalnyj-%E2%84%961-768x432.webp`, "unique-4.webp"],
  [`${B}/2026/03/genplan-768x512.webp`, "unique-5.webp"],
  // locations
  [`${B}/2026/03/zagalnyj-na-pivnich-360x203.webp`, "location-lagom.webp"],
  [`${B}/2026/03/genplan-1-360x240.webp`, "location-unique.webp"],
  // accordion + cta
  [`${B}/2026/03/4a5a7889-600x400.webp`, "management.webp"],
  [`${B}/2026/01/nature_elements_graphic-404x400.webp`, "nature-graphic.webp"],
  // favicon
  [`${B}/bamboo-media/uploads/2025/03/faviicon.webp`, "../seo/favicon.webp"],
];

async function dl([url, name]) {
  const out = `public/images/${name}`;
  await mkdir(dirname(out), { recursive: true });
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  await writeFile(out, Buffer.from(await res.arrayBuffer()));
  console.log("ok", name);
}

for (let i = 0; i < assets.length; i += 4) {
  await Promise.all(assets.slice(i, i + 4).map(a => dl(a).catch(e => console.error("FAIL", a[1], e.message))));
}
console.log("done");
