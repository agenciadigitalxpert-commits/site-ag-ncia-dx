import Link from "next/link";
import type { Metadata } from "next";
import { CTA_PRIMARY } from "@/config/navigation";
import { services, visibleArticles } from "@/lib/content";
import { HeroGrid } from "@/components/sections";
import { ArrowIcon, Container, btn } from "@/components/ui";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="surface-dark relative overflow-hidden">
      <HeroGrid />
      <Container className="relative py-20 lg:py-28">
        <p className="text-sm uppercase tracking-[0.16em] text-accent">Erro 404</p>
        <h1 className="text-h1 mt-5 max-w-3xl">Esta página não existe ou mudou de endereço.</h1>
        <p className="text-lead mt-6 max-w-2xl text-white/75">Confira o endereço digitado ou siga por um dos caminhos abaixo.</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link href={CTA_PRIMARY.href} className={btn("primary")}>{CTA_PRIMARY.label} <ArrowIcon /></Link>
          <Link href="/" className={btn("secondary")}>Voltar ao início</Link>
        </div>
        <div className="mt-20 grid gap-12 border-t border-line-dark pt-12 md:grid-cols-3">
          <div>
            <h2 className="text-sm font-medium uppercase tracking-[0.14em] text-muted-dark">Serviços</h2>
            <ul className="mt-4 space-y-2">
              {services.map((s) => <li key={s.slug}><Link href={`/servicos/${s.slug}`} className="link-u">{s.navLabel}</Link></li>)}
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-medium uppercase tracking-[0.14em] text-muted-dark">Conteúdos</h2>
            <ul className="mt-4 space-y-2">
              {visibleArticles.slice(0, 4).map((a) => <li key={a.slug}><Link href={`/conteudos/${a.slug}`} className="link-u">{a.title}</Link></li>)}
              <li><Link href="/conteudos" className="link-u text-accent">Todos os conteúdos</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-medium uppercase tracking-[0.14em] text-muted-dark">Fale com a DX</h2>
            <ul className="mt-4 space-y-2">
              <li><Link href="/contato" className="link-u">Contato e diagnóstico</Link></li>
              <li><Link href="/sobre" className="link-u">Sobre a DX</Link></li>
              <li><Link href="/metodologia" className="link-u">Metodologia</Link></li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
