"use client";

import { readConsent } from "@/components/consent/store";

const KEY = "dx-attribution";
const CLICK_KEY = "dx-click";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;
/** Identificadores de clique do Google Ads (gclid; gbraid/wbraid em iOS). */
const CLICK_KEYS = ["gclid", "gbraid", "wbraid"] as const;
/** O Google Ads aceita conversões offline até 90 dias depois do clique. */
const CLICK_TTL_MS = 90 * 24 * 60 * 60 * 1000;

type ClickIds = Partial<Record<(typeof CLICK_KEYS)[number], string>> & { click_at?: string };

export type Attribution = Partial<Record<(typeof UTM_KEYS)[number], string>> &
  ClickIds & {
    landing_page?: string;
    referrer_host?: string;
  };

/**
 * Guarda o identificador do clique do anúncio para enviar junto com o lead e,
 * depois, importar no Google Ads os leads qualificados (conversões offline).
 * Na sessão: sempre (vale só para esta visita). Por 90 dias: só com consentimento
 * de publicidade (LGPD), para atribuir quem volta dias depois e envia o formulário.
 */
function captureClickIds() {
  try {
    const params = new URLSearchParams(window.location.search);
    const ids: ClickIds = {};
    for (const k of CLICK_KEYS) {
      const v = params.get(k);
      if (v && /^[\w-]{10,200}$/.test(v)) ids[k] = v;
    }
    if (!Object.keys(ids).length) return;
    ids.click_at = new Date().toISOString();
    const raw = JSON.stringify(ids);
    sessionStorage.setItem(CLICK_KEY, raw);
    if (readConsent()?.ads) localStorage.setItem(CLICK_KEY, raw);
    else localStorage.removeItem(CLICK_KEY);
  } catch {}
}

function readClickIds(): ClickIds {
  try {
    const session = sessionStorage.getItem(CLICK_KEY);
    if (session) return JSON.parse(session);
    if (!readConsent()?.ads) return {};
    const saved: ClickIds = JSON.parse(localStorage.getItem(CLICK_KEY) || "{}");
    const at = saved.click_at ? Date.parse(saved.click_at) : NaN;
    if (!Number.isFinite(at) || Date.now() - at > CLICK_TTL_MS) {
      localStorage.removeItem(CLICK_KEY);
      return {};
    }
    return saved;
  } catch {
    return {};
  }
}

/** Guarda UTMs da primeira página da sessão (sessionStorage, sem dados pessoais). */
export function captureAttribution() {
  captureClickIds();
  try {
    if (sessionStorage.getItem(KEY)) return;
    const params = new URLSearchParams(window.location.search);
    const data: Attribution = {};
    for (const k of UTM_KEYS) {
      const v = params.get(k);
      if (v) data[k] = v.slice(0, 150);
    }
    data.landing_page = window.location.pathname.slice(0, 200);
    if (document.referrer) {
      try {
        const host = new URL(document.referrer).host;
        if (host && host !== window.location.host) data.referrer_host = host;
      } catch {}
    }
    sessionStorage.setItem(KEY, JSON.stringify(data));
  } catch {}
}

export function readAttribution(): Attribution {
  let utm: Attribution = {};
  try {
    utm = JSON.parse(sessionStorage.getItem(KEY) || "{}");
  } catch {}
  return { ...utm, ...readClickIds() };
}
