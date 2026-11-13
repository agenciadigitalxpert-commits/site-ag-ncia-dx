"use client";

import { OPEN_PREFS_EVENT } from "./store";

export function CookiePreferencesButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={className ?? "link-u hover:text-white"}
      onClick={() => window.dispatchEvent(new Event(OPEN_PREFS_EVENT))}
    >
      Preferências de cookies
    </button>
  );
}
