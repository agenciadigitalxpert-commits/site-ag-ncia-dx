import Image from "next/image";
import { testimonials } from "@/content/testimonials";
import { ArrowIcon } from "./ui";

/** Depoimentos em destaque: capa grande (vídeo no Instagram), cliente e síntese do relato. */
export function TestimonialCards() {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
      {testimonials.map((item, i) => (
        <li key={item.href} className="reveal" style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}>
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="pressable group flex h-full flex-col overflow-hidden rounded-[28px] border border-border-tertiary bg-bg-surface transition-colors hover:border-border-secondary focus-visible:outline-offset-4"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-bg-surface-recessed">
              <Image
                src={item.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 26rem, (min-width: 640px) 45vw, 100vw"
                style={{ objectPosition: item.imagePosition }}
                className="object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-[var(--ease-spring)] motion-safe:group-hover:scale-105"
              />
              <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
              {/* indica que é vídeo */}
              <span aria-hidden className="material-bar absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full py-1.5 pl-2 pr-4 text-sm font-medium leading-5 text-white">
                <span className="grid size-7 place-items-center rounded-full bg-white text-black">
                  <svg viewBox="0 0 20 20" width="12" height="12" fill="currentColor"><path d="M6 4.5v11l9-5.5-9-5.5Z" /></svg>
                </span>
                Assistir relato
              </span>
            </div>
            <div className="flex flex-1 flex-col items-start p-6">
              <h3 className="text-h3">{item.client}</h3>
              <p className="mb-6 mt-3 text-base leading-6 text-text-secondary">{item.summary}</p>
              <span className="mt-auto inline-flex items-center gap-1.5 text-[0.9375rem] font-medium leading-6 group-hover:underline">
                Ver no Instagram <ArrowIcon className="size-4 shrink-0 -rotate-45" />
                <span className="sr-only">(abre em nova aba)</span>
              </span>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}
