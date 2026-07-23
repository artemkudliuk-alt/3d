"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { animate, motion, useInView } from "framer-motion";
import { Blocks, Sparkles } from "lucide-react";

import bentoGrowth from "../../public/media/gen/bento-growth.webp";
import bentoTech from "../../public/media/gen/bento-tech.webp";

function Counter({
  to,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.25, 1, 0.5, 1],
      onUpdate: setValue,
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}

const card =
  "relative overflow-hidden rounded-2xl border border-line bg-surface p-7 transition-all duration-300 ease-in-out hover:border-brass/45 hover:bg-surface-2 md:p-9";

export function Benefits() {
  return (
    <section id="benefits" className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
      <p className="label-mono">Результати</p>
      <h2 className="mt-4 max-w-[18ch] font-display text-[clamp(2rem,4.4vw,3.6rem)] leading-[1.02] font-bold tracking-[-0.02em]">
        Цифри, які бачить ваш відділ бронювання
      </h2>

      <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[
          {
            stat: <Counter to={45} prefix="+" suffix="%" />,
            title: "Час на сайті",
            text: "Зростання середнього часу сесії на сайті готелю — гість вивчає простір, а не закриває вкладку.",
            className: "lg:col-span-2 lg:row-span-1",
            image: bentoGrowth,
          },
          {
            stat: <Counter to={3.2} suffix="x" decimals={1} />,
            title: "Глибина перегляду",
            text: "Збільшення глибини перегляду сторінок бронювання після додавання туру.",
          },
          {
            stat: <Counter to={80} suffix="%" />,
            title: "WOW-ефект",
            text: "Запам'ятовуваність бренду вище порівняно зі статичними фотографіями номерів.",
            icon: Sparkles,
          },
          {
            stat: "Modern Tech",
            title: "Легка інтеграція",
            text: "Вбудовується у Tilda, WordPress або самописний движок без втрати швидкості завантаження.",
            className: "md:col-span-2",
            image: bentoTech,
            icon: Blocks,
          },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 42 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.25, 1, 0.5, 1] }}
              className={`${card} ${item.className ?? ""}`}
            >
              {item.image && (
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  placeholder="blur"
                  className="object-cover opacity-20 transition-opacity duration-300 ease-in-out hover:opacity-30"
                />
              )}
              <div className="relative flex h-full min-h-[220px] flex-col justify-between gap-8">
                {Icon ? <Icon className="size-6 text-brass" /> : <span className="size-6" />}
                <div>
                  <p className="font-display text-[clamp(2.4rem,5.5vw,4.2rem)] leading-none font-extrabold text-brass">
                    {item.stat}
                  </p>
                  <h3 className="mt-5 font-display text-lg font-bold text-cream">{item.title}</h3>
                  <p className="mt-2.5 max-w-[46ch] text-sm leading-relaxed text-cream/60">
                    {item.text}
                  </p>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
