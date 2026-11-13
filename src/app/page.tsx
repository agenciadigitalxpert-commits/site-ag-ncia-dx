import Link from "next/link";
import { CTA_PRIMARY, CTA_SECONDARY } from "@/config/navigation";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { faqNode, graph, webPageNode } from "@/lib/schema";
import { segments, services } from "@/lib/content";
import { publishedCases } from "@/content/cases";
import type { FAQ } from "@/content/types";
import { JsonLd } from "@/components/JsonLd";
import { FaqList } from "@/components/Faq";
import { TrackedLink } from "@/components/TrackedLink";
import { BigX, HeroFlow } from "@/components/HeroFlow";
import { CtaSection, HeroGrid, LinkRows, SectionHeader } from "@/components/sections";
import { ArrowIcon, Container, DevNote, Eyebrow, Section, btn } from "@/components/ui";
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
  { t: "Anúncio rodando, contato sem perfil", d: "O investimento gera mensagens, mas boa parte não tem necessidade, orçamento ou momento de compra." },
  { t: "Atendimento lento", d: "O lead chega quente e recebe resposta horas depois — quando já falou com o concorrente." },
  { t: "Dependência de indicação", d: "Quando as indicações diminuem, o faturamento acompanha. Não existe um canal previsível de novos clientes." },
  { t: "Orçamentos que não avançam", d: "Pedidos de orçamento entram, mas param no “vou pensar” por falta de follow-up e de critério de prioridade." },
  { t: "Campanhas sem ligação com vendas", d: "Os relatórios mostram cliques e custo por lead, mas ninguém sabe dizer quais campanhas geraram faturamento." },
  { t: "Marketing e comercial desconectados", d: "O marketing comemora volume, o comercial reclama da qualidade. Cada lado olha para um número diferente." },
];

const fronts = [
  {
    n: "01",
    t: "Atrair",
    d: "Estratégia de aquisição, mídia no Google Ads e Meta Ads, criativos e páginas de conversão pensados para o cliente certo — não para qualquer clique.",
    items: ["Estratégia e canais", "Google Ads e Meta Ads", "Criativos e roteiros", "Landing pages"],
  },
  {
    n: "02",
    t: "Qualificar",
    d: "Critérios claros do que é uma boa oportunidade, atendimento rápido e organizado, CRM e automações que evitam que o lead esfrie.",
    items: ["Critérios de qualificação", "Pré-vendas e roteiros", "CRM e pipeline", "Automação e IA supervisionada"],
  },
  {
    n: "03",
    t: "Converter",
    d: "Acompanhamento do funil até a venda, rotina de follow-up e otimização das campanhas com base no que realmente fecha negócio.",
    items: ["Acompanhamento comercial", "Follow-up estruturado", "Indicadores até a venda", "Otimização contínua"],
  },
];

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

      {/* HERO ---------------------------------------------------------- */}
      <section className="surface-dark relative overflow-hidden">
        <HeroGrid />
        <BigX className="pointer-events-none absolute -right-[18%] top-[-10%] hidden h-[130%] text-white/[0.05] lg:block" />
        <Container className="relative grid gap-14 pb-20 pt-14 sm:pt-20 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-center lg:gap-14 lg:pb-32 lg:pt-24">
          <div>
            <p className="hero-rise mb-7 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.8rem] font-medium uppercase tracking-[0.16em] text-white/70">
              <span className="text-accent">Agência de marketing digital</span>
              <span aria-hidden className="hidden h-px w-5 bg-white/30 sm:block" />
              <span>{site.location.city} — {site.location.state}</span>
            </p>
            <h1 className="hero-rise text-display" style={{ ["--d" as string]: "80ms" }}>
              Mais oportunidades de venda.{" "}
              <span className="text-white/55">Um comercial preparado para aproveitar cada uma.</span>
            </h1>
            <p className="hero-rise text-lead mt-7 max-w-xl text-white/75" style={{ ["--d" as string]: "180ms" }}>
              Tráfego pago, criativos e estrutura comercial para empresas que querem gerar demanda e transformar atendimento em vendas.
            </p>
            <div className="hero-rise mt-10 flex flex-col gap-3 sm:flex-row" style={{ ["--d" as string]: "260ms" }}>
              <TrackedLink href={CTA_PRIMARY.href} trackLabel={CTA_PRIMARY.label} trackLocation="home_hero" className={btn("primary")}>
                {CTA_PRIMARY.label}
                <ArrowIcon className="transition-transform group-hover:translate-x-0.5" />
              </TrackedLink>
              <TrackedLink href={CTA_SECONDARY.href} trackLabel={CTA_SECONDARY.label} trackLocation="home_hero" className={btn("secondary")}>
                {CTA_SECONDARY.label}
              </TrackedLink>
            </div>
            <p className="hero-rise mt-10 max-w-lg text-sm leading-relaxed text-muted-dark" style={{ ["--d" as string]: "340ms" }}>
              Google Ads · Meta Ads · Criativos · Landing pages · Estruturação comercial · CRM e automação
            </p>
          </div>
          <div className="hero-rise" style={{ ["--d" as string]: "200ms" }}>
            <HeroFlow />
          </div>
        </Container>
      </section>

      {/* DORES --------------------------------------------------------- */}
      <Section tone="light" labelledBy="dores-title">
        <Container>
          <SectionHeader
            id="dores-title"
            index="01"
            eyebrow="O que trava o crescimento"
            title="Anúncio sem processo comercial vira custo. Processo sem demanda fica parado."
            intro="Na maioria das empresas, o problema não é só a campanha ou só o atendimento. É a distância entre os dois."
          />
          <ol className="mt-14 grid gap-x-12 border-t border-line-light sm:grid-cols-2 lg:mt-20">
            {pains.map((p, i) => (
              <li key={p.t} className="reveal flex gap-5 border-b border-line-light py-8" style={{ ["--reveal-delay" as string]: `${(i % 2) * 80}ms` }}>
                <span className="font-display pt-1 text-sm tabular-nums text-muted-light">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-h3">{p.t}</h3>
                  <p className="mt-2 leading-relaxed text-muted-light">{p.d}</p>
                </div>
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
            title="Três frentes trabalhando como uma operação só."
            intro="Atrair, qualificar e converter fazem parte do mesmo funil. Por isso cuidamos das três de forma integrada — e medimos o resultado na ponta: oportunidades que viram vendas."
          />
          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line-dark bg-line-dark lg:mt-20 lg:grid-cols-3">
            {fronts.map((f, i) => (
              <article key={f.t} className="reveal bg-graphite p-8 sm:p-10" style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}>
                <p className="text-sm tabular-nums text-accent">{f.n}</p>
                <h3 className="font-display mt-6 text-[clamp(2rem,1.5rem+2vw,3rem)] font-semibold tracking-[-0.03em]">{f.t}</h3>
                <p className="mt-4 leading-relaxed text-white/75">{f.d}</p>
                <ul className="mt-8 space-y-2.5 border-t border-line-dark pt-6 text-[0.95rem] text-white/85">
                  {f.items.map((it) => (
                    <li key={it} className="flex items-center gap-3"><span aria-hidden className="h-px w-3 bg-accent" />{it}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className="reveal mt-10 max-w-3xl text-[0.97rem] leading-relaxed text-muted-dark">
            Resultado comercial depende de vários fatores ao mesmo tempo: a oferta, o mercado, o investimento em mídia e a execução do time que atende. Nosso papel é estruturar o que está sob nosso alcance, medir cada etapa e mostrar com clareza onde está o gargalo.
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
              title="Do anúncio ao fechamento, cada etapa com um responsável."
            />
            <Link href="/servicos" className={btn("secondary", "reveal self-start lg:self-auto")}>
              Ver todos os serviços
            </Link>
          </div>
          <div className="mt-14 lg:mt-20">
            <LinkRows items={services.map((s) => ({ href: `/servicos/${s.slug}`, title: s.navLabel, text: s.summary }))} />
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
            title="Cada mercado vende de um jeito. A estratégia começa por entender o seu."
            intro="Atendemos empresas de diferentes setores, com experiência prática em negócios onde a venda depende de atendimento rápido e bem conduzido."
          />
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
            {segments.map((s, i) => (
              <li key={s.slug} className="reveal" style={{ ["--reveal-delay" as string]: `${(i % 3) * 70}ms` }}>
                <Link
                  href={`/segmentos/${s.slug}`}
                  className="group flex h-full flex-col justify-between rounded-[var(--radius)] border border-line-light bg-paper p-7 transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-white"
                >
                  <div>
                    <h3 className="text-h3">{s.navLabel}</h3>
                    <p className="mt-3 leading-relaxed text-muted-light transition-colors group-hover:text-white/75">{s.summary}</p>
                  </div>
                  <span className="mt-8 inline-flex items-center gap-2 text-[0.95rem] font-medium">
                    Ver abordagem <ArrowIcon className="transition-transform group-hover:translate-x-1" />
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
            title="Uma forma de trabalhar clara, do diagnóstico à otimização."
            intro="Não é fórmula pronta. É a sequência que usamos para entender a operação antes de investir e para melhorar com base no que acontece de verdade."
          />
          <ol className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line-dark bg-line-dark sm:grid-cols-2 lg:mt-20 lg:grid-cols-5">
            {methodSteps.map((s, i) => (
              <li key={s.title} className="reveal flex flex-col bg-ink p-7" style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}>
                <span className="text-sm tabular-nums text-accent">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-h3 mt-8">{s.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-white/70">{s.short}</p>
              </li>
            ))}
          </ol>
          <div className="reveal mt-10">
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
      <Section tone="light" labelledBy="sobre-title" className="border-t border-line-light">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <SectionHeader
              id="sobre-title"
              index={publishedCases.length ? "07" : "06"}
              eyebrow="Sobre a DX"
              title="Marketing, tecnologia e comercial na mesma mesa."
            />
            <div className="reveal space-y-5 text-lead text-muted-light">
              <p>
                A Agência Digital Xpert nasceu em Balneário Camboriú com uma visão prática: campanha boa é a que gera venda, e venda depende de um atendimento preparado para aproveitar cada oportunidade.
              </p>
              <p>
                Por isso, além da mídia e dos criativos, olhamos para o que acontece depois do clique — como o lead é recebido, qualificado e acompanhado até o fechamento. Atendemos empresas de várias regiões do Brasil, com proximidade e acompanhamento de perto.
              </p>
              <Link href="/sobre" className="inline-flex items-center gap-2 font-medium text-ink link-u">
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
