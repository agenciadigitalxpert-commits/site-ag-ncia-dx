import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbNode, graph, webPageNode } from "@/lib/schema";
import { MIN_ARTICLES_TO_INDEX_CATEGORY, articlesInCategory, categories, getCategory, isPublished } from "@/lib/content";
import { JsonLd } from "@/components/JsonLd";
import { ArticleList, CategoryNav } from "@/components/ArticleList";
import { CtaSection, PageHero } from "@/components/sections";
import { Container, Section } from "@/components/ui";

export function generateStaticParams() {
  return categories.map((c) => ({ categoria: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/conteudos/categoria/[categoria]">): Promise<Metadata> {
  const c = getCategory((await params).categoria);
  if (!c) return {};
  const published = articlesInCategory(c.slug).filter(isPublished).length;
  return pageMetadata({
    title: `${c.name}: conteúdos`,
    description: c.description,
    path: `/conteudos/categoria/${c.slug}`,
    noindex: published < MIN_ARTICLES_TO_INDEX_CATEGORY,
  });
}

export default async function CategoryPage({ params }: PageProps<"/conteudos/categoria/[categoria]">) {
  const c = getCategory((await params).categoria);
  if (!c) notFound();
  const path = `/conteudos/categoria/${c.slug}`;
  const crumbs = [
    { name: "Início", href: "/" },
    { name: "Conteúdos", href: "/conteudos" },
    { name: c.name, href: path },
  ];
  return (
    <>
      <JsonLd data={graph(webPageNode({ path, name: c.name, description: c.description, type: "CollectionPage" }), breadcrumbNode(path, crumbs))} />
      <PageHero crumbs={crumbs} eyebrow="Categoria" title={c.name} lead={c.description} ctaLocation="category_hero" secondary={null} />
      <Section tone="light" className="pt-14 sm:pt-16 lg:pt-20">
        <Container>
          <CategoryNav current={c.slug} />
          <div className="mt-10"><ArticleList items={articlesInCategory(c.slug)} /></div>
        </Container>
      </Section>
      <CtaSection location="category_final" />
    </>
  );
}
