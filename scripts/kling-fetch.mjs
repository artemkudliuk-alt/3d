// Poll a Kling image2video task by id and download the mp4.
// Usage: node scripts/kling-fetch.mjs <task_id> <out.mp4>
import { writeFile } from "node:fs/promises";
import { config } from "dotenv";
config();
const KEY = process.env.KLING_API_KEY;
const BASE = process.env.KLING_BASE || "https://api.klingai.com";
const H = { Authorization: `Bearer ${KEY}` };
const [id, out] = process.argv.slice(2);

for (let i = 0; i < 160; i++) {
  await new Promise((s) => setTimeout(s, 5000));
  const r = await fetch(`${BASE}/v1/videos/image2video/${id}`, { headers: H });
  const j = await r.json().catch(() => ({}));
  const st = j?.data?.task_status;
  console.log(`poll ${i} status=${st}`);
  if (st === "succeed") {
    const url = j.data.task_result.videos[0].url;
    console.log("url", url);
    const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
    await writeFile(out, buf);
    console.log("SAVED", out, buf.length);
    process.exit(0);
  }
  if (st === "failed") { console.error("FAILED", JSON.stringify(j.data)); process.exit(1); }
}
console.error("timeout"); process.exit(1);
