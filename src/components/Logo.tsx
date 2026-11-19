import { cx } from "./ui";

/**
 * Logotipo oficial da Agência Digital Xpert recriado em HTML (nítido em qualquer tamanho).
 * "digital" e "pert" em Oswald leve; o "X" em Oswald bold, maior, subindo até a linha do
 * "agência", que fica espaçado entre dois fios. O tamanho segue o font-size do elemento.
 * Referência: public/brand/logo-dx.png (oficial, branca, fundo transparente) e logo-dx-escura.png.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cx(
        "font-logo inline-grid grid-cols-[auto_auto_auto] items-end leading-[0.84] select-none",
        className,
      )}
      aria-hidden
    >
      <span className="col-start-1 row-start-1 flex items-center gap-[0.16em] pb-[0.06em] font-sans text-[0.235em] font-light leading-none tracking-[0.36em]">
        <span className="h-[0.06em] min-h-px flex-1 bg-current" />
        <span className="-mr-[0.36em]">agência</span>
        <span className="h-[0.06em] min-h-px w-[1.7em] bg-current ml-[0.2em]" />
      </span>
      <span className="col-start-1 row-start-2 font-[360] tracking-[-0.005em]">digital</span>
      <span className="col-start-2 row-span-2 row-start-1 self-end text-[1.36em] font-bold leading-[0.8] tracking-[-0.02em]">X</span>
      <span className="col-start-3 row-start-2 font-[360] tracking-[-0.005em]">pert</span>
    </span>
  );
}
