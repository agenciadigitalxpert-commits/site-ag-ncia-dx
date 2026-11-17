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
    // Retratos: sem mouse (iOS/Android), a cor aparece quando o card cruza o centro da tela.
    const noHover = window.matchMedia("(hover: none)").matches;
    const center = noHover
      ? new IntersectionObserver(
          (entries) => entries.forEach((e) => e.target.classList.toggle("in-view", e.isIntersecting)),
          { rootMargin: "-35% 0px -35% 0px" },
        )
      : null;
    const observeCenter = () => center && document.querySelectorAll(".portrait").forEach((el) => center.observe(el));
    observeCenter();
    const mo = new MutationObserver(() => {
      observe();
      observeCenter();
    });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      center?.disconnect();
      mo.disconnect();
    };
  }, []);
  return null;
}
