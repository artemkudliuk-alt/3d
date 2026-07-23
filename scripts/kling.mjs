// Kling image2video (start frame + tail frame) client.
// Usage: node scripts/kling.mjs <startPng> <tailPng> <outMp4> <model> <duration> <mode> "<prompt>"
import { readFile, writeFile } from "node:fs/promises";
import { config } from "dotenv";
config();

const KEY = process.env.KLING_API_KEY;
if (!KEY) { console.error("no KLING_API_KEY"); process.exit(2); }

const BASE = process.env.KLING_BASE || "https://api.klingai.com";
const [start, tail, out, model = "kling-v2-1", duration = "5", mode = "pro", prompt = ""] = process.argv.slice(2);

const b64 = async (p) => (await readFile(p)).toString("base64");
const H = { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" };
const SMOOTH = "The camera moves like a smooth cinematic drone with gimbal-stabilized floating motion at ONE slow, calm, constant speed. The flight is fluid and continuous — gentle smooth arcs and slow gradual banking are allowed, but with NO sudden jerks, NO speed ramps, NO snappy acceleration or deceleration, NO abrupt reframing, NO teleportation, NO cuts. The flight ENDS by gently settling to rest on a beautiful, deliberately composed framing (never a random wall). The scene stays physically consistent and stable: furniture, sofas, cushions, tables, lamps, plants and architecture do not swap places, duplicate, morph, melt or change shape as the drone passes. Photorealistic, temporally stable, consistent dusk lighting.";

async function submit() {
  const useTail = tail && tail !== "none" && tail !== "-";
  const body = {
    model_name: model,
    mode,
    duration,
    image: await b64(start),
    ...(useTail ? { image_tail: await b64(tail) } : {}),
    prompt: `${prompt} ${SMOOTH}`.trim(),
    negative_prompt: "objects moving, furniture rearranging, pillows swapping places, cushions moving, objects changing position, object teleporting, duplicating, morphing, warping, melting, geometry changing, deformation, speed ramp, acceleration, sudden movement, jump cut, shaky camera, flicker, popping, people, text, watermark, logo",
    cfg_scale: 0.5,
  };
  const r = await fetch(`${BASE}/v1/videos/image2video`, { method: "POST", headers: H, body: JSON.stringify(body) });
  const j = await r.json().catch(() => ({}));
  console.log("SUBMIT", r.status, JSON.stringify(j).slice(0, 600));
  if (j.code !== 0) { console.error("SUBMIT ERROR"); process.exit(1); }
  return j.data.task_id;
}

async function poll(id) {
  for (let i = 0; i < 120; i++) {
    await new Promise((s) => setTimeout(s, 5000));
    const r = await fetch(`${BASE}/v1/videos/image2video/${id}`, { headers: H });
    const j = await r.json().catch(() => ({}));
    const st = j?.data?.task_status;
    console.log(`poll ${i} status=${st}`);
    if (st === "succeed") return j.data.task_result.videos[0].url;
    if (st === "failed") { console.error("FAILED", JSON.stringify(j.data)); process.exit(1); }
  }
  console.error("timeout"); process.exit(1);
}

const id = await submit();
console.log("task_id", id);
const url = await poll(id);
console.log("video url", url);
const vid = Buffer.from(await (await fetch(url)).arrayBuffer());
await writeFile(out, vid);
console.log("SAVED", out, vid.length, "bytes");
