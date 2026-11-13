"use client";

const KEY = "dx-attribution";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;

export type Attribution = Partial<Record<(typeof UTM_KEYS)[number], string>> & {
  landing_page?: string;
  referrer_host?: string;
};

/** Guarda UTMs da primeira página da sessão (sessionStorage, sem dados pessoais). */
export function captureAttribution() {
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
  try {
    return JSON.parse(sessionStorage.getItem(KEY) || "{}");
  } catch {
    return {};
  }
}
