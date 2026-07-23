import { readFileSync, writeFileSync } from "node:fs";
const html = readFileSync("docs/research/o-scs-source.html", "utf8");
const scripts = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map(m => m[1]).filter(s => s.length > 200);
console.log("inline script sizes:", scripts.map(s => s.length).join(","));
const srcs = [...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map(m => m[1]);
console.log(srcs.join("\n"));
writeFileSync("docs/research/inline-scripts.js", scripts.join("\n\n/* ---- NEXT SCRIPT ---- */\n\n"));
