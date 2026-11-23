/**
 * Envio de leads para o webhook (Google Apps Script, CRM, n8n...). Só no servidor.
 *
 *   LEAD_WEBHOOK_URL     URL que recebe o POST em JSON
 *   LEAD_WEBHOOK_SECRET  opcional; enviado no header "X-DX-Signature" (HMAC SHA-256 do corpo)
 *
 * Google Apps Script não lê cabeçalhos HTTP: autentique com ?token=... na própria URL.
 * Como ele responde 200 até em caso de erro, para URLs do Apps Script exigimos { ok: true }.
 */

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const hits = new Map<string, number[]>();

/** Limite simples por IP e por tipo de formulário (em memória, por instância). */
export function rateLimited(ip: string, bucket = "default", max = RATE_MAX) {
  const key = `${bucket}:${ip}`;
  const now = Date.now();
  const list = (hits.get(key) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  list.push(now);
  hits.set(key, list);
  if (hits.size > 5000) hits.clear();
  return list.length > max;
}

export function clientIp(request: Request) {
  return (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "local";
}

async function sign(body: string, secret: string) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(body));
  return Array.from(new Uint8Array(sig), (b) => b.toString(16).padStart(2, "0")).join("");
}

export const webhookConfigured = () => Boolean(process.env.LEAD_WEBHOOK_URL);

/** Lê os campos de origem permitidos (UTMs, página de entrada e identificadores de clique). */
export function cleanAttribution(attr: unknown, str: (v: unknown, max?: number) => string) {
  const obj = (typeof attr === "object" && attr) || {};
  return Object.fromEntries(
    Object.entries(obj as Record<string, unknown>)
      .filter(([k]) => /^(utm_(source|medium|campaign|term|content)|landing_page|referrer_host|gclid|gbraid|wbraid|click_at)$/.test(k))
      .map(([k, v]) => [k, str(v, 200)])
      // Identificadores de clique: só caracteres válidos (vão para a planilha e para o Google Ads).
      .filter(([k, v]) => !/^(gclid|gbraid|wbraid)$/.test(k) || /^[\w-]{10,200}$/.test(v)),
  );
}

/** Envia o payload e lança erro se o destino não confirmar o recebimento. */
export async function deliver(payload: object) {
  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (!webhook) throw new Error("LEAD_WEBHOOK_URL não configurado");
  const body = JSON.stringify(payload);
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (process.env.LEAD_WEBHOOK_SECRET) headers["X-DX-Signature"] = await sign(body, process.env.LEAD_WEBHOOK_SECRET);
  const res = await fetch(webhook, { method: "POST", headers, body, redirect: "follow", signal: AbortSignal.timeout(15_000) });
  if (!res.ok) throw new Error(`Webhook respondeu ${res.status}`);
  const text = await res.text();
  let parsed: { ok?: unknown } | null = null;
  try {
    parsed = JSON.parse(text);
  } catch {}
  const isAppsScript = /^https:\/\/script\.google(usercontent)?\.com\//.test(webhook);
  if (isAppsScript ? parsed?.ok !== true : parsed?.ok === false) {
    throw new Error(`Webhook não confirmou o recebimento${isAppsScript ? " (Apps Script)" : ""}`);
  }
}
