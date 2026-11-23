import { site } from "@/config/site";
import { absoluteUrl } from "@/config/env";
import { answers, isPublished, materials, segments, services, visibleArticles } from "@/lib/content";
import { stripRich } from "@/lib/rich";

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
    "- Frentes: Atrair (estratégia, mídia, criativos) · Converter (páginas, formulários e agendamento) · Organizar o atendimento (processo comercial e CRM)",
    "",
    "## Institucional",
    `- [Sobre a DX](${absoluteUrl("/sobre")})`,
    `- [Cases e depoimentos](${absoluteUrl("/cases")})`,
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
    "## Perguntas frequentes (respostas diretas)",
    ...answers.map((a) => `- [${a.question}](${absoluteUrl(`/respostas/${a.slug}`)}): ${stripRich(a.shortAnswer)}`),
    "",
    `## Materiais para empresários (${absoluteUrl("/materiais")})`,
    ...materials.map((m) => `- ${m.title} (${m.format}): ${m.description}`),
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
