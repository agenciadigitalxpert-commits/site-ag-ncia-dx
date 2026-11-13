import Link from "next/link";
import type { Article } from "@/content/types";
import { categories, formatDate, getCategory, isPublished, readingMinutes } from "@/lib/content";
import { ArrowIcon } from "./ui";

export function ArticleList({ items }: { items: Article[] }) {
  if (!items.length) {
    return (
      <p className="rounded-[var(--radius)] border border-line-light p-8 text-muted-light">
        Novos conteúdos estão em preparação. Enquanto isso, conheça nossos <Link href="/servicos" className="underline underline-offset-2">serviços</Link> ou a nossa <Link href="/metodologia" className="underline underline-offset-2">metodologia</Link>.
      </p>
    );
  }
  return (
    <ul className="border-t border-line-light">
      {items.map((a) => {
        const cat = getCategory(a.category);
        return (
          <li key={a.slug} className="reveal border-b border-line-light">
            <article className="group relative grid gap-4 py-9 md:grid-cols-[minmax(0,3fr)_minmax(0,7fr)_auto] md:gap-10">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-light md:flex-col md:items-start">
                {cat ? <span className="font-medium text-ink">{cat.name}</span> : null}
                <span>
                  {isPublished(a) && a.publishedAt ? <time dateTime={a.publishedAt}>{formatDate(a.publishedAt)}</time> : "Em revisão editorial"}
                  {" · "}
                  {readingMinutes(a)} min de leitura
                </span>
              </div>
              <div>
                <h2 className="text-h3">
                  <Link href={`/conteudos/${a.slug}`} className="after:absolute after:inset-0">{a.title}</Link>
                </h2>
                <p className="mt-3 leading-relaxed text-muted-light">{a.excerpt}</p>
              </div>
              <span aria-hidden className="hidden size-11 place-items-center self-center rounded-full border border-line-light transition-colors group-hover:border-transparent group-hover:bg-accent md:grid">
                <ArrowIcon />
              </span>
            </article>
          </li>
        );
      })}
    </ul>
  );
}

export function CategoryNav({ current }: { current?: string }) {
  return (
    <nav aria-label="Categorias de conteúdo">
      <ul className="flex flex-wrap gap-2">
        <li>
          <Link href="/conteudos" aria-current={!current ? "page" : undefined} className="inline-flex min-h-11 items-center rounded-full border border-line-light px-4 text-[0.95rem] transition-colors hover:border-ink aria-[current=page]:border-ink aria-[current=page]:bg-ink aria-[current=page]:text-white">
            Todos
          </Link>
        </li>
        {categories.map((c) => (
          <li key={c.slug}>
            <Link href={`/conteudos/categoria/${c.slug}`} aria-current={current === c.slug ? "page" : undefined} className="inline-flex min-h-11 items-center rounded-full border border-line-light px-4 text-[0.95rem] transition-colors hover:border-ink aria-[current=page]:border-ink aria-[current=page]:bg-ink aria-[current=page]:text-white">
              {c.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Pagination({ page, total, base }: { page: number; total: number; base: string }) {
  if (total <= 1) return null;
  const href = (n: number) => (n === 1 ? base : `${base}/pagina/${n}`);
  return (
    <nav aria-label="Paginação" className="mt-12 flex items-center justify-between">
      {page > 1 ? <Link href={href(page - 1)} rel="prev" className="underline underline-offset-4">Página anterior</Link> : <span />}
      <span className="text-sm text-muted-light">Página {page} de {total}</span>
      {page < total ? <Link href={href(page + 1)} rel="next" className="underline underline-offset-4">Próxima página</Link> : <span />}
    </nav>
  );
}
