import Link from "next/link";
import type { ReactNode } from "react";
import { CTA_PRIMARY, CTA_SECONDARY } from "@/config/navigation";
import { leadIntegrationReady } from "@/config/env";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { LeadForm } from "./LeadForm";
import { TrackedLink } from "./TrackedLink";
import { ArrowIcon, Container, Eyebrow, Section, btn, cx } from "./ui";

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
    <section className="surface-dark relative overflow-hidden border-b border-line-dark">
      <HeroGrid />
      <Container className="relative pb-16 pt-10 sm:pb-20 lg:pb-28 lg:pt-14">
        <Breadcrumbs items={crumbs} />
        <div className="mt-12 max-w-4xl lg:mt-16">
          {eyebrow ? <p className="hero-rise mb-5 text-[0.8rem] font-medium uppercase tracking-[0.16em] text-accent">{eyebrow}</p> : null}
          <h1 className="hero-rise text-h1" style={{ ["--d" as string]: "60ms" }}>{title}</h1>
          {lead ? (
            <p className="hero-rise text-lead mt-6 max-w-2xl text-white/75" style={{ ["--d" as string]: "140ms" }}>{lead}</p>
          ) : null}
          <div className="hero-rise mt-9 flex flex-col gap-3 sm:flex-row" style={{ ["--d" as string]: "220ms" }}>
            <TrackedLink href={CTA_PRIMARY.href} trackLabel={CTA_PRIMARY.label} trackLocation={ctaLocation} className={btn("primary")}>
              {CTA_PRIMARY.label}
              <ArrowIcon className="transition-transform group-hover:translate-x-0.5" />
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

/** Grade sutil de fundo (puramente decorativa). */
export function HeroGrid() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-[0.5] [mask-image:radial-gradient(ellipse_at_70%_20%,black,transparent_70%)]"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgb(255 255 255 / 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgb(255 255 255 / 0.05) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
      }}
    />
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
      {intro ? <div className="text-lead mt-5 opacity-80">{intro}</div> : null}
    </div>
  );
}

/** Lista editorial de links (em vez de cards). */
export function LinkRows({ items, location }: { items: { href: string; title: string; text: string; tag?: string }[]; location?: string }) {
  return (
    <ul className="border-t border-current/15">
      {items.map((it, i) => (
        <li key={it.href} className="reveal border-b border-current/15" style={{ ["--reveal-delay" as string]: `${Math.min(i, 6) * 50}ms` }}>
          <Link
            href={it.href}
            data-location={location}
            className="group grid gap-2 py-6 transition-[padding] duration-500 ease-out-soft sm:grid-cols-[minmax(0,5fr)_minmax(0,6fr)_auto] sm:items-center sm:gap-8 sm:py-8 sm:hover:pl-3"
          >
            <span className="flex items-baseline gap-4">
              <span className="w-7 text-sm tabular-nums opacity-50">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-display text-h3">{it.title}</span>
            </span>
            <span className="pl-11 leading-relaxed opacity-75 sm:pl-0">{it.text}</span>
            <span className="hidden size-11 place-items-center rounded-full border border-current/20 transition-colors group-hover:border-transparent group-hover:bg-accent group-hover:text-accent-ink sm:grid">
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
  defaultSegment,
  id = "diagnostico",
}: {
  title?: string;
  text?: string;
  location: string;
  defaultSegment?: string;
  id?: string;
}) {
  return (
    <Section tone="dark" id={id} labelledBy={`${id}-title`} className="border-t border-line-dark">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <div className="reveal">
            <Eyebrow>Diagnóstico</Eyebrow>
            <h2 id={`${id}-title`} className="text-h2">{title}</h2>
            <p className="text-lead mt-5 text-white/75">{text}</p>
            <ul className="mt-8 space-y-3 text-[0.97rem] text-white/80">
              <li className="flex gap-3"><span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-accent" />Leva cerca de um minuto.</li>
              <li className="flex gap-3"><span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-accent" />O contato é feito por pessoas da equipe, pelo WhatsApp informado.</li>
              <li className="flex gap-3"><span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-accent" />Investimento em mídia e honorários da agência são valores diferentes — falamos dos dois com clareza.</li>
            </ul>
          </div>
          <div className="reveal rounded-3xl border border-line-dark bg-graphite p-6 sm:p-10">
            <LeadForm integrationReady={leadIntegrationReady} location={location} defaultSegment={defaultSegment} />
          </div>
        </div>
      </Container>
    </Section>
  );
}

/** Bloco compacto de CTA (sem formulário) para o meio das páginas. */
export function CtaInline({ title, text, location }: { title: string; text: string; location: string }) {
  return (
    <div className="reveal flex flex-col gap-6 rounded-3xl bg-ink p-8 text-white sm:p-12 md:flex-row md:items-center md:justify-between">
      <div className="max-w-2xl">
        <p className="font-display text-h3">{title}</p>
        <p className="mt-3 text-white/70">{text}</p>
      </div>
      <TrackedLink href={CTA_PRIMARY.href} trackLabel={CTA_PRIMARY.label} trackLocation={location} className={btn("primary", "shrink-0")}>
        {CTA_PRIMARY.label}
        <ArrowIcon className="transition-transform group-hover:translate-x-0.5" />
      </TrackedLink>
    </div>
  );
}

export function ExampleBadge() {
  return (
    <span className="inline-flex items-center rounded-full border border-current/25 px-2.5 py-0.5 text-[0.72rem] font-medium uppercase tracking-[0.12em] opacity-80">
      Exemplo ilustrativo
    </span>
  );
}

export function DataTable({ caption, columns, rows }: { caption: string; columns: string[]; rows: string[][] }) {
  return (
    <figure className="reveal">
      <div className="overflow-x-auto rounded-2xl border border-current/15" role="region" aria-label={caption} tabIndex={0}>
        <table className="w-full min-w-[40rem] border-collapse text-left text-[0.95rem]">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr className="border-b border-current/15 bg-current/[0.04]">
              {columns.map((c) => (
                <th key={c} scope="col" className="px-5 py-4 font-semibold">{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-b border-current/10 last:border-0">
                {r.map((cell, j) =>
                  j === 0 ? (
                    <th key={j} scope="row" className="px-5 py-4 align-top font-medium">{cell}</th>
                  ) : (
                    <td key={j} className="px-5 py-4 align-top leading-relaxed opacity-85">{cell}</td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="mt-3 text-sm opacity-70">{caption}</figcaption>
    </figure>
  );
}
