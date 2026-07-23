"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { buttonStyles } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MARKERS = ["Lobby", "Suites", "SPA", "Rooftop", "Pool"];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "18%"]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 1.12]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "-14%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative h-[100svh] min-h-[640px] overflow-hidden">
      <motion.div style={{ y: videoY, scale: videoScale }} className="absolute inset-0">
        <video
          className="size-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/media/gen/hero-lobby.webp"
          aria-hidden="true"
        >
          <source src="/media/video/hero-scrub.webm" type="video/webm" />
          <source src="/media/video/hero-scrub.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* читабельність тексту поверх відео */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/55 to-ink" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/55 to-ink/10" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative mx-auto flex h-full max-w-[1440px] flex-col justify-end px-5 pb-16 md:px-10 md:pb-24"
      >
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
          className="label-mono"
        >
          NextWeb Hotels · 3D-відеотури
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
          className="mt-4 max-w-[17ch] font-display text-[clamp(2.1rem,4.6vw,4.25rem)] leading-[1.02] font-extrabold tracking-[-0.025em] text-cream"
        >
          Перенесіть гостя у ваш готель <span className="text-brass">ще до бронювання</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.25, 1, 0.5, 1] }}
          className="mt-5 max-w-[52ch] text-[15px] leading-relaxed text-cream/70 md:text-base"
        >
          Інтерактивні промо-тури головними зонами готелю з ефектом повної присутності.
          Зростання прямих продажів і залученості вже з першого екрана.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.25, 1, 0.5, 1] }}
          className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <a href="#cases" className={cn(buttonStyles({ size: "lg" }), "group relative")}>
            <span className="absolute inset-0 rounded-full bg-brass animate-halo" aria-hidden />
            <Play className="relative size-4 fill-current" />
            <span className="relative">Дивитись демо</span>
          </a>
          <a href="#contact" className={cn(buttonStyles({ variant: "outline", size: "lg" }), "group")}>
            Отримати розрахунок
            <ArrowRight className="size-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
          </a>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-10 hidden items-center gap-8 border-t border-cream/10 pt-5 md:[@media(min-height:820px)]:flex"
        >
          {MARKERS.map((m) => (
            <li key={m} className="font-mono text-[11px] tracking-[0.18em] text-cream/40 uppercase">
              {m}
            </li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
}
