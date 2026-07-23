"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { submitLead } from "@/app/actions";
import { leadSchema, type Lead } from "@/lib/lead-schema";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const FIELDS = [
  { name: "name", label: "Ім'я", placeholder: "Іван", autoComplete: "name", type: "text" },
  {
    name: "company",
    label: "Готель / компанія",
    placeholder: "Grand Plaza Hotel",
    autoComplete: "organization",
    type: "text",
  },
  {
    name: "contact",
    label: "Телефон або Telegram",
    placeholder: "+380 XX XXX XX XX",
    autoComplete: "tel",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "hello@hotel.com",
    autoComplete: "email",
    type: "email",
  },
] as const;

export function LeadForm() {
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Lead>({ resolver: zodResolver(leadSchema), mode: "onBlur" });

  const onSubmit = handleSubmit(async (data) => {
    setServerError(null);
    const res = await submitLead(data);
    if (res.ok) setSent(true);
    else setServerError(res.error);
  });

  return (
    <section id="contact" className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
      <div className="grid gap-12 rounded-3xl border border-line bg-surface p-7 md:p-12 lg:grid-cols-2 lg:gap-20 lg:p-16">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
        >
          <p className="label-mono">Безкоштовний аудит</p>
          <h2 className="mt-4 font-display text-[clamp(1.9rem,4vw,3.2rem)] leading-[1.04] font-bold tracking-[-0.02em]">
            Готові перевести ваш готель у 3D-формат?
          </h2>
          <p className="mt-6 max-w-[46ch] leading-relaxed text-cream/60">
            Залиште заявку — подивимось ваш сайт, порахуємо кількість зон для зйомки та надішлемо
            кошторис із термінами. Без передоплати й дзвінків «просто дізнатись».
          </p>
          <ul className="mt-9 space-y-3">
            {["Аудит сайту за 2 робочі дні", "Кошторис на зйомку та монтаж", "Демо-тур вашої зони"].map(
              (line) => (
                <li key={line} className="flex items-center gap-3 text-sm text-cream/70">
                  <Check className="size-4 shrink-0 text-brass" />
                  {line}
                </li>
              ),
            )}
          </ul>
        </motion.div>

        {sent ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
            className="flex flex-col items-start justify-center gap-4 rounded-2xl border border-brass/40 bg-brass/5 p-9"
          >
            <span className="grid size-12 place-items-center rounded-full bg-brass text-ink">
              <Check className="size-5" />
            </span>
            <h3 className="font-display text-2xl font-bold">Заявку прийнято</h3>
            <p className="text-cream/60">
              Ми напишемо протягом робочого дня з результатами первинного аудиту.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
            {FIELDS.map((field) => (
              <label
                key={field.name}
                className={cn("flex flex-col gap-2", field.name === "email" && "sm:col-span-2")}
              >
                <span className="font-mono text-[11px] tracking-[0.16em] text-cream/50 uppercase">
                  {field.label}
                </span>
                <input
                  {...register(field.name)}
                  type={field.type}
                  autoComplete={field.autoComplete}
                  placeholder={field.placeholder}
                  aria-invalid={!!errors[field.name]}
                  className={cn(
                    "h-13 rounded-xl border border-line bg-ink px-4 text-[15px] text-cream transition-all duration-300 ease-in-out placeholder:text-cream/25 hover:border-cream/25 focus:border-brass focus:outline-none",
                    errors[field.name] && "border-red-500/70",
                  )}
                />
                {errors[field.name] && (
                  <span className="text-xs text-red-400">{errors[field.name]?.message}</span>
                )}
              </label>
            ))}

            <div className="sm:col-span-2">
              <Button type="submit" size="lg" disabled={isSubmitting} className="group w-full sm:w-auto">
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Надсилаємо…
                  </>
                ) : (
                  <>
                    Обговорити проєкт
                    <ArrowRight className="size-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
                  </>
                )}
              </Button>
              {serverError && <p className="mt-3 text-sm text-red-400">{serverError}</p>}
              <p className="mt-4 text-xs leading-relaxed text-cream/35">
                Надсилаючи форму, ви погоджуєтесь з обробкою даних для зв&apos;язку щодо проєкту.
              </p>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
