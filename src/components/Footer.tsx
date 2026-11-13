import Link from "next/link";
import { CTA_PRIMARY, segmentNav, serviceNav } from "@/config/navigation";
import { site } from "@/config/site";
import { hasOptionalTracking } from "@/config/env";
import { publishedCases } from "@/content/cases";
import { Logo } from "./Logo";
import { CookiePreferencesButton } from "./consent/CookiePreferencesButton";
import { TrackedLink } from "./TrackedLink";
import { ArrowIcon, btn } from "./ui";

async function Year() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

export function Footer() {
  const social = Object.entries(site.social).filter(([, v]) => Boolean(v)) as [string, string][];
  const company = [
    { href: "/sobre", label: "Sobre a DX" },
    { href: "/metodologia", label: "Metodologia" },
    ...(publishedCases.length ? [{ href: "/cases", label: "Cases" }] : []),
    { href: "/conteudos", label: "Conteúdos" },
    { href: "/contato", label: "Contato" },
  ];
  return (
    <footer className="surface-dark border-t border-line-dark">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-8 border-b border-line-dark py-16 md:flex-row md:items-end md:justify-between">
          <p className="font-display max-w-2xl text-h2">Vamos olhar para a sua operação, do anúncio à venda?</p>
          <TrackedLink href={CTA_PRIMARY.href} trackLabel={CTA_PRIMARY.label} trackLocation="footer" className={btn("primary", "self-start md:self-auto")}>
            {CTA_PRIMARY.label}
            <ArrowIcon className="transition-transform group-hover:translate-x-0.5" />
          </TrackedLink>
        </div>

        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_0.8fr]">
          <div>
            <Link href="/" className="inline-block text-[1.6rem]" aria-label={`${site.name} — página inicial`}>
              <Logo />
            </Link>
            <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-muted-dark">
              Tráfego pago, criativos, landing pages, estrutura comercial e CRM trabalhando juntos para gerar oportunidades e transformar atendimento em vendas.
            </p>
            <p className="mt-6 text-[0.95rem] text-white/85">
              {site.location.city} — {site.location.stateName}
              <br />
              <span className="text-muted-dark">Atendimento a empresas de todo o Brasil</span>
            </p>
            {site.contact.email ? (
              <p className="mt-4"><a className="link-u" href={`mailto:${site.contact.email}`}>{site.contact.email}</a></p>
            ) : null}
            {social.length ? (
              <ul className="mt-6 flex flex-wrap gap-4 text-sm">
                {social.map(([k, url]) => (
                  <li key={k}><a href={url} rel="noopener noreferrer" target="_blank" className="link-u capitalize">{k}</a></li>
                ))}
              </ul>
            ) : null}
          </div>

          <FooterCol title="Serviços" links={serviceNav.map(({ href, label }) => ({ href, label }))} />
          <FooterCol title="Segmentos" links={segmentNav} />
          <FooterCol title="Empresa" links={company} />
        </div>

        <div className="flex flex-col gap-4 border-t border-line-dark py-8 text-sm text-muted-dark md:flex-row md:items-center md:justify-between">
          <p>
            © <Year /> {site.name}{site.legal.cnpj ? ` · CNPJ ${site.legal.cnpj}` : ""}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li><Link className="link-u hover:text-white" href="/politica-de-privacidade">Política de privacidade</Link></li>
            <li><Link className="link-u hover:text-white" href="/politica-de-cookies">Política de cookies</Link></li>
            {hasOptionalTracking ? <li><CookiePreferencesButton /></li> : null}
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h2 className="mb-5 text-sm font-medium uppercase tracking-[0.14em] text-muted-dark">{title}</h2>
      <ul className="space-y-1">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="inline-flex min-h-10 items-center text-[0.97rem] text-white/85 transition-colors hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
