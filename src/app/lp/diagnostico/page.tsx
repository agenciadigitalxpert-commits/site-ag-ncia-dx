import Image from "next/image";
import type { ReactNode } from "react";
import { site } from "@/config/site";
import { leadIntegrationReady } from "@/config/env";
import { pageMetadata } from "@/lib/seo";
import { methodSteps } from "@/content/method";
import { testimonials } from "@/content/testimonials";
import type { FAQ } from "@/content/types";
import { FaqList } from "@/components/Faq";
import { HeroGrid } from "@/components/sections";
import { LeadForm } from "@/components/LeadForm";
import { TestimonialCards } from "@/components/TestimonialCards";
import { TrackedLink } from "@/components/TrackedLink";
import { ArrowIcon, CheckIcon, Container, btn, cx } from "@/components/ui";

/**
 * LP de anúncio (Meta/Google) para o diagnóstico. Fora do índice e do sitemap: só recebe tráfego pago.
 * Todos os botões levam ao formulário (#diagnostico) no fim da página.
 */
export const metadata = pageMetadata({
  title: "Diagnóstico de marketing e vendas",
  description:
    "Descubra onde o investimento em anúncios está sendo desperdiçado e onde os contatos se perdem até a venda. Diagnóstico da Agência Digital Xpert para empresas a partir de R$ 50 mil por mês.",
  path: "/lp/diagnostico",
  noindex: true,
});

const LOC = "lp_diagnostico";

function Cta({ children = "Quero meu diagnóstico", label, className }: { children?: ReactNode; label: string; className?: string }) {
  return (
    <TrackedLink href="#diagnostico" trackLabel={label} trackLocation={LOC} className={btn("primary", cx("!min-h-14 !px-7 text-base", className))}>
      {children}
      <ArrowIcon className="transition-transform duration-200 group-hover:translate-x-0.5" />
    </TrackedLink>
  );
}

const B = ({ children }: { children: ReactNode }) => <strong className="font-semibold text-text-primary">{children}</strong>;

const heroPoints: ReactNode[] = [
  <>Onde o <B>investimento em anúncios</B> está sendo <B>desperdiçado</B>;</>,
  <>Onde os <B>contatos se perdem</B> entre o clique e a venda;</>,
  <>O que <B>ajustar primeiro</B>: canais, página, atendimento e metas.</>,
];

const included = [
  "Gestão de Google Ads",
  "Gestão de Meta Ads",
  "Roteiros e criativos",
  "Landing pages",
  "Mensuração e conversões",
  "Estruturação comercial",
  "Roteiro de atendimento no WhatsApp",
  "CRM e automação",
  "Relatório em linguagem simples",
  "Acompanhamento até a venda",
];

const reasons = [
  { t: "Gente de verdade", d: "Você fala com pessoas da equipe, que conhecem a sua empresa pelo nome." },
  { t: "Resposta rápida", d: "Dúvidas e ajustes não ficam parados em fila." },
  { t: "Conversa clara", d: "Números e próximos passos explicados sem jargão." },
  { t: "Foco na venda", d: "O que importa não é o clique: é o contato que vira cliente." },
];

const faqs: FAQ[] = [
  {
    q: "Como funciona o diagnóstico?",
    a: "Você preenche o formulário e nossa equipe conversa com você sobre o que vende, como os clientes chegam hoje e quem atende cada contato. A partir daí, mostramos onde estão as maiores perdas e o que vale ajustar primeiro.",
  },
  {
    q: "Quem da DX vai me atender?",
    a: "A equipe da DX. Antes do contato, lemos o que você enviou no formulário para a conversa ser objetiva, pelo WhatsApp informado.",
  },
  {
    q: "Por que só empresas a partir de R$ 50 mil por mês?",
    a: "Porque o trabalho junta anúncios, página e processo comercial, e isso pede verba de mídia e alguém para atender os contatos. Se a sua empresa ainda está abaixo disso, os nossos [materiais para download](/materiais) ajudam a organizar a base.",
  },
  {
    q: "Eu já tenho agência. Faz sentido conversar?",
    a: "Faz, se os contatos não estão virando venda ou se você não sabe quanto o investimento está retornando. No diagnóstico, olhamos o que já existe antes de sugerir qualquer mudança.",
  },
  {
    q: "Quanto custa, afinal?",
    a: "Depende do escopo: quais canais, quantas páginas e quanto do processo comercial entra no projeto. Por isso começamos pelo diagnóstico e só depois apresentamos uma proposta. O investimento em mídia é pago diretamente ao Google e ao Meta, separado dos honorários da agência.",
  },
  {
    q: "Vocês garantem resultados?",
    a: "Não prometemos números fixos, porque o resultado depende da oferta, do mercado, do investimento e do atendimento da empresa. O que fazemos é estruturar a operação, medir cada etapa e ajustar com base nos dados, deixando claro o que funciona e o que precisa mudar.",
  },
  {
    q: "O que acontece depois que eu enviar o formulário?",
    a: "Nossa equipe analisa as informações e chama você no WhatsApp para entender a operação e marcar a conversa do diagnóstico.",
  },
];

export default function LpDiagnostico() {
  const founders = site.founders;
  const heroPhotos = ["elizandro-uebel", "diego-viana"].map((id) => founders.find((f) => f.id === id)!).filter(Boolean);

  return (
    <>
      {/* 1. Hero ---------------------------------------------------------------- */}
      <section className="surface-dark relative isolate overflow-hidden rounded-b-[32px] bg-bg sm:rounded-b-[48px]">
        <HeroGrid />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(70%_80%_at_85%_10%,rgb(255_255_255/0.14),transparent_60%)]" />
        <Container className="relative grid items-end gap-10 pb-0 pt-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:pt-16">
          <div className="relative z-10 pb-14 lg:pb-24">
            <p className="hero-rise mb-6 inline-flex items-center gap-2 rounded-full border border-border-tertiary px-4 py-1.5 text-sm font-medium leading-5">
              <span aria-hidden className="size-1.5 rounded-full bg-white" />
              Diagnóstico de marketing e vendas
            </p>
            <h1 className="hero-rise text-h1 max-w-[18ch] !font-medium" style={{ ["--d" as string]: "60ms" }}>
              Quanto do que sua empresa investiu em marketing{" "}
              <span className="box-decoration-clone rounded-[6px] bg-white px-2 text-black">virou venda este ano?</span>
            </h1>
            <p className="hero-rise text-lead mt-7 max-w-[34rem] text-text-secondary" style={{ ["--d" as string]: "140ms" }}>
              Muitos empresários <B>não sabem responder</B>. Campanhas soltas, relatórios que <B>não batem com o caixa</B> e contatos que{" "}
              <B>se perdem no WhatsApp</B>. No diagnóstico da DX, você sai sabendo:
            </p>
            <ul className="hero-rise mt-7 space-y-3.5" style={{ ["--d" as string]: "200ms" }}>
              {heroPoints.map((p, i) => (
                <li key={i} className="flex gap-3 text-text-secondary">
                  <span aria-hidden className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-white text-black">
                    <CheckIcon className="size-4" />
                  </span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <div className="hero-rise mt-10 flex flex-col gap-4 sm:flex-row sm:items-center" style={{ ["--d" as string]: "260ms" }}>
              <Cta label="hero" />
              <p className="text-sm leading-5 text-text-secondary">
                Leva menos de 2 minutos.
                <br />
                Para empresas a partir de R$ 50 mil/mês.
              </p>
            </div>
          </div>

          <div aria-hidden className="relative mx-auto -mt-6 h-[20rem] w-full max-w-[26rem] sm:h-[28rem] lg:mt-0 lg:h-[38rem] lg:max-w-none">
            {heroPhotos.map((f, i) => (
              <div
                key={f.id}
                className={cx(
                  "absolute bottom-0 aspect-[3/4] [mask-image:radial-gradient(ellipse_50%_52%_at_50%_42%,black_45%,transparent_100%)]",
                  i === 0 ? "-right-[4%] z-10 w-[66%]" : "-left-[4%] w-[58%] opacity-80",
                )}
              >
                <Image src={f.photo} alt="" fill priority sizes="(min-width: 1024px) 24rem, 60vw" className="object-cover object-top grayscale" />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 2. Números dos clientes ------------------------------------------------- */}
      <section className="surface-light bg-bg pt-8 sm:pt-10">
        <Container>
          <div className="mx-auto grid max-w-5xl grid-cols-3 gap-3 rounded-[28px] bg-bg-surface px-3 py-6 text-center sm:gap-8 sm:px-10 sm:py-8">
            {testimonials.map((t) => (
              <div key={t.href}>
                <p className="font-logo text-[1.9rem] font-medium leading-none tracking-[-0.02em] sm:text-[2.5rem]">{t.highlight.value}</p>
                <p className="mx-auto mt-2 max-w-[16rem] text-[0.72rem] leading-4 text-text-secondary sm:text-sm sm:leading-5">{t.highlight.label}</p>
                <p className="mt-1.5 text-[0.62rem] font-medium uppercase leading-4 tracking-[0.08em] sm:text-xs sm:leading-5 sm:tracking-[0.1em]">{t.client}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-center text-xs leading-5 text-text-secondary">Números contados pelos próprios clientes nos relatos em vídeo.</p>
        </Container>
      </section>

      {/* 3. Quem está por trás ------------------------------------------------- */}
      <section className="surface-light bg-bg py-12 sm:py-16">
        <Container>
          <div className="surface-dark mx-auto max-w-4xl rounded-[32px] bg-bg px-4 py-12 text-center sm:px-12">
            <h2 className="text-h2">Quem está por trás da DX</h2>
            <p className="mx-auto mt-3 max-w-xl text-text-secondary">Marketing, vendas e atendimento no mesmo time, olhando para a sua venda.</p>
            <ul className="mt-10 flex flex-wrap justify-center gap-x-3 gap-y-6 sm:gap-x-8">
              {founders.map((f) => (
                <li key={f.id} className="w-[5.75rem] sm:w-32">
                  <div className="relative mx-auto size-20 overflow-hidden rounded-full sm:size-28 ring-2 ring-white/70 ring-offset-4 ring-offset-[var(--grey-950)]">
                    <Image src={f.photo} alt={f.name} fill sizes="7rem" className="object-cover object-top grayscale" />
                  </div>
                  <p className="mt-4 text-sm font-medium leading-5">{f.name}</p>
                  <p className="text-xs leading-5 text-text-secondary">{f.role}</p>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-col items-center gap-3">
              <Cta label="fundadores">Agendar conversa</Cta>
              <p className="text-xs leading-5 text-text-secondary">*Cadastro em menos de 2 minutos</p>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. Plano ---------------------------------------------------------------- */}
      <section className="surface-light bg-bg py-12 sm:py-20">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <PlanMockup />
          <div>
            <h2 className="text-h2 max-w-[16ch]">
              Se você anuncia sem plano, <span className="underline decoration-2 underline-offset-[6px]">está pagando para testar</span>
            </h2>
            <p className="mt-6 max-w-[32rem] text-text-secondary">
              Enquanto você <B>muda de estratégia todo mês</B>, quem tem processo <B>já sabe</B> quanto precisa investir para vender mais.
            </p>
            <p className="mt-4 max-w-[32rem] text-text-secondary">
              No diagnóstico, olhamos os seus <B>anúncios, a sua página e o seu atendimento</B> e mostramos as prioridades. Você sai sabendo{" "}
              <B>o que fazer primeiro</B>.
            </p>
            <Cta label="plano" className="mt-8">Agendar conversa</Cta>
          </div>
        </Container>
      </section>

      {/* 5. Etapas -------------------------------------------------------------- */}
      <section className="surface-light bg-bg py-12 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="text-h2 max-w-[14ch]">
              O que fazemos com você, <span className="text-text-secondary">do diagnóstico à venda</span>
            </h2>
            <Cta label="etapas" className="mt-8">Agendar conversa</Cta>
          </div>
          <ol className="space-y-14 sm:space-y-20">
            {methodSteps.map((s, i) => (
              <li key={s.slug} className="reveal grid grid-cols-[4.5rem_1fr] gap-4 sm:grid-cols-[6rem_1fr] sm:gap-6">
                <span className="font-logo text-[3rem] font-medium leading-none tracking-[-0.02em] sm:text-[4rem]">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-h3">{s.title}</h3>
                  <p className="mt-3 text-text-secondary">
                    <B>{s.goal}</B> {s.short}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* 6. Depoimentos --------------------------------------------------------- */}
      <section className="surface-light bg-bg py-12 sm:py-20">
        <Container>
          <h2 className="text-h2 max-w-[20ch]">
            Veja o que <span className="text-text-secondary">nossos clientes contam</span>
          </h2>
          <div className="mt-10">
            <TestimonialCards />
          </div>
        </Container>
      </section>

      {/* 7. Tudo num time só + 8. Atendimento ---------------------------------- */}
      <section className="surface-dark rounded-[32px] bg-bg py-16 sm:rounded-[48px] sm:py-24">
        <Container className="max-w-5xl">
          <h2 className="text-h2 mx-auto max-w-[26ch] text-center !font-normal">
            Contratar cada parte separado dá trabalho. <strong className="font-semibold">Aqui, é um time só.</strong>
          </h2>
          <ul className="mx-auto mt-12 grid max-w-4xl gap-x-12 sm:grid-cols-2">
            {included.map((item) => (
              <li key={item} className="flex items-center justify-between gap-4 border-b border-border-tertiary py-3.5 text-[0.95rem]">
                {item}
                <span aria-hidden className="grid size-6 shrink-0 place-items-center rounded-full bg-white text-black">
                  <CheckIcon className="size-4" />
                </span>
              </li>
            ))}
          </ul>
          <div className="mx-auto mt-10 flex max-w-4xl flex-col items-center justify-between gap-6 rounded-[24px] border border-border-tertiary p-6 sm:flex-row">
            <p className="text-text-secondary">O escopo de cada empresa é definido no diagnóstico. Sem você no meio fazendo a ponte entre fornecedores.</p>
            <Cta label="time-unico" className="shrink-0">Quero conhecer</Cta>
          </div>

          <div className="mt-24 grid items-center gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
            <div>
              <h2 className="text-h2 max-w-[16ch]">Atendimento de gente, não de central.</h2>
              <p className="mt-6 text-text-secondary">
                Muito empresário que chega até a gente <B>já contratou agência antes</B>. E se frustrou com demora, relatório confuso e ninguém olhando para a
                venda.
              </p>
              <p className="mt-4 text-text-secondary">Por isso a DX trabalha diferente:</p>
              <ul className="mt-6 grid gap-5 sm:grid-cols-2">
                {reasons.map((r) => (
                  <li key={r.t}>
                    <p className="font-medium">{r.t}</p>
                    <p className="mt-1 text-[0.95rem] text-text-secondary">{r.d}</p>
                  </li>
                ))}
              </ul>
              <Cta label="atendimento" className="mt-10">Falar com a DX</Cta>
            </div>
            <Seal />
          </div>
        </Container>
      </section>

      {/* 9. Formulário ----------------------------------------------------------- */}
      <section className="surface-light bg-bg py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <div>
            <h2 className="text-h2 max-w-[14ch]">Vamos olhar a sua operação?</h2>
            <p className="mt-5 text-text-secondary">
              Preencha em menos de 2 minutos. A equipe da DX analisa as informações e chama você no WhatsApp para marcar a conversa.
            </p>
            <ul className="mt-8 space-y-3 text-[0.95rem] text-text-secondary">
              {["Para empresas a partir de R$ 50 mil por mês", "Atendemos empresas de todo o Brasil", "Seus dados não são compartilhados"].map((t) => (
                <li key={t} className="flex gap-3">
                  <CheckIcon className="mt-0.5 size-5 shrink-0" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div id="diagnostico" className="surface-dark scroll-mt-24 rounded-[32px] bg-bg-surface p-6 text-text-primary sm:rounded-[40px] sm:p-8">
            <h2 className="text-h3 mb-6">Quero meu diagnóstico</h2>
            <LeadForm integrationReady={leadIntegrationReady} location={LOC} />
          </div>
        </Container>
      </section>

      {/* 10. Dúvidas --------------------------------------------------------- */}
      <section className="surface-light bg-bg pb-20 sm:pb-28">
        <Container className="max-w-3xl">
          <h2 className="text-h2">Tire suas dúvidas antes de começar</h2>
          <div className="mt-8">
            <FaqList faqs={faqs} />
          </div>
          <div className="mt-10">
            <Cta label="faq" />
          </div>
        </Container>
      </section>
    </>
  );
}

/** Notebook com o "plano" na tela e uma folha com a linha do tempo saindo por baixo (desenho em CSS). */
function PlanMockup() {
  return (
    <div aria-hidden className="relative mx-auto w-full max-w-[34rem] pb-16">
      <div className="rounded-t-[18px] border-[10px] border-b-0 border-[var(--grey-900)] bg-[var(--grey-900)]">
        <div className="flex aspect-[16/10] flex-col justify-center rounded-[6px] bg-white px-[9%] text-black">
          <p className="text-[clamp(1rem,0.6rem+1.6vw,1.6rem)] font-medium leading-tight">Plano de marketing e vendas</p>
          <p className="font-logo mt-2 text-[clamp(2.4rem,1.2rem+4.5vw,4.4rem)] font-semibold leading-none tracking-[-0.02em]">
            Prioridades
          </p>
          <div className="mt-4 flex gap-2">
            {["Anúncios", "Página", "Atendimento", "Metas"].map((t) => (
              <span key={t} className="rounded-full bg-black/[0.07] px-2.5 py-1 text-[0.65rem] font-medium sm:text-xs">{t}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-[-3%] h-4 rounded-b-[14px] bg-gradient-to-b from-[var(--grey-300)] to-[var(--grey-500)]" />
      <div className="absolute inset-x-[18%] bottom-0 h-28 rotate-[-2deg] rounded-[6px] bg-white p-4 shadow-[0_20px_40px_-20px_rgb(0_0_0/0.35)]">
        {[0, 1, 2].map((i) => (
          <div key={i} className="mb-2.5 flex items-center gap-3">
            <span className="size-3 shrink-0 rounded-full border-2 border-black" />
            <span className="h-1.5 rounded-full bg-black/15" style={{ width: `${70 - i * 15}%` }} />
          </div>
        ))}
      </div>
    </div>
  );
}

/** Selo prateado "R$ 50 mil+" (no lugar do selo de garantia da referência). */
function Seal() {
  return (
    <div aria-hidden className="relative mx-auto grid aspect-square w-full max-w-[18rem] place-items-center">
      <div className="absolute inset-0 rounded-full [background:var(--chrome)] p-[6px] shadow-[0_0_80px_rgb(255_255_255/0.12)]">
        <div className="grid size-full place-items-center rounded-full bg-[var(--grey-950)]">
          <div className="grid size-[82%] place-items-center rounded-full border border-white/25 text-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-text-secondary">Para empresas</p>
              <p className="font-logo text-chrome mt-2 whitespace-nowrap text-[2.6rem] font-semibold leading-none sm:text-[3rem]">R$ 50 mil+</p>
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.24em] text-text-secondary">por mês</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
