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
    title: "[Modelo de estudo de caso autorizado]",
    client: "[Nome do cliente ou descrição anonimizada autorizada]",
    segment: "oficinas-e-funilarias",
    summary: "[Resuma em uma ou duas frases o contexto, o trabalho e o aprendizado.]",
    challenge: ["[Situação inicial do cliente, com dados verificáveis.]"],
    actions: ["[Descreva o trabalho realizado pela DX.]"],
    results: [{ label: "[Indicador]", value: "[Valor verificado]", period: "[Período]", source: "[Fonte: CRM, plataforma de anúncios...]" }],
    services: ["google-ads", "estruturacao-comercial"],
  },
];

export const publishedCases = cases.filter((c) => c.published);
export const visibleCases = process.env.NODE_ENV === "development" ? cases : publishedCases;
export const getCase = (slug: string) => visibleCases.find((c) => c.slug === slug);
