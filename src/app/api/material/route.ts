import { NextResponse } from "next/server";
import { MIN_FILL_MS, normalizeBrPhone, validateLead } from "@/lib/lead";
import { cleanAttribution, clientIp, deliver, rateLimited, webhookConfigured } from "@/lib/webhook";
import { materials } from "@/content/materials";

/**
 * Libera um material para download depois de registrar o contato (lead frio).
 * O caminho do arquivo só é devolvido quando a planilha confirmou o recebimento.
 */

const str = (v: unknown, max = 1000) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(request: Request) {
  const raw = await request.text();
  if (raw.length > 6_000) return NextResponse.json({ ok: false, code: "too_large", message: "Envio muito grande." }, { status: 413 });

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, code: "bad_request", message: "Dados inválidos." }, { status: 400 });
  }

  const material = materials.find((m) => m.slug === str(body.material, 100));
  if (!material) return NextResponse.json({ ok: false, code: "not_found", message: "Material não encontrado." }, { status: 404 });

  const elapsed = Number(body.elapsedMs);
  if (str(body.website, 200) || !Number.isFinite(elapsed) || elapsed < MIN_FILL_MS) {
    return NextResponse.json({ ok: false, code: "rejected", message: "Não foi possível validar o envio. Tente novamente." }, { status: 400 });
  }
  if (rateLimited(clientIp(request), "material", 10)) {
    return NextResponse.json({ ok: false, code: "rate_limited", message: "Muitas tentativas em pouco tempo. Aguarde alguns minutos." }, { status: 429 });
  }

  const input = { nome: str(body.nome, 100), empresa: str(body.empresa, 120), whatsapp: str(body.whatsapp, 30) };
  const errors = validateLead(input, "contact");
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, code: "validation", message: "Revise os campos destacados.", errors }, { status: 422 });
  }

  if (!webhookConfigured()) {
    return NextResponse.json({ ok: false, code: "not_configured", message: "Os downloads estão em configuração. Tente novamente mais tarde." }, { status: 503 });
  }

  const id = crypto.randomUUID();
  try {
    await deliver({
      type: "material",
      id,
      receivedAt: new Date().toISOString(),
      lead: { ...input, whatsapp: normalizeBrPhone(input.whatsapp) },
      material: { slug: material.slug, title: material.title },
      page: str(body.page, 200),
      attribution: cleanAttribution(body.attribution, str),
    });
  } catch (err) {
    console.error("[material] falha ao registrar contato:", err instanceof Error ? err.message : err);
    return NextResponse.json({ ok: false, code: "delivery_failed", message: "Não conseguimos liberar o material agora. Tente novamente em instantes." }, { status: 502 });
  }

  return NextResponse.json({ ok: true, id, file: material.file });
}
