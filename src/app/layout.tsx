import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NEXTWEB HOTELS",
  description: "3D-відеотури нового покоління",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
