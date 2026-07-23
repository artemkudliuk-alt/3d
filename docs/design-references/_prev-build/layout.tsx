import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const aeonik = localFont({
  variable: "--font-aeonik",
  display: "swap",
  src: [
    { path: "../../public/fonts/aeonik-regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/aeonik-medium.woff2", weight: "500", style: "normal" },
  ],
});

const bwGradual = localFont({
  variable: "--font-bw",
  display: "swap",
  src: [
    { path: "../../public/fonts/bw-gradual-bold.woff2", weight: "700", style: "normal" },
    { path: "../../public/fonts/bw-gradual-extrabold.woff2", weight: "800", style: "normal" },
  ],
});

const jetbrains = localFont({
  variable: "--font-jet",
  display: "swap",
  src: [{ path: "../../public/fonts/JetBrainsMono-Medium.woff2", weight: "500", style: "normal" }],
});

const title = "NextWeb Hotels — 3D-відеотури для готелів";
const description =
  "Інтерактивні 3D-відеотури головними зонами готелю з ефектом повної присутності. Більше прямих бронювань і глибші перегляди сторінок.";

export const metadata: Metadata = {
  metadataBase: new URL("https://nextwebhotels.com"),
  title: { default: title, template: "%s — NextWeb Hotels" },
  description,
  keywords: ["3D-тур готелю", "віртуальний тур", "відеотур", "hotel 3D tour", "NextWeb Hotels"],
  openGraph: {
    type: "website",
    locale: "uk_UA",
    siteName: "NextWeb Hotels",
    title,
    description,
    images: [{ url: "/media/gen/og.jpg", width: 1200, height: 630, alt: title }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/media/gen/og.jpg"] },
  icons: { icon: "/seo/favicon.webp" },
};

export const viewport: Viewport = {
  themeColor: "#0B0B0E",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uk" className={`${aeonik.variable} ${bwGradual.variable} ${jetbrains.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
