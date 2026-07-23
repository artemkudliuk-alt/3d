"use client";

import { useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

import person1 from "../../public/media/gen/person-1.webp";
import person2 from "../../public/media/gen/person-2.webp";
import person3 from "../../public/media/gen/person-3.webp";
import person4 from "../../public/media/gen/person-4.webp";

const ITEMS: { name: string; role: string; photo: StaticImageData; text: string }[] = [
  {
    name: "Іван Демидов",
    role: "Керуючий директор, Grand Plaza Hotel",
    photo: person1,
    text: "Ми замінили галерею фото на 3D-тур по люксах — конверсія сторінки номера зросла на третину за перший місяць. Гості нарешті розуміють, за що платять.",
  },
  {
    name: "Олена Крамар",
    role: "Head of Marketing, Meridian Bay",
    photo: person2,
    text: "Тур по SPA ми пустили в Instagram і в розсилку. Прямі бронювання вихідних виросли настільки, що ми зняли частину бюджету з агрегаторів.",
  },
  {
    name: "Марк Шевченко",
    role: "Власник, Nocturne Retreat",
    photo: person3,
    text: "Інтеграція зайняла один вечір — просто вставили блок у наш сайт на WordPress. Швидкість завантаження не просіла, PageSpeed залишився зеленим.",
  },
  {
    name: "Анна Ліщук",
    role: "Revenue Manager, Velissa Resort",
    photo: person4,
    text: "Найцінніше — гість приходить на стійку вже без питань про номер. Скарг на «фото не збігається з реальністю» ми не отримували жодного разу.",
  },
];

export function Testimonials() {
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [maxDrag, setMaxDrag] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (!viewport.current || !track.current) return;
      setMaxDrag(Math.max(0, track.current.scrollWidth - viewport.current.offsetWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <section id="testimonials" className="py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <p className="label-mono">Відгуки</p>
        <h2 className="mt-4 max-w-[20ch] font-display text-[clamp(2rem,4.4vw,3.6rem)] leading-[1.02] font-bold tracking-[-0.02em]">
          Готелі, які вже показують себе у 3D
        </h2>
      </div>

      <div ref={viewport} className="mx-auto mt-14 max-w-[1440px] overflow-hidden px-5 md:px-10">
        <motion.div
          ref={track}
          drag="x"
          dragConstraints={{ left: -maxDrag, right: 0 }}
          dragElastic={0.08}
          className="flex cursor-grab gap-4 active:cursor-grabbing"
        >
          {ITEMS.map((item, i) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: [0.25, 1, 0.5, 1] }}
              className="flex w-[85vw] shrink-0 flex-col justify-between rounded-2xl border border-line bg-surface p-7 transition-colors duration-300 ease-in-out hover:border-brass/45 sm:w-[420px] md:p-9"
            >
              <Quote className="size-6 shrink-0 text-brass" />
              <p className="mt-7 text-[15px] leading-relaxed text-cream/80 select-none">
                {item.text}
              </p>
              <div className="mt-9 flex items-center gap-4 border-t border-line pt-6">
                <Image
                  src={item.photo}
                  alt={item.name}
                  width={52}
                  height={52}
                  sizes="52px"
                  placeholder="blur"
                  draggable={false}
                  className="size-13 shrink-0 rounded-full object-cover"
                />
                <div>
                  <p className="font-display text-sm font-bold text-cream">{item.name}</p>
                  <p className="mt-1 text-xs text-muted">{item.role}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>

      <p className="mx-auto mt-8 max-w-[1440px] px-5 font-mono text-[11px] tracking-[0.18em] text-cream/35 uppercase md:px-10">
        ← Перетягніть, щоб гортати
      </p>
    </section>
  );
}
