import { cn } from "@/lib/utils";

/**
 * Знак NextWeb Hotels: одноточкова перспектива — зовнішня рамка (кадр),
 * дальня стіна всередині та променi до точки сходу. Читається як «вхід у кімнату».
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      className={cn("h-9 w-9", className)}
    >
      <defs>
        <linearGradient id="nw-wall" x1="14" y1="14" x2="27" y2="27" gradientUnits="userSpaceOnUse">
          <stop stopColor="currentColor" stopOpacity="0.32" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0.06" />
        </linearGradient>
      </defs>

      {/* кадр */}
      <rect
        x="1.25"
        y="1.25"
        width="37.5"
        height="37.5"
        rx="9"
        stroke="currentColor"
        strokeOpacity="0.45"
        strokeWidth="1.5"
      />

      {/* промені до точки сходу */}
      <path
        d="M1.5 1.5 14 15.5M38.5 1.5 26 15.5M1.5 38.5 14 24.5M38.5 38.5 26 24.5"
        stroke="currentColor"
        strokeOpacity="0.35"
        strokeWidth="1.1"
        strokeLinecap="round"
      />

      {/* дальня стіна */}
      <rect x="14" y="15.5" width="12" height="9" rx="1.6" fill="url(#nw-wall)" />
      <rect
        x="14"
        y="15.5"
        width="12"
        height="9"
        rx="1.6"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      {/* об'єктив / точка присутності */}
      <circle cx="20" cy="20" r="1.9" fill="currentColor" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5 text-brass", className)}>
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[15px] font-extrabold tracking-[0.14em] text-cream">
          NEXTWEB
        </span>
        <span className="mt-[3px] font-mono text-[9px] tracking-[0.42em] text-brass">
          HOTELS
        </span>
      </span>
    </span>
  );
}
