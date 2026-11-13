import { pageMetadata } from "@/lib/seo";
import { breadcrumbNode, graph, webPageNode } from "@/lib/schema";
import { ARTICLES_PER_PAGE, articlePageCount, isPublished, visibleArticles } from "@/lib/content";
import { JsonLd } from "@/components/JsonLd";
import { ArticleList, CategoryNav, Pagination } from "@/components/ArticleList";
import { CtaSection, PageHero } from "@/components/sections";
import { Container, Section } from "@/components/ui";

const TITLE = "Conteúdos sobre tráfego pago, vendas e atendimento";
const DESC =
  "Artigos práticos da Agência Digital Xpert sobre tráfego pago, Google Ads, Meta Ads, qualificação de leads, processo comercial e atendimento.";
const crumbs = [
  { name: "Início", href: "/" },
  { name: "Conteúdos", href: "/conteudos" },
];

const hasPublished = visibleArticles.some(isPublished);
export const metadata = pageMetadata({ title: TITLE, description: DESC, path: "/conteudos", noindex: !hasPublished });

export default function BlogPage() {
  return (
    <>
      <JsonLd data={graph(webPageNode({ path: "/conteudos", name: TITLE, description: DESC, type: "CollectionPage" }), breadcrumbNode("/conteudos", crumbs))} />
      <PageHero
        crumbs={crumbs}
        eyebrow="Conteúdos"
        title="Ideias práticas para gerar e aproveitar mais oportunidades."
        lead="Tráfego pago, atendimento, qualificação e processo comercial explicados de forma direta, para quem toma decisões no dia a dia do negócio."
        ctaLocation="blog_hero"
        secondary={null}
      />
      <Section tone="light" labelledBy="lista" className="pt-14 sm:pt-16 lg:pt-20">
        <Container>
          <h2 id="lista" className="sr-only">Artigos</h2>
          <CategoryNav />
          <div className="mt-10">
            <ArticleList items={visibleArticles.slice(0, ARTICLES_PER_PAGE)} />
          </div>
          <Pagination page={1} total={articlePageCount} base="/conteudos" />
        </Container>
      </Section>
      <CtaSection location="blog_final" />
    </>
  );
}
