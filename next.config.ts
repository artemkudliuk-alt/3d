import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Направляем корень на оригинальный чистый HTML, который склонировал пользователь
  async rewrites() {
    return {
      beforeFiles: [{ source: "/", destination: "/home.html" }],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
