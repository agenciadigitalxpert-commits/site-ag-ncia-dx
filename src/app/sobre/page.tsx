import Link from "next/link";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbNode, graph, ids, webPageNode } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { CtaSection, PageHero, SectionHeader } from "@/components/sections";
import { Container, DevNote, Eyebrow, Section } from "@/components/ui";

const TITLE = "Sobre a Agência Digital Xpert (DX)";
const DESC =
  "Conheça a DX, agência de Balneário Camboriú (SC) que une tráfego pago, tecnologia e estrutura comercial para empresas de todo o Brasil venderem mais.";
const crumbs = [
  { name: "Início", href: "/" },
  { name: "Sobre", href: "/sobre" },
];

export const metadata = pageMetadata({ title: TITLE, absoluteTitle: true, description: DESC, path: "/sobre" });

const principles = [
  { t: "Venda como referência", d: "Clique, alcance e custo por lead são meios. O indicador que guia as decisões é a oportunidade que vira venda." },
  { t: "Transparência sobre o que depende de quem", d: "Deixamos claro o que está sob responsabilidade da DX e o que depende da oferta, do investimento e do atendimento da empresa." },
  { t: "Dados antes de opinião", d: "Mudanças em campanhas, páginas e processos partem do que os números e o retorno do comercial mostram." },
  { t: "Proximidade", d: "Acompanhamento de perto, conversa direta com quem decide e com quem atende. Sem relatório que ninguém lê." },
  { t: "Simplicidade operacional", d: "Processos e ferramentas do tamanho da sua operação. Uma rotina que o time consegue manter vale mais que uma estrutura sofisticada abandonada." },
  { t: "Comunicação responsável", d: "Nada de promessas que o comercial não consegue cumprir — e, em saúde, respeito às normas dos conselhos profissionais." },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={graph(webPageNode({ path: "/sobre", name: TITLE, description: DESC, type: "AboutPage", about: ids.org, mainEntity: ids.org }), breadcrumbNode("/sobre", crumbs))} />
      <PageHero
        crumbs={crumbs}
        eyebrow="Sobre a DX"
        title="Uma agência que entende que o trabalho não termina no clique."
        lead={`A Agência Digital Xpert — ou simplesmente DX — tem base em ${site.location.city} (${site.location.state}) e atende empresas de diferentes regiões do Brasil, conectando marketing, tecnologia e operação comercial.`}
        ctaLocation="about_hero"
      />

      <Section tone="light" labelledBy="quem-somos">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
            <div className="reveal">
              <Eyebrow index="01">Quem somos</Eyebrow>
              <h2 id="quem-somos" className="text-h2">O que é a Agência Digital Xpert?</h2>
            </div>
            <div className="reveal space-y-5 text-lead text-muted-light">
              <p className="text-ink">
                A Agência Digital Xpert (DX) é uma agência de marketing digital de Balneário Camboriú que ajuda empresas a gerar demanda, organizar o atendimento e transformar oportunidades em vendas.
              </p>
              <p>
                Trabalhamos com <Link className="underline underline-offset-2" href="/servicos/trafego-pago">tráfego pago</Link> no Google Ads e Meta Ads, criativos e roteiros para anúncios, landing pages, <Link className="underline underline-offset-2" href="/servicos/estruturacao-comercial">estruturação comercial</Link>, qualificação de leads, CRM, automações e inteligência artificial aplicada ao atendimento.
              </p>
              <p>
                A diferença está na conexão entre essas frentes. Uma campanha que gera contatos para um atendimento despreparado desperdiça dinheiro. Um time comercial bem treinado sem demanda fica ocioso. A DX trabalha os dois lados ao mesmo tempo.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="dark" labelledBy="nao-somos">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <SectionHeader id="nao-somos" index="02" eyebrow="O que nos diferencia" title="Não somos uma agência de posts nem de impulsionamento." />
            <div className="reveal space-y-6 text-lead text-white/75">
              <p>
                Postar com frequência e impulsionar publicações pode ter seu lugar, mas não é o centro do nosso trabalho. Nosso foco é a geração de oportunidades comerciais e o caminho que elas percorrem até a venda.
              </p>
              <p>
                Isso significa conversar sobre oferta, margem, capacidade de atendimento, tempo de resposta, critérios de qualificação e follow-up — assuntos que normalmente ficam fora da conversa com uma agência.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="light" labelledBy="principios">
        <Container>
          <SectionHeader id="principios" index="03" eyebrow="Como pensamos" title="Princípios que orientam o trabalho" />
          <ul className="mt-14 grid gap-x-12 border-t border-line-light md:grid-cols-2 lg:grid-cols-3">
            {principles.map((p) => (
              <li key={p.t} className="reveal border-b border-line-light py-8">
                <h3 className="text-h3">{p.t}</h3>
                <p className="mt-3 leading-relaxed text-muted-light">{p.d}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="paper2" labelledBy="onde">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
            <SectionHeader id="onde" index="04" eyebrow="Onde estamos" title="Base em Balneário Camboriú. Clientes em todo o Brasil." />
            <div className="reveal space-y-5 text-lead text-muted-light">
              <p>
                Nossa base fica em {site.location.city}, {site.location.stateName}. O atendimento é feito de forma remota, o que permite acompanhar empresas de diferentes cidades e estados com a mesma proximidade.
              </p>
              <p>
                Conhecemos de perto mercados como <Link className="underline underline-offset-2" href="/segmentos/intermediacao-e-revendas">intermediação de veículos</Link>, <Link className="underline underline-offset-2" href="/segmentos/oficinas-e-funilarias">oficinas e funilarias</Link>, <Link className="underline underline-offset-2" href="/segmentos/clinicas-de-estetica">clínicas</Link> e <Link className="underline underline-offset-2" href="/segmentos/delivery">delivery</Link>.
              </p>
            </div>
          </div>
          <DevNote>adicionar fotos reais da equipe e, se desejado, nomes e funções das pessoas responsáveis (autoria real ajuda na confiança e na compreensão por buscadores).</DevNote>
        </Container>
      </Section>

      <CtaSection location="about_final" />
    </>
  );
}
