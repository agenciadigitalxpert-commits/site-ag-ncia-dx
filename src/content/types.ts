/**
 * Tipos do conteúdo estruturado do site.
 *
 * Strings marcadas como "RichText" aceitam uma marcação mínima:
 *   - links internos: [texto do link](/rota)
 *   - negrito: **texto**
 * Nada além disso é interpretado.
 */

export type RichText = string;

export type FAQ = {
  /** Pergunta como o visitante faria. */
  q: string;
  /** Resposta direta na primeira frase, depois o contexto. RichText. */
  a: RichText;
};

export type TitledText = { title: string; text: RichText };

export type MetricItem = {
  /** Nome do indicador (ex.: "Custo por lead qualificado"). */
  metric: string;
  /** Por que ele importa / como ler. */
  why: string;
};

export type ComparisonTable = {
  caption: string;
  columns: string[];
  rows: string[][];
};

export type Service = {
  slug: string;
  /** Nome completo exibido (ex.: "Gestão de Google Ads"). */
  name: string;
  /** Rótulo curto para menus (ex.: "Google Ads"). */
  navLabel: string;
  /** Até ~60 caracteres. Não incluir "| DX" — o layout adiciona. */
  metaTitle: string;
  /** 140–160 caracteres. */
  metaDescription: string;
  eyebrow: string;
  h1: string;
  /** Subtítulo do topo da página. */
  lead: string;
  /** 1–2 frases. Usado em cards, listagens e no schema Service. */
  summary: string;
  /** Resposta direta para "O que é ...?" (2–3 frases autossuficientes). */
  definition: { question: string; answer: RichText; paragraphs: RichText[] };
  forWhom: { intro: RichText; items: string[]; notFor?: string[] };
  problems: TitledText[];
  deliverables: { intro: RichText; items: TitledText[]; note: string };
  process: TitledText[];
  roles: { dx: string[]; client: string[] };
  measurement: { intro: RichText; items: MetricItem[] };
  comparison?: ComparisonTable;
  faqs: FAQ[];
  /** slugs de outros serviços */
  related: string[];
  /** slugs de segmentos onde o serviço é mais comum */
  segments: string[];
  cta: { title: string; text: string };
};

export type Segment = {
  slug: string;
  name: string;
  navLabel: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  lead: string;
  summary: string;
  /** Leitura da realidade comercial do segmento. */
  context: { title: string; paragraphs: RichText[] };
  challenges: TitledText[];
  /** Como a DX atua no segmento, organizado em Atrair / Qualificar / Converter. */
  approach: { stage: "Atrair" | "Qualificar" | "Converter"; title: string; text: RichText }[];
  /** Situações ilustrativas — sempre exibidas com o selo "Exemplo ilustrativo". */
  examples: TitledText[];
  objections: { q: string; a: RichText }[];
  /** Obrigatório para saúde: comunicação responsável e normas profissionais. */
  compliance?: { title: string; paragraphs: RichText[] };
  metrics: MetricItem[];
  faqs: FAQ[];
  /** slugs de serviços mais relevantes */
  services: string[];
  cta: { title: string; text: string };
};

export type ArticleBlock =
  | { type: "p"; text: RichText }
  | { type: "h2"; id: string; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: RichText[] }
  | { type: "ol"; items: RichText[] }
  /** Exibido com selo "Exemplo ilustrativo". */
  | { type: "example"; title: string; text: RichText }
  | { type: "table"; table: ComparisonTable }
  | { type: "callout"; text: RichText };

export type ArticleStatus = "review" | "published";

export type Article = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  /** slug da categoria */
  category: string;
  /** Resposta principal, exibida logo abaixo do título (2–4 frases). */
  keyTakeaway: RichText;
  /**
   * "review": texto pronto, aguardando revisão editorial. Aparece só no preview,
   * com aviso, e fica fora do sitemap. Em produção, não é publicado.
   * "published": exige publishedAt real (AAAA-MM-DD).
   */
  status: ArticleStatus;
  publishedAt?: string;
  updatedAt?: string;
  blocks: ArticleBlock[];
  relatedServices: string[];
  relatedSegments: string[];
  cta: { title: string; text: string };
};

export type Category = { slug: string; name: string; description: string };

export type CaseStudy = {
  slug: string;
  /** Somente true quando houver autorização do cliente e dados verificáveis. */
  published: boolean;
  /** Registro interno da autorização (não exibido). */
  authorization?: string;
  title: string;
  client: string;
  segment: string;
  summary: string;
  challenge: RichText[];
  actions: RichText[];
  /** Resultados verificados, com período e fonte. */
  results: { label: string; value: string; period: string; source: string }[];
  services: string[];
  publishedAt?: string;
};
