import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbNode, graph, webPageNode } from "@/lib/schema";
import { publishedCases, visibleCases } from "@/content/cases";
import { JsonLd } from "@/components/JsonLd";
import { CtaSection, LinkRows, PageHero } from "@/components/sections";
import { Container, DevNote, Section } from "@/components/ui";

const TITLE = "Cases";
const DESC = "Cases da Agência Digital Xpert publicados com autorização dos clientes e resultados verificáveis, com período e fonte dos dados.";
const crumbs = [
  { name: "Início", href: "/" },
  { name: "Cases", href: "/cases" },
];

// Sem cases publicados, a página fica fora do índice e do sitemap.
export const metadata = pageMetadata({ title: TITLE, description: DESC, path: "/cases", noindex: publishedCases.length === 0 });

export default function CasesPage() {
  return (
    <>
      <JsonLd data={graph(webPageNode({ path: "/cases", name: TITLE, description: DESC, type: "CollectionPage" }), breadcrumbNode("/cases", crumbs))} />
      <PageHero
        crumbs={crumbs}
        eyebrow="Cases"
        title="Resultados contados com autorização e dados verificáveis."
        lead="Publicamos cases apenas quando o cliente autoriza e quando os números podem ser verificados, com período e fonte. Preferimos poucos cases sólidos a vitrines infladas."
        ctaLocation="cases_hero"
      />
      <Section tone="light">
        <Container>
          {visibleCases.length ? (
            <LinkRows items={visibleCases.map((c) => ({ href: `/cases/${c.slug}`, title: c.title, text: c.summary }))} />
          ) : (
            <div className="max-w-2xl">
              <h2 className="text-h3">Cases em preparação</h2>
              <p className="mt-4 leading-relaxed text-muted-light">
                Estamos organizando os primeiros cases autorizados. Enquanto isso, você pode entender <Link href="/metodologia" className="underline underline-offset-2">como trabalhamos</Link> ou conhecer nossa abordagem para o <Link href="/segmentos" className="underline underline-offset-2">seu segmento</Link>.
              </p>
            </div>
          )}
          <DevNote>entradas com <code>published: false</code> em src/content/cases.ts aparecem aqui só no ambiente de edição.</DevNote>
        </Container>
      </Section>
      <CtaSection location="cases_final" />
    </>
  );
}
