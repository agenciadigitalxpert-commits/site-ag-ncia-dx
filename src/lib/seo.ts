import type { Metadata } from "next";
import { site } from "@/config/site";
import { isIndexable } from "@/config/env";

/** Sufixo curto da marca nos títulos (mantém os títulos perto de 60 caracteres). */
export const BRAND_SUFFIX = "Digital Xpert";

type Opts = {
  /** Título sem a marca; o template do layout adiciona " | Digital Xpert". */
  title: string;
  description: string;
  path: string;
  /** Força noindex (ex.: páginas sem conteúdo público suficiente). */
  noindex?: boolean;
  type?: "website" | "article";
  /** Título absoluto (ignora o template). */
  absoluteTitle?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
};

export function pageMetadata(o: Opts): Metadata {
  const index = isIndexable && !o.noindex;
  const fullTitle = o.absoluteTitle ? o.title : `${o.title} | ${BRAND_SUFFIX}`;
  const image = { url: "/opengraph-image", width: 1200, height: 630, alt: `${site.name} — tráfego pago, criativos e estrutura comercial` };
  return {
    title: o.absoluteTitle ? { absolute: o.title } : o.title,
    description: o.description,
    alternates: { canonical: o.path },
    robots: index ? { index: true, follow: true } : { index: false, follow: !o.noindex || isIndexable },
    openGraph: {
      type: o.type ?? "website",
      locale: "pt_BR",
      siteName: site.name,
      title: fullTitle,
      description: o.description,
      url: o.path,
      images: [image],
      ...(o.publishedTime ? { publishedTime: o.publishedTime } : {}),
      ...(o.modifiedTime ? { modifiedTime: o.modifiedTime } : {}),
    },
    twitter: { card: "summary_large_image", title: fullTitle, description: o.description, images: [image.url] },
  };
}
