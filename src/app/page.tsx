import Image from "next/image";
import Link from "next/link";
import { CTA_PRIMARY, CTA_SECONDARY, serviceNav } from "@/config/navigation";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { faqNode, graph, webPageNode } from "@/lib/schema";
import { segments } from "@/lib/content";
import { TestimonialCards } from "@/components/TestimonialCards";
import { HeroArrow } from "@/components/HeroArrow";
import { heroImages } from "@/config/illustrations";
import type { FAQ } from "@/content/types";
import { JsonLd } from "@/components/JsonLd";
import { FaqList } from "@/components/Faq";
import { TrackedLink } from "@/components/TrackedLink";
import { CtaSection, SectionHeader } from "@/components/sections";
import { ArrowIcon, Container, Eyebrow, Section, btn } from "@/components/ui";
import { methodSteps } from "@/content/method";

const DESCRIPTION =
  "Agência de marketing digital para empresas de diversos segmentos: tráfego pago no Google Ads e Meta Ads, páginas que convertem e atendimento organizado. De Balneário Camboriú para todo o Brasil.";

export const metadata = pageMetadata({
  title: "Agência de tráfego pago em Balneário Camboriú | Digital Xpert",
  absoluteTitle: true,
  description: DESCRIPTION,
  path: "/",
});

/** Cards de serviço: texto de venda curto (estilo direto), ilustração própria de cada página. */
const serviceCopy: Record<string, string> = {
  "/servicos/trafego-pago": "Campanhas pagas focadas em contatos e vendas, com o investimento nos canais que mais trazem retorno.",
  "/servicos/google-ads": "Anúncios na pesquisa do Google para aparecer na hora em que o cliente procura o que você vende.",
  "/servicos/meta-ads": "Anúncios no Instagram e no Facebook para gerar contatos, conversas no WhatsApp e vendas.",
  "/servicos/criativos-e-roteiros": "Roteiros, vídeos e peças que prendem a atenção e explicam sua oferta em poucos segundos.",
  "/servicos/landing-pages": "Páginas de alta conversão, rápidas e objetivas, feitas para transformar clique em contato.",
  "/servicos/estruturacao-comercial": "Processo, roteiros e rotina para sua equipe atender bem e conduzir cada contato até o fechamento.",
  "/servicos/crm-automacao-ia": "CRM, automações e IA no atendimento para registrar, qualificar e retomar cada contato.",
};

/** Etapas da home em versão curta (a página /metodologia tem o detalhamento). */
const stepCopy: Record<string, string> = {
  diagnostico: "Analisamos seu negócio, mercado, concorrentes, canais atuais e como os contatos são atendidos hoje.",
  planejamento: "Plano sob medida com canais, investimento, metas por etapa e a forma de medir cada uma.",
  implementacao: "Campanhas, criativos, páginas e mensuração no ar, conectados ao seu atendimento.",
  acompanhamento: "Cruzamos os dados dos anúncios com o que vira conversa, orçamento e venda.",
  otimizacao: "Ajustes contínuos em campanhas, mensagens e páginas para escalar o que dá resultado.",
};

/** Diferencial da DX: atendimento próximo, humano e ágil (sem prometer prazos em minutos). */
const diferenciais = [
  {
    title: "Gente de verdade",
    text: "Você fala com pessoas da equipe, que conhecem a sua empresa pelo nome, não com robô ou central de chamados.",
    icon: (
      <>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5" />
      </>
    ),
  },
  {
    title: "Resposta rápida",
    text: "Dúvidas, ajustes e novas ideias não ficam parados em fila. A gente responde e age com agilidade.",
    icon: <path d="M13 3 5 13.5h6L10 21l8-10.5h-6L13 3Z" />,
  },
  {
    title: "Conversa clara",
    text: "Números e próximos passos explicados em linguagem simples, sem jargão e sem relatório que ninguém entende.",
    icon: <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v9a1.5 1.5 0 0 1-1.5 1.5H10l-4.5 4v-4h0A1.5 1.5 0 0 1 4 14.5v-9Z" />,
  },
  {
    title: "Perto da operação",
    text: "Acompanhamos o que acontece no seu atendimento para ajustar campanhas com base no que vira venda.",
    icon: (
      <>
        <path d="M4 19h16" />
        <path d="M7 15l3.5-4 3 2.5L18 8" />
        <path d="M14.5 8H18v3.5" />
      </>
    ),
  },
];

const faqs: FAQ[] = [
  {
    q: "O que é tráfego pago?",
    a: "Tráfego pago é atrair visitantes e contatos com anúncios pagos em plataformas como Google, Instagram e Facebook. Diferente do alcance orgânico, você escolhe quem vê o anúncio e começa a receber visitas assim que a campanha entra no ar. Na DX, o objetivo não é só o clique: é o contato qualificado que vira venda.",
  },
  {
    q: "O que a Agência Digital Xpert faz?",
    a: "A DX ajuda empresas a gerar oportunidades de venda e a aproveitá-las melhor. Unimos tráfego pago no Google Ads e Meta Ads, criativos, landing pages, estruturação comercial, CRM e automação de atendimento em uma mesma estratégia, acompanhada do anúncio até a venda.",
  },
  {
    q: "Quanto custa contratar a DX?",
    a: "Depende do escopo: quais canais, quantas páginas e quanto do processo comercial entra no projeto. Por isso começamos pelo diagnóstico e só depois apresentamos uma proposta. O investimento em mídia é pago diretamente às plataformas (Google, Meta) e é separado dos honorários da agência. Falamos dos dois valores com clareza.",
  },
  {
    q: "Em quanto tempo aparecem os resultados?",
    a: "Os primeiros dados chegam assim que as campanhas entram no ar, e é com eles que começamos a otimizar. O ritmo de crescimento depende da oferta, do mercado, do investimento e de como os contatos são atendidos, então não prometemos prazos fixos. Combinamos indicadores por etapa para você acompanhar a evolução.",
  },
  {
    q: "Google Ads ou Meta Ads: qual é melhor para o meu negócio?",
    a: "Depende de como seu cliente compra. O Google Ads alcança quem já está buscando o que você vende; o Meta Ads (Instagram e Facebook) gera procura e alcança quem ainda não conhece sua empresa. Muitas vezes os dois se complementam. No diagnóstico, definimos por onde começar e como dividir o investimento.",
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
    q: "Preciso ter um time comercial para trabalhar com a DX?",
    a: "Não necessariamente, mas alguém precisa atender e conduzir as oportunidades. Em empresas menores, o próprio dono costuma fazer esse papel. Nós ajudamos a [organizar esse processo](/servicos/estruturacao-comercial) para que ele funcione com a estrutura que você tem hoje.",
  },
  {
    q: "Como funciona o diagnóstico?",
    a: "Você preenche o formulário e nossa equipe conversa com você sobre o que vende, como os clientes chegam e quem atende cada contato. A partir daí, definimos juntos o que vale ajustar primeiro. Veja a [metodologia completa](/metodologia).",
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

      {/* HERO --------------------------------------------------------- */}
      <section className="surface-dark relative isolate overflow-hidden bg-[#000]">
        <div aria-hidden className="hero-art">
          <div className="hero-curtain" />
          <div className="hero-beams hero-beams--home" />
        </div>
        <Container className="hero-scroll relative grid items-center gap-6 pb-16 pt-10 sm:pb-20 lg:min-h-[calc(100svh-4.5rem)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-4 lg:py-16">
          <div className="relative z-10">
            <p className="hero-rise inline-flex items-center gap-3 rounded-full border border-border-tertiary bg-bg-fill-secondary py-1.5 pl-1.5 pr-5 text-sm leading-5 text-text-secondary backdrop-blur-sm">
              <span aria-hidden className="grid size-9 place-items-center rounded-full border border-border-tertiary bg-[var(--grey-900)] text-text-primary">
                <svg viewBox="0 0 20 20" width="18" height="18" fill="none"><path d="M6 6l8 8m0 0V7.5M14 14H7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              <span>
                Marketing digital para diversos segmentos
              </span>
            </p>
            <h1 className="hero-rise text-hero mt-8 max-w-[15ch] !text-[clamp(2.5rem,1.2rem+4vw,4.5rem)] !leading-[1.04]" style={{ ["--d" as string]: "80ms" }}>
              <span className="text-chrome text-chrome-lines">Agência de tráfego pago que gera vendas de verdade.</span>
            </h1>
            <p className="hero-rise text-lead mt-7 max-w-md text-text-secondary" style={{ ["--d" as string]: "160ms" }}>
              Geramos contatos e vendas para empresas de diversos segmentos, com Google Ads, Meta Ads e um atendimento preparado para fechar.
            </p>
            <div className="hero-rise mt-9 flex flex-col gap-3 sm:flex-row" style={{ ["--d" as string]: "240ms" }}>
              <TrackedLink href={CTA_PRIMARY.href} trackLabel={CTA_PRIMARY.label} trackLocation="home_hero" className={btn("primary")}>
                {CTA_PRIMARY.label}
                <ArrowIcon className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </TrackedLink>
              <TrackedLink href={CTA_SECONDARY.href} trackLabel={CTA_SECONDARY.label} trackLocation="home_hero" className={btn("secondary", "backdrop-blur-sm")}>
                {CTA_SECONDARY.label}
              </TrackedLink>
            </div>
            <p className="hero-rise mt-10 flex items-center gap-4 text-[0.9375rem] leading-6 text-text-secondary" style={{ ["--d" as string]: "320ms" }}>
              <span aria-hidden className="grid size-12 shrink-0 place-items-center rounded-full bg-[var(--grey-850)] text-text-primary">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
                  <rect x="3" y="13" width="4" height="6" rx="1.6" />
                  <rect x="17" y="13" width="4" height="6" rx="1.6" />
                  <path d="M19 19c0 1.5-2 2.5-5 2.5" />
                </svg>
              </span>
              <span>Atendimento feito por pessoas · Empresas de todo o Brasil</span>
            </p>
          </div>
          <HeroArrow className="mx-auto w-full max-w-[24rem] sm:max-w-[30rem] lg:max-w-none lg:translate-x-[6%]" />
        </Container>
      </section>

      {/* SEGMENTOS: diversos nichos, logo abaixo do hero ------------- */}
      <section aria-labelledby="segmentos-title" className="surface-dark border-y border-border-tertiary bg-[#000]">
        <Container className="py-12 sm:py-14">
          <div className="reveal flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[0.8125rem] font-medium uppercase leading-5 tracking-[0.14em] text-text-secondary">Segmentos que atendemos</p>
              <h2 id="segmentos-title" className="mt-2 font-display text-[clamp(1.5rem,1.2rem+1.2vw,2.125rem)] font-normal leading-tight tracking-[-0.02em]">
                Estratégias para diversos mercados.
              </h2>
            </div>
            <Link href="/segmentos" className="group inline-flex min-h-11 items-center gap-2 text-[0.9375rem] font-medium leading-6 text-text-secondary hover:text-text-primary">
              Ver todos os segmentos <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {segments.map((s, i) => {
              const img = heroImages[s.slug];
              return (
                <li key={s.slug} className="reveal" style={{ ["--reveal-delay" as string]: `${i * 50}ms` }}>
                  <Link
                    href={`/segmentos/${s.slug}`}
                    className="pressable group flex h-full flex-col items-start gap-3 rounded-[22px] border border-border-tertiary bg-[var(--grey-950)] p-4 transition-[border-color,background-color,transform] hover:border-border-secondary hover:bg-bg-fill-secondary"
                  >
                    {img ? (
                      <Image src={img} alt="" width={400} height={400} unoptimized className="-ml-1 size-14 transition-transform duration-700 ease-[var(--ease-spring)] group-hover:scale-110" />
                    ) : null}
                    <span className="text-[0.9375rem] font-medium leading-5">{s.navLabel}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <p className="mt-6 text-sm leading-5 text-text-secondary">
            Seu segmento não está na lista?{" "}
            <Link href={CTA_PRIMARY.href} className="text-text-primary underline underline-offset-4 hover:no-underline">Conte no diagnóstico</Link>: adaptamos a estratégia ao seu negócio.
          </p>
        </Container>
      </section>

      {/* SERVIÇOS ------------------------------------------------------ */}
      <Section tone="graphite" labelledBy="servicos-title">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeader
              id="servicos-title"
              eyebrow="Nossos serviços"
              title="Soluções completas para sua empresa vender mais no digital."
              intro="Do anúncio ao fechamento: mídia, criativos, páginas e processo comercial em um só time."
            />
            <Link href="/servicos" className={btn("secondary", "reveal self-start lg:self-auto")}>
              Ver todos os serviços
            </Link>
          </div>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 xl:grid-cols-4">
            {serviceNav.map((s, i) => {
              const img = heroImages[s.href.split("/").pop() ?? ""];
              return (
                <li key={s.href} className="reveal" style={{ ["--reveal-delay" as string]: `${(i % 4) * 60}ms` }}>
                  <Link
                    href={s.href}
                    className="pressable group flex h-full flex-col rounded-[28px] border border-border-tertiary bg-bg-surface p-6 transition-[border-color,background-color,transform] hover:border-border-secondary hover:bg-bg-surface-recessed"
                  >
                    {img ? (
                      <Image
                        src={img}
                        alt=""
                        width={400}
                        height={400}
                        unoptimized
                        className="-ml-2 -mt-2 size-28 transition-transform duration-700 ease-[var(--ease-spring)] group-hover:scale-105"
                      />
                    ) : null}
                    <h3 className="text-h3 mt-4">{s.label}</h3>
                    <p className="mb-6 mt-2 text-[0.9375rem] leading-6 text-text-secondary">{serviceCopy[s.href] ?? s.description}</p>
                    <span className="mt-auto inline-flex items-center gap-2 text-[0.9375rem] font-medium leading-6">
                      Saiba mais <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </Link>
                </li>
              );
            })}
            <li className="reveal" style={{ ["--reveal-delay" as string]: "180ms" }}>
              <div className="surface-light flex h-full flex-col rounded-[28px] bg-bg-surface p-6 text-text-primary">
                <p className="text-h3">Não sabe por onde começar?</p>
                <p className="mb-6 mt-2 text-[0.9375rem] leading-6 text-text-secondary">
                  Fale com um especialista da DX. No diagnóstico, mostramos o que priorizar primeiro.
                </p>
                <TrackedLink href={CTA_PRIMARY.href} trackLabel={CTA_PRIMARY.label} trackLocation="home_services" className={btn("primary", "mt-auto self-start")}>
                  {CTA_PRIMARY.label}
                  <ArrowIcon className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </TrackedLink>
              </div>
            </li>
          </ul>
        </Container>
      </Section>

      {/* FAIXA (decorativa) ------------------------------------------- */}
      <div aria-hidden className="marquee-wrap surface-dark overflow-hidden border-y border-border-tertiary bg-[#000] py-6 sm:py-8">
        <div className="marquee">
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0 items-center">
              {["Google Ads", "Meta Ads", "Criativos", "Landing pages", "Estruturação comercial", "CRM", "Automação", "IA no atendimento"].map((t, i) => (
                <span key={t} className="flex items-center font-display text-[clamp(2rem,1.2rem+3vw,4rem)] font-light leading-none tracking-[-0.03em]">
                  <span className={i % 2 ? "text-text-secondary" : "text-chrome"}>{t}</span>
                  <span className="mx-8 text-[0.5em] text-text-secondary sm:mx-12">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* MÉTODO -------------------------------------------------------- */}
      <Section tone="light" labelledBy="metodo-title">
        <Container>
          <SectionHeader
            id="metodo-title"
            eyebrow="Como trabalhamos"
            title="Um processo claro, do diagnóstico ao crescimento."
            intro="Sem achismo: cada etapa é guiada pelos dados dos anúncios e do atendimento."
          />
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-5">
            {methodSteps.map((s, i) => (
              <li key={s.title} className="reveal flex flex-col rounded-[28px] bg-bg-surface p-6" style={{ ["--reveal-delay" as string]: `${i * 60}ms` }}>
                <span className="font-display text-[2.5rem] font-light leading-none tracking-[-0.03em] text-text-secondary tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-8 font-display text-[clamp(1.125rem,1rem+0.4vw,1.375rem)] font-medium leading-7 tracking-[-0.01em]">{s.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-6 text-text-secondary">{stepCopy[s.slug] ?? s.short}</p>
              </li>
            ))}
          </ol>
          <div className="reveal mt-12">
            <TrackedLink href={CTA_SECONDARY.href} trackLabel={CTA_SECONDARY.label} trackLocation="home_method" className={btn("secondary")}>
              {CTA_SECONDARY.label}
              <ArrowIcon />
            </TrackedLink>
          </div>
        </Container>
      </Section>

      {/* DIFERENCIAL: atendimento humanizado e rápido ---------------- */}
      <Section tone="dark" labelledBy="diferencial-title" className="relative isolate overflow-hidden bg-[#000]">
        <div aria-hidden className="hero-art">
          <div className="absolute left-[-10%] top-1/2 size-[44rem] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(255_255_255/0.09),transparent_65%)]" />
        </div>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-20">
            <div className="reveal">
              <Eyebrow>Nosso diferencial</Eyebrow>
              <h2 id="diferencial-title" className="text-h1">
                <span className="text-chrome text-chrome-lines">Atendimento humanizado e rápido.</span>
              </h2>
              <p className="text-lead mt-6 max-w-md text-text-secondary">
                Aqui você não abre chamado nem fala com robô. Fala com pessoas que conhecem o seu negócio e respondem com agilidade.
              </p>
              <TrackedLink href={CTA_PRIMARY.href} trackLabel={CTA_PRIMARY.label} trackLocation="home_diferencial" className={btn("primary", "mt-9")}>
                {CTA_PRIMARY.label}
                <ArrowIcon className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </TrackedLink>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {diferenciais.map((d, i) => (
                <li
                  key={d.title}
                  className="reveal rounded-[28px] border border-border-tertiary bg-[rgb(255_255_255/0.03)] p-6 backdrop-blur-sm"
                  style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}
                >
                  <span aria-hidden className="grid size-12 place-items-center rounded-full border border-border-tertiary bg-[var(--grey-900)] text-text-primary">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      {d.icon}
                    </svg>
                  </span>
                  <h3 className="text-h3 mt-5">{d.title}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-6 text-text-secondary">{d.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* RESULTADOS ---------------------------------------------------- */}
      <Section tone="paper2" labelledBy="cases-title">
        <Container>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
            <SectionHeader id="cases-title" eyebrow="Depoimentos" title="Resultados reais de quem confia na DX." />
            <Link href="/cases" className={btn("secondary")}>Ver cases <ArrowIcon /></Link>
          </div>
          <TestimonialCards />
        </Container>
      </Section>

      {/* FAQ ----------------------------------------------------------- */}
      <Section tone="light" labelledBy="faq-title">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-20">
            <div className="reveal">
              <Eyebrow>Perguntas frequentes</Eyebrow>
              <h2 id="faq-title" className="text-h2">Tire suas dúvidas sobre tráfego pago.</h2>
              <p className="mt-5 text-text-secondary">
                Ficou alguma? <Link href="/sobre" className="text-text-primary underline underline-offset-4 hover:no-underline">Conheça a DX e os fundadores</Link>.
              </p>
            </div>
            <div className="reveal"><FaqList faqs={faqs} /></div>
          </div>
        </Container>
      </Section>

      <CtaSection
        location="home_final"
        title="Pronto para vender mais com tráfego pago?"
        text="Solicite seu diagnóstico e converse com um especialista da DX sobre os próximos passos para a sua empresa."
      />
    </>
  );
}
