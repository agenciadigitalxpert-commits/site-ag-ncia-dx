import Link from "next/link";
import { CTA_PRIMARY, CTA_SECONDARY, serviceNav } from "@/config/navigation";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { faqNode, graph, webPageNode } from "@/lib/schema";
import { segments } from "@/lib/content";
import { publishedCases } from "@/content/cases";
import type { FAQ } from "@/content/types";
import { JsonLd } from "@/components/JsonLd";
import { FaqList } from "@/components/Faq";
import { TrackedLink } from "@/components/TrackedLink";
import { CtaSection, LinkRows, SectionHeader } from "@/components/sections";
import { ArrowIcon, Container, DevNote, Eyebrow, IconItem, Section, btn } from "@/components/ui";
import { methodSteps } from "@/content/method";

const DESCRIPTION =
  "Agência de marketing digital em Balneário Camboriú (SC): tráfego pago no Google Ads e Meta Ads, criativos e estrutura comercial para gerar demanda e vender.";

export const metadata = pageMetadata({
  title: "Agência de marketing digital em Balneário Camboriú | Digital Xpert",
  absoluteTitle: true,
  description: DESCRIPTION,
  path: "/",
});

const pains = [
  { t: "Contatos sem perfil", d: "O anúncio gera mensagens, mas pouca gente com real intenção de compra." },
  { t: "Atendimento lento", d: "O lead chega quente e recebe resposta quando já falou com o concorrente." },
  { t: "Só indicação", d: "Sem um canal previsível, o faturamento oscila junto com as indicações." },
  { t: "Orçamentos parados", d: "Pedidos entram e param no “vou pensar” por falta de follow-up." },
  { t: "Campanha sem venda", d: "Relatórios de cliques, mas ninguém sabe qual campanha gerou faturamento." },
  { t: "Marketing longe do comercial", d: "Um lado comemora volume, o outro reclama da qualidade." },
];

const fronts = [
  { n: "01", t: "Atrair", d: "Mídia, criativos e páginas pensados para o cliente certo.", items: ["Google Ads e Meta Ads", "Criativos e roteiros", "Landing pages"] },
  { n: "02", t: "Qualificar", d: "Critérios claros e atendimento rápido, sem lead esfriando.", items: ["Pré-vendas e roteiros", "CRM e automação", "IA com supervisão"] },
  { n: "03", t: "Converter", d: "Acompanhamento até a venda e otimização pelo que fecha negócio.", items: ["Follow-up estruturado", "Indicadores até a venda", "Otimização contínua"] },
];

const segmentTagline: Record<string, string> = {
  "intermediacao-e-revendas": "Proprietários que querem vender e compradores prontos para visitar.",
  "oficinas-e-funilarias": "Orçamentos que viram serviço no box, sem lotar a agenda com o que não compensa.",
  "clinicas-de-estetica": "Procura por procedimentos transformada em avaliações agendadas.",
  dermatologistas: "Presença digital e procura por consultas com comunicação responsável.",
  "clinicas-odontologicas": "Avaliações agendadas, comparecimento e orçamentos acompanhados.",
  delivery: "Pedidos diretos no raio de entrega, nos horários que importam.",
};

const faqs: FAQ[] = [
  {
    q: "O que a Agência Digital Xpert faz?",
    a: "A DX ajuda empresas a gerar oportunidades de venda e a aproveitá-las melhor. Unimos tráfego pago no Google Ads e Meta Ads, criativos, landing pages, estruturação comercial, CRM e automação de atendimento em uma mesma estratégia, acompanhada do anúncio até a venda.",
  },
  {
    q: "A DX atende apenas empresas de Balneário Camboriú?",
    a: "Não. A DX tem base em Balneário Camboriú (SC) e atende empresas de diferentes regiões do Brasil. O trabalho é feito de forma remota, com reuniões online e acompanhamento contínuo.",
  },
  {
    q: "Vocês garantem resultados?",
    a: "Não prometemos resultados fixos, porque eles dependem de fatores como a oferta, o mercado, o investimento em mídia e a execução comercial da empresa. O que fazemos é estruturar a operação, medir cada etapa do funil e otimizar com base em dados reais, deixando claro o que está funcionando e o que precisa mudar.",
  },
  {
    q: "O investimento em anúncios está incluído nos honorários?",
    a: "Não. O investimento em mídia é pago diretamente às plataformas (Google, Meta) e é diferente dos honorários da agência. No diagnóstico, conversamos sobre os dois valores de forma separada e transparente.",
  },
  {
    q: "Preciso ter um time comercial para trabalhar com a DX?",
    a: "Não necessariamente, mas alguém precisa atender e conduzir as oportunidades. Em empresas menores, o próprio dono costuma fazer esse papel. Nós ajudamos a [organizar esse processo](/servicos/estruturacao-comercial) para que ele funcione com a estrutura que você tem hoje.",
  },
  {
    q: "Como funciona o diagnóstico?",
    a: "Você preenche um formulário curto e nossa equipe entra em contato para entender a operação: oferta, público, canais atuais, atendimento e metas. A partir disso, mostramos quais frentes fazem sentido priorizar. Veja a [metodologia completa](/metodologia).",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageNode({ path: "/", name: site.name, description: DESCRIPTION, about: undefined }),
          faqNode("/", faqs),
        )}
      />

      {/* HERO ----------------------------------------------------------
          Minimalista: gradiente de luz em uma única cor (a da marca),
          texto curto e centralizado, um CTA primary + um secundário. */}
      <section className="surface-dark relative isolate flex min-h-[calc(100svh-4.5rem)] items-center overflow-hidden">
        <div aria-hidden className="hero-art">
          <div className="hero-beams" />
          <div className="hero-glow" />
          <div className="hero-grain" />
        </div>
        <Container className="relative flex flex-col items-center pb-48 pt-14 text-center sm:py-28">
          <h1 className="flex flex-col items-center">
            <span className="hero-rise mb-8 inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-bg-fill-secondary px-4 py-2 text-sm font-medium leading-5 text-text-secondary backdrop-blur-sm">
              <span aria-hidden className="flow-node size-2 shrink-0 rounded-full bg-bg-fill-brand" />
              <span>
                Agência de marketing digital<span className="hidden sm:inline"> · {site.location.city}</span>
              </span>
            </span>
            <span className="hero-rise font-display text-hero block max-w-5xl" style={{ ["--d" as string]: "80ms" }}>
              Do clique à <em className="font-serif font-normal tracking-[-0.02em]">venda.</em>
            </span>
          </h1>
          <p className="hero-rise text-lead mx-auto mt-8 max-w-xl text-text-secondary" style={{ ["--d" as string]: "180ms" }}>
            Mais oportunidades de venda e um comercial preparado para aproveitar cada uma.
          </p>
          <div className="hero-rise mt-10 flex w-full flex-col-reverse justify-center gap-3 sm:w-auto sm:flex-row" style={{ ["--d" as string]: "260ms" }}>
            <TrackedLink href={CTA_SECONDARY.href} trackLabel={CTA_SECONDARY.label} trackLocation="home_hero" className={btn("secondary", "backdrop-blur-sm")}>
              {CTA_SECONDARY.label}
            </TrackedLink>
            <TrackedLink href={CTA_PRIMARY.href} trackLabel={CTA_PRIMARY.label} trackLocation="home_hero" className={btn("primary")}>
              {CTA_PRIMARY.label}
              <ArrowIcon className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </TrackedLink>
          </div>
          <p className="hero-rise mt-4 text-sm leading-5 text-text-secondary" style={{ ["--d" as string]: "320ms" }}>
            Formulário de 1 minuto · atendimento feito por pessoas
          </p>
        </Container>
        <a href="#dores-title" aria-label="Rolar para o conteúdo" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 sm:block">
          <span aria-hidden className="block h-10 w-6 rounded-full border border-border-secondary">
            <span className="scroll-cue mx-auto mt-2 block h-2 w-px bg-text-primary" />
          </span>
        </a>
      </section>

      {/* DORES --------------------------------------------------------- */}
      <Section tone="light" labelledBy="dores-title">
        <Container>
          <SectionHeader
            id="dores-title"
            index="01"
            eyebrow="O que trava o crescimento"
            title="Anúncio sem processo comercial vira custo."
          />
          <ol className="mt-14 grid gap-x-16 gap-y-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
            {pains.map((p, i) => (
              <li key={p.t} className="reveal" style={{ ["--reveal-delay" as string]: `${(i % 3) * 60}ms` }}>
                <span className="text-sm tabular-nums leading-5 text-text-secondary">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-h3 mt-3">{p.t}</h3>
                <p className="mt-2 text-text-secondary">{p.d}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* COMO ATUA ----------------------------------------------------- */}
      <Section tone="graphite" labelledBy="frentes-title">
        <Container>
          <SectionHeader
            id="frentes-title"
            index="02"
            eyebrow="Como a DX atua"
            title="Três frentes, uma operação só."
          />
          <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-3 lg:gap-16">
            {fronts.map((f, i) => (
              <article key={f.t} className="reveal" style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}>
                <p className="text-sm tabular-nums leading-5 text-text-secondary">{f.n}</p>
                <h3 className="font-display mt-4 text-[clamp(2rem,1.5rem+2vw,3rem)] font-semibold leading-[1.1] tracking-[-0.03em]">{f.t}</h3>
                <p className="mt-4 text-text-secondary">{f.d}</p>
                <ul className="mt-6 space-y-2">
                  {f.items.map((it) => (
                    <IconItem key={it} icon="dash">{it}</IconItem>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className="reveal mt-14 max-w-2xl text-sm leading-5 text-text-secondary">
            Resultados dependem também da oferta, do mercado, do investimento em mídia e da execução comercial. Nosso papel é estruturar, medir cada etapa e mostrar onde está o gargalo.
          </p>
        </Container>
      </Section>

      {/* SERVIÇOS ------------------------------------------------------ */}
      <Section tone="light" labelledBy="servicos-title">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeader
              id="servicos-title"
              index="03"
              eyebrow="Serviços"
              title="Do anúncio ao fechamento."
            />
            <Link href="/servicos" className={btn("secondary", "reveal self-start lg:self-auto")}>
              Ver todos os serviços
            </Link>
          </div>
          <div className="mt-14 lg:mt-20">
            <LinkRows items={serviceNav.map((s) => ({ href: s.href, title: s.label, text: s.description ?? "" }))} />
          </div>
        </Container>
      </Section>

      {/* SEGMENTOS ----------------------------------------------------- */}
      <Section tone="paper2" labelledBy="segmentos-title">
        <Container>
          <SectionHeader
            id="segmentos-title"
            index="04"
            eyebrow="Segmentos"
            title="Cada mercado vende de um jeito."
          />
          <ul className="mt-14 grid gap-x-16 gap-y-12 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
            {segments.map((s, i) => (
              <li key={s.slug} className="reveal" style={{ ["--reveal-delay" as string]: `${(i % 3) * 60}ms` }}>
                <Link href={`/segmentos/${s.slug}`} className="group block">
                  <h3 className="text-h3 underline-offset-4 group-hover:underline">{s.navLabel}</h3>
                  <p className="mt-2 text-text-secondary">{segmentTagline[s.slug]}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-[0.9375rem] font-medium leading-6">
                    Ver abordagem <ArrowIcon className="transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* METODOLOGIA --------------------------------------------------- */}
      <Section tone="dark" labelledBy="metodo-title">
        <Container>
          <SectionHeader
            id="metodo-title"
            index="05"
            eyebrow="Metodologia"
            title="Do diagnóstico à otimização."
          />
          <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-5 lg:gap-8">
            {methodSteps.map((s, i) => (
              <li key={s.title} className="reveal relative border-t border-border-secondary pt-6" style={{ ["--reveal-delay" as string]: `${i * 60}ms` }}>
                <span aria-hidden className="absolute -top-[5px] left-0 size-[9px] rounded-full bg-text-primary" />
                <span className="text-sm tabular-nums leading-5 text-text-secondary">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-h3 mt-3">{s.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-6 text-text-secondary">{s.short}</p>
              </li>
            ))}
          </ol>
          <div className="reveal mt-14">
            <TrackedLink href={CTA_SECONDARY.href} trackLabel={CTA_SECONDARY.label} trackLocation="home_method" className={btn("secondary")}>
              {CTA_SECONDARY.label}
              <ArrowIcon />
            </TrackedLink>
          </div>
        </Container>
      </Section>

      {/* CASES (somente com cases autorizados) -------------------------- */}
      {publishedCases.length ? (
        <Section tone="light" labelledBy="cases-title">
          <Container>
            <SectionHeader id="cases-title" index="06" eyebrow="Cases" title="Resultados com autorização e dados verificáveis." />
            <div className="mt-14">
              <LinkRows items={publishedCases.map((c) => ({ href: `/cases/${c.slug}`, title: c.title, text: c.summary }))} />
            </div>
          </Container>
        </Section>
      ) : (
        <Container><DevNote>a seção de cases só aparece quando houver um case com <code>published: true</code> em <code>src/content/cases.ts</code>.</DevNote></Container>
      )}

      {/* SOBRE --------------------------------------------------------- */}
      <Section tone="light" labelledBy="sobre-title">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <SectionHeader
              id="sobre-title"
              index={publishedCases.length ? "07" : "06"}
              eyebrow="Sobre a DX"
              title="Marketing, tecnologia e comercial na mesma mesa."
            />
            <div className="reveal space-y-5 text-lead text-text-secondary">
              <p>
                De Balneário Camboriú para empresas de todo o Brasil, com uma visão prática: campanha boa é a que gera venda — e venda depende de quem atende.
              </p>
              <Link href="/sobre" className="group inline-flex items-center gap-2 font-medium text-text-primary underline-offset-4 hover:underline">
                Conheça a DX <ArrowIcon />
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ ----------------------------------------------------------- */}
      <Section tone="paper2" labelledBy="faq-title">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-20">
            <div className="reveal">
              <Eyebrow>Perguntas frequentes</Eyebrow>
              <h2 id="faq-title" className="text-h2">Dúvidas comuns antes de começar.</h2>
            </div>
            <div className="reveal"><FaqList faqs={faqs} /></div>
          </div>
        </Container>
      </Section>

      <CtaSection location="home_final" />
    </>
  );
}
