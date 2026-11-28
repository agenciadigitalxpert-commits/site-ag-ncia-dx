import type { ReactNode } from "react";
import { leadIntegrationReady } from "@/config/env";
import { pageMetadata } from "@/lib/seo";
import type { FAQ } from "@/content/types";
import { FaqList } from "@/components/Faq";
import { CampanhaLeadForm } from "@/components/CampanhaLeadForm";
import { LpCta, LpKicker, Strong, lpHero } from "@/components/lp/LpParts";
import { Container, cx } from "@/components/ui";

/**
 * LP de campanha para revendas com estoque. Fora do índice e do sitemap: só recebe tráfego pago.
 * Todos os CTAs levam ao formulário desta própria página (#formulario).
 */
export const metadata = pageMetadata({
  title: "Marketing para revendas de veículos",
  description:
    "Anúncios para girar o estoque da sua revenda e um atendimento no WhatsApp que mostra quem chamar, qual modelo oferecer e quando marcar a visita. Agência Digital Xpert.",
  path: "/lp/marketing-para-revendas",
  noindex: true,
});

/** Identificador do segmento: usado em form_location e no parâmetro segmento dos eventos. */
const LOC = "lp_marketing_revendas";

const decisions = [
  {
    t: "Quais carros anunciar primeiro",
    d: "Consideramos o estoque parado, a prioridade comercial da loja e o que a equipe consegue atender nesta semana.",
  },
  {
    t: "O que mostrar no criativo",
    d: "Modelo, versão, condição real e a possibilidade de troca, quando ela existir. A primeira conversa já começa útil.",
  },
  {
    t: "Quais anúncios trouxeram visitas",
    d: "E quais dessas visitas viraram negócio. Sem essa leitura, a verba segue sem critério.",
  },
];

const faqs: FAQ[] = [
  {
    q: "Já tenho alguém que cuida do tráfego. O diagnóstico faz sentido?",
    a: "Faz, se a pergunta é o que acontece depois do clique. Antes de propor qualquer mudança, olhamos o que já existe em anúncios, estoque e atendimento.",
  },
  {
    q: "Quem atende os contatos que chegam?",
    a: "A sua equipe atende. A DX organiza o roteiro de atendimento no WhatsApp, a triagem e o registro de cada contato, conforme o escopo contratado.",
  },
  {
    q: "A verba dos anúncios está incluída?",
    a: "Não. Os honorários da DX são separados do investimento em mídia, que é pago diretamente ao Google e à Meta.",
  },
];

export default function LpMarketingRevendas() {
  return (
    <>
      {/* 1. Hero: identificação, título, subtítulo, CTA e microtexto */}
      <section className={lpHero}>
        <div className="mx-auto grid max-w-[62.5rem] items-center gap-10 px-5 pb-14 pt-12 lg:grid-cols-[minmax(0,36rem)_1fr] lg:gap-16 lg:px-0 lg:py-24">
          <div>
            <LpKicker className="text-white/80">Marketing para revendas de veículos</LpKicker>
            <p className="mt-4 text-sm leading-5 text-white/65">Para donos e gestores de revendas. Não atendemos quem quer comprar ou vender o próprio carro.</p>
            <h1 className="mt-6 text-[1.875rem] font-semibold leading-[1.12] tracking-[-0.02em] sm:text-[2.5rem] lg:text-[2.875rem]">
              Seu próximo comprador já pode ter perguntado{" "}
              <span className="box-decoration-clone bg-white px-1.5 text-black">‘aceita troca?’</span>
            </h1>
            <p className="mt-6 text-[1.0625rem] leading-7 text-white/85">
              A DX anuncia os carros que sua loja precisa girar e organiza o atendimento para que o vendedor saiba quem chamar, qual modelo oferecer e quando
              marcar a visita.
            </p>
            <div className="mt-8 flex flex-col gap-4">
              <LpCta label="hero" location={LOC} className="w-full sm:w-auto">
                Quero analisar as vendas da minha loja
              </LpCta>
              <p className="text-sm leading-5 text-white/70">Converse com a DX sobre seu estoque, seus anúncios e o atendimento no WhatsApp.</p>
            </div>
          </div>

          {/* Composição tipográfica do exemplo (sem foto de pátio disponível no projeto). */}
          <div aria-hidden className="lg:order-last">
            <div className="rounded-[32px] border border-white/15 bg-white/[0.04] p-7 sm:p-10">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/60">Exemplo de atendimento</p>
              <div className="font-logo mt-6 space-y-1 uppercase leading-[0.92] tracking-[-0.01em]">
                <p className="text-[clamp(3.25rem,2rem+5vw,6rem)] font-semibold">SUV</p>
                <p className="text-[clamp(3.25rem,2rem+5vw,6rem)] font-semibold text-white/55">Troca</p>
                <p className="text-[clamp(3.25rem,2rem+5vw,6rem)] font-semibold">Sábado</p>
              </div>
              <p className="mt-8 border-t border-white/15 pt-5 text-sm leading-6 text-white/75">
                Modelo de interesse · carro da troca · dia da visita
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Diferencial: a equipe também vive o mercado */}
      <section className="surface-light bg-bg py-16 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <div>
            <LpKicker>De dentro de uma revenda</LpKicker>
            <h2 className="text-h2 mt-4 max-w-[18ch]">A equipe da DX também vive o mercado de revenda.</h2>
          </div>
          <div className="space-y-5 text-[1.0625rem] leading-7 text-text-secondary">
            <p>
              A equipe por trás da DX também atua na <Strong>Repassei Veículos</Strong>. Carro parado no pátio, pedido de troca no WhatsApp e visita que
              precisa caber no fim de semana fazem parte da rotina de lá.
            </p>
            <p>É dessa experiência que vêm as perguntas que fazemos antes de indicar qualquer anúncio ou roteiro de atendimento para a sua loja.</p>
          </div>
        </Container>
      </section>

      {/* 3. Exemplo de atendimento: o que muda com as três informações */}
      <section className="surface-light bg-bg pb-16 sm:pb-24">
        <Container>
          <div className="max-w-3xl">
            <LpKicker>Exemplo de atendimento</LpKicker>
            <h2 className="text-h2 mt-4">Um mesmo contato, dois atendimentos.</h2>
            <p className="mt-5 text-text-secondary">
              Um comprador pergunta por um SUV, oferece o carro dele na troca e só pode visitar no sábado. Veja o que muda quando o vendedor recebe essas três
              informações junto com o contato.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <ExampleCard tone="muted" title="Sem essa organização">
              A pergunta chega solta. O vendedor precisa perguntar modelo, troca e disponibilidade antes de qualquer coisa, e a visita pode escorregar para a
              semana seguinte.
            </ExampleCard>
            <ExampleCard tone="strong" title="Com a conversa organizada">
              O vendedor recebe o SUV de interesse, o carro da troca e o horário de sábado. Separa o SUV, prepara a avaliação do carro da troca e confirma a
              visita antes do fim de semana.
            </ExampleCard>
          </div>
          <p className="mt-4 text-xs leading-5 text-text-secondary">Exemplo ilustrativo de como o atendimento pode ser organizado.</p>
        </Container>
      </section>

      {/* 4. Três decisões que a DX ajuda o gestor a tomar */}
      <section className="surface-light bg-bg pb-16 sm:pb-24">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <div>
            <LpKicker>O que a DX ajuda a decidir</LpKicker>
            <h2 className="text-h2 mt-4 max-w-[16ch]">Três decisões que mudam o que sua loja vende.</h2>
          </div>
          <ol className="space-y-10">
            {decisions.map((item, i) => (
              <li key={item.t} className="grid grid-cols-[3.5rem_1fr] gap-4 sm:grid-cols-[5rem_1fr] sm:gap-6">
                <span className="font-logo text-[2.5rem] font-medium leading-none tracking-[-0.02em] sm:text-[3rem]">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-h3">{item.t}</h3>
                  <p className="mt-2 text-text-secondary">{item.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* 5. Formulário com a seção "O que vamos olhar na sua loja" antes dele */}
      <section className="surface-light bg-bg py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <div>
            <h2 className="text-h2 max-w-[16ch]">O que vamos olhar na sua loja</h2>
            <p className="mt-5 text-text-secondary">Deixar o telefone vale a pena quando a conversa parte dos números da sua loja. Na revenda, a DX olha:</p>
            <ul className="mt-6 space-y-4 text-text-secondary">
              {["Quais veículos precisam girar.", "De onde vêm as conversas.", "Onde o comprador costuma parar antes da visita."].map((t) => (
                <li key={t} className="flex gap-3">
                  <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-text-primary" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 border-l-2 border-text-primary pl-4 text-text-primary">
              Com esses dados, a equipe consegue indicar o que vale ajustar primeiro.
            </p>
          </div>

          <div id="formulario" className="surface-dark scroll-mt-24 rounded-[32px] bg-bg-surface p-6 text-text-primary sm:rounded-[40px] sm:p-8">
            <h3 className="text-h3 mb-6">Quero analisar as vendas da minha loja</h3>
            <CampanhaLeadForm
              segment="revenda"
              location={LOC}
              integrationReady={leadIntegrationReady}
              submitLabel="Quero analisar as vendas da minha loja"
              lojaLabel="Qual é o nome da loja?"
            />
          </div>
        </Container>
      </section>

      {/* 6. Três perguntas que o gestor faz antes de preencher o formulário */}
      <section className="surface-light bg-bg pb-20 sm:pb-28">
        <Container className="max-w-3xl">
          <h2 className="text-h2">Antes de preencher, três perguntas que um gestor faz</h2>
          <div className="mt-8">
            <FaqList faqs={faqs} />
          </div>
          <div className="mt-10 flex flex-col items-start gap-3">
            <LpCta label="faq" location={LOC} className={cx("w-full sm:w-auto")}>
              Quero analisar as vendas da minha loja
            </LpCta>
          </div>
        </Container>
      </section>
    </>
  );
}

function ExampleCard({ title, children, tone }: { title: string; children: ReactNode; tone: "muted" | "strong" }) {
  return (
    <article
      className={
        tone === "strong"
          ? "rounded-[28px] border border-text-primary bg-bg-surface p-7 sm:p-8"
          : "rounded-[28px] border border-border-tertiary p-7 sm:p-8"
      }
    >
      <h3 className="text-h3">{title}</h3>
      <p className="mt-4 leading-7 text-text-secondary">{children}</p>
    </article>
  );
}
