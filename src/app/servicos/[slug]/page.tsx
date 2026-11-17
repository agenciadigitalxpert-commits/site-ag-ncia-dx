import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbNode, faqNode, graph, ids, serviceNode, webPageNode } from "@/lib/schema";
import { getSegment, getService, services } from "@/lib/content";
import { JsonLd } from "@/components/JsonLd";
import { FaqList } from "@/components/Faq";
import { Rich } from "@/components/RichText";
import { inSentence } from "@/lib/rich";
import { CtaInline, CtaSection, DataTable, PageHero, SectionHeader } from "@/components/sections";
import { ArrowIcon, Container, Eyebrow, IconItem, Section } from "@/components/ui";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/servicos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return pageMetadata({ title: s.metaTitle, description: s.metaDescription, path: `/servicos/${s.slug}` });
}

export default async function ServicePage({ params }: PageProps<"/servicos/[slug]">) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const path = `/servicos/${s.slug}`;
  const crumbs = [
    { name: "Início", href: "/" },
    { name: "Serviços", href: "/servicos" },
    { name: s.navLabel, href: path },
  ];
  const related = s.related.map(getService).filter(Boolean) as NonNullable<ReturnType<typeof getService>>[];
  const segs = s.segments.map(getSegment).filter(Boolean) as NonNullable<ReturnType<typeof getSegment>>[];

  return (
    <>
      <JsonLd
        data={graph(
          webPageNode({ path, name: s.metaTitle, description: s.metaDescription, about: ids.service(s.slug), mainEntity: ids.service(s.slug) }),
          breadcrumbNode(path, crumbs),
          serviceNode({ slug: s.slug, name: s.name, description: s.summary, audience: segs.map((g) => g.name) }),
          faqNode(path, s.faqs),
        )}
      />
      <PageHero art={s.slug} crumbs={crumbs} eyebrow={s.eyebrow} title={s.h1} lead={s.lead} ctaLocation={`service_${s.slug}_hero`} />

      {/* O que é */}
      <Section tone="light" labelledBy="o-que-e">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
            <div className="reveal">
              <Eyebrow index="01">Definição</Eyebrow>
              <h2 id="o-que-e" className="text-h2">{s.definition.question}</h2>
            </div>
            <div className="reveal space-y-5">
              <p className="text-lead font-medium"><Rich text={s.definition.answer} /></p>
              {s.definition.paragraphs.slice(0, 1).map((p, i) => (
                <p key={i} className="text-text-secondary"><Rich text={p} /></p>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Para quem */}
      <Section tone="paper2" labelledBy="para-quem">
        <Container>
          <SectionHeader id="para-quem" index="02" eyebrow="Para quem faz sentido" title={`Quando ${inSentence(s.navLabel)} é o próximo passo certo`} intro={<Rich text={s.forWhom.intro} />} />
          <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-20">
            <ul className="reveal grid gap-x-10 gap-y-4 sm:grid-cols-2">
              {s.forWhom.items.map((it) => (
                <IconItem key={it}>{it}</IconItem>
              ))}
            </ul>
            {s.forWhom.notFor?.length ? (
              <aside className="reveal">
                <h3 className="text-lg font-semibold leading-7">Talvez ainda não seja o momento se…</h3>
                <ul className="mt-4 space-y-3 text-text-secondary">
                  {s.forWhom.notFor.map((it) => (
                    <IconItem key={it} icon="dash">{it}</IconItem>
                  ))}
                </ul>
              </aside>
            ) : null}
          </div>
        </Container>
      </Section>

      {/* Problemas */}
      <Section tone="dark" labelledBy="problemas">
        <Container>
          <SectionHeader id="problemas" index="03" eyebrow="Problemas que ajuda a resolver" title="O que costuma estar travando" />
          <ul className="mt-14 grid gap-x-16 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {s.problems.slice(0, 3).map((p, i) => (
              <li key={p.title} className="reveal" style={{ ["--reveal-delay" as string]: `${(i % 3) * 60}ms` }}>
                <h3 className="text-h3">{p.title}</h3>
                <p className="mt-2 text-text-secondary"><Rich text={p.text} /></p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Entregas */}
      <Section tone="light" labelledBy="entregas">
        <Container>
          <SectionHeader id="entregas" index="04" eyebrow="O que pode fazer parte" title="Possíveis frentes de entrega" intro={<Rich text={s.deliverables.intro} />} />
          <div className="reveal mt-12 max-w-3xl">
            <FaqList faqs={s.deliverables.items.map((d) => ({ q: d.title, a: d.text }))} />
          </div>
          <p className="reveal mt-10 text-sm leading-5 text-text-secondary">{s.deliverables.note}</p>
          <div className="mt-14">
            <CtaInline
              title="Quer saber quais dessas frentes fazem sentido para você?"
              text="No diagnóstico, olhamos a operação inteira antes de recomendar o escopo."
              location={`service_${s.slug}_inline`}
            />
          </div>
        </Container>
      </Section>

      {/* Processo */}
      <Section tone="paper2" labelledBy="como-funciona">
        <Container>
          <SectionHeader id="como-funciona" index="05" eyebrow="Como funciona" title="Como o trabalho acontece" />
          <ol className="mt-12 grid gap-x-16 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {s.process.map((p, i) => (
              <li key={p.title} className="reveal relative border-t border-border-secondary pt-6" style={{ ["--reveal-delay" as string]: `${(i % 3) * 60}ms` }}>
                <span className="text-sm tabular-nums leading-5 text-text-secondary">Etapa {String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-h3 mt-3">{p.title}</h3>
                <p className="mt-2 text-text-secondary"><Rich text={p.text} /></p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Papéis */}
      <Section tone="light" labelledBy="papeis">
        <Container>
          <SectionHeader id="papeis" index="06" eyebrow="Responsabilidades" title="O papel da DX e o papel da sua empresa" intro="Resultado comercial é construído a quatro mãos. Deixar claro quem faz o quê evita ruído e acelera as decisões." />
          <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-6">
            <div className="surface-dark reveal rounded-lg p-8">
              <h3 className="text-h3">O que a DX faz</h3>
              <ul className="mt-6 space-y-3">
                {s.roles.dx.map((r) => <IconItem key={r}>{r}</IconItem>)}
              </ul>
            </div>
            <div className="reveal p-0 md:p-8">
              <h3 className="text-h3">O que fica com a sua empresa</h3>
              <ul className="mt-6 space-y-3">
                {s.roles.client.map((r) => <IconItem key={r}>{r}</IconItem>)}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* Mensuração */}
      <Section tone="graphite" labelledBy="resultados">
        <Container>
          <SectionHeader id="resultados" index="07" eyebrow="Acompanhamento" title="Como acompanhar os resultados" intro={<Rich text={s.measurement.intro} />} />
          <dl className="mt-12 grid gap-x-16 gap-y-8 md:grid-cols-2">
            {s.measurement.items.slice(0, 4).map((m) => (
              <div key={m.metric} className="reveal">
                <dt className="text-lg font-semibold leading-7">{m.metric}</dt>
                <dd className="mt-1 text-text-secondary">{m.why}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      {s.comparison ? (
        <Section tone="light" labelledBy="comparativo">
          <Container>
            <SectionHeader id="comparativo" eyebrow="Comparativo" title={s.comparison.caption} />
            <div className="mt-10">
              <DataTable caption={s.comparison.caption} columns={s.comparison.columns} rows={s.comparison.rows} />
            </div>
          </Container>
        </Section>
      ) : null}

      {/* FAQ */}
      <Section tone="paper2" labelledBy="faq">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-20">
            <div className="reveal">
              <Eyebrow>Perguntas frequentes</Eyebrow>
              <h2 id="faq" className="text-h2">Dúvidas sobre {inSentence(s.navLabel)}</h2>
            </div>
            <div className="reveal"><FaqList faqs={s.faqs} /></div>
          </div>
        </Container>
      </Section>

      {/* Relacionados */}
      <Section tone="light" labelledBy="relacionados" className="py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 id="relacionados" className="text-h3">Serviços relacionados</h2>
              <ul className="mt-6 space-y-6">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link href={`/servicos/${r.slug}`} className="group flex items-start justify-between gap-6">
                      <span>
                        <span className="block font-medium underline-offset-4 group-hover:underline">{r.name}</span>
                        <span className="block text-sm leading-5 text-text-secondary">{r.summary}</span>
                      </span>
                      <ArrowIcon className="transition-transform group-hover:translate-x-1" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {segs.length ? (
              <div>
                <h2 className="text-h3">Segmentos onde aplicamos</h2>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {segs.map((g) => (
                    <li key={g.slug}>
                      <Link href={`/segmentos/${g.slug}`} className="inline-flex min-h-11 items-center rounded-full bg-bg-fill-secondary px-4 transition-colors duration-150 hover:bg-bg-fill-secondary-hover">
                        {g.navLabel}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </Container>
      </Section>

      <CtaSection location={`service_${s.slug}_final`} title={s.cta.title} text={s.cta.text} />
    </>
  );
}
