import type { MetadataRoute } from "next";
import { absoluteUrl, isIndexable } from "@/config/env";

/** Preview/homologação: bloqueia tudo. Produção (com domínio): libera e aponta o sitemap. */
export default function robots(): MetadataRoute.Robots {
  if (!isIndexable) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
