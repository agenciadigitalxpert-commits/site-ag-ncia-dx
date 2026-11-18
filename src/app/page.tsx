import Link from "next/link";
import { CTA_PRIMARY, CTA_SECONDARY, serviceNav } from "@/config/navigation";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { faqNode, graph, webPageNode } from "@/lib/schema";
import { segments } from "@/lib/content";
import { TestimonialCards } from "@/components/TestimonialCards";
import type { FAQ } from "@/content/types";
import { JsonLd } from "@/components/JsonLd";
import { FaqList } from "@/components/Faq";
import { TrackedLink } from "@/components/TrackedLink";
import { CtaSection, LinkRows, SectionHeader } from "@/components/sections";
import { ArrowIcon, Container, Eyebrow, Section, btn } from "@/components/ui";
import { methodSteps } from "@/content/method";

const HERO_SECONDARY_LABEL = "Conheça nossa estratégia";

const DESCRIPTION =
  "A DX une anúncios no Google e na Meta, páginas de campanha e atendimento comercial. De Balneário Camboriú para empresas de todo o Brasil.";

export const metadata = pageMetadata({
  title: "Agência de marketing digital em Balneário Camboriú | Digital Xpert",
  absoluteTitle: true,
  description: DESCRIPTION,
  path: "/",
});

const fronts = [
  {
    title: "Atrair",
    description: "Levamos sua oferta a quem já procura por ela no Google e a quem pode conhecê-la pelo Instagram ou Facebook.",
    href: "/servicos/trafego-pago",
    link: "Tráfego pago",
  },
  {
    title: "Converter",
    description: "Criamos páginas que respondem às dúvidas de quem veio do anúncio e facilitam o pedido de orçamento ou o agendamento.",
    href: "/servicos/landing-pages",
    link: "Páginas de campanha",
  },
  {
    title: "Organizar o atendimento",
    description: "Definimos com a sua equipe quem responde, quando retomar a conversa e como registrar no CRM o que virou venda.",
    href: "/servicos/estruturacao-comercial",
    link: "Estrutura comercial",
  },
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
    a: "Você solicita uma conversa e nossa equipe pergunta o que vende, como os clientes chegam e quem atende cada contato. A partir daí, definimos juntos o que vale ajustar primeiro. Veja a [metodologia completa](/metodologia).",
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

      <section className="surface-dark relative isolate flex min-h-[calc(100svh-4.5rem)] items-center overflow-hidden">
        <div aria-hidden className="hero-art">
          <div className="hero-beams" />
          <div className="hero-parallax">
            <div className="hero-glow" />
          </div>
          <div className="hero-grain" />
        </div>
        <Container className="hero-scroll relative flex flex-col items-center pb-48 pt-14 text-center sm:py-28">
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
            <TrackedLink href={CTA_SECONDARY.href} trackLabel={HERO_SECONDARY_LABEL} trackLocation="home_hero" className={btn("secondary", "backdrop-blur-sm")}>
              {HERO_SECONDARY_LABEL}
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
        <a href="#como-funciona" aria-label="Rolar para o conteúdo" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 sm:block">
          <span aria-hidden className="block h-10 w-6 rounded-full border border-border-secondary">
            <span className="scroll-cue mx-auto mt-2 block h-2 w-px bg-text-primary" />
          </span>
        </a>
      </section>

      <Section tone="light" id="como-funciona" labelledBy="frentes-title">
        <Container>
          <SectionHeader id="frentes-title" eyebrow="Como funciona" title="O que acontece entre o anúncio e a venda?" />
          <ol className="mt-10 grid gap-8 sm:mt-14 md:grid-cols-3 md:gap-10">
            {fronts.map((front) => (
              <li key={front.title} className="flex flex-col items-start border-t border-border-secondary pt-5">
                <h3 className="text-h3">{front.title}</h3>
                <p className="mb-4 mt-3 max-w-md text-text-secondary">{front.description}</p>
                <Link className="group mt-auto inline-flex min-h-11 items-center gap-2 font-medium underline-offset-4 hover:underline" href={front.href}>
                  {front.link} <ArrowIcon />
                </Link>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section tone="graphite" labelledBy="cases-title">
        <Container>
          <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
            <SectionHeader id="cases-title" eyebrow="Depoimentos" title="Quem trabalha com a DX conta." />
            <Link href="/cases" className={btn("secondary")}>Ver cases <ArrowIcon /></Link>
          </div>
          <TestimonialCards />
        </Container>
      </Section>

      {/* FAIXA (decorativa) ------------------------------------------- */}
      <div aria-hidden className="marquee-wrap surface-dark overflow-hidden border-y border-border-tertiary py-6 sm:py-8">
        <div className="marquee">
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0 items-center">
              {["Google Ads", "Meta Ads", "Criativos", "Landing pages", "Estruturação comercial", "CRM", "Automação", "IA no atendimento"].map((t, i) => (
                <span key={t} className="flex items-center font-display text-[clamp(2rem,1.2rem+3vw,4rem)] font-semibold leading-none tracking-[-0.03em]">
                  <span className={i % 2 ? "text-text-secondary" : "text-text-primary"}>{t}</span>
                  <span className="mx-8 text-[0.5em] text-text-secondary sm:mx-12">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* SERVIÇOS ------------------------------------------------------ */}
      <Section tone="light" labelledBy="servicos-title">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeader
              id="servicos-title"
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

      {/* SOBRE ---------------------------------------------------------- */}
      <Section tone="light" labelledBy="sobre-title">
        <Container>
          <Eyebrow>Sobre a DX</Eyebrow>
          <h2 id="sobre-title" className="text-h2 max-w-3xl">
            De {site.location.city}, trabalhamos com quem vende em todo o Brasil.
          </h2>
          <p className="text-lead mt-5 max-w-2xl text-text-secondary">
            Acompanhamos as campanhas ao lado de quem atende os clientes. O que a equipe aprende nas conversas orienta os próximos anúncios.
          </p>
          <Link href="/sobre" className={btn("secondary", "mt-12")}>
            Conheça a DX e os fundadores <ArrowIcon className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
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
