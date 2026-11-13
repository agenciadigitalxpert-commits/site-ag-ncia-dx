import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbNode, graph, webPageNode } from "@/lib/schema";
import { segments } from "@/lib/content";
import { JsonLd } from "@/components/JsonLd";
import { CtaSection, PageHero, SectionHeader } from "@/components/sections";
import { ArrowIcon, Container, Section } from "@/components/ui";

const TITLE = "Marketing e vendas por segmento";
const DESC =
  "Estratégias de tráfego pago e estrutura comercial para revendas de veículos, oficinas, clínicas de estética, dermatologistas, clínicas odontológicas e delivery.";
const crumbs = [
  { name: "Início", href: "/" },
  { name: "Segmentos", href: "/segmentos" },
];

export const metadata = pageMetadata({ title: TITLE, description: DESC, path: "/segmentos" });

export default function SegmentsPage() {
  return (
    <>
      <JsonLd data={graph(webPageNode({ path: "/segmentos", name: TITLE, description: DESC, type: "CollectionPage" }), breadcrumbNode("/segmentos", crumbs))} />
      <PageHero
        crumbs={crumbs}
        eyebrow="Segmentos"
        title="Estratégias que partem de como o seu cliente decide comprar."
        lead="Uma oficina recebe pedido de orçamento com foto do para-choque. Uma clínica precisa que o paciente compareça à avaliação. Um delivery disputa o horário do jantar. Cada operação pede uma abordagem diferente."
        ctaLocation="segments_hero"
      />
      <Section tone="light" labelledBy="lista-segmentos">
        <Container>
          <SectionHeader id="lista-segmentos" eyebrow="Onde atuamos" title="Segmentos prioritários" intro="Não atendemos apenas esses mercados, mas são os que conhecemos de perto — e onde a conexão entre mídia e atendimento faz mais diferença." />
          <ul className="mt-14 border-t border-line-light">
            {segments.map((s, i) => (
              <li key={s.slug} className="reveal border-b border-line-light">
                <Link href={`/segmentos/${s.slug}`} className="group grid gap-4 py-8 sm:grid-cols-[3rem_minmax(0,5fr)_minmax(0,6fr)_auto] sm:items-start sm:gap-8 sm:py-10">
                  <span className="text-sm tabular-nums text-muted-light">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-display text-h3">{s.name}</span>
                  <span className="leading-relaxed text-muted-light">{s.summary}</span>
                  <span className="hidden size-11 place-items-center rounded-full border border-line-light transition-colors group-hover:border-transparent group-hover:bg-accent sm:grid">
                    <ArrowIcon />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="reveal mt-10 max-w-2xl text-muted-light">
            Seu segmento não está na lista? A lógica de atrair, qualificar e converter vale para a maioria dos negócios que vendem por atendimento. <Link href="/contato" className="underline underline-offset-2">Fale com a gente</Link>.
          </p>
        </Container>
      </Section>
      <CtaSection location="segments_final" />
    </>
  );
}
