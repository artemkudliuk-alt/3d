import Image from "next/image";

import aurelia from "../../public/media/gen/logo-aurelia.webp";
import luma from "../../public/media/gen/logo-luma-co.webp";
import meridian from "../../public/media/gen/logo-meridian.webp";
import nocturn from "../../public/media/gen/logo-nocturn.webp";
import obsidian from "../../public/media/gen/logo-obsidian-house.webp";
import velissa from "../../public/media/gen/logo-velissa.webp";

const LOGOS = [
  { src: aurelia, alt: "Aurelia" },
  { src: meridian, alt: "Meridian" },
  { src: nocturn, alt: "Nocturn" },
  { src: obsidian, alt: "Obsidian House" },
  { src: velissa, alt: "Velissa" },
  { src: luma, alt: "Luma & Co" },
];

export function Partners() {
  return (
    <section className="border-y border-line py-16 md:py-20">
      <p className="label-mono mx-auto max-w-[1440px] px-5 md:px-10">
        Нам довіряють
      </p>

      {/* group-hover уповільнює стрічку; маска ховає стики по краях */}
      <div className="group mt-10 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div className="flex w-max animate-marquee items-center gap-16 pr-16 group-hover:[animation-duration:120s] md:gap-24 md:pr-24">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center gap-16 md:gap-24" aria-hidden={copy === 1}>
              {LOGOS.map((logo) => (
                <Image
                  key={logo.alt}
                  src={logo.src}
                  alt={logo.alt}
                  sizes="240px"
                  className="h-9 w-auto shrink-0 opacity-40 transition-opacity duration-300 ease-in-out hover:opacity-100 md:h-11"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
