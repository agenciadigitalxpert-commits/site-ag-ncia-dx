"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { cx } from "./ui";

/**
 * Dropdown no padrão do site (padrão "select-only combobox" do WAI-ARIA APG).
 *  - Mouse/teclado: lista escura própria, item ativo destacado, check no escolhido,
 *    setas, Home/End, Enter/Espaço, Esc, Tab e busca pela letra inicial.
 *  - Toque (iOS/Android): usa o <select> nativo, que abre o seletor do sistema (HIG).
 */
type Props = {
  id: string;
  name: string;
  value: string;
  options: readonly string[];
  placeholder: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
  invalid?: boolean;
  describedBy?: string;
  labelId: string;
  required?: boolean;
  className?: string;
};

export function Select({ id, name, value, options, placeholder, onChange, onFocus, invalid, describedBy, labelId, required, className }: Props) {
  const uid = useId();
  const [touch, setTouch] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [up, setUp] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const typed = useRef({ text: "", at: 0 });
  // opção vazia ("Selecione"/"Prefiro não informar") + opções reais
  const items = ["", ...options];
  const selectedIndex = Math.max(0, items.indexOf(value));

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    const update = () => setTouch(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  // mantém o item ativo visível
  useEffect(() => {
    if (!open || active < 0) return;
    listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  const openList = (startAt = selectedIndex) => {
    const r = btnRef.current?.getBoundingClientRect();
    if (r) setUp(window.innerHeight - r.bottom < 300 && r.top > window.innerHeight - r.bottom);
    setActive(startAt);
    setOpen(true);
  };
  const choose = (i: number) => {
    onChange(items[i]);
    setOpen(false);
    btnRef.current?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const last = items.length - 1;
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        openList(e.key === "ArrowUp" ? Math.max(0, selectedIndex - 1) : selectedIndex);
        return;
      }
    } else {
      if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(last, a + 1)); return; }
      if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(0, a - 1)); return; }
      if (e.key === "Home") { e.preventDefault(); setActive(0); return; }
      if (e.key === "End") { e.preventDefault(); setActive(last); return; }
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); choose(active); return; }
      if (e.key === "Escape") { e.preventDefault(); setOpen(false); return; }
      if (e.key === "Tab") { if (active >= 0) onChange(items[active]); setOpen(false); return; }
    }
    // busca pela letra inicial (aberto ou fechado)
    if (e.key.length === 1 && /\S/.test(e.key)) {
      const now = Date.now();
      typed.current = { text: now - typed.current.at > 700 ? e.key.toLowerCase() : typed.current.text + e.key.toLowerCase(), at: now };
      const from = open ? active : selectedIndex;
      const order = [...items.keys()].slice(from + 1).concat([...items.keys()].slice(0, from + 1));
      const hit = order.find((i) => i > 0 && items[i].toLowerCase().startsWith(typed.current.text));
      if (hit !== undefined) {
        if (open) setActive(hit);
        else onChange(items[hit]);
      }
    }
  };

  const baseField =
    "block min-h-[3.25rem] w-full rounded-[var(--radius-field)] border border-border-secondary bg-bg-fill-secondary pl-4 pr-12 py-3 text-left text-base leading-6 transition-colors duration-150 outline-none hover:border-text-secondary focus:border-border-focus focus-visible:outline-2";
  const chevron = (
    <svg aria-hidden viewBox="0 0 20 20" width="20" height="20" fill="none" className={cx("pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-icon-secondary transition-transform duration-300 ease-[var(--ease-spring)]", open && "rotate-180")}>
      <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  if (touch) {
    return (
      <div className={cx("relative", className)}>
        <select
          id={id}
          name={name}
          value={value}
          required={required}
          onFocus={onFocus}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          className={cx(baseField, "dx-native-select cursor-pointer appearance-none", !value && "text-text-placeholder", invalid && "!border-text-critical")}
        >
          {items.map((o) => (
            <option key={o || "vazio"} value={o}>{o || placeholder}</option>
          ))}
        </select>
        {chevron}
      </div>
    );
  }

  const listId = `${uid}-list`;
  const optId = (i: number) => `${uid}-opt-${i}`;
  return (
    <div ref={rootRef} className={cx("relative", className)}>
      <button
        ref={btnRef}
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-labelledby={`${labelId} ${id}`}
        aria-activedescendant={open && active >= 0 ? optId(active) : undefined}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        aria-required={required || undefined}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        className={cx(baseField, "cursor-pointer", !value && "text-text-placeholder", invalid && "!border-text-critical", open && "border-border-focus")}
      >
        <span className="block truncate">{value || placeholder}</span>
      </button>
      {chevron}
      <input type="hidden" name={name} value={value} />
      <ul
        ref={listRef}
        id={listId}
        role="listbox"
        aria-labelledby={labelId}
        tabIndex={-1}
        className={cx(
          "absolute left-0 right-0 z-30 max-h-72 overflow-y-auto overscroll-contain rounded-[var(--radius-field)] border border-border-secondary bg-[var(--color-bg-listbox)] p-1.5 shadow-2xl shadow-black/50",
          "origin-top transition-[opacity,transform,visibility] duration-200 ease-[var(--ease-spring)]",
          up ? "bottom-full mb-2 origin-bottom" : "top-full mt-2",
          open ? "visible scale-100 opacity-100" : "invisible pointer-events-none scale-[0.98] opacity-0",
        )}
      >
        {items.map((o, i) => {
          const selected = i === selectedIndex && value !== "";
          return (
            <li
              key={o || "vazio"}
              id={optId(i)}
              data-index={i}
              role="option"
              aria-selected={selected}
              onMouseEnter={() => setActive(i)}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => choose(i)}
              className={cx(
                "flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-[8px] px-3 py-2 text-[0.9375rem] leading-6",
                i === active ? "bg-bg-fill-secondary-hover text-text-primary" : "text-text-primary",
                o === "" && "text-text-secondary",
              )}
            >
              <span>{o || placeholder}</span>
              {selected ? (
                <svg aria-hidden viewBox="0 0 20 20" width="20" height="20" fill="none" className="shrink-0 text-[var(--silver-300)]">
                  <path d="m4.5 10.5 3.5 3.5 7.5-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
