import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ARTICLES_PER_PAGE, articlePageCount, visibleArticles } from "@/lib/content";
import { ArticleList, CategoryNav, Pagination } from "@/components/ArticleList";
import { PageHero } from "@/components/sections";
import { Container, Section } from "@/components/ui";

/** Páginas 2..N. Com Cache Components é preciso ao menos um parâmetro; páginas fora do intervalo retornam 404. */
export function generateStaticParams() {
  const pages = Array.from({ length: Math.max(0, articlePageCount - 1) }, (_, i) => ({ pagina: String(i + 2) }));
  return pages.length ? pages : [{ pagina: "2" }];
}

const parse = (p: string) => (/^\d+$/.test(p) ? Number(p) : NaN);

export async function generateMetadata({ params }: PageProps<"/conteudos/pagina/[pagina]">): Promise<Metadata> {
  const n = parse((await params).pagina);
  if (!(n >= 2 && n <= articlePageCount)) return {};
  return pageMetadata({ title: `Conteúdos — página ${n}`, description: "Mais artigos da Agência Digital Xpert sobre tráfego pago, atendimento e vendas.", path: `/conteudos/pagina/${n}` });
}

export default async function BlogPaged({ params }: PageProps<"/conteudos/pagina/[pagina]">) {
  const n = parse((await params).pagina);
  if (!(n >= 2 && n <= articlePageCount)) notFound();
  const items = visibleArticles.slice((n - 1) * ARTICLES_PER_PAGE, n * ARTICLES_PER_PAGE);
  return (
    <>
      <PageHero
        crumbs={[{ name: "Início", href: "/" }, { name: "Conteúdos", href: "/conteudos" }, { name: `Página ${n}`, href: `/conteudos/pagina/${n}` }]}
        title={`Conteúdos — página ${n}`}
        ctaLocation="blog_paged_hero"
        secondary={null}
      />
      <Section tone="light">
        <Container>
          <CategoryNav />
          <div className="mt-10"><ArticleList items={items} /></div>
          <Pagination page={n} total={articlePageCount} base="/conteudos" />
        </Container>
      </Section>
    </>
  );
}
