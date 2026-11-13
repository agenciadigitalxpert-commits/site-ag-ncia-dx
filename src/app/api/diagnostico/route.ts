import { NextResponse } from "next/server";
import { MIN_FILL_MS, normalizeBrPhone, validateLead, type LeadInput } from "@/lib/lead";

/**
 * Recebe o formulário de diagnóstico e repassa para o CRM/webhook.
 *
 * Variáveis (somente servidor):
 *   LEAD_WEBHOOK_URL     URL que recebe o POST em JSON (CRM, n8n, Make, Zapier, RD Station...)
 *   LEAD_WEBHOOK_SECRET  opcional; enviado no header "X-DX-Signature" (HMAC SHA-256 do corpo)
 *
 * Só responde sucesso (200) quando o webhook confirmou o recebimento com status 2xx.
 */

const MAX_BODY = 8_000;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) hits.clear();
  return list.length > RATE_MAX;
}

async function sign(body: string, secret: string) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(body));
  return Array.from(new Uint8Array(sig), (b) => b.toString(16).padStart(2, "0")).join("");
}

const str = (v: unknown, max = 1000) => (typeof v === "string" ? v.trim().slice(0, max) : "");

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

  // Anti-spam: honeypot e tempo mínimo de preenchimento.
  // Respondemos 400 genérico sem revelar o motivo.
  const honeypot = str(body.website, 200);
  const elapsed = Number(body.elapsedMs);
  if (honeypot || !Number.isFinite(elapsed) || elapsed < MIN_FILL_MS) {
    return NextResponse.json(
      { ok: false, code: "rejected", message: "Não foi possível validar o envio. Tente novamente." },
      { status: 400 },
    );
  }

  const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "local";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, code: "rate_limited", message: "Muitas tentativas em pouco tempo. Aguarde alguns minutos." },
      { status: 429 },
    );
  }

  const input: LeadInput = {
    nome: str(body.nome, 100),
    empresa: str(body.empresa, 120),
    whatsapp: str(body.whatsapp, 30),
    segmento: str(body.segmento, 80),
    desafio: str(body.desafio, 80),
    investeAnuncios: str(body.investeAnuncios, 60) || undefined,
    investimentoMidia: str(body.investimentoMidia, 60) || undefined,
    siteOuInstagram: str(body.siteOuInstagram, 200) || undefined,
    detalhes: str(body.detalhes, 1000) || undefined,
  };

  const errors = validateLead(input, "all");
  if (Object.keys(errors).length) {
    return NextResponse.json(
      { ok: false, code: "validation", message: "Revise os campos destacados.", errors },
      { status: 422 },
    );
  }

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (!webhook) {
    console.warn("[diagnostico] LEAD_WEBHOOK_URL não configurado — envio recusado.");
    return NextResponse.json(
      {
        ok: false,
        code: "not_configured",
        message: "O formulário ainda não está conectado ao nosso sistema de atendimento. Nenhum dado foi registrado.",
      },
      { status: 503 },
    );
  }

  const attr = (typeof body.attribution === "object" && body.attribution) || {};
  const attribution = Object.fromEntries(
    Object.entries(attr as Record<string, unknown>)
      .filter(([k]) => /^(utm_(source|medium|campaign|term|content)|landing_page|referrer_host)$/.test(k))
      .map(([k, v]) => [k, str(v, 200)]),
  );

  const payload = JSON.stringify({
    type: "diagnostico",
    receivedAt: new Date().toISOString(),
    lead: { ...input, whatsapp: normalizeBrPhone(input.whatsapp) },
    page: str(body.page, 200),
    attribution,
  });

  try {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (process.env.LEAD_WEBHOOK_SECRET) headers["X-DX-Signature"] = await sign(payload, process.env.LEAD_WEBHOOK_SECRET);
    const res = await fetch(webhook, { method: "POST", headers, body: payload, signal: AbortSignal.timeout(10_000) });
    if (!res.ok) throw new Error(`Webhook respondeu ${res.status}`);
  } catch (err) {
    console.error("[diagnostico] falha ao repassar lead:", err instanceof Error ? err.message : err);
    return NextResponse.json(
      { ok: false, code: "delivery_failed", message: "Não conseguimos registrar sua solicitação agora. Seus dados continuam no formulário; tente novamente em instantes." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, id: crypto.randomUUID() });
}
