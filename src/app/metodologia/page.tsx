import { pageMetadata } from "@/lib/seo";
import { breadcrumbNode, faqNode, graph, webPageNode } from "@/lib/schema";
import { methodSteps } from "@/content/method";
import type { FAQ } from "@/content/types";
import { JsonLd } from "@/components/JsonLd";
import { FaqList } from "@/components/Faq";
import { CtaSection, DataTable, PageHero, SectionHeader } from "@/components/sections";
import { Container, Eyebrow, Section } from "@/components/ui";

const TITLE = "Metodologia: do diagnóstico à otimização";
const DESC =
  "Veja como a DX trabalha: diagnóstico, planejamento, implementação, acompanhamento e otimização de mídia, atendimento e processo comercial, com papéis claros.";
const crumbs = [
  { name: "Início", href: "/" },
  { name: "Metodologia", href: "/metodologia" },
];

export const metadata = pageMetadata({ title: TITLE, description: DESC, path: "/metodologia" });

const faqs: FAQ[] = [
  { q: "Por que começar pelo diagnóstico e não direto pelas campanhas?", a: "Porque o gargalo nem sempre está na mídia. Se o problema for atendimento lento ou oferta pouco clara, aumentar o investimento em anúncios só aumenta o desperdício. O diagnóstico mostra onde agir primeiro." },
  { q: "Preciso contratar todas as etapas e serviços?", a: "Não. O escopo é definido a partir do diagnóstico e pode começar por uma frente específica, como [Google Ads](/servicos/google-ads) ou [estruturação comercial](/servicos/estruturacao-comercial), e evoluir conforme a operação amadurece." },
  { q: "Essa metodologia é um método registrado ou certificado?", a: "Não. É a forma como organizamos o trabalho para dar clareza ao processo. A sequência é flexível e se adapta ao momento de cada empresa." },
  { q: "Como acompanho o andamento do trabalho?", a: "Com indicadores combinados no planejamento, que conectam mídia, atendimento e vendas. A forma e a frequência do acompanhamento são definidas no escopo de cada projeto." },
  { q: "O que acontece quando algo não funciona?", a: "Investigamos em qual etapa está o problema — campanha, página, atendimento ou oferta — e ajustamos. Testar, medir e corrigir faz parte do processo; o importante é decidir com base em dados." },
];

export default function MethodPage() {
  return (
    <>
      <JsonLd data={graph(webPageNode({ path: "/metodologia", name: TITLE, description: DESC }), breadcrumbNode("/metodologia", crumbs), faqNode("/metodologia", faqs))} />
      <PageHero
        crumbs={crumbs}
        eyebrow="Metodologia"
        title="Primeiro entender a operação. Depois investir. Sempre medir."
        lead="Nossa forma de trabalhar segue cinco etapas: diagnóstico, planejamento, implementação, acompanhamento e otimização. É uma sequência de bom senso — não uma fórmula — para conectar mídia, atendimento e vendas."
        ctaLocation="method_hero"
        secondary={null}
      />

      <Section tone="light" labelledBy="etapas">
        <Container>
          <SectionHeader id="etapas" eyebrow="As etapas" title="Como o trabalho evolui" />
          <ol className="mt-14 space-y-4">
            {methodSteps.map((s, i) => (
              <li key={s.slug} id={s.slug} className="reveal grid gap-8 rounded-3xl border border-line-light p-7 sm:p-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
                <div>
                  <span className="text-sm tabular-nums text-muted-light">Etapa {String(i + 1).padStart(2, "0")}</span>
                  <h3 className="text-h2 mt-3">{s.title}</h3>
                  <p className="mt-4 leading-relaxed text-muted-light">{s.goal}</p>
                </div>
                <div className="grid gap-8 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-light">O que acontece</h4>
                    <ul className="mt-4 space-y-2.5">
                      {s.what.map((w) => (
                        <li key={w} className="flex gap-3 leading-relaxed"><span aria-hidden className="mt-3 h-px w-3 shrink-0 bg-ink/60" />{w}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-light">Participação da empresa</h4>
                    <p className="mt-3 leading-relaxed">{s.client}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-light">Resultado da etapa</h4>
                    <p className="mt-3 leading-relaxed">{s.output}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section tone="paper2" labelledBy="papeis">
        <Container>
          <SectionHeader id="papeis" eyebrow="Responsabilidades" title="O que depende da DX e o que depende da sua empresa" intro="Resultado comercial é compartilhado. Esta divisão evita expectativas desalinhadas." />
          <div className="mt-12">
            <DataTable
              caption="Divisão de responsabilidades entre a DX e a empresa cliente."
              columns={["Fator", "DX", "Empresa"]}
              rows={[
                ["Estratégia e mídia", "Planeja, configura, acompanha e otimiza as campanhas.", "Define o investimento em mídia e valida prioridades."],
                ["Comunicação", "Propõe ângulos, roteiros, criativos e páginas.", "Aprova as peças e garante que a oferta comunicada é real."],
                ["Atendimento", "Desenha critérios, roteiros, etapas e automações.", "Atende os leads com agilidade e segue o processo combinado."],
                ["Dados", "Configura a mensuração e interpreta os indicadores.", "Registra o andamento das oportunidades e o resultado das vendas."],
                ["Fatores de mercado", "Leva em conta concorrência e sazonalidade nas decisões.", "Informa mudanças de estoque, agenda, preço e capacidade."],
              ]}
            />
          </div>
        </Container>
      </Section>

      <Section tone="light" labelledBy="faq">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-20">
            <div className="reveal">
              <Eyebrow>Perguntas frequentes</Eyebrow>
              <h2 id="faq" className="text-h2">Dúvidas sobre o processo</h2>
            </div>
            <div className="reveal"><FaqList faqs={faqs} /></div>
          </div>
        </Container>
      </Section>

      <CtaSection location="method_final" title="O primeiro passo é o diagnóstico." />
    </>
  );
}
