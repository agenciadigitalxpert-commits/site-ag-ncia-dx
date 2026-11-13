import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { articleNode, breadcrumbNode, graph, webPageNode } from "@/lib/schema";
import { formatDate, getArticle, getCategory, getSegment, getService, isPublished, readingMinutes, visibleArticles } from "@/lib/content";
import type { ArticleBlock } from "@/content/types";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Rich } from "@/components/RichText";
import { CtaInline, CtaSection, DataTable, ExampleBadge, HeroGrid } from "@/components/sections";
import { ArrowIcon, Container } from "@/components/ui";

export function generateStaticParams() {
  return visibleArticles.length ? visibleArticles.map((a) => ({ slug: a.slug })) : [{ slug: "__vazio__" }];
}

export async function generateMetadata({ params }: PageProps<"/conteudos/[slug]">): Promise<Metadata> {
  const a = getArticle((await params).slug);
  if (!a) return {};
  return pageMetadata({
    title: a.metaTitle,
    description: a.metaDescription,
    path: `/conteudos/${a.slug}`,
    type: "article",
    noindex: !isPublished(a),
    publishedTime: a.publishedAt,
    modifiedTime: a.updatedAt,
  });
}

function Block({ b }: { b: ArticleBlock }) {
  switch (b.type) {
    case "p":
      return <p><Rich text={b.text} /></p>;
    case "h2":
      return <h2 id={b.id} className="scroll-mt-28">{b.text}</h2>;
    case "h3":
      return <h3>{b.text}</h3>;
    case "ul":
      return <ul>{b.items.map((it, i) => <li key={i}><Rich text={it} /></li>)}</ul>;
    case "ol":
      return <ol>{b.items.map((it, i) => <li key={i}><Rich text={it} /></li>)}</ol>;
    case "example":
      return (
        <aside className="not-prose rounded-[var(--radius)] border border-line-light bg-paper-2 p-6 sm:p-7">
          <ExampleBadge />
          <p className="mt-4 text-lg font-semibold leading-snug">{b.title}</p>
          <p className="mt-2 leading-relaxed text-muted-light"><Rich text={b.text} /></p>
        </aside>
      );
    case "table":
      return <DataTable caption={b.table.caption} columns={b.table.columns} rows={b.table.rows} />;
    case "callout":
      return (
        <p className="border-l-2 border-ink pl-5 text-lg font-medium leading-relaxed">
          <Rich text={b.text} />
        </p>
      );
  }
}

export default async function ArticlePage({ params }: PageProps<"/conteudos/[slug]">) {
  const a = getArticle((await params).slug);
  if (!a) notFound();
  const path = `/conteudos/${a.slug}`;
  const cat = getCategory(a.category);
  const published = isPublished(a);
  const crumbs = [
    { name: "Início", href: "/" },
    { name: "Conteúdos", href: "/conteudos" },
    ...(cat ? [{ name: cat.name, href: `/conteudos/categoria/${cat.slug}` }] : []),
    { name: a.title, href: path },
  ];
  const toc = a.blocks.filter((b): b is Extract<ArticleBlock, { type: "h2" }> => b.type === "h2");
  const svc = a.relatedServices.map(getService).filter(Boolean) as NonNullable<ReturnType<typeof getService>>[];
  const seg = a.relatedSegments.map(getSegment).filter(Boolean) as NonNullable<ReturnType<typeof getSegment>>[];
  const more = visibleArticles.filter((x) => x.slug !== a.slug).slice(0, 2);

  return (
    <>
      <JsonLd
        data={graph(
          webPageNode({ path, name: a.title, description: a.metaDescription, mainEntity: `${path}#article` }),
          breadcrumbNode(path, crumbs),
          articleNode({ path, title: a.title, description: a.metaDescription, publishedAt: a.publishedAt, updatedAt: a.updatedAt, section: cat?.name }),
        )}
      />
      <article>
        <header className="surface-dark relative overflow-hidden border-b border-line-dark">
          <HeroGrid />
          <Container className="relative pb-14 pt-10 lg:pb-20 lg:pt-14">
            <Breadcrumbs items={crumbs} />
            <div className="mt-12 max-w-4xl">
              {cat ? <p className="mb-5 text-[0.8rem] font-medium uppercase tracking-[0.16em] text-accent">{cat.name}</p> : null}
              <h1 className="hero-rise text-h1">{a.title}</h1>
              <p className="mt-8 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-dark">
                <span>Por <span className="text-white/90">{site.name}</span></span>
                {published && a.publishedAt ? (
                  <span>Publicado em <time dateTime={a.publishedAt}>{formatDate(a.publishedAt)}</time></span>
                ) : null}
                {published && a.updatedAt && a.updatedAt !== a.publishedAt ? (
                  <span>Atualizado em <time dateTime={a.updatedAt}>{formatDate(a.updatedAt)}</time></span>
                ) : null}
                <span>{readingMinutes(a)} min de leitura</span>
              </p>
              {!published ? (
                <p role="note" className="mt-6 inline-block rounded-lg border border-dashed border-amber-300/60 bg-amber-300/10 px-4 py-2 text-sm text-amber-100">
                  Versão de pré-visualização: texto em revisão editorial, ainda não publicado nem indexado.
                </p>
              ) : null}
            </div>
          </Container>
        </header>

        <div className="surface-light py-14 sm:py-20">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-20">
              <div className="min-w-0 max-w-[44rem]">
                <section aria-labelledby="resposta" className="rounded-[var(--radius)] bg-ink p-7 text-white sm:p-8">
                  <h2 id="resposta" className="text-sm font-medium uppercase tracking-[0.16em] text-accent">Resposta direta</h2>
                  <p className="mt-3 text-lg leading-relaxed text-white/90"><Rich text={a.keyTakeaway} /></p>
                </section>
                <div className="prose-dx mt-12">
                  {a.blocks.map((b, i) => <Block key={i} b={b} />)}
                </div>
                <div className="mt-16">
                  <CtaInline title={a.cta.title} text={a.cta.text} location={`article_${a.slug}`} />
                </div>
              </div>

              <aside className="lg:sticky lg:top-28 lg:self-start">
                {toc.length ? (
                  <nav aria-labelledby="toc-title" className="border-t border-line-light pt-6">
                    <h2 id="toc-title" className="text-sm font-medium uppercase tracking-[0.14em] text-muted-light">Neste artigo</h2>
                    <ol className="mt-4 space-y-2.5 text-[0.95rem]">
                      {toc.map((h) => (
                        <li key={h.id}><a href={`#${h.id}`} className="link-u leading-snug">{h.text}</a></li>
                      ))}
                    </ol>
                  </nav>
                ) : null}
                {svc.length || seg.length ? (
                  <div className="mt-10 border-t border-line-light pt-6">
                    <h2 className="text-sm font-medium uppercase tracking-[0.14em] text-muted-light">Relacionados</h2>
                    <ul className="mt-4 space-y-2.5 text-[0.95rem]">
                      {svc.map((s) => <li key={s.slug}><Link href={`/servicos/${s.slug}`} className="link-u">{s.name}</Link></li>)}
                      {seg.map((s) => <li key={s.slug}><Link href={`/segmentos/${s.slug}`} className="link-u">{s.name}</Link></li>)}
                    </ul>
                  </div>
                ) : null}
              </aside>
            </div>

            {more.length ? (
              <section aria-labelledby="mais" className="mt-24 border-t border-line-light pt-12">
                <h2 id="mais" className="text-h3">Continue lendo</h2>
                <ul className="mt-6 grid gap-4 md:grid-cols-2">
                  {more.map((m) => (
                    <li key={m.slug}>
                      <Link href={`/conteudos/${m.slug}`} className="group flex h-full flex-col justify-between rounded-[var(--radius)] border border-line-light p-7 transition-colors hover:border-ink">
                        <span className="text-lg font-semibold leading-snug">{m.title}</span>
                        <span className="mt-6 inline-flex items-center gap-2 text-sm text-muted-light group-hover:text-ink">Ler artigo <ArrowIcon className="transition-transform group-hover:translate-x-1" /></span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </Container>
        </div>
      </article>
      <CtaSection location={`article_${a.slug}_final`} />
    </>
  );
}
