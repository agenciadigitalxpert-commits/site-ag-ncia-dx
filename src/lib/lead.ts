/**
 * Definição e validação do formulário de diagnóstico.
 * Compartilhado entre cliente (validação imediata) e servidor (validação final).
 */

export const SEGMENT_OPTIONS = [
  "Intermediação de veículos ou revenda",
  "Oficina, funilaria ou estética automotiva",
  "Clínica de estética",
  "Dermatologia",
  "Clínica odontológica",
  "Delivery ou alimentação",
  "Outro segmento",
] as const;

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

export type LeadInput = {
  nome: string;
  empresa: string;
  whatsapp: string;
  segmento: string;
  desafio: string;
  // etapa 2 (opcional)
  investeAnuncios?: string;
  investimentoMidia?: string;
  siteOuInstagram?: string;
  detalhes?: string;
};

export type LeadErrors = Partial<Record<keyof LeadInput, string>>;

export const STEP1_FIELDS = ["nome", "empresa", "whatsapp", "segmento", "desafio"] as const;

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

export function validateLead(input: Partial<LeadInput>, scope: "step1" | "all" = "all"): LeadErrors {
  const e: LeadErrors = {};
  const nome = (input.nome ?? "").trim();
  const empresa = (input.empresa ?? "").trim();

  if (nome.length < 2) e.nome = "Informe seu nome.";
  else if (nome.length > 100) e.nome = "Use no máximo 100 caracteres.";

  if (empresa.length < 2) e.empresa = "Informe o nome da empresa.";
  else if (empresa.length > 120) e.empresa = "Use no máximo 120 caracteres.";

  if (!(input.whatsapp ?? "").trim()) e.whatsapp = "Informe um WhatsApp para contato.";
  else if (!normalizeBrPhone(input.whatsapp!)) e.whatsapp = "Confira o número: use DDD + número, como (47) 99999-9999.";

  if (!input.segmento) e.segmento = "Selecione o segmento da empresa.";
  else if (!inList(SEGMENT_OPTIONS, input.segmento)) e.segmento = "Selecione uma opção da lista.";

  if (!input.desafio) e.desafio = "Selecione o principal desafio hoje.";
  else if (!inList(CHALLENGE_OPTIONS, input.desafio)) e.desafio = "Selecione uma opção da lista.";

  if (scope === "all") {
    if (!inList(ADS_OPTIONS, input.investeAnuncios)) e.investeAnuncios = "Selecione uma opção da lista.";
    if (!inList(BUDGET_OPTIONS, input.investimentoMidia)) e.investimentoMidia = "Selecione uma opção da lista.";
    if ((input.siteOuInstagram ?? "").length > 200) e.siteOuInstagram = "Use no máximo 200 caracteres.";
    if ((input.detalhes ?? "").length > 1000) e.detalhes = "Use no máximo 1.000 caracteres.";
  }
  return e;
}

/** Tempo mínimo (ms) entre abrir o formulário e enviar — filtro simples de robôs. */
export const MIN_FILL_MS = 2500;
