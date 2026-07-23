// Прибирає з дзеркала сторонні залежності: трекер Ringostat і всі посилання
// на живий lagom-development.com (скрипти, API форми, дані карток) — щоб сторінка
// працювала з локальних копій. Механіку теми не чіпає.
//   node scripts/debrand-mirror.mjs
import fs from "node:fs";

const FILE = "public/home.html";
let html = fs.readFileSync(FILE, "utf8");
const before = html.length;

html = html.replace(/<script[^>]*ringostat[^>]*><\/script>/gi, "");
html = html.replace(/<script[^>]*ringostat[\s\S]*?<\/script>/gi, "");

// прапорець, за яким тема вантажить віджет дзвінка.
// Важливо: тема перевіряє його як `BAMBOO.ringostat && init()`, а "0" — truthy рядок,
// тому вимикає лише порожнє значення.
html = html.replace(/"ringostat":"[^"]*"/g, '"ringostat":""');

// звичайний та екранований (\/) варіанти запису домену
for (const url of ["https://lagom-development.com", "https:\\/\\/lagom-development.com"]) {
  html = html.split(url).join("");
}

// oembed-посилання на чужий домен у <head>
html = html.replace(/<link[^>]+oembed[^>]*>\s*/gi, "");

fs.writeFileSync(FILE, html);
console.log({
  ringostat: /ringostat/i.test(html),
  lagomRefs: (html.match(/lagom-development/g) || []).length,
  delta: html.length - before,
});
