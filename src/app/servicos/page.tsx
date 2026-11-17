import { pageMetadata } from "@/lib/seo";
import { breadcrumbNode, graph, ids, serviceNode, webPageNode } from "@/lib/schema";
import { services } from "@/lib/content";
import { JsonLd } from "@/components/JsonLd";
import { CtaSection, DataTable, LinkRows, PageHero, SectionHeader } from "@/components/sections";
import { Container, Section } from "@/components/ui";

const TITLE = "Serviços de marketing digital e estrutura comercial";
const DESC =
  "Tráfego pago, Google Ads, Meta Ads, criativos, landing pages, estruturação comercial e CRM com automação: conheça os serviços da Agência Digital Xpert.";
const crumbs = [
  { name: "Início", href: "/" },
  { name: "Serviços", href: "/servicos" },
];

export const metadata = pageMetadata({ title: TITLE, description: DESC, path: "/servicos" });

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageNode({ path: "/servicos", name: TITLE, description: DESC, type: "CollectionPage" }),
          breadcrumbNode("/servicos", crumbs),
          {
            "@type": "ItemList",
            "@id": `${ids.page("/servicos")}-list`,
            itemListElement: services.map((s, i) => ({ "@type": "ListItem", position: i + 1, item: { "@id": ids.service(s.slug) } })),
          },
          ...services.map((s) => serviceNode({ slug: s.slug, name: s.name, description: s.summary })),
        )}
      />
      <PageHero art="servicos"
        crumbs={crumbs}
        eyebrow="Serviços"
        title="Serviços para atrair clientes e acompanhar cada venda"
        lead="Se o desafio é receber pedidos de orçamento, olhamos a mídia e a página. Se os pedidos chegam e ficam parados, começamos pelo atendimento."
        ctaLocation="services_hero"
      />
      <Section tone="light" labelledBy="lista-servicos">
        <Container>
          <SectionHeader id="lista-servicos" eyebrow="Frentes de trabalho" title="O que cada serviço entrega" />
          <div className="mt-14">
            <LinkRows items={services.map((s) => ({ href: `/servicos/${s.slug}`, title: s.name, text: s.summary }))} />
          </div>
        </Container>
      </Section>
      <Section tone="paper2" labelledBy="qual-servico">
        <Container>
          <SectionHeader
            id="qual-servico"
            eyebrow="Como escolher"
            title="Qual serviço resolve o seu problema?"
            intro="Encontre a situação mais parecida com a da sua empresa."
          />
          <div className="mt-12">
            <DataTable
              caption="Pontos de partida para cada desafio comercial."
              columns={["Se o problema principal é…", "Comece por", "Por quê"]}
              rows={[
                ["Poucos contatos chegando", "Tráfego pago (Google Ads e/ou Meta Ads)", "Gera demanda nova ou captura quem já procura pelo que você vende."],
                ["Contatos chegam, mas sem perfil", "Criativos, landing pages e qualificação", "O anúncio explica a oferta e o formulário ajuda a identificar quem faz sentido atender."],
                ["Leads esfriam ou ficam sem resposta", "CRM, automação e IA", "Organiza o atendimento e reduz o tempo até o primeiro contato."],
                ["Orçamentos não fecham", "Estruturação comercial", "Cria etapas, roteiros e rotina de follow-up."],
                ["Ninguém sabe o que gera venda", "Tráfego pago + CRM", "Conecta a origem do lead ao resultado comercial."],
              ]}
            />
          </div>
        </Container>
      </Section>
      <CtaSection location="services_final" />
    </>
  );
}
