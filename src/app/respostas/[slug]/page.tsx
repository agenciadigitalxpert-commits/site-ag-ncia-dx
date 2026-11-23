import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { articleNode, breadcrumbNode, faqNode, graph, webPageNode } from "@/lib/schema";
import { answers, formatDate, getAnswer, getArticle, getService } from "@/lib/content";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Rich } from "@/components/RichText";
import { FaqList } from "@/components/Faq";
import { CtaInline, CtaSection, HeroGrid } from "@/components/sections";
import { ArrowIcon, Container } from "@/components/ui";

export function generateStaticParams() {
  return answers.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/respostas/[slug]">): Promise<Metadata> {
  const a = getAnswer((await params).slug);
  if (!a) return {};
  return pageMetadata({ title: a.metaTitle, description: a.metaDescription, path: `/respostas/${a.slug}`, type: "article", modifiedTime: a.updatedAt });
}

export default async function AnswerPage({ params }: PageProps<"/respostas/[slug]">) {
  const a = getAnswer((await params).slug);
  if (!a) notFound();
  const path = `/respostas/${a.slug}`;
  const crumbs = [
    { name: "Início", href: "/" },
    { name: "Perguntas frequentes", href: "/respostas" },
    { name: a.question, href: path },
  ];
  const svc = a.related.services.map(getService).filter(Boolean) as NonNullable<ReturnType<typeof getService>>[];
  const arts = a.related.articles.map(getArticle).filter(Boolean) as NonNullable<ReturnType<typeof getArticle>>[];
  const more = a.related.answers.map(getAnswer).filter(Boolean) as NonNullable<ReturnType<typeof getAnswer>>[];

  return (
    <>
      <JsonLd
        data={graph(
          webPageNode({ path, name: a.question, description: a.metaDescription, mainEntity: `${path}#article` }),
          breadcrumbNode(path, crumbs),
          articleNode({ path, title: a.question, description: a.metaDescription, publishedAt: a.updatedAt, updatedAt: a.updatedAt, section: "Perguntas frequentes" }),
          faqNode(path, [{ q: a.question, a: a.shortAnswer }, ...a.faqs]),
        )}
      />
      <article>
        <header className="surface-dark relative isolate overflow-hidden">
          <HeroGrid />
          <Container className="relative pb-14 pt-10 lg:pb-20 lg:pt-14">
            <Breadcrumbs items={crumbs} />
            <div className="mt-12 max-w-4xl">
              <p className="mb-4 text-[0.8125rem] font-medium uppercase leading-5 tracking-[0.14em] text-text-secondary">Perguntas frequentes</p>
              <h1 className="hero-rise text-h1">{a.question}</h1>
              <p className="mt-8 text-sm text-text-secondary">
                Por <span className="text-text-primary">{site.name}</span> · Atualizado em <time dateTime={a.updatedAt}>{formatDate(a.updatedAt)}</time>
              </p>
            </div>
          </Container>
        </header>

        <div className="surface-light py-14 sm:py-20">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-20">
              <div className="min-w-0 max-w-[44rem]">
                <section aria-labelledby="resposta-curta" className="surface-dark rounded-md p-6 sm:p-8">
                  <h2 id="resposta-curta" className="text-xs font-medium uppercase leading-4 tracking-[0.14em] text-text-secondary">Resposta curta</h2>
                  <p className="mt-3 text-lg leading-7"><Rich text={a.shortAnswer} /></p>
                </section>

                <section aria-labelledby="pontos" className="mt-12">
                  <h2 id="pontos" className="text-h3">Pontos principais</h2>
                  <ul className="mt-5 space-y-3">
                    {a.keyPoints.map((k, i) => (
                      <li key={i} className="flex gap-3">
                        <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-text-primary" />
                        <span><Rich text={k} /></span>
                      </li>
                    ))}
                  </ul>
                </section>

                <div className="prose-dx mt-12">
                  {a.sections.map((s) => (
                    <section key={s.title}>
                      <h2>{s.title}</h2>
                      {s.paragraphs.map((p, i) => <p key={i}><Rich text={p} /></p>)}
                      {s.list?.length ? <ul>{s.list.map((it, i) => <li key={i}><Rich text={it} /></li>)}</ul> : null}
                    </section>
                  ))}
                </div>

                {a.faqs.length ? (
                  <section aria-labelledby="duvidas" className="mt-16">
                    <h2 id="duvidas" className="text-h3">Dúvidas relacionadas</h2>
                    <div className="mt-6"><FaqList faqs={a.faqs} /></div>
                  </section>
                ) : null}

                <div className="mt-16">
                  <CtaInline title="Quer aplicar isso no seu negócio?" text="No diagnóstico, olhamos sua operação e mostramos o que priorizar entre mídia, páginas e atendimento." location={`answer_${a.slug}`} />
                </div>
              </div>

              <aside className="lg:sticky lg:top-28 lg:self-start">
                {more.length ? (
                  <nav aria-labelledby="outras">
                    <h2 id="outras" className="text-sm font-medium uppercase tracking-[0.14em] text-text-secondary">Outras perguntas</h2>
                    <ul className="mt-4 space-y-2.5 text-[0.95rem]">
                      {more.map((m) => <li key={m.slug}><Link href={`/respostas/${m.slug}`} className="link-u leading-snug">{m.question}</Link></li>)}
                    </ul>
                  </nav>
                ) : null}
                {svc.length || arts.length ? (
                  <div className="mt-10">
                    <h2 className="text-sm font-medium uppercase tracking-[0.14em] text-text-secondary">Para se aprofundar</h2>
                    <ul className="mt-4 space-y-2.5 text-[0.95rem]">
                      {svc.map((s) => <li key={s.slug}><Link href={`/servicos/${s.slug}`} className="link-u">{s.name}</Link></li>)}
                      {arts.map((x) => <li key={x.slug}><Link href={`/conteudos/${x.slug}`} className="link-u">{x.title}</Link></li>)}
                    </ul>
                  </div>
                ) : null}
                <Link href="/materiais" className="mt-10 inline-flex items-center gap-2 text-[0.95rem] font-medium">
                  Materiais para baixar <ArrowIcon className="size-4" />
                </Link>
              </aside>
            </div>
          </Container>
        </div>
      </article>
      <CtaSection location={`answer_${a.slug}_final`} />
    </>
  );
}
