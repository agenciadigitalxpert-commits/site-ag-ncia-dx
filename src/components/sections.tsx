import Link from "next/link";
import type { ReactNode } from "react";
import { CTA_PRIMARY, CTA_SECONDARY } from "@/config/navigation";
import { leadIntegrationReady } from "@/config/env";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { LeadForm } from "./LeadForm";
import { TrackedLink } from "./TrackedLink";
import { ArrowIcon, Container, Eyebrow, IconItem, Section, btn, cx } from "./ui";

export function PageHero({
  crumbs,
  eyebrow,
  title,
  lead,
  ctaLocation,
  secondary = CTA_SECONDARY,
  children,
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  title: string;
  lead?: string;
  ctaLocation: string;
  secondary?: { label: string; href: string } | null;
  children?: ReactNode;
}) {
  return (
    <section className="surface-dark relative isolate overflow-hidden">
      <HeroGrid />
      <Container className="relative pb-16 pt-8 sm:pb-20 lg:pb-28 lg:pt-12">
        <Breadcrumbs items={crumbs} />
        <div className="mt-12 max-w-4xl lg:mt-16">
          {eyebrow ? <Eyebrow className="hero-rise">{eyebrow}</Eyebrow> : null}
          <h1 className="hero-rise text-h1" style={{ ["--d" as string]: "60ms" }}>{title}</h1>
          {lead ? (
            <p className="hero-rise text-lead mt-6 max-w-2xl text-text-secondary" style={{ ["--d" as string]: "140ms" }}>{lead}</p>
          ) : null}
          <div className="hero-rise mt-8 flex flex-col gap-3 sm:flex-row" style={{ ["--d" as string]: "220ms" }}>
            <TrackedLink href={CTA_PRIMARY.href} trackLabel={CTA_PRIMARY.label} trackLocation={ctaLocation} className={btn("primary")}>
              {CTA_PRIMARY.label}
              <ArrowIcon className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </TrackedLink>
            {secondary ? (
              <TrackedLink href={secondary.href} trackLabel={secondary.label} trackLocation={ctaLocation} className={btn("secondary")}>
                {secondary.label}
              </TrackedLink>
            ) : null}
          </div>
          {children}
        </div>
      </Container>
    </section>
  );
}

/** Fundo artístico suave das páginas internas: o mesmo gradiente do hero, discreto. */
export function HeroGrid() {
  return (
    <div aria-hidden className="hero-art">
      <div className="hero-glow hero-glow--soft" />
      <div className="hero-grain" />
    </div>
  );
}

export function SectionHeader({
  index,
  eyebrow,
  title,
  intro,
  id,
  className,
  as: H = "h2",
}: {
  index?: string;
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  id?: string;
  className?: string;
  as?: "h2" | "h3";
}) {
  return (
    <div className={cx("reveal max-w-3xl", className)}>
      {eyebrow ? <Eyebrow index={index}>{eyebrow}</Eyebrow> : null}
      <H id={id} className="text-h2">{title}</H>
      {intro ? <div className="text-lead mt-4 text-text-secondary">{intro}</div> : null}
    </div>
  );
}

/**
 * Lista editorial de links. Âncora visual = número à esquerda; seta só no hover
 * (neutra — a cor da marca fica reservada ao CTA).
 */
export function LinkRows({ items }: { items: { href: string; title: string; text: string }[] }) {
  return (
    <ul className="border-t border-border-tertiary">
      {items.map((it, i) => (
        <li key={it.href} className="reveal border-b border-border-tertiary" style={{ ["--reveal-delay" as string]: `${Math.min(i, 6) * 40}ms` }}>
          <Link
            href={it.href}
            className="row-sweep pressable group grid gap-2 py-6 sm:grid-cols-[minmax(0,5fr)_minmax(0,6fr)_2.75rem] sm:items-center sm:gap-8 sm:py-8"
          >
            <span className="flex items-baseline gap-4">
              <span className="w-6 text-sm tabular-nums text-text-secondary">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-display text-h3 transition-transform duration-500 ease-[var(--ease-spring)] sm:group-hover:translate-x-2">{it.title}</span>
            </span>
            <span className="pl-10 text-text-secondary sm:pl-0">{it.text}</span>
            <span className="hidden size-11 place-items-center rounded-full text-text-secondary transition-[background-color,color,transform] duration-500 ease-[var(--ease-spring)] group-hover:-rotate-45 group-hover:bg-bg-fill-inverse group-hover:text-text-on-inverse sm:grid">
              <ArrowIcon />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function CtaSection({
  title = "Quer entender onde estão as oportunidades da sua operação?",
  text = "Conte um pouco sobre a sua empresa. Vamos analisar o contexto e conversar sobre o que faz sentido priorizar — mídia, atendimento, processo comercial ou tudo junto.",
  location,
  id = "diagnostico",
}: {
  title?: string;
  text?: string;
  location: string;
  id?: string;
}) {
  return (
    <Section tone="dark" id={id} labelledBy={`${id}-title`}>
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <div className="reveal">
            <Eyebrow>Diagnóstico</Eyebrow>
            <h2 id={`${id}-title`} className="text-h2">{title}</h2>
            <p className="text-lead mt-4 text-text-secondary">{text}</p>
            <ul className="mt-8 space-y-3 text-text-secondary">
              <IconItem>Leva cerca de um minuto.</IconItem>
              <IconItem>O contato é feito por pessoas da equipe, pelo WhatsApp informado.</IconItem>
              <IconItem>Investimento em mídia e honorários da agência são valores diferentes — falamos dos dois com clareza.</IconItem>
            </ul>
          </div>
          {/* campos com raio 8 + padding 24/32 → painel 32/40 */}
          <div className="reveal rounded-xl bg-bg-surface p-6 sm:rounded-2xl sm:p-8">
            <LeadForm integrationReady={leadIntegrationReady} location={location} />
          </div>
        </div>
      </Container>
    </Section>
  );
}

/** CTA compacto no meio das páginas: superfície escura usada como ênfase. */
export function CtaInline({ title, text, location }: { title: string; text: string; location: string }) {
  return (
    <div className="surface-dark reveal flex flex-col gap-6 rounded-lg p-8 sm:p-10 md:flex-row md:items-center md:justify-between">
      <div className="max-w-2xl">
        <p className="font-display text-h3">{title}</p>
        <p className="mt-2 text-text-secondary">{text}</p>
      </div>
      <TrackedLink href={CTA_PRIMARY.href} trackLabel={CTA_PRIMARY.label} trackLocation={location} className={btn("primary", "shrink-0")}>
        {CTA_PRIMARY.label}
        <ArrowIcon className="transition-transform duration-200 group-hover:translate-x-0.5" />
      </TrackedLink>
    </div>
  );
}

export function ExampleBadge() {
  return (
    <span className="inline-flex items-center rounded-full bg-bg-fill-secondary px-2.5 py-0.5 text-xs font-medium uppercase leading-5 tracking-[0.1em] text-text-secondary">
      Exemplo ilustrativo
    </span>
  );
}

export function DataTable({ caption, columns, rows }: { caption: string; columns: string[]; rows: string[][] }) {
  return (
    <figure className="reveal">
      <div className="overflow-x-auto" role="region" aria-label={caption} tabIndex={0}>
        <table className="w-full min-w-[40rem] border-collapse text-left text-[0.9375rem] leading-6">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr className="border-b border-border-secondary">
              {columns.map((c) => (
                <th key={c} scope="col" className="py-4 pr-6 text-sm font-semibold text-text-secondary">{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-b border-border-tertiary last:border-0">
                {r.map((cell, j) =>
                  j === 0 ? (
                    <th key={j} scope="row" className="py-4 pr-6 align-top font-semibold">{cell}</th>
                  ) : (
                    <td key={j} className="py-4 pr-6 align-top text-text-secondary">{cell}</td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="mt-3 text-sm text-text-secondary">{caption}</figcaption>
    </figure>
  );
}
