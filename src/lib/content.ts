import { services } from "@/content/services";
import { segments } from "@/content/segments";
import { articles, categories } from "@/content/articles";
import { siteEnv } from "@/config/env";
import type { Article } from "@/content/types";

export { services, segments, categories };

export const getService = (slug: string) => services.find((s) => s.slug === slug);
export const getSegment = (slug: string) => segments.find((s) => s.slug === slug);
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);

/** Publicado de verdade: status "published" com data real. */
export const isPublished = (a: Article) => a.status === "published" && Boolean(a.publishedAt);

/** Em preview, artigos em revisão aparecem (com aviso). Em produção, apenas publicados. */
export const visibleArticles = articles
  .filter((a) => (siteEnv === "production" ? isPublished(a) : true))
  .sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""));

export const getArticle = (slug: string) => visibleArticles.find((a) => a.slug === slug);
export const articlesInCategory = (slug: string) => visibleArticles.filter((a) => a.category === slug);

export const ARTICLES_PER_PAGE = 9;
export const articlePageCount = Math.max(1, Math.ceil(visibleArticles.length / ARTICLES_PER_PAGE));

/** Categorias com poucos textos ficam fora do índice até ganharem corpo. */
export const MIN_ARTICLES_TO_INDEX_CATEGORY = 3;

export function readingMinutes(a: Article) {
  const text = a.blocks
    .map((b) => ("text" in b ? b.text : "items" in b ? b.items.join(" ") : "table" in b ? b.table.rows.flat().join(" ") : ""))
    .join(" ");
  return Math.max(1, Math.round(text.split(/\s+/).length / 220));
}

export function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const months = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
  return `${d} de ${months[m - 1]} de ${y}`;
}
