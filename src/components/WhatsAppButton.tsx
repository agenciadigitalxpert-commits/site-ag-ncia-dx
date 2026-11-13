"use client";

import { track } from "@/lib/analytics";

/** Renderizado apenas quando NEXT_PUBLIC_WHATSAPP_NUMBER tem um número real. */
export function WhatsAppButton({ number }: { number: string }) {
  const href = `https://wa.me/${number}?text=${encodeURIComponent("Olá! Vim pelo site da Agência Digital Xpert e quero conversar sobre um diagnóstico.")}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("whatsapp_click", { link_location: "floating_button" })}
      className="fixed bottom-24 right-4 z-30 grid size-14 place-items-center rounded-full bg-[#25d366] text-white shadow-lg shadow-black/30 transition-transform hover:scale-105 sm:bottom-6 sm:right-6"
      aria-label="Conversar no WhatsApp (abre em nova aba)"
    >
      <svg aria-hidden viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
        <path d="M12.04 2a9.9 9.9 0 0 0-8.5 15l-1.4 5 5.1-1.3A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3a8.2 8.2 0 1 1 6.9 3.8Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z" />
      </svg>
    </a>
  );
}
