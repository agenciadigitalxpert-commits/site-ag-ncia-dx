import Image from "next/image";
import { testimonials } from "@/content/testimonials";
import { ArrowIcon } from "./ui";

export function TestimonialCards() {
  return (
    <ul className="grid gap-4 md:grid-cols-3">
      {testimonials.map((item) => (
        <li key={item.href}>
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group grid h-full grid-cols-[minmax(4.5rem,30%)_1fr] overflow-hidden rounded-md border border-border-tertiary bg-bg-surface transition-colors hover:border-border-secondary focus-visible:outline-offset-4 md:max-xl:flex md:max-xl:flex-col"
          >
            <div className="relative min-h-40 overflow-hidden bg-bg-surface-recessed md:max-xl:aspect-square md:max-xl:min-h-0">
              <Image
                src={item.image}
                alt=""
                fill
                sizes="(min-width: 1280px) 116px, 32vw"
                style={{ objectPosition: item.imagePosition }}
                className="object-cover motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-105"
              />
            </div>
            <div className="flex min-w-0 flex-1 flex-col items-start p-4 sm:p-5">
              <h3 className="text-h3">{item.client}</h3>
              <p className="mb-5 mt-2 text-sm leading-5 text-text-secondary">{item.summary}</p>
              <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium leading-5 group-hover:underline">
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
