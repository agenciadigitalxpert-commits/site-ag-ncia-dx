import type { ReactNode } from "react";
import { TrackedLink } from "@/components/TrackedLink";
import { ArrowIcon, btn, cx } from "@/components/ui";

/** Fundo do hero das LPs de campanha (mesmo desenho do /lp/diagnostico). */
export const lpHero =
  "surface-dark relative isolate overflow-hidden rounded-b-[28px] bg-[radial-gradient(120%_130%_at_0%_0%,#5a5a5f_0%,#232326_42%,#0a0a0b_78%)] sm:rounded-b-[40px]";

/** CTA que leva ao formulário da própria LP (#formulario) e registra cta_click, sem dados pessoais. */
export function LpCta({
  children,
  label,
  location,
  className,
}: {
  children: ReactNode;
  label: string;
  location: string;
  className?: string;
}) {
  return (
    <TrackedLink href="#formulario" trackLabel={label} trackLocation={location} className={btn("primary", cx("!min-h-14 !px-7 text-base", className))}>
      {children}
      <ArrowIcon className="transition-transform duration-200 group-hover:translate-x-0.5" />
    </TrackedLink>
  );
}

/** Rótulo pequeno em caixa-alta acima dos títulos (neutro: a cor da marca fica só no CTA). */
export function LpKicker({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cx("text-[0.8125rem] font-medium uppercase leading-5 tracking-[0.14em] text-text-secondary", className)}>{children}</p>
  );
}

/** Negrito com a cor de texto principal (usado nos trechos de destaque). */
export const Strong = ({ children }: { children: ReactNode }) => (
  <strong className="font-semibold text-text-primary">{children}</strong>
);
