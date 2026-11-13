"use client";

export type Consent = { v: 1; analytics: boolean; ads: boolean; ts: string };

const KEY = "dx-consent";
export const CONSENT_EVENT = "dx:consent-change";
export const OPEN_PREFS_EVENT = "dx:open-cookie-preferences";

export function readConsent(): Consent | null {
  try {
    const c = JSON.parse(localStorage.getItem(KEY) || "null");
    return c && c.v === 1 ? c : null;
  } catch {
    return null;
  }
}

export function saveConsent(analytics: boolean, ads: boolean) {
  const c: Consent = { v: 1, analytics, ads, ts: new Date().toISOString() };
  try {
    localStorage.setItem(KEY, JSON.stringify(c));
  } catch {}
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: c }));
  return c;
}
