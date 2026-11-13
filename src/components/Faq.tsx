import type { FAQ } from "@/content/types";
import { Rich } from "./RichText";
import { PlusIcon } from "./ui";

/** Accordion com <details>: conteúdo sempre presente no HTML, acessível por teclado. */
export function FaqList({ faqs, headingLevel = 3 }: { faqs: FAQ[]; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <div className="border-t border-current/15">
      {faqs.map((f, i) => (
        <details key={i} className="acc group border-b border-current/15">
          <summary className="flex min-h-16 items-center justify-between gap-6 py-5 text-left">
            <H className="text-[1.07rem] font-medium leading-snug tracking-[-0.01em] sm:text-lg">{f.q}</H>
            <span className="acc-icon grid size-9 shrink-0 place-items-center rounded-full border border-current/20">
              <PlusIcon />
            </span>
          </summary>
          <div className="max-w-3xl pb-6 pr-12 leading-relaxed opacity-85">
            <p><Rich text={f.a} /></p>
          </div>
        </details>
      ))}
    </div>
  );
}
