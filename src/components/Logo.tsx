import { cx } from "./ui";

/**
 * Wordmark recriado em HTML a partir da logo enviada (raster 150×150).
 * PENDÊNCIA: substituir pelo arquivo vetorial oficial (SVG) quando disponível.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cx("inline-flex flex-col items-stretch leading-none select-none", className)} aria-hidden>
      <span className="flex items-center gap-[0.35em] text-[0.42em] font-normal tracking-[0.28em] lowercase">
        <span className="h-px flex-1 bg-current opacity-80" />
        <span className="translate-y-[-0.02em]">agência</span>
        <span className="h-px w-[0.9em] bg-current opacity-80" />
      </span>
      <span className="font-display mt-[0.12em] flex items-baseline text-[1em] tracking-[-0.035em]">
        <span className="font-normal">digital</span>
        <span className="text-[1.18em] font-extrabold leading-[0.8] tracking-[-0.06em]">X</span>
        <span className="font-normal">pert</span>
      </span>
    </span>
  );
}
