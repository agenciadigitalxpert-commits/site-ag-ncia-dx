import type { FAQ } from "@/content/types";
import { Rich } from "./RichText";
import { PlusIcon } from "./ui";

/** Accordion com <details>: conteúdo sempre presente no HTML, acessível por teclado. */
export function FaqList({ faqs, headingLevel = 3 }: { faqs: FAQ[]; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <div className="border-t border-border-tertiary">
      {faqs.map((f, i) => (
        <details key={i} className="acc group border-b border-border-tertiary">
          <summary className="flex min-h-16 items-center justify-between gap-6 py-5 text-left transition-colors duration-150 hover:text-text-secondary">
            <H className="text-[1.0625rem] font-medium leading-7 tracking-[-0.01em]">{f.q}</H>
            <span className="acc-icon grid size-7 shrink-0 place-items-center text-text-secondary">
              <PlusIcon />
            </span>
          </summary>
          <div className="max-w-3xl pb-6 pr-12 text-text-secondary">
            <p><Rich text={f.a} /></p>
          </div>
        </details>
      ))}
    </div>
  );
}
