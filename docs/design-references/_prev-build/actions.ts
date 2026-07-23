"use server";

import { leadSchema, type Lead } from "@/lib/lead-schema";

export async function submitLead(data: Lead) {
  const parsed = leadSchema.safeParse(data);
  if (!parsed.success) return { ok: false as const, error: "Перевірте правильність полів" };

  // ponytail: заявка пишеться в лог сервера; підключити CRM/Telegram-бота — тут одна точка входу
  console.log("[lead]", new Date().toISOString(), parsed.data);

  return { ok: true as const };
}
