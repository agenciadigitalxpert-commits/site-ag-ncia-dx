import Link from "next/link";
import { tokenizeRich } from "@/lib/rich";

/** Renderiza RichText: [texto](/rota) e **negrito**. */
export function Rich({ text }: { text: string }) {
  return (
    <>
      {tokenizeRich(text).map((tk, i) => {
        if (tk.t === "bold") return <strong key={i} className="font-semibold">{tk.v}</strong>;
        if (tk.t === "link")
          return tk.href.startsWith("/") ? (
            <Link key={i} href={tk.href} className="underline decoration-1 underline-offset-[3px] hover:decoration-2">
              {tk.v}
            </Link>
          ) : (
            <a key={i} href={tk.href} rel="noopener noreferrer" target="_blank" className="underline decoration-1 underline-offset-[3px] hover:decoration-2">
              {tk.v}
            </a>
          );
        return <span key={i}>{tk.v}</span>;
      })}
    </>
  );
}
