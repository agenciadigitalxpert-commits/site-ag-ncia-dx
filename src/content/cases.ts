import type { CaseStudy } from "./types";

/**
 * Cases. Publique (published: true) SOMENTE com autorização registrada do cliente
 * e resultados verificáveis (período e fonte). Entradas com published: false
 * aparecem apenas no ambiente de edição local (npm run dev), com aviso.
 */
export const cases: CaseStudy[] = [
  {
    slug: "modelo-de-case",
    published: false,
    title: "[MODELO] Estrutura de case — substituir por um case autorizado",
    client: "[Nome do cliente ou descrição anonimizada autorizada]",
    segment: "oficinas-e-funilarias",
    summary: "[Resumo em 1–2 frases: contexto, o que foi feito e o principal aprendizado.]",
    challenge: ["[Situação inicial do cliente, com dados verificáveis.]"],
    actions: ["[O que a DX implementou — mídia, criativos, página, processo comercial, CRM.]"],
    results: [{ label: "[Indicador]", value: "[Valor verificado]", period: "[Período]", source: "[Fonte: CRM, plataforma de anúncios...]" }],
    services: ["google-ads", "estruturacao-comercial"],
  },
];

export const publishedCases = cases.filter((c) => c.published);
export const visibleCases = process.env.NODE_ENV === "development" ? cases : publishedCases;
export const getCase = (slug: string) => visibleCases.find((c) => c.slug === slug);
