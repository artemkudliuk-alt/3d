"use client";

import { useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { VideoModal, type CaseTour } from "@/components/video-modal";
import { cn } from "@/lib/utils";

import posterSuite from "../../public/media/gen/case-presidential-suite.webp";
import posterLobby from "../../public/media/gen/case-lobby-lounge.webp";
import posterSpa from "../../public/media/gen/case-spa.webp";
import posterRooftop from "../../public/media/gen/case-rooftop-bar.webp";
import posterPool from "../../public/media/gen/case-pool.webp";

type CaseItem = CaseTour & { image: StaticImageData; span: string; sizes: string };

const CASES: CaseItem[] = [
  {
    hotel: "Aurelia Grand",
    zone: "Presidential Suite",
    image: posterSuite,
    poster: "/media/gen/case-presidential-suite.webp",
    video: "/media/video/case-suite.mp4",
    span: "lg:col-span-7",
    sizes: "(max-width: 1024px) 100vw, 58vw",
  },
  {
    hotel: "Meridian Bay",
    zone: "Lobby Lounge",
    image: posterLobby,
    poster: "/media/gen/case-lobby-lounge.webp",
    video: "/media/video/case-lobby.mp4",
    span: "lg:col-span-5",
    sizes: "(max-width: 1024px) 100vw, 42vw",
  },
  {
    hotel: "Nocturne Retreat",
    zone: "SPA & Wellness",
    image: posterSpa,
    poster: "/media/gen/case-spa.webp",
    video: "/media/video/case-spa.mp4",
    span: "lg:col-span-4",
    sizes: "(max-width: 1024px) 100vw, 33vw",
  },
  {
    hotel: "Obsidian House",
    zone: "Rooftop Bar",
    image: posterRooftop,
    poster: "/media/gen/case-rooftop-bar.webp",
    video: "/media/video/case-rooftop.mp4",
    span: "lg:col-span-4",
    sizes: "(max-width: 1024px) 100vw, 33vw",
  },
  {
    hotel: "Velissa Resort",
    zone: "Infinity Pool",
    image: posterPool,
    poster: "/media/gen/case-pool.webp",
    video: "/media/video/case-pool.mp4",
    span: "lg:col-span-4",
    sizes: "(max-width: 1024px) 100vw, 33vw",
  },
];

export function Cases() {
  const [active, setActive] = useState<CaseTour | null>(null);

  return (
    <section id="cases" className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="label-mono">Кейси</p>
          <h2 className="mt-4 max-w-[16ch] font-display text-[clamp(2rem,4.4vw,3.6rem)] leading-[1.02] font-bold tracking-[-0.02em]">
            Тури, які продають номер за 40 секунд
          </h2>
        </div>
        <p className="max-w-[42ch] text-cream/60">
          Натисніть на картку — тур відкриється у плеєрі без зайвих елементів керування.
        </p>
      </div>

      <div className="mt-14 grid gap-4 lg:grid-cols-12">
        {CASES.map((item, i) => (
          <motion.button
            key={item.hotel}
            type="button"
            onClick={() => setActive(item)}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: (i % 3) * 0.12, ease: [0.25, 1, 0.5, 1] }}
            className={cn(
              "group relative aspect-[4/3] overflow-hidden rounded-2xl border border-line text-left transition-all duration-300 ease-in-out hover:border-brass/50 lg:aspect-[16/10]",
              item.span,
            )}
            aria-label={`Відкрити 3D-тур: ${item.hotel}, ${item.zone}`}
          >
            <Image
              src={item.image}
              alt={`${item.hotel} — ${item.zone}`}
              fill
              sizes={item.sizes}
              placeholder="blur"
              className="object-cover transition-transform duration-[600ms] ease-in-out group-hover:scale-[1.06]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent opacity-90 transition-opacity duration-300 ease-in-out group-hover:opacity-75" />

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 md:p-7">
              <div>
                <p className="label-mono">{item.zone}</p>
                <p className="mt-2 font-display text-xl font-bold text-cream md:text-2xl">
                  {item.hotel}
                </p>
              </div>
              <span className="grid size-14 shrink-0 place-items-center rounded-full border border-cream/25 bg-ink/40 backdrop-blur-md transition-all duration-300 ease-in-out group-hover:border-brass group-hover:bg-brass group-hover:text-ink">
                <Play className="size-4 fill-current" />
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      <VideoModal tour={active} onClose={() => setActive(null)} />
    </section>
  );
}
