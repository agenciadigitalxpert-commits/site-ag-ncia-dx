"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { track } from "@/lib/analytics";

/** Agrupamento de conteúdo para relatórios (GA4 content_group). */
function contentGroup(path: string) {
  if (path === "/") return "home";
  const first = path.split("/")[1];
  const map: Record<string, string> = {
    servicos: path === "/servicos" ? "servicos_hub" : "servico",
    segmentos: path === "/segmentos" ? "segmentos_hub" : "segmento",
    conteudos: path.startsWith("/conteudos/categoria") || path === "/conteudos" || path.startsWith("/conteudos/pagina") ? "conteudos_hub" : "artigo",
    cases: "cases",
    contato: "contato",
    sobre: "institucional",
    metodologia: "institucional",
    "politica-de-privacidade": "legal",
    "politica-de-cookies": "legal",
  };
  return map[first] ?? "outros";
}

/**
 * Envia `page_view` ao dataLayer no carregamento e a cada navegação interna
 * (o site troca de página sem recarregar). No GTM, use este evento para o
 * page_view do GA4 e desative o envio automático na tag do Google.
 */
export function RouteTracker() {
  const pathname = usePathname();
  const last = useRef<string | null>(null);
  useEffect(() => {
    if (!pathname || last.current === pathname) return;
    const referrer = last.current ? window.location.origin + last.current : document.referrer || undefined;
    last.current = pathname;
    // Aguarda o <title> da nova página ser aplicado.
    const t = window.setTimeout(() => {
      track("page_view", {
        page_location: window.location.href,
        page_path: pathname,
        page_title: document.title,
        page_referrer: referrer,
        content_group: contentGroup(pathname),
      });
    }, 50);
    return () => window.clearTimeout(t);
  }, [pathname]);
  return null;
}
