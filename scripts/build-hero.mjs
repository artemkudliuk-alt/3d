// Перебудовує перший екран дзеркала під NextWeb Hotels:
// відео-луп на всю площу + заголовок → підзаголовок → кнопки.
//   node scripts/build-hero.mjs
import fs from "node:fs";

const FILE = "public/home.html";
let html = fs.readFileSync(FILE, "utf8");

// посимвольні спани — того ж формату, що й у кнопок теми (hover-анімація)
const spans = (t) =>
  [...t]
    .map((c, i) => (c === " " ? "<span>&nbsp;</span>" : `<span style="--i: ${i};">${c}</span>`))
    .join("");

const btn = (cls, href, label, icon) => `<a class="btn ${cls}" href="${href}" aria-label="${label}">
        <div class="btn-text" aria-hidden="true">${spans(label)}</div>
        <div class="btn-icon mask ${icon}" aria-hidden="true"></div>
      </a>`;

const hero = `<section class="intro nw-hero">
  <div class="nw-hero__kv">
    <video id="hero-video" autoplay muted loop playsinline preload="auto"
           poster="/media/gen/hero/kf-a.webp">
      <source src="/media/video/hero-loop.mp4" type="video/mp4">
    </video>
    <span class="nw-hero__scrim" aria-hidden="true"></span>
  </div>

  <div class="container-index">001</div>

  <div class="nw-hero__stage">
    <h1 class="nw-hero__title">Гість обирає готель очима.<br><em>Покажіть йому все — до бронювання.</em></h1>

    <div class="nw-hero__reveal">
      <p class="nw-hero__sub">Інтерактивні 3D-відеотури головними зонами готелю з ефектом присутності.
        Гість «проходить» лобі, номер і SPA — і бронює напряму, а не в агрегаторі.</p>

      <div class="nw-hero__cta">
        ${btn("btn-orange", "#cases", "Дивитись демо", "def")}
        ${btn("btn-outline", "#callback", "Отримати розрахунок", "line")}
      </div>
    </div>
  </div>
</section>`;

// скрипт ідемпотентний: селектор ловить і оригінальну секцію, і вже перебудовану
const start = html.indexOf('<section class="intro');
const end = html.indexOf('<section class="benefits"');
if (start < 0 || end < 0) throw new Error("не знайшов межі секції intro");
html = html.slice(0, start) + hero + html.slice(end);

// скрипт сцени — після теми, щоб gsap/ScrollTrigger вже були
if (!html.includes("hero-nextweb.js")) {
  html = html.replace(
    /(<script id="page-home-js"[^>]*><\/script>)/,
    '$1\n<script src="/wp-content/themes/bamboo/assets/js/hero-nextweb.js" defer></script>',
  );
}

fs.writeFileSync(FILE, html);
console.log({
  hero: html.includes("nw-hero__stage"),
  script: html.includes("hero-nextweb.js"),
  oldVideo: html.includes("hero-scrub.mp4"),
});
