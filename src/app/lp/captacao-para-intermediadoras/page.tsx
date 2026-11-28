import Image from "next/image";
import { leadIntegrationReady } from "@/config/env";
import { pageMetadata } from "@/lib/seo";
import { testimonials } from "@/content/testimonials";
import type { FAQ } from "@/content/types";
import { FaqList } from "@/components/Faq";
import { CampanhaLeadForm } from "@/components/CampanhaLeadForm";
import { LpCta, LpKicker, Strong, lpHero } from "@/components/lp/LpParts";
import { Container } from "@/components/ui";

/**
 * LP de campanha para intermediadoras que captam veículos. Fora do índice e do sitemap: só recebe tráfego pago.
 * Todos os CTAs levam ao formulário desta própria página (#formulario).
 */
export const metadata = pageMetadata({
  title: "Captação de veículos para intermediadoras",
  description:
    "Encontre quem quer vender o carro, faça as perguntas certas no WhatsApp e acompanhe cada oportunidade até a avaliação e a proposta. Agência Digital Xpert.",
  path: "/lp/captacao-para-intermediadoras",
  noindex: true,
});

/** Identificador do segmento: usado em form_location e no parâmetro segmento dos eventos. */
const LOC = "lp_captacao_intermediadoras";

/** Relato real da unidade (o mesmo publicado no site). Número de vendas, não de avaliações. */
const relato = testimonials.find((t) => t.client === "Vaapty Petrópolis");

const etapas = ["Pessoa interessada em vender", "Triagem do veículo", "Horário confirmado", "Avaliação realizada", "Proposta apresentada"];

const registros = [
  { t: "Origem do contato", d: "De qual anúncio ou canal veio cada pessoa." },
  { t: "Data combinada", d: "O dia e o horário marcados para a avaliação." },
  { t: "Confirmação", d: "Se o horário foi confirmado antes do dia combinado." },
  { t: "Presença e motivo da falta", d: "Se o carro chegou e, quando não chegou, por quê." },
];

const faqs: FAQ[] = [
  {
    q: "Já tenho alguém que cuida do tráfego. O diagnóstico faz sentido?",
    a: "Faz, se a pergunta é o que acontece depois do clique. Antes de propor qualquer mudança, olhamos o que já existe em anúncios, agenda e atendimento.",
  },
  {
    q: "Quem atende os contatos que chegam?",
    a: "A sua unidade atende. A DX organiza a triagem, a confirmação do horário e o registro do desfecho de cada avaliação, conforme o escopo contratado.",
  },
  {
    q: "A verba dos anúncios está incluída?",
    a: "Não. Os honorários da DX são separados do investimento em mídia, que é pago diretamente ao Google e à Meta.",
  },
];

export default function LpCaptacaoIntermediadoras() {
  return (
    <>
      {/* 1. Hero: identificação, título, subtítulo, CTA e microtexto */}
      <section className={lpHero}>
        <div className="mx-auto grid max-w-[62.5rem] items-center gap-10 px-5 pb-14 pt-12 lg:grid-cols-[minmax(0,36rem)_1fr] lg:gap-16 lg:px-0 lg:py-24">
          <div>
            <LpKicker className="text-white/80">Captação de veículos para intermediadoras</LpKicker>
            <p className="mt-4 text-sm leading-5 text-white/65">
              Para gestores de intermediadoras e unidades que captam veículos. Se você quer vender o seu carro, esta página não é para você.
            </p>
            <h1 className="mt-6 text-[1.875rem] font-semibold leading-[1.12] tracking-[-0.02em] sm:text-[2.5rem] lg:text-[2.875rem]">
              Dos carros agendados para avaliação,{" "}
              <span className="box-decoration-clone bg-white px-1.5 text-black">quantos chegam à sua loja?</span>
            </h1>
            <p className="mt-6 text-[1.0625rem] leading-7 text-white/85">
              A DX ajuda sua unidade a encontrar quem quer vender o carro, fazer as perguntas certas no WhatsApp e acompanhar cada oportunidade até a avaliação e a
              proposta.
            </p>
            <div className="mt-8 flex flex-col gap-4">
              <LpCta label="hero" location={LOC} className="w-full sm:w-auto">
                Quero analisar minha captação
              </LpCta>
              <p className="text-sm leading-5 text-white/70">Vamos olhar como sua unidade capta, agenda e confirma as avaliações.</p>
            </div>
          </div>

          {/* Composição tipográfica: o momento da avaliação é o protagonista visual desta página. */}
          <div aria-hidden className="lg:order-last">
            <div className="rounded-[32px] border border-white/15 bg-white/[0.04] p-7 sm:p-10">
              <p className="font-logo text-[clamp(3.5rem,2rem+6vw,7rem)] font-semibold uppercase leading-[0.9] tracking-[-0.01em]">Avaliação</p>
              <p className="mt-6 text-[1.0625rem] leading-7 text-white/80">
                Quando o carro chega, a conversa avança. Quando não chega, a verba precisa de uma explicação.
              </p>
              <p className="mt-8 border-t border-white/15 pt-5 text-sm leading-6 text-white/65">Triagem · horário · avaliação · proposta</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Como a DX lê uma agenda (exemplo ilustrativo) */}
      <section className="surface-light bg-bg py-16 sm:py-24">
        <Container className="max-w-4xl">
          <LpKicker>Como a DX lê uma agenda</LpKicker>
          <h2 className="text-h2 mt-4 max-w-[20ch]">Agendar avaliação não garante que o carro chegue.</h2>

          <figure className="mt-10 rounded-[28px] border border-border-tertiary p-6 sm:p-10">
            <figcaption className="text-xs font-medium uppercase tracking-[0.14em] text-text-secondary">Exemplo ilustrativo</figcaption>
            <p className="mt-4 text-[1.0625rem] leading-8">
              Na sexta, a agenda mostra 10 avaliações. No sábado, 4 carros chegam. Antes de aumentar a verba, vale descobrir o que aconteceu com os outros 6.
            </p>
            <div role="img" aria-label="Dos 10 carros agendados, 4 chegaram e 6 não chegaram." className="mt-8 grid grid-cols-5 gap-3 sm:max-w-sm">
              {Array.from({ length: 10 }, (_, i) => (
                <span
                  key={i}
                  aria-hidden
                  className={
                    i < 4
                      ? "aspect-square rounded-[10px] bg-text-primary"
                      : "grid aspect-square place-items-center rounded-[10px] border border-dashed border-border-secondary text-sm text-text-secondary"
                  }
                >
                  {i < 4 ? null : "?"}
                </span>
              ))}
            </div>
            <p className="mt-4 flex gap-6 text-sm text-text-secondary">
              <span>■ 4 chegaram</span>
              <span>▢ 6 não chegaram</span>
            </p>
          </figure>

          {relato ? (
            <article className="mt-10 grid gap-8 rounded-[28px] bg-bg-surface p-6 sm:p-8 md:grid-cols-[minmax(0,4fr)_minmax(0,6fr)] md:items-center">
              <a
                href={relato.href}
                target="_blank"
                rel="noopener noreferrer"
                className="pressable group relative block aspect-[4/5] overflow-hidden rounded-[20px] bg-bg-surface-recessed"
              >
                <Image
                  src={relato.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 22rem, 100vw"
                  style={{ objectPosition: relato.imagePosition }}
                  className="object-cover"
                />
                <span className="absolute bottom-4 left-4 rounded-full bg-white px-4 py-2 text-sm font-medium text-black">Assistir o relato</span>
              </a>
              <div>
                <LpKicker>Relato real</LpKicker>
                <p className="mt-4 text-[1.1875rem] leading-8">
                  A unidade conta que <Strong>vendia de 3 a 7 carros por mês</Strong> e chegou a <Strong>55 no seu melhor mês</Strong>.
                </p>
                <p className="mt-4 text-sm leading-6 text-text-secondary">
                  {relato.client}, relato em vídeo publicado no Instagram. Número de vendas informado pela própria unidade.
                </p>
                <a
                  href={relato.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium underline underline-offset-4 hover:text-text-secondary"
                >
                  Ver o relato original
                  <span className="sr-only">(abre em nova aba)</span>
                </a>
              </div>
            </article>
          ) : null}

          <div className="mt-12">
            <p className="text-text-secondary">Para descobrir o que aconteceu com os 6, estes registros permitem investigar:</p>
            <dl className="mt-6 grid gap-x-10 gap-y-6 sm:grid-cols-2">
              {registros.map((r) => (
                <div key={r.t} className="border-t border-border-tertiary pt-4">
                  <dt className="font-medium">{r.t}</dt>
                  <dd className="mt-1.5 text-[0.95rem] leading-6 text-text-secondary">{r.d}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      {/* 3. Sequência de atendimento */}
      <section className="surface-light bg-bg pb-16 sm:pb-24">
        <Container className="max-w-4xl">
          <LpKicker>Atendimento, etapa por etapa</LpKicker>
          <h2 className="text-h2 mt-4 max-w-[22ch]">Da pessoa interessada à proposta.</h2>

          <ol className="mt-10 grid gap-3 sm:grid-cols-5 sm:gap-2">
            {etapas.map((e, i) => {
              const destaque = e === "Avaliação realizada";
              return (
                <li
                  key={e}
                  className={
                    destaque
                      ? "flex items-center gap-4 rounded-[18px] bg-text-primary p-4 text-bg sm:flex-col sm:items-start sm:justify-between sm:gap-6"
                      : "flex items-center gap-4 rounded-[18px] border border-border-tertiary p-4 sm:flex-col sm:items-start sm:justify-between sm:gap-6"
                  }
                >
                  <span className="font-logo text-2xl font-medium leading-none tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[0.95rem] font-medium leading-6">{e}</span>
                </li>
              );
            })}
          </ol>

          <dl className="mt-10 grid gap-5 sm:grid-cols-2">
            <div>
              <dt className="font-medium">Anúncio</dt>
              <dd className="mt-1 text-text-secondary">traz alguém disposto a conversar.</dd>
            </div>
            <div>
              <dt className="font-medium">Triagem</dt>
              <dd className="mt-1 text-text-secondary">verifica se o veículo faz sentido para a unidade.</dd>
            </div>
            <div>
              <dt className="font-medium">Confirmação</dt>
              <dd className="mt-1 text-text-secondary">combina endereço e horário.</dd>
            </div>
            <div>
              <dt className="font-medium">Avaliação</dt>
              <dd className="mt-1 text-text-secondary">o avaliador registra o desfecho.</dd>
            </div>
          </dl>

          <p className="mt-10 border-l-2 border-text-primary pl-4 leading-7">
            O indicador que justifica a conversa com o gestor é <Strong>avaliações realizadas</Strong>: quantos carros chegaram e foram avaliados.
          </p>
        </Container>
      </section>

      {/* 4. Formulário com a seção "O que vamos olhar na sua loja" antes dele */}
      <section className="surface-light bg-bg py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <div>
            <h2 className="text-h2 max-w-[16ch]">O que vamos olhar na sua loja</h2>
            <p className="mt-5 text-text-secondary">Deixar o telefone vale a pena quando a conversa parte dos números da sua unidade. Na intermediação, a DX olha:</p>
            <ul className="mt-6 space-y-4 text-text-secondary">
              <li className="flex gap-3">
                <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-text-primary" />
                <span>
                  <Strong>Intermediação:</Strong> como a unidade encontra proprietários, quantos agendam e o que acontece entre a confirmação e a avaliação.
                </span>
              </li>
            </ul>
            <p className="mt-8 border-l-2 border-text-primary pl-4 text-text-primary">
              Com esses dados, a equipe consegue indicar o que vale ajustar primeiro.
            </p>
          </div>

          <div id="formulario" className="surface-dark scroll-mt-24 rounded-[32px] bg-bg-surface p-6 text-text-primary sm:rounded-[40px] sm:p-8">
            <h3 className="text-h3 mb-6">Quero analisar minha captação</h3>
            <CampanhaLeadForm
              segment="intermediadora"
              location={LOC}
              integrationReady={leadIntegrationReady}
              submitLabel="Quero analisar minha captação"
              lojaLabel="Qual é o nome da loja ou unidade?"
            />
          </div>
        </Container>
      </section>

      {/* 5. Três perguntas que o gestor faz antes de preencher o formulário */}
      <section className="surface-light bg-bg pb-20 sm:pb-28">
        <Container className="max-w-3xl">
          <h2 className="text-h2">Antes de preencher, três perguntas que um gestor faz</h2>
          <div className="mt-8">
            <FaqList faqs={faqs} />
          </div>
          <div className="mt-10">
            <LpCta label="faq" location={LOC} className="w-full sm:w-auto">
              Quero analisar minha captação
            </LpCta>
          </div>
        </Container>
      </section>
    </>
  );
}
