import type { ReactNode } from "react";

export function cx(...c: (string | false | null | undefined)[]) {
  return c.filter(Boolean).join(" ");
}

export function Container({ children, className, narrow }: { children: ReactNode; className?: string; narrow?: boolean }) {
  return (
    <div className={cx("mx-auto w-full px-5 sm:px-8 lg:px-10", narrow ? "max-w-3xl" : "max-w-7xl", className)}>
      {children}
    </div>
  );
}

type Tone = "dark" | "graphite" | "light" | "paper2";
const toneClass: Record<Tone, string> = {
  dark: "surface-dark",
  graphite: "surface-graphite",
  light: "surface-light",
  paper2: "surface-light surface-paper2",
};

export function Section({
  children,
  tone = "light",
  className,
  id,
  labelledBy,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  id?: string;
  labelledBy?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} data-tone={tone} className={cx(toneClass[tone], "py-20 sm:py-24 lg:py-32", className)}>
      {children}
    </section>
  );
}

/** Rótulo editorial acima dos títulos: "01 — Dores". Neutro: a cor da marca fica só no CTA. */
export function Eyebrow({ children, index, className }: { children: ReactNode; index?: string; className?: string }) {
  return (
    <p className={cx("mb-4 flex items-center gap-2 text-[0.8125rem] font-medium uppercase leading-5 tracking-[0.14em] text-text-secondary", className)}>
      {index ? <span className="tabular-nums text-text-primary">{index}</span> : null}
      {index ? <span aria-hidden className="h-px w-6 bg-border-secondary" /> : null}
      <span>{children}</span>
    </p>
  );
}

export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 20 20" width="20" height="20" fill="none" className={cx("shrink-0", className)}>
      <path d="M4 10h11m0 0-4.5-4.5M15 10l-4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PlusIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 20 20" width="20" height="20" fill="none" className={cx("shrink-0", className)}>
      <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function CheckIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 20 20" width="20" height="20" fill="none" className={cx("shrink-0 text-icon-secondary", className)}>
      <path d="m4.5 10.5 3.5 3.5 7.5-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export type BtnVariant = "primary" | "secondary" | "ghost";

/**
 * Botões — um primary por área.
 *  primary:   cor da marca (CTA principal)
 *  secondary: contorno neutro
 *  ghost:     só texto
 * Ícone de 20px com 8px de gap; altura mínima de 48px (área de toque).
 */
export function btn(variant: BtnVariant = "primary", className?: string) {
  const base =
    "pressable group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-[0.9375rem] font-medium leading-6 focus-visible:outline-offset-4 disabled:cursor-not-allowed disabled:opacity-60";
  const v: Record<BtnVariant, string> = {
    primary: "bg-bg-fill-brand text-text-on-brand hover:bg-bg-fill-brand-hover hover:text-text-on-brand-hover",
    secondary: "border border-border-secondary text-text-primary hover:border-text-primary hover:bg-bg-fill-secondary",
    ghost: "px-2 text-text-primary underline-offset-4 hover:underline",
  };
  return cx(base, v[variant], className);
}

/** Lista com marcador de ícone: caixa de 24px (= line-height), ícone de 20px, gap de 8px. */
export function IconItem({ children, icon = "check", className }: { children: ReactNode; icon?: "check" | "dash"; className?: string }) {
  return (
    <li className={cx("flex gap-2", className)}>
      <span aria-hidden className="flex h-6 w-5 shrink-0 items-center justify-center">
        {icon === "check" ? <CheckIcon /> : <span className="h-px w-3 bg-icon-secondary" />}
      </span>
      <span>{children}</span>
    </li>
  );
}

export function DevNote({ children }: { children: ReactNode }) {
  if (process.env.NODE_ENV !== "development") return null;
  return (
    <div role="note" className="my-4 rounded-sm border border-dashed border-border-note bg-bg-note p-3 text-sm text-text-note">
      <strong>Pendência (visível só no ambiente de edição):</strong> {children}
    </div>
  );
}
