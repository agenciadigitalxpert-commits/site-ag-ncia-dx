import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbNode, graph, webPageNode } from "@/lib/schema";
import { getCase, visibleCases } from "@/content/cases";
import { getSegment, getService } from "@/lib/content";
import { JsonLd } from "@/components/JsonLd";
import { Rich } from "@/components/RichText";
import { CtaSection, PageHero } from "@/components/sections";
import { Container, Section } from "@/components/ui";
import Link from "next/link";

/** Com Cache Components é preciso ao menos um parâmetro; sem cases visíveis, o placeholder retorna 404. */
export function generateStaticParams() {
  return visibleCases.length ? visibleCases.map((c) => ({ slug: c.slug })) : [{ slug: "__vazio__" }];
}

export async function generateMetadata({ params }: PageProps<"/cases/[slug]">): Promise<Metadata> {
  const c = getCase((await params).slug);
  if (!c) return {};
  return pageMetadata({ title: c.title, description: c.summary, path: `/cases/${c.slug}`, noindex: !c.published });
}

export default async function CasePage({ params }: PageProps<"/cases/[slug]">) {
  const c = getCase((await params).slug);
  if (!c) notFound();
  const path = `/cases/${c.slug}`;
  const crumbs = [
    { name: "Início", href: "/" },
    { name: "Cases", href: "/cases" },
    { name: c.title, href: path },
  ];
  const seg = getSegment(c.segment);
  return (
    <>
      <JsonLd data={graph(webPageNode({ path, name: c.title, description: c.summary }), breadcrumbNode(path, crumbs))} />
      {!c.published ? (
        <p role="note" className="bg-amber-100 px-5 py-3 text-center text-sm text-amber-900">Rascunho — visível apenas no ambiente de edição.</p>
      ) : null}
      <PageHero crumbs={crumbs} eyebrow={seg ? seg.navLabel : "Case"} title={c.title} lead={c.summary} ctaLocation={`case_${c.slug}_hero`} />
      <Section tone="light">
        <Container narrow>
          <div className="prose-dx">
            <p><strong>Cliente:</strong> {c.client}</p>
            <h2>Desafio</h2>
            {c.challenge.map((p, i) => <p key={i}><Rich text={p} /></p>)}
            <h2>O que foi feito</h2>
            <ul>{c.actions.map((p, i) => <li key={i}><Rich text={p} /></li>)}</ul>
            <h2>Resultados</h2>
            <ul>
              {c.results.map((r) => (
                <li key={r.label}><strong>{r.label}:</strong> {r.value} — {r.period}. Fonte: {r.source}.</li>
              ))}
            </ul>
            <p>
              Serviços envolvidos:{" "}
              {c.services.map((s, i) => {
                const sv = getService(s);
                return sv ? <span key={s}>{i ? ", " : ""}<Link href={`/servicos/${s}`}>{sv.navLabel}</Link></span> : null;
              })}
            </p>
          </div>
        </Container>
      </Section>
      <CtaSection location={`case_${c.slug}_final`} />
    </>
  );
}
