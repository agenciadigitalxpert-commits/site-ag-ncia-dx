"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/utm";

/**
 * Efeitos globais leves:
 *  - entrada suave dos elementos .reveal (IntersectionObserver; sem JS tudo fica visível);
 *  - captura de UTMs da primeira página da sessão.
 */
export function SiteEffects() {
  useEffect(() => {
    captureAttribution();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    const observe = () =>
      document.querySelectorAll(".reveal:not(.is-visible)").forEach((el) => io.observe(el));
    observe();
    const mo = new MutationObserver(observe);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
  return null;
}
