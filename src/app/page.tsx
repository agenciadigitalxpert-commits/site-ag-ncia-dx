import Image from "next/image";
import Link from "next/link";
import { CTA_PRIMARY, CTA_SECONDARY, serviceNav } from "@/config/navigation";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { faqNode, graph, webPageNode } from "@/lib/schema";
import { segments } from "@/lib/content";
import { TestimonialCards } from "@/components/TestimonialCards";
import { HeroArrow } from "@/components/HeroArrow";
import { testimonials } from "@/content/testimonials";
import { heroImages } from "@/config/illustrations";
import type { FAQ } from "@/content/types";
import { JsonLd } from "@/components/JsonLd";
import { FaqList } from "@/components/Faq";
import { TrackedLink } from "@/components/TrackedLink";
import { CtaSection, SectionHeader } from "@/components/sections";
import { ArrowIcon, Container, Eyebrow, Section, btn } from "@/components/ui";
import { methodSteps } from "@/content/method";

const DESCRIPTION =
  "Agência de tráfego pago e performance comercial: Google Ads, Meta Ads, páginas que convertem e atendimento organizado. De Balneário Camboriú para empresas de todo o Brasil.";

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
        </div>
        <Container className="hero-scroll relative grid items-center gap-6 pb-16 pt-10 sm:pb-20 lg:min-h-[calc(100svh-4.5rem)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-4 lg:py-16">
          <div className="relative z-10">
            <p className="hero-rise inline-flex items-center gap-3 rounded-full border border-border-tertiary bg-bg-fill-secondary py-1.5 pl-1.5 pr-5 text-sm leading-5 text-text-secondary backdrop-blur-sm">
              <span aria-hidden className="grid size-9 place-items-center rounded-full border border-border-tertiary bg-[var(--grey-900)] text-text-primary">
                <svg viewBox="0 0 20 20" width="18" height="18" fill="none"><path d="M6 6l8 8m0 0V7.5M14 14H7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              <span>
                Agência de tráfego pago<span className="hidden sm:inline"> · {site.location.city}</span>
              </span>
            </p>
            <h1 className="hero-rise text-hero mt-8 !text-[clamp(2.75rem,1.3rem+4.8vw,5.25rem)]" style={{ ["--d" as string]: "80ms" }}>
              <span className="text-chrome text-chrome-lines">Tráfego pago <br className="hidden sm:block" />que vira venda.</span>
            </h1>
            <p className="hero-rise text-lead mt-7 max-w-md text-text-secondary" style={{ ["--d" as string]: "160ms" }}>
              Somos uma agência focada em gerar contatos e vendas com Google Ads e Meta Ads, e em preparar seu atendimento para fechar cada oportunidade.
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

      {/* PROVA: relatos de clientes ------------------------------------ */}
      <section aria-labelledby="prova-title" className="surface-dark border-y border-border-tertiary bg-[#000]">
        <Container className="py-10 sm:py-12">
          <h2 id="prova-title" className="sr-only">Resultados relatados por clientes</h2>
          <ul className="grid gap-8 sm:grid-cols-3 sm:gap-6">
            {testimonials.map((t, i) => (
              <li key={t.href} className="reveal flex flex-col gap-1 sm:border-l sm:border-border-tertiary sm:pl-6 first:sm:border-l-0 first:sm:pl-0" style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}>
                <span className="proof-value text-chrome font-display text-[clamp(2.5rem,1.8rem+2.4vw,3.5rem)] font-light leading-none tracking-[-0.03em]">{t.highlight.value}</span>
                <span className="mt-2 max-w-[16rem] text-[0.9375rem] leading-6 text-text-primary">{t.highlight.label}</span>
                <a href={t.href} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex min-h-11 items-center gap-1.5 self-start text-sm leading-5 text-text-secondary underline-offset-4 hover:text-text-primary hover:underline">
                  {t.client}, no Instagram <ArrowIcon className="size-4 -rotate-45" />
                  <span className="sr-only">(abre em nova aba)</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs leading-5 text-text-secondary">
            Números contados pelos próprios clientes nos relatos publicados. Resultados variam conforme oferta, mercado, investimento e atendimento.
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

      {/* SEGMENTOS ----------------------------------------------------- */}
      <Section tone="dark" labelledBy="segmentos-title" className="bg-[#000]">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
            <SectionHeader
              id="segmentos-title"
              eyebrow="Segmentos que atendemos"
              title="Estratégias pensadas para o seu mercado."
              intro="Cada segmento compra de um jeito. Adaptamos campanhas, páginas e atendimento à realidade do seu negócio."
            />
            <div className="reveal lg:pt-10">
              <ul className="flex flex-wrap gap-3">
                {segments.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/segmentos/${s.slug}`}
                      className="pressable group inline-flex min-h-12 items-center gap-3 rounded-full border border-border-secondary py-2 pl-5 pr-2 text-[0.9375rem] leading-6 hover:border-text-primary hover:bg-bg-fill-secondary"
                    >
                      {s.navLabel}
                      <span aria-hidden className="grid size-8 place-items-center rounded-full bg-bg-fill-secondary transition-[transform,background-color,color] duration-500 ease-[var(--ease-spring)] group-hover:-rotate-45 group-hover:bg-bg-fill-inverse group-hover:text-text-on-inverse">
                        <ArrowIcon className="size-4" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-text-secondary">
                Seu segmento não está na lista?{" "}
                <Link href={CTA_PRIMARY.href} className="text-text-primary underline underline-offset-4 hover:no-underline">Conte no diagnóstico</Link>.
              </p>
            </div>
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
