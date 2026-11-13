"use client";

/**
 * Camada única de eventos. Ver docs/mensuracao.md para o mapa de eventos.
 *  - Sempre empurra para window.dataLayer (fila local; nada sai do navegador
 *    sem que GTM/GA4/Pixel tenham sido carregados após consentimento).
 *  - Nunca envie dados pessoais (nome, telefone, e-mail) nos parâmetros.
 */

export type AnalyticsEvent =
  | "cta_click"
  | "whatsapp_click"
  | "form_start"
  | "form_step_complete"
  | "generate_lead";

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

const PII_KEYS = /nome|name|email|e-mail|phone|telefone|whatsapp_number|cpf/i;

export function track(event: AnalyticsEvent, params: Params = {}) {
  if (typeof window === "undefined") return;
  const safe: Params = {};
  for (const [k, v] of Object.entries(params)) {
    if (!PII_KEYS.test(k) && v !== undefined) safe[k] = v;
  }
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...safe });

  // GA4 direto (quando usado sem GTM). Com GTM, as tags leem o dataLayer.
  if (typeof window.gtag === "function" && !window.__dxGtm) {
    window.gtag("event", event, safe);
  }
  // Meta Pixel: só o lead confirmado vira evento padrão "Lead".
  if (typeof window.fbq === "function") {
    if (event === "generate_lead") window.fbq("track", "Lead", { content_category: safe.segment });
    else if (event === "whatsapp_click") window.fbq("trackCustom", "WhatsAppClick");
  }
}

declare global {
  interface Window {
    __dxGtm?: boolean;
  }
}
