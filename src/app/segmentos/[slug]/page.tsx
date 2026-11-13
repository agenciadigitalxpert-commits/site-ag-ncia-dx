import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbNode, faqNode, graph, ids, webPageNode } from "@/lib/schema";
import { getSegment, getService, segments } from "@/lib/content";
import { SEGMENT_OPTIONS } from "@/lib/lead";
import { JsonLd } from "@/components/JsonLd";
import { FaqList } from "@/components/Faq";
import { Rich } from "@/components/RichText";
import { inSentence } from "@/lib/rich";
import { CtaSection, ExampleBadge, PageHero, SectionHeader } from "@/components/sections";
import { ArrowIcon, Container, Eyebrow, Section, cx } from "@/components/ui";

export function generateStaticParams() {
  return segments.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/segmentos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = getSegment(slug);
  if (!s) return {};
  return pageMetadata({ title: s.metaTitle, description: s.metaDescription, path: `/segmentos/${s.slug}` });
}

const formSegment: Record<string, string> = {
  "intermediacao-e-revendas": SEGMENT_OPTIONS[0],
  "oficinas-e-funilarias": SEGMENT_OPTIONS[1],
  "clinicas-de-estetica": SEGMENT_OPTIONS[2],
  dermatologistas: SEGMENT_OPTIONS[3],
  "clinicas-odontologicas": SEGMENT_OPTIONS[4],
  delivery: SEGMENT_OPTIONS[5],
};

const stages = ["Atrair", "Qualificar", "Converter"] as const;

export default async function SegmentPage({ params }: PageProps<"/segmentos/[slug]">) {
  const { slug } = await params;
  const s = getSegment(slug);
  if (!s) notFound();

  const path = `/segmentos/${s.slug}`;
  const crumbs = [
    { name: "Início", href: "/" },
    { name: "Segmentos", href: "/segmentos" },
    { name: s.navLabel, href: path },
  ];
  const svc = s.services.map(getService).filter(Boolean) as NonNullable<ReturnType<typeof getService>>[];

  return (
    <>
      <JsonLd
        data={graph(
          {
            ...webPageNode({ path, name: s.metaTitle, description: s.metaDescription }),
            about: { "@type": "Thing", name: s.name },
            mentions: svc.map((x) => ({ "@id": ids.service(x.slug) })),
          },
          breadcrumbNode(path, crumbs),
          faqNode(path, s.faqs),
        )}
      />
      <PageHero crumbs={crumbs} eyebrow={s.eyebrow} title={s.h1} lead={s.lead} ctaLocation={`segment_${s.slug}_hero`} />

      {/* Contexto */}
      <Section tone="light" labelledBy="contexto">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
            <div className="reveal">
              <Eyebrow index="01">O contexto</Eyebrow>
              <h2 id="contexto" className="text-h2">{s.context.title}</h2>
            </div>
            <div className="reveal space-y-5 text-lead text-muted-light">
              {s.context.paragraphs.map((p, i) => (
                <p key={i} className={i === 0 ? "text-ink" : undefined}><Rich text={p} /></p>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Desafios */}
      <Section tone="paper2" labelledBy="desafios">
        <Container>
          <SectionHeader id="desafios" index="02" eyebrow="Desafios comuns" title="Onde as oportunidades costumam se perder" />
          <ol className="mt-12 grid gap-x-12 border-t border-line-light md:grid-cols-2">
            {s.challenges.map((c, i) => (
              <li key={c.title} className="reveal flex gap-5 border-b border-line-light py-7">
                <span className="pt-1 text-sm tabular-nums text-muted-light">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-h3">{c.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted-light"><Rich text={c.text} /></p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Abordagem */}
      <Section tone="dark" labelledBy="abordagem">
        <Container>
          <SectionHeader id="abordagem" index="03" eyebrow="Como a DX atua" title={`Atrair, qualificar e converter no contexto de ${inSentence(s.navLabel)}`} />
          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line-dark bg-line-dark lg:grid-cols-3">
            {stages.map((stage, i) => (
              <div key={stage} className="reveal bg-ink p-7 sm:p-9" style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}>
                <p className="text-sm uppercase tracking-[0.16em] text-accent">{stage}</p>
                <ul className="mt-6 space-y-7">
                  {s.approach.filter((a) => a.stage === stage).map((a) => (
                    <li key={a.title}>
                      <h3 className="text-lg font-semibold">{a.title}</h3>
                      <p className="mt-2 leading-relaxed text-white/70"><Rich text={a.text} /></p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Exemplos */}
      <Section tone="light" labelledBy="exemplos">
        <Container>
          <SectionHeader id="exemplos" index="04" eyebrow="Na prática" title="Situações comuns e como lidamos com elas" intro="Cenários ilustrativos, construídos para explicar a lógica do trabalho. Não representam clientes reais." />
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {s.examples.map((e) => (
              <article key={e.title} className="reveal flex flex-col rounded-[var(--radius)] border border-line-light p-7">
                <ExampleBadge />
                <h3 className="text-h3 mt-5">{e.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-light"><Rich text={e.text} /></p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* Objeções */}
      <Section tone="paper2" labelledBy="objecoes">
        <Container>
          <SectionHeader id="objecoes" index="05" eyebrow="Objeções" title="O que costumamos ouvir — e o que respondemos" />
          <dl className="mt-12 grid gap-4 md:grid-cols-2">
            {s.objections.map((o) => (
              <div key={o.q} className="reveal rounded-[var(--radius)] bg-paper p-7">
                <dt className="font-display text-xl font-medium">“{o.q}”</dt>
                <dd className="mt-3 leading-relaxed text-muted-light"><Rich text={o.a} /></dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      {s.compliance ? (
        <Section tone="light" labelledBy="comunicacao-responsavel">
          <Container>
            <div className="grid gap-10 rounded-3xl border border-line-light p-8 sm:p-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
              <div>
                <Eyebrow>Comunicação responsável</Eyebrow>
                <h2 id="comunicacao-responsavel" className="text-h3">{s.compliance.title}</h2>
              </div>
              <div className="space-y-4 leading-relaxed text-muted-light">
                {s.compliance.paragraphs.map((p, i) => <p key={i}><Rich text={p} /></p>)}
              </div>
            </div>
          </Container>
        </Section>
      ) : null}

      {/* Métricas */}
      <Section tone="graphite" labelledBy="indicadores">
        <Container>
          <SectionHeader id="indicadores" index="06" eyebrow="Indicadores" title="O que acompanhamos neste segmento" intro="Indicadores que conectam a mídia ao que acontece no atendimento e nas vendas." />
          <dl className="mt-12 grid gap-x-12 border-t border-line-dark md:grid-cols-2">
            {s.metrics.map((m) => (
              <div key={m.metric} className="reveal border-b border-line-dark py-6">
                <dt className="font-semibold">{m.metric}</dt>
                <dd className="mt-2 leading-relaxed text-white/70">{m.why}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      {/* FAQ + serviços */}
      <Section tone="light" labelledBy="faq">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-20">
            <div className="reveal">
              <Eyebrow>Perguntas frequentes</Eyebrow>
              <h2 id="faq" className="text-h2">Dúvidas de quem atua com {inSentence(s.navLabel)}</h2>
            </div>
            <div className="reveal"><FaqList faqs={s.faqs} /></div>
          </div>

          <div className="mt-20 border-t border-line-light pt-12">
            <h2 className="text-h3">Serviços mais usados neste segmento</h2>
            <ul className={cx("mt-6 grid gap-3 sm:grid-cols-2", svc.length > 3 ? "lg:grid-cols-4" : "lg:grid-cols-3")}>
              {svc.map((x) => (
                <li key={x.slug}>
                  <Link href={`/servicos/${x.slug}`} className="group flex h-full flex-col justify-between rounded-[var(--radius)] border border-line-light p-6 transition-colors hover:border-ink">
                    <span className="font-medium">{x.name}</span>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm text-muted-light group-hover:text-ink">Ver serviço <ArrowIcon className="transition-transform group-hover:translate-x-1" /></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <CtaSection location={`segment_${s.slug}_final`} title={s.cta.title} text={s.cta.text} defaultSegment={formSegment[s.slug]} />
    </>
  );
}
