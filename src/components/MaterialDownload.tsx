"use client";

import { track } from "@/lib/analytics";
import { btn } from "./ui";

/** Botão de download de material (dispara `material_download` no dataLayer). */
export function MaterialDownload({ slug, file, format, title }: { slug: string; file: string; format: string; title: string }) {
  return (
    <a
      href={file}
      download
      onClick={() => track("material_download", { material: slug, file_format: format })}
      className={btn("primary", "mt-auto self-start")}
      aria-label={`Baixar ${title} (${format})`}
    >
      Baixar {format}
      <svg aria-hidden viewBox="0 0 20 20" width="20" height="20" fill="none" className="shrink-0">
        <path d="M10 3.5v9m0 0-3.5-3.5M10 12.5l3.5-3.5M4 15.5h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}
