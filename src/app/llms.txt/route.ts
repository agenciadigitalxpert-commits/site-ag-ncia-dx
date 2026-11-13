import { site } from "@/config/site";
import { absoluteUrl } from "@/config/env";
import { isPublished, segments, services, visibleArticles } from "@/lib/content";

/**
 * llms.txt — recurso EXPERIMENTAL de documentação para sistemas de IA.
 * Não é um padrão oficial nem garante descoberta ou citação.
 */
export function GET() {
  const published = visibleArticles.filter(isPublished);
  const lines = [
    `# ${site.name} (${site.shortName})`,
    "",
    `> ${site.description}`,
    "",
    `- Base: ${site.location.city}, ${site.location.stateName}, ${site.location.countryName}`,
    `- Atendimento: empresas de todo o ${site.areaServed}, de forma remota`,
    "- Abordagem: Diagnóstico → Planejamento → Implementação → Acompanhamento → Otimização",
    "- Frentes: Atrair (estratégia, mídia, criativos) · Qualificar (atendimento, CRM, processos) · Converter (acompanhamento comercial e otimização)",
    "",
    "## Institucional",
    `- [Sobre a DX](${absoluteUrl("/sobre")})`,
    `- [Metodologia](${absoluteUrl("/metodologia")})`,
    `- [Contato e diagnóstico](${absoluteUrl("/contato")})`,
    "",
    "## Serviços",
    ...services.map((s) => `- [${s.name}](${absoluteUrl(`/servicos/${s.slug}`)}): ${s.summary}`),
    "",
    "## Segmentos",
    ...segments.map((s) => `- [${s.name}](${absoluteUrl(`/segmentos/${s.slug}`)}): ${s.summary}`),
    ...(published.length
      ? ["", "## Conteúdos", ...published.map((a) => `- [${a.title}](${absoluteUrl(`/conteudos/${a.slug}`)}): ${a.excerpt}`)]
      : []),
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
