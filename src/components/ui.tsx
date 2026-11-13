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
  paper2: "surface-light bg-paper-2",
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

/** Rótulo editorial acima dos títulos: "01 — Dores". */
export function Eyebrow({ children, index, className }: { children: ReactNode; index?: string; className?: string }) {
  return (
    <p className={cx("mb-5 flex items-center gap-3 text-[0.8rem] font-medium uppercase tracking-[0.16em] opacity-80", className)}>
      {index ? <span className="tabular-nums text-accent-ink [.surface-dark_&]:text-accent [.surface-graphite_&]:text-accent">{index}</span> : null}
      {index ? <span aria-hidden className="h-px w-6 bg-current opacity-40" /> : null}
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
    <svg aria-hidden viewBox="0 0 20 20" width="18" height="18" fill="none" className={cx("shrink-0", className)}>
      <path d="m4.5 10.5 3.5 3.5 7.5-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export type BtnVariant = "primary" | "secondary" | "ghost";

/** Classes de botão. Em fundo claro, "secondary" usa borda escura automaticamente. */
export function btn(variant: BtnVariant = "primary", className?: string) {
  const base =
    "group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-6 py-3 text-[0.97rem] font-medium transition-[background-color,color,border-color,transform] duration-300 ease-out-soft active:scale-[0.98] focus-visible:outline-offset-4";
  const v: Record<BtnVariant, string> = {
    primary: "bg-accent text-accent-ink hover:bg-white",
    secondary:
      "border border-white/25 text-white hover:border-white hover:bg-white hover:text-ink [.surface-light_&]:border-ink/25 [.surface-light_&]:text-ink [.surface-light_&]:hover:bg-ink [.surface-light_&]:hover:text-white",
    ghost: "px-0 text-current underline-offset-4 hover:underline",
  };
  return cx(base, v[variant], variant === "primary" && "[.surface-light_&]:hover:bg-ink [.surface-light_&]:hover:text-white", className);
}

export function DevNote({ children }: { children: ReactNode }) {
  if (process.env.NODE_ENV !== "development") return null;
  return (
    <div role="note" className="my-4 rounded-lg border border-dashed border-amber-500 bg-amber-50 p-3 text-sm text-amber-900">
      <strong>Pendência (visível só no ambiente de edição):</strong> {children}
    </div>
  );
}
