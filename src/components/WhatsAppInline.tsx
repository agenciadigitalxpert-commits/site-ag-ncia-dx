"use client";

import { track } from "@/lib/analytics";

export function WhatsAppInline({ number }: { number: string }) {
  const pretty = `+${number.slice(0, 2)} (${number.slice(2, 4)}) ${number.slice(4, -4)}-${number.slice(-4)}`;
  return (
    <p className="mt-3">
      <a
        href={`https://wa.me/${number}`}
        target="_blank"
        rel="noopener noreferrer"
        className="link-u"
        onClick={() => track("whatsapp_click", { link_location: "contact_page" })}
      >
        WhatsApp: {pretty}
      </a>
    </p>
  );
}
