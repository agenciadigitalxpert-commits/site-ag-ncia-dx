import { NextResponse, type NextRequest } from "next/server";
import { categories, segments, services, visibleArticles, articlePageCount } from "@/lib/content";
import { visibleCases } from "@/content/cases";

/**
 * Garante status HTTP 404 real para slugs inexistentes em rotas dinâmicas.
 * (Com prerender parcial, um notFound() tardio devolveria a página 404 com status 200.)
 */
const known: Record<string, Set<string>> = {
  servicos: new Set(services.map((s) => s.slug)),
  segmentos: new Set(segments.map((s) => s.slug)),
  conteudos: new Set(visibleArticles.map((a) => a.slug)),
  cases: new Set(visibleCases.map((c) => c.slug)),
  categoria: new Set(categories.map((c) => c.slug)),
  pagina: new Set(Array.from({ length: Math.max(0, articlePageCount - 1) }, (_, i) => String(i + 2))),
};

export function proxy(request: NextRequest) {
  const parts = request.nextUrl.pathname.replace(/\/+$/, "").split("/").filter(Boolean);
  let ok = true;
  if (parts.length === 2 && parts[0] in known && parts[0] !== "categoria" && parts[0] !== "pagina") {
    ok = known[parts[0]].has(parts[1]);
  } else if (parts.length === 3 && parts[0] === "conteudos" && (parts[1] === "categoria" || parts[1] === "pagina")) {
    ok = known[parts[1]].has(parts[2]);
  } else if (parts.length > 2 && ["servicos", "segmentos", "cases"].includes(parts[0])) {
    ok = false;
  } else if (parts.length > 3 && parts[0] === "conteudos") {
    ok = false;
  }
  if (ok) return NextResponse.next();
  return NextResponse.rewrite(new URL("/__pagina-nao-encontrada", request.url));
}

export const config = {
  matcher: ["/servicos/:path+", "/segmentos/:path+", "/conteudos/:path+", "/cases/:path+"],
};
