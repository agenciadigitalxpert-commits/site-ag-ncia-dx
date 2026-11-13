import type { NextConfig } from "next";

const isProductionSite = process.env.NEXT_PUBLIC_SITE_ENV === "production" && Boolean(process.env.NEXT_PUBLIC_SITE_URL);

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    const security = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
    ];
    return [
      {
        source: "/:path*",
        // Preview/homologação: reforça o bloqueio de indexação também no cabeçalho HTTP.
        headers: isProductionSite ? security : [...security, { key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
  async redirects() {
    return [
      { source: "/blog", destination: "/conteudos", permanent: true },
      { source: "/blog/:slug", destination: "/conteudos/:slug", permanent: true },
      { source: "/home", destination: "/", permanent: true },
      { source: "/inicio", destination: "/", permanent: true },
      { source: "/diagnostico", destination: "/contato", permanent: true },
      { source: "/servicos/trafego", destination: "/servicos/trafego-pago", permanent: true },
      { source: "/servicos/crm", destination: "/servicos/crm-automacao-ia", permanent: true },
      { source: "/politica-privacidade", destination: "/politica-de-privacidade", permanent: true },
    ];
  },
};

export default nextConfig;
