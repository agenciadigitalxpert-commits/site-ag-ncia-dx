import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/config/env";
import { publishedCases } from "@/content/cases";
import { MIN_ARTICLES_TO_INDEX_CATEGORY, articlesInCategory, categories, isPublished, segments, services, visibleArticles } from "@/lib/content";

/** Apenas URLs públicas, canônicas e indexáveis. */
export default function sitemap(): MetadataRoute.Sitemap {
  const published = visibleArticles.filter(isPublished);
  const paths: { path: string; lastModified?: string }[] = [
    { path: "/" },
    { path: "/sobre" },
    { path: "/metodologia" },
    { path: "/contato" },
    { path: "/servicos" },
    ...services.map((s) => ({ path: `/servicos/${s.slug}` })),
    { path: "/segmentos" },
    ...segments.map((s) => ({ path: `/segmentos/${s.slug}` })),
    ...(publishedCases.length ? [{ path: "/cases" }, ...publishedCases.map((c) => ({ path: `/cases/${c.slug}`, lastModified: c.publishedAt }))] : []),
    ...(published.length ? [{ path: "/conteudos" }] : []),
    ...published.map((a) => ({ path: `/conteudos/${a.slug}`, lastModified: a.updatedAt ?? a.publishedAt })),
    ...categories
      .filter((c) => articlesInCategory(c.slug).filter(isPublished).length >= MIN_ARTICLES_TO_INDEX_CATEGORY)
      .map((c) => ({ path: `/conteudos/categoria/${c.slug}` })),
    { path: "/politica-de-privacidade" },
    { path: "/politica-de-cookies" },
  ];
  return paths.map((p) => ({ url: absoluteUrl(p.path), ...(p.lastModified ? { lastModified: p.lastModified } : {}) }));
}
