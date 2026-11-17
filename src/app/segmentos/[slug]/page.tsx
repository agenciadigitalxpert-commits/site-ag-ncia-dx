import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbNode, faqNode, graph, ids, webPageNode } from "@/lib/schema";
import { getSegment, getService, segments } from "@/lib/content";
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
            <div className="reveal space-y-5 text-lead text-text-secondary">
              {s.context.paragraphs.map((p, i) => (
                <p key={i} className={i === 0 ? "text-text-primary" : undefined}><Rich text={p} /></p>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Desafios */}
      <Section tone="paper2" labelledBy="desafios">
        <Container>
          <SectionHeader id="desafios" index="02" eyebrow="Desafios comuns" title="Onde as oportunidades costumam se perder" />
          <ol className="mt-12 grid gap-x-16 gap-y-10 md:grid-cols-2">
            {s.challenges.map((c, i) => (
              <li key={c.title} className="reveal flex gap-4">
                <span className="pt-1 text-sm tabular-nums leading-5 text-text-secondary">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-h3">{c.title}</h3>
                  <p className="mt-2 text-text-secondary"><Rich text={c.text} /></p>
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
          <div className="mt-14 grid gap-12 lg:grid-cols-3 lg:gap-16">
            {stages.map((stage, i) => (
              <div key={stage} className="reveal border-t border-border-secondary pt-6" style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}>
                <p className="font-display text-2xl font-semibold leading-8 tracking-[-0.02em]">{stage}</p>
                <ul className="mt-6 space-y-6">
                  {s.approach.filter((a) => a.stage === stage).map((a) => (
                    <li key={a.title}>
                      <h3 className="text-lg font-semibold leading-7">{a.title}</h3>
                      <p className="mt-1 text-text-secondary"><Rich text={a.text} /></p>
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
          <div className="mt-12 grid gap-12 lg:grid-cols-3 lg:gap-16">
            {s.examples.map((e) => (
              <article key={e.title} className="reveal">
                <ExampleBadge />
                <h3 className="text-h3 mt-4">{e.title}</h3>
                <p className="mt-2 text-text-secondary"><Rich text={e.text} /></p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* Objeções */}
      <Section tone="paper2" labelledBy="objecoes">
        <Container>
          <SectionHeader id="objecoes" index="05" eyebrow="Objeções" title="O que costumamos ouvir — e o que respondemos" />
          <dl className="mt-12 grid gap-x-16 gap-y-10 md:grid-cols-2">
            {s.objections.map((o) => (
              <div key={o.q} className="reveal">
                <dt className="font-display text-xl font-medium leading-7">“{o.q}”</dt>
                <dd className="mt-2 text-text-secondary"><Rich text={o.a} /></dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      {s.compliance ? (
        <Section tone="light" labelledBy="comunicacao-responsavel">
          <Container>
            <div className="grid gap-8 rounded-lg bg-bg-surface-recessed p-8 sm:p-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
              <div>
                <Eyebrow>Comunicação responsável</Eyebrow>
                <h2 id="comunicacao-responsavel" className="text-h3">{s.compliance.title}</h2>
              </div>
              <div className="space-y-4 text-text-secondary">
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
          <dl className="mt-12 grid gap-x-16 gap-y-8 md:grid-cols-2">
            {s.metrics.map((m) => (
              <div key={m.metric} className="reveal">
                <dt className="text-lg font-semibold leading-7">{m.metric}</dt>
                <dd className="mt-1 text-text-secondary">{m.why}</dd>
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

          <div className="mt-20">
            <h2 className="text-h3">Serviços mais usados neste segmento</h2>
            <ul className={cx("mt-6 grid gap-3 sm:grid-cols-2", svc.length > 3 ? "lg:grid-cols-4" : "lg:grid-cols-3")}>
              {svc.map((x) => (
                <li key={x.slug}>
                  <Link href={`/servicos/${x.slug}`} className="group flex h-full flex-col justify-between rounded-md bg-bg-fill-secondary p-6 transition-colors duration-150 hover:bg-bg-fill-secondary-hover">
                    <span className="font-medium">{x.name}</span>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm leading-5 text-text-secondary group-hover:text-text-primary">Ver serviço <ArrowIcon className="transition-transform duration-200 group-hover:translate-x-1" /></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <CtaSection location={`segment_${s.slug}_final`} title={s.cta.title} text={s.cta.text} />
    </>
  );
}
