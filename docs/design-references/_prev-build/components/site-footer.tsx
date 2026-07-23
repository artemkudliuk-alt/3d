import { Logo } from "@/components/logo";

const LINKS = [
  { href: "#cases", label: "Кейси" },
  { href: "#benefits", label: "Результати" },
  { href: "#testimonials", label: "Відгуки" },
  { href: "#contact", label: "Замовити аудит" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface/40">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-12 px-5 py-16 md:px-10 lg:flex-row lg:justify-between">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-6 text-sm leading-relaxed text-cream/50">
            Продакшн 3D-відеотурів для готелів, резиденцій і курортів. Зйомка, монтаж, інтеграція
            на ваш сайт.
          </p>
        </div>

        <nav className="flex flex-col gap-3">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-cream/60 transition-colors duration-300 ease-in-out hover:text-brass"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-3 text-sm">
          <a
            href="mailto:hello@nextwebhotels.com"
            className="text-cream transition-colors duration-300 ease-in-out hover:text-brass"
          >
            hello@nextwebhotels.com
          </a>
          <a
            href="https://t.me/nextwebhotels"
            className="text-cream/60 transition-colors duration-300 ease-in-out hover:text-brass"
          >
            @nextwebhotels
          </a>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1440px] flex-col gap-2 border-t border-line px-5 py-6 font-mono text-[11px] tracking-[0.14em] text-cream/30 uppercase md:flex-row md:justify-between md:px-10">
        <span>© {new Date().getFullYear()} NextWeb Hotels</span>
        <span>Зроблено для готелів, які продають враження</span>
      </div>
    </footer>
  );
}
