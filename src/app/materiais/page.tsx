import { statSync } from "node:fs";
import { join } from "node:path";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbNode, graph, webPageNode } from "@/lib/schema";
import { absoluteUrl } from "@/config/env";
import { site } from "@/config/site";
import { getArticle, materials } from "@/lib/content";
import { JsonLd } from "@/components/JsonLd";
import { MaterialDownload } from "@/components/MaterialDownload";
import { CtaSection, PageHero, SectionHeader } from "@/components/sections";
import { Container, IconItem, Section } from "@/components/ui";

const TITLE = "Materiais de marketing para baixar";
const DESC =
  "Checklists, planilhas e roteiros para Google Ads, landing page, atendimento no WhatsApp e controle de leads. Baixe sem cadastro e adapte ao seu negócio.";
const crumbs = [
  { name: "Início", href: "/" },
  { name: "Materiais", href: "/materiais" },
];

export const metadata = pageMetadata({ title: TITLE, description: DESC, path: "/materiais" });

/** Tamanho do arquivo lido no build (os arquivos ficam em public/). */
function size(file: string) {
  try {
    const kb = statSync(join(process.cwd(), "public", file)).size / 1024;
    return kb > 1024 ? `${(kb / 1024).toFixed(1).replace(".", ",")} MB` : `${Math.max(1, Math.round(kb))} KB`;
  } catch {
    return null;
  }
}

export default function MaterialsPage() {
  const list = {
    "@type": "ItemList",
    "@id": `${absoluteUrl("/materiais")}#lista`,
    itemListElement: materials.map((m, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "DigitalDocument",
        name: m.title,
        description: m.description,
        url: absoluteUrl(m.file),
        encodingFormat: m.format === "PDF" ? "application/pdf" : m.format === "CSV" ? "text/csv" : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        inLanguage: "pt-BR",
        isAccessibleForFree: true,
        publisher: { "@type": "Organization", name: site.name },
      },
    })),
  };
  return (
    <>
      <JsonLd data={graph(webPageNode({ path: "/materiais", name: TITLE, description: DESC, type: "CollectionPage" }), breadcrumbNode("/materiais", crumbs), list)} />
      <PageHero
        art="materiais"
        crumbs={crumbs}
        eyebrow="Materiais"
        title="Materiais práticos para vender mais com o digital"
        lead="Checklists, planilhas e roteiros que usamos como base no dia a dia. Baixe sem cadastro e adapte à sua operação."
        ctaLocation="materials_hero"
      />
      <Section tone="light" labelledBy="lista-materiais">
        <Container>
          <SectionHeader id="lista-materiais" eyebrow="Downloads" title="Escolha o que você precisa agora" />
          <ul className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {materials.map((m, i) => {
              const s = size(m.file);
              const related = m.related.articles.map(getArticle).filter(Boolean) as NonNullable<ReturnType<typeof getArticle>>[];
              return (
                <li key={m.slug} className="reveal" style={{ ["--reveal-delay" as string]: `${(i % 3) * 60}ms` }}>
                  <article className="flex h-full flex-col rounded-[28px] border border-border-tertiary bg-bg-surface p-6">
                    <p className="text-[0.8125rem] font-medium uppercase leading-5 tracking-[0.14em] text-text-secondary">
                      {m.format}{s ? ` · ${s}` : ""}
                    </p>
                    <h2 className="text-h3 mt-3">{m.title}</h2>
                    <p className="mt-2 text-[0.9375rem] leading-6 text-text-secondary">{m.description}</p>
                    <ul className="mb-6 mt-5 space-y-2 text-[0.9375rem] leading-6">
                      {m.contents.map((c) => <IconItem key={c}>{c}</IconItem>)}
                    </ul>
                    <p className="mb-6 text-sm leading-5 text-text-secondary"><span className="font-medium text-text-primary">Para quem:</span> {m.forWhom}</p>
                    <MaterialDownload slug={m.slug} file={m.file} format={m.format} title={m.title} />
                    {related.length ? (
                      <p className="mt-5 text-sm leading-5 text-text-secondary">
                        Leia também: <Link href={`/conteudos/${related[0].slug}`} className="underline underline-offset-2 hover:text-text-primary">{related[0].title}</Link>
                      </p>
                    ) : null}
                  </article>
                </li>
              );
            })}
          </ul>
          <p className="reveal mt-10 max-w-2xl text-text-secondary">
            Quer que a gente aplique isso na sua empresa? <Link href="/contato" className="underline underline-offset-2">Peça seu diagnóstico</Link>.
          </p>
        </Container>
      </Section>
      <CtaSection location="materials_final" />
    </>
  );
}
