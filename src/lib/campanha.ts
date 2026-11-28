/**
 * Landing pages de campanha (/lp/...): segmentos, pergunta de qualificação e validação.
 * Compartilhado entre o formulário (cliente) e a API /api/campanha (servidor).
 */
import { normalizeBrPhone } from "@/lib/lead";

export const CAMPAIGN_SEGMENTS = {
  revenda: {
    segmento: "Revenda de veículos",
    pergunta: "Quantos veículos sua loja tem em estoque hoje?",
    opcoes: ["Até 10", "11 a 30", "31 a 60", "Mais de 60"],
  },
  intermediadora: {
    segmento: "Intermediação de veículos",
    pergunta: "Quantas avaliações presenciais sua unidade realiza por mês?",
    opcoes: ["Até 20", "21 a 50", "51 a 100", "Mais de 100", "Ainda não acompanho"],
  },
} as const;

export type CampaignSegment = keyof typeof CAMPAIGN_SEGMENTS;

export const isCampaignSegment = (v: unknown): v is CampaignSegment =>
  typeof v === "string" && (Object.keys(CAMPAIGN_SEGMENTS) as string[]).includes(v);

export type CampaignInput = {
  nome: string;
  loja: string;
  whatsapp: string;
  resposta: string;
};

export type CampaignErrors = Partial<Record<keyof CampaignInput, string>>;

/** Ordem dos campos (usada para focar o primeiro erro). */
export const CAMPAIGN_FIELDS: (keyof CampaignInput)[] = ["nome", "loja", "whatsapp", "resposta"];

export function validateCampaign(input: Partial<CampaignInput>, segment: CampaignSegment): CampaignErrors {
  const e: CampaignErrors = {};
  const nome = (input.nome ?? "").trim();
  const loja = (input.loja ?? "").trim();
  const whatsapp = input.whatsapp ?? "";

  if (nome.length < 2) e.nome = "Informe seu nome.";
  else if (nome.length > 100) e.nome = "Use no máximo 100 caracteres.";

  if (loja.length < 2) e.loja = "Informe o nome da loja.";
  else if (loja.length > 120) e.loja = "Use no máximo 120 caracteres.";

  if (!whatsapp.trim()) e.whatsapp = "Informe um WhatsApp para contato.";
  else if (!normalizeBrPhone(whatsapp)) e.whatsapp = "Confira o número: use DDD + número, como (47) 99999-9999.";

  if (!(CAMPAIGN_SEGMENTS[segment].opcoes as readonly string[]).includes(input.resposta ?? "")) {
    e.resposta = "Selecione uma opção.";
  }
  return e;
}
