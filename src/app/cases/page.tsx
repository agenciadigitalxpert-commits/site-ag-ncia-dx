import { CTA_PRIMARY } from "@/config/navigation";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbNode, graph, webPageNode } from "@/lib/schema";
import { visibleCases } from "@/content/cases";
import { JsonLd } from "@/components/JsonLd";
import { CtaSection, LinkRows, PageHero, SectionHeader } from "@/components/sections";
import { TestimonialCards } from "@/components/TestimonialCards";
import { ArrowIcon, Container, Section, btn } from "@/components/ui";

const TITLE = "Cases e depoimentos de clientes";
const DESC = "Assista aos depoimentos de clientes da Agência Digital Xpert e conheça, pelas palavras de quem participou, os resultados de cada operação.";
const crumbs = [
  { name: "Início", href: "/" },
  { name: "Cases", href: "/cases" },
];

export const metadata = pageMetadata({ title: TITLE, description: DESC, path: "/cases" });

export default function CasesPage() {
  return (
    <>
      <JsonLd data={graph(webPageNode({ path: "/cases", name: TITLE, description: DESC, type: "CollectionPage" }), breadcrumbNode("/cases", crumbs))} />
      <PageHero
        art="cases"
        crumbs={crumbs}
        eyebrow="Cases"
        title="A experiência de quem trabalha com a DX."
        lead="Ouça os clientes contarem como as campanhas e o atendimento influenciaram as vendas em cada unidade."
        primary={{ href: "#depoimentos", label: "Ver depoimentos" }}
        secondary={CTA_PRIMARY}
        ctaLocation="cases_hero"
      />
      <Section tone="light" id="depoimentos" labelledBy="relatos-title">
        <Container>
          <h2 id="relatos-title" className="text-h2 mb-8">Depoimentos de clientes</h2>
          <TestimonialCards />
          <div className="mt-10 flex flex-wrap gap-3">
            <a href={site.social.youtube} className={btn("secondary")} target="_blank" rel="noopener noreferrer">
              Canal da DX no YouTube <ArrowIcon className="-rotate-45" />
            </a>
            <a href={site.social.instagram} className={btn("ghost")} target="_blank" rel="noopener noreferrer">
              Instagram da DX <ArrowIcon className="-rotate-45" />
            </a>
          </div>
        </Container>
      </Section>
      {visibleCases.length > 0 ? (
        <Section tone="paper2" labelledBy="estudos-title">
          <Container>
            <SectionHeader id="estudos-title" title="Estudos de caso" />
            <div className="mt-8">
              <LinkRows items={visibleCases.map((c) => ({ href: `/cases/${c.slug}`, title: c.title, text: c.summary }))} />
            </div>
          </Container>
        </Section>
      ) : null}
      <CtaSection location="cases_final" />
    </>
  );
}
