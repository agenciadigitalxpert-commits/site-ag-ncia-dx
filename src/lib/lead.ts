/**
 * Definição e validação do formulário de diagnóstico.
 * Compartilhado entre cliente (validação imediata) e servidor (validação final).
 */

export const CHALLENGE_OPTIONS = [
  "Gerar mais oportunidades de venda",
  "Melhorar a qualidade dos contatos que chegam",
  "Organizar o atendimento e o follow-up",
  "Entender quais campanhas geram vendas",
  "Reduzir a dependência de indicação",
  "Estruturar o processo comercial",
  "Outro desafio",
] as const;

export const ADS_OPTIONS = ["Sim, invisto atualmente", "Já investi, mas parei", "Ainda não invisto"] as const;

export const BUDGET_OPTIONS = [
  "Até R$ 2 mil por mês",
  "De R$ 2 mil a R$ 5 mil por mês",
  "De R$ 5 mil a R$ 10 mil por mês",
  "De R$ 10 mil a R$ 30 mil por mês",
  "Acima de R$ 30 mil por mês",
  "Ainda não sei / prefiro não informar",
] as const;

/** Faturamento mensal (filtro de perfil). O diagnóstico é para empresas a partir de R$ 50 mil/mês. */
export const REVENUE_OPTIONS = [
  "Até R$ 20 mil por mês",
  "De R$ 20 mil a R$ 50 mil por mês",
  "De R$ 50 mil a R$ 100 mil por mês",
  "De R$ 100 mil a R$ 300 mil por mês",
  "De R$ 300 mil a R$ 1 milhão por mês",
  "Acima de R$ 1 milhão por mês",
] as const;
export const MIN_REVENUE_LABEL = "R$ 50 mil por mês";
/** Faixas que atendem ao perfil (a partir de R$ 50 mil/mês). */
export const isQualifiedRevenue = (v?: string) => REVENUE_OPTIONS.indexOf(v as (typeof REVENUE_OPTIONS)[number]) >= 2;

export type LeadInput = {
  nome: string;
  empresa: string;
  whatsapp: string;
  faturamento: string;
  // Etapa 2: segmento, desafio e anúncios são obrigatórios; o resto é opcional.
  segmento?: string;
  desafio?: string;
  investeAnuncios?: string;
  investimentoMidia?: string;
  siteOuInstagram?: string;
  detalhes?: string;
};

export type LeadErrors = Partial<Record<keyof LeadInput, string>>;

export const STEP1_FIELDS = ["nome", "empresa", "whatsapp", "faturamento"] as const;

export function onlyDigits(v: string) {
  return v.replace(/\D/g, "");
}

/** Aceita (DD) 9XXXX-XXXX, DD XXXX-XXXX, com ou sem +55. Retorna dígitos com 55 ou null. */
export function normalizeBrPhone(v: string): string | null {
  let d = onlyDigits(v);
  if (d.length === 12 || d.length === 13) {
    if (!d.startsWith("55")) return null;
    d = d.slice(2);
  }
  if (d.length !== 10 && d.length !== 11) return null;
  const ddd = Number(d.slice(0, 2));
  if (ddd < 11 || ddd > 99) return null;
  if (d.length === 11 && d[2] !== "9") return null;
  return `55${d}`;
}

export function formatBrPhone(v: string) {
  let d = onlyDigits(v);
  if (d.startsWith("55") && d.length > 11) d = d.slice(2);
  d = d.slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

const inList = (list: readonly string[], v?: string) => !v || list.includes(v);

/**
 * "contact": só nome, empresa e WhatsApp (formulário dos materiais).
 * "step1": contato + faturamento. "all": o mesmo + campos opcionais sobre a empresa (validados só se vierem).
 */
export function validateLead(input: Partial<LeadInput>, scope: "contact" | "step1" | "all" = "all"): LeadErrors {
  const e: LeadErrors = {};
  const nome = (input.nome ?? "").trim();
  const empresa = (input.empresa ?? "").trim();

  if (nome.length < 2) e.nome = "Informe seu nome.";
  else if (nome.length > 100) e.nome = "Use no máximo 100 caracteres.";

  if (empresa.length < 2) e.empresa = "Informe o nome da empresa.";
  else if (empresa.length > 120) e.empresa = "Use no máximo 120 caracteres.";

  if (!(input.whatsapp ?? "").trim()) e.whatsapp = "Informe um WhatsApp para contato.";
  else if (!normalizeBrPhone(input.whatsapp!)) e.whatsapp = "Confira o número: use DDD + número, como (47) 99999-9999.";

  if (scope !== "contact" && !(REVENUE_OPTIONS as readonly string[]).includes(input.faturamento ?? "")) {
    e.faturamento = "Selecione a faixa de faturamento.";
  }

  if (scope === "all") {
    // Perguntas sobre a empresa são opcionais: a pré-vendas completa pelo WhatsApp (menos atrito = mais leads).
    if ((input.segmento ?? "").trim().length > 80) e.segmento = "Use no máximo 80 caracteres.";
    if (!inList(CHALLENGE_OPTIONS, input.desafio)) e.desafio = "Selecione o principal desafio.";
    if (!inList(ADS_OPTIONS, input.investeAnuncios)) e.investeAnuncios = "Selecione uma opção.";
    if (!inList(BUDGET_OPTIONS, input.investimentoMidia)) e.investimentoMidia = "Selecione uma opção da lista.";
    if ((input.siteOuInstagram ?? "").length > 200) e.siteOuInstagram = "Use no máximo 200 caracteres.";
    if ((input.detalhes ?? "").length > 1000) e.detalhes = "Use no máximo 1.000 caracteres.";
  }
  return e;
}

/** Tempo mínimo (ms) entre abrir o formulário e enviar — filtro simples de robôs. */
export const MIN_FILL_MS = 2500;
