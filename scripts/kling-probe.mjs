// Probe which model_name accepts image2video WITH image_tail (start+end frame).
// Submits V1 (frame1->frame2) trying candidates; stops at first accepted (that IS V1).
import { readFile } from "node:fs/promises";
import { config } from "dotenv";
config();
const KEY = process.env.KLING_API_KEY;
const BASE = process.env.KLING_BASE || "https://api.klingai.com";
const H = { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" };
const b64 = async (p) => (await readFile(p)).toString("base64");
const SMOOTH = "Smooth even constant-speed camera flythrough, steady gliding motion, gentle soft turns, no acceleration, no easing, no jumps, no zoom punches, natural smooth physics. Photorealistic.";

const image = await b64("public/media/gen/hero-real/hero-enhanced.png");
const image_tail = await b64("public/media/gen/hero-real/frame-2.png");
const prompt = `Camera glides forward and gently downward over the manicured lawn toward the illuminated modern villa, moving under the cantilevered canopy between the columns up to the floor-to-ceiling glass. ${SMOOTH}`;

const models = ["kling-v2-5-turbo", "kling-v2-1", "kling-v2-master", "kling-v1-6"];
for (const model of models) {
  const body = { model_name: model, mode: "pro", duration: "5", image, image_tail, prompt, cfg_scale: 0.5 };
  try {
    const r = await fetch(`${BASE}/v1/videos/image2video`, { method: "POST", headers: H, body: JSON.stringify(body) });
    const j = await r.json().catch(() => ({}));
    console.log(model, "->", r.status, JSON.stringify(j).slice(0, 300));
    if (j.code === 0) { console.log("ACCEPTED_MODEL", model, "TASK_ID", j.data.task_id); break; }
  } catch (e) { console.log(model, "EXC", e.message); }
}
