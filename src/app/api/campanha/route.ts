import { NextResponse } from "next/server";
import { MIN_FILL_MS, normalizeBrPhone } from "@/lib/lead";
import { CAMPAIGN_SEGMENTS, isCampaignSegment, validateCampaign, type CampaignInput } from "@/lib/campanha";
import { cleanAttribution, clientIp, deliver, rateLimited } from "@/lib/webhook";

/**
 * Recebe o formulário das landing pages de campanha (/lp/...) e repassa ao webhook de leads.
 * Mesmas proteções do /api/diagnostico (honeypot, tempo mínimo, limite de taxa), sem filtro de faturamento:
 * o segmento vem da própria página, nunca do navegador.
 *
 * Só responde sucesso (200) quando o webhook confirmou o recebimento.
 */

const MAX_BODY = 4_000;
const CAMPAIGN_PAGE = /^\/lp\/[a-z0-9-]+$/;

const str = (v: unknown, max = 200) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(request: Request) {
  const raw = await request.text();
  if (raw.length > MAX_BODY) {
    return NextResponse.json({ ok: false, code: "too_large", message: "Envio muito grande." }, { status: 413 });
  }

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, code: "bad_request", message: "Dados inválidos." }, { status: 400 });
  }

  // Anti-spam: honeypot e tempo mínimo de preenchimento (resposta genérica, sem revelar o motivo).
  const honeypot = str(body.website, 200);
  const elapsed = Number(body.elapsedMs);
  if (honeypot || !Number.isFinite(elapsed) || elapsed < MIN_FILL_MS) {
    return NextResponse.json(
      { ok: false, code: "rejected", message: "Não foi possível validar o envio. Tente novamente." },
      { status: 400 },
    );
  }

  if (rateLimited(clientIp(request), "campanha", 8)) {
    return NextResponse.json(
      { ok: false, code: "rate_limited", message: "Muitas tentativas em pouco tempo. Aguarde alguns minutos." },
      { status: 429 },
    );
  }

  const segment = body.segmento;
  if (!isCampaignSegment(segment)) {
    return NextResponse.json({ ok: false, code: "bad_request", message: "Dados inválidos." }, { status: 400 });
  }

  const input: CampaignInput = {
    nome: str(body.nome, 100),
    loja: str(body.loja, 120),
    whatsapp: str(body.whatsapp, 30),
    resposta: str(body.resposta, 60),
  };

  const errors = validateCampaign(input, segment);
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, code: "validation", message: "Revise os campos destacados.", errors }, { status: 422 });
  }

  if (!process.env.LEAD_WEBHOOK_URL) {
    console.warn("[campanha] LEAD_WEBHOOK_URL não configurado — envio recusado.");
    return NextResponse.json(
      {
        ok: false,
        code: "not_configured",
        message: "O formulário ainda não está conectado ao nosso sistema de atendimento. Nenhum dado foi registrado.",
      },
      { status: 503 },
    );
  }

  const config = CAMPAIGN_SEGMENTS[segment];
  const page = str(body.page, 200);
  const id = crypto.randomUUID();
  const payload = {
    type: "campanha",
    id,
    receivedAt: new Date().toISOString(),
    lead: {
      nome: input.nome,
      empresa: input.loja,
      whatsapp: normalizeBrPhone(input.whatsapp),
      segmento: config.segmento,
      perguntaQualificacao: `${config.pergunta} → ${input.resposta}`,
    },
    page: CAMPAIGN_PAGE.test(page) ? page : "",
    attribution: cleanAttribution(body.attribution, str),
  };

  try {
    await deliver(payload);
  } catch (err) {
    console.error("[campanha] falha ao repassar lead:", err instanceof Error ? err.message : err);
    return NextResponse.json(
      {
        ok: false,
        code: "delivery_failed",
        message: "Não conseguimos registrar sua solicitação agora. Seus dados continuam no formulário; tente novamente em instantes.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, id });
}
