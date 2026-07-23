"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Pause, Play, X } from "lucide-react";

export type CaseTour = {
  hotel: string;
  zone: string;
  video: string;
  poster: string;
};

/** Мінімалістичний плеєр: без нативних контролів, лише Play/Pause і Close. */
export function VideoModal({ tour, onClose }: { tour: CaseTour | null; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!tour) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [tour, onClose]);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      void v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <AnimatePresence>
      {tour && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`3D-тур: ${tour.hotel}, ${tour.zone}`}
          className="fixed inset-0 z-100 grid place-items-center bg-ink/92 p-4 backdrop-blur-md md:p-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-line bg-black shadow-[0_40px_120px_-30px_#000]"
          >
            <video
              ref={videoRef}
              key={tour.video}
              className="aspect-video w-full cursor-pointer object-cover"
              src={tour.video}
              poster={tour.poster}
              autoPlay
              loop
              playsInline
              onClick={toggle}
            />

            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-black/85 to-transparent p-5 md:p-7">
              <div>
                <p className="label-mono">{tour.zone}</p>
                <p className="mt-1.5 font-display text-xl font-bold text-cream md:text-2xl">
                  {tour.hotel}
                </p>
              </div>
              <button
                type="button"
                onClick={toggle}
                aria-label={playing ? "Пауза" : "Відтворити"}
                className="pointer-events-auto grid size-12 shrink-0 place-items-center rounded-full bg-cream/10 text-cream backdrop-blur-md transition-all duration-300 ease-in-out hover:bg-brass hover:text-ink"
              >
                {playing ? (
                  <Pause className="size-4 fill-current" />
                ) : (
                  <Play className="size-4 fill-current" />
                )}
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Закрити тур"
              className="absolute top-4 right-4 grid size-11 place-items-center rounded-full bg-ink/70 text-cream backdrop-blur-md transition-all duration-300 ease-in-out hover:bg-brass hover:text-ink"
            >
              <X className="size-4" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
