import { readFileSync, writeFileSync } from "node:fs";
const h = readFileSync("docs/research/o-scs-source.html", "utf8");
const styles = [...h.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map(m => m[1]);
writeFileSync("docs/research/o-scs-custom.css", styles.join("\n\n/* ---- NEXT STYLE BLOCK ---- */\n\n"));
console.log("blocks:", styles.map(s => s.length).join(","));
