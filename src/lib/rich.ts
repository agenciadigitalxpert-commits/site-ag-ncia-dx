/** Remove a marcação mínima de RichText ([texto](/rota) e **negrito**). */
export function stripRich(s: string) {
  return s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1").replace(/\*\*([^*]+)\*\*/g, "$1");
}

export type RichToken =
  | { t: "text"; v: string }
  | { t: "bold"; v: string }
  | { t: "link"; v: string; href: string };

export function tokenizeRich(s: string): RichToken[] {
  const out: RichToken[] = [];
  const re = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(s))) {
    if (m.index > last) out.push({ t: "text", v: s.slice(last, m.index) });
    if (m[1]) out.push({ t: "link", v: m[1], href: m[2] });
    else out.push({ t: "bold", v: m[3] });
    last = re.lastIndex;
  }
  if (last < s.length) out.push({ t: "text", v: s.slice(last) });
  return out;
}

/** Usa um rótulo no meio da frase: "Tráfego pago" → "tráfego pago", mas mantém "Google Ads", "CRM". */
export function inSentence(label: string) {
  const first = label.split(/[\s,]/)[0];
  if (/^[A-Z0-9]{2,}$/.test(first) || ["Google", "Meta"].includes(first)) return label;
  return label.charAt(0).toLowerCase() + label.slice(1);
}
