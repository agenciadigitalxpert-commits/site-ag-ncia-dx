import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbNode, graph, webPageNode } from "@/lib/schema";
import { answers } from "@/lib/content";
import { stripRich } from "@/lib/rich";
import { JsonLd } from "@/components/JsonLd";
import { CtaSection, PageHero, SectionHeader } from "@/components/sections";
import { ArrowIcon, Container, Section } from "@/components/ui";

const TITLE = "Perguntas frequentes sobre tráfego pago e marketing";
const DESC =
  "Respostas diretas sobre tráfego pago, Google Ads, custo de agência, lead qualificado, CPL e conversões offline, escritas pela equipe da Agência Digital Xpert.";
const crumbs = [
  { name: "Início", href: "/" },
  { name: "Perguntas frequentes", href: "/respostas" },
];

export const metadata = pageMetadata({ title: TITLE, description: DESC, path: "/respostas" });

export default function AnswersHub() {
  return (
    <>
      <JsonLd data={graph(webPageNode({ path: "/respostas", name: TITLE, description: DESC, type: "CollectionPage" }), breadcrumbNode("/respostas", crumbs))} />
      <PageHero
        art="respostas"
        crumbs={crumbs}
        eyebrow="Perguntas frequentes"
        title="Respostas diretas para quem vai investir em marketing"
        lead="Quanto custa, quanto investir, quanto tempo leva e como medir. Respostas curtas, sem enrolação, e o aprofundamento logo abaixo."
        ctaLocation="answers_hero"
      />
      <Section tone="light" labelledBy="lista-respostas">
        <Container>
          <SectionHeader id="lista-respostas" eyebrow="Perguntas" title="O que os empresários mais perguntam" />
          <ul className="mt-12 grid gap-4 md:grid-cols-2">
            {answers.map((a) => (
              <li key={a.slug} className="reveal">
                <Link href={`/respostas/${a.slug}`} className="pressable group flex h-full flex-col rounded-[24px] border border-border-tertiary bg-bg-surface p-6 transition-colors hover:border-border-secondary">
                  <h2 className="text-h3">{a.question}</h2>
                  <p className="mb-5 mt-3 line-clamp-3 text-[0.9375rem] leading-6 text-text-secondary">{stripRich(a.shortAnswer)}</p>
                  <span className="mt-auto inline-flex items-center gap-2 text-[0.9375rem] font-medium">
                    Ler a resposta <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
      <CtaSection location="answers_final" />
    </>
  );
}
