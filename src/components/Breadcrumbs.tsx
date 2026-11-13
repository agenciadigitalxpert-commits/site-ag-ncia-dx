import Link from "next/link";

export type Crumb = { name: string; href: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Trilha de navegação" className="text-sm">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-muted-dark">
        {items.map((it, i) => {
          const last = i === items.length - 1;
          return (
            <li key={it.href} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="text-white/90">{it.name}</span>
              ) : (
                <>
                  <Link href={it.href} className="link-u hover:text-white">{it.name}</Link>
                  <span aria-hidden className="opacity-50">/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
