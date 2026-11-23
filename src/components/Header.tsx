"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { CTA_PRIMARY, mainNav, segmentNav, serviceNav, type NavLink } from "@/config/navigation";
import { site } from "@/config/site";
import { Logo } from "./Logo";
import { TrackedLink } from "./TrackedLink";
import { ArrowIcon, btn, cx } from "./ui";

type MenuKey = "servicos" | "segmentos";

export function Header() {
  const [open, setOpen] = useState<MenuKey | null>(null);
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const mobileBtn = useRef<HTMLButtonElement>(null);
  const mobilePanel = useRef<HTMLDivElement>(null);
  const uid = useId();
  const pathname = usePathname() ?? "/";
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  // Destaque deslizante do menu (segue mouse/foco com mola)
  const listRef = useRef<HTMLUListElement>(null);
  const [pill, setPill] = useState({ x: 0, w: 0, visible: false });
  const movePill = (el: HTMLElement | null) => {
    if (!el || !listRef.current) return;
    const l = listRef.current.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    setPill({ x: r.left - l.left, w: r.width, visible: true });
  };
  const hidePill = () => {
    if (open) movePill(document.getElementById(`${uid}-${open}-btn`));
    else setPill((p) => ({ ...p, visible: false }));
  };

  const closeAll = useCallback(() => {
    setOpen(null);
    setMobile(false);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fecha dropdown ao clicar fora / Esc.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        const btn = document.getElementById(`${uid}-${open}-btn`);
        setOpen(null);
        btn?.focus();
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, uid]);

  // Menu mobile: trava rolagem, foco inicial, Esc e ciclo de foco.
  useEffect(() => {
    if (!mobile) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const panel = mobilePanel.current;
    panel?.querySelector<HTMLElement>("a,button,summary")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobile(false);
        mobileBtn.current?.focus();
      }
      if (e.key === "Tab" && panel) {
        const items = Array.from(panel.querySelectorAll<HTMLElement>("a,button,summary")).filter((el) => el.offsetParent !== null);
        const all = [mobileBtn.current!, ...items];
        const first = all[0];
        const last = all[all.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => mq.matches && setMobile(false);
    mq.addEventListener("change", onMq);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [mobile]);

  const dropdown = (key: MenuKey, label: string, items: NavLink[], hubHref: string, hubLabel: string) => {
    const isOpen = open === key;
    const panelId = `${uid}-${key}-panel`;
    return (
      <li className="relative">
        <button
          id={`${uid}-${key}-btn`}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => setOpen(isOpen ? null : key)}
          onMouseEnter={(e) => movePill(e.currentTarget)}
          onFocus={(e) => movePill(e.currentTarget)}
          className="relative z-10 flex h-11 items-center gap-2 rounded-full px-4 text-[0.9375rem] text-text-primary"
        >
          {label}
          {isActive(hubHref) ? <span aria-hidden className="absolute bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full bg-bg-fill-brand" /> : null}
          <svg aria-hidden viewBox="0 0 12 12" width="12" height="12" className={cx("transition-transform duration-300", isOpen && "rotate-180")}>
            <path d="m3 4.5 3 3 3-3" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />
          </svg>
        </button>
        <div
          id={panelId}
          inert={!isOpen}
          className={cx(
            "absolute left-1/2 top-full z-50 mt-3 -translate-x-1/2 rounded-lg bg-bg-surface p-3 shadow-2xl shadow-black/40 transition-[opacity,transform,visibility] duration-300 ease-[var(--ease-spring)]",
            items.length > 12 ? "w-[min(46rem,92vw)]" : "w-[min(34rem,90vw)]",
            isOpen ? "visible translate-y-0 scale-100 opacity-100" : "invisible -translate-y-2 scale-[0.98] opacity-0",
          )}
        >
          <ul className={cx("grid gap-1", items.length > 12 ? "sm:grid-cols-3" : items.length > 6 && "sm:grid-cols-2")}>
            {items.map((it) => (
              <li key={it.href}>
                <Link
                  href={it.href}
                  onClick={closeAll}
                  className={cx("pressable block rounded-[12px] px-4 hover:bg-bg-fill-secondary focus-visible:bg-bg-fill-secondary", items.length > 12 ? "py-2.5" : "py-3")}
                >
                  <span className="block text-[0.9375rem] font-medium leading-6 text-text-primary">{it.label}</span>
                  {it.description ? <span className="block text-sm leading-5 text-text-secondary">{it.description}</span> : null}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={hubHref}
            onClick={closeAll}
            className="mt-1 flex items-center justify-between rounded-[12px] px-4 py-3 text-sm font-medium text-text-secondary transition-colors duration-150 hover:bg-bg-fill-secondary hover:text-text-primary"
          >
            {hubLabel}
            <ArrowIcon />
          </Link>
        </div>
      </li>
    );
  };

  return (
    <header
      style={{ viewTransitionName: "site-header" }}
      className={cx(
        "surface-dark sticky top-0 z-40 border-b transition-[border-color] duration-300",
        // Material translúcido só com o menu fechado: backdrop-filter prenderia o painel fixo do menu mobile.
        !mobile && "material-bar",
        // Sem backdrop-filter com o menu aberto: ele criaria um bloco de contenção para o painel fixo.
        mobile || scrolled ? "border-border-tertiary" : "border-transparent",
      )}
    >
      <div className={cx("mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 transition-[height] duration-500 ease-[var(--ease-spring)] sm:px-8 lg:px-10", scrolled && !mobile ? "h-16" : "h-[4.5rem]")}>
        <Link href="/" onClick={closeAll} className={cx("pressable origin-left text-[1.45rem] text-text-primary transition-transform duration-500", scrolled && !mobile && "scale-90")} aria-label={`Página inicial da ${site.name}`}>
          <Logo />
        </Link>

        <nav ref={navRef} aria-label="Principal" className="hidden lg:block">
          <ul ref={listRef} onMouseLeave={hidePill} onBlur={(e) => !e.currentTarget.contains(e.relatedTarget as Node) && hidePill()} className="relative flex items-center gap-1">
            <li aria-hidden className="pointer-events-none absolute left-0 top-1/2 h-11 rounded-full bg-bg-fill-secondary-hover transition-[transform,width,opacity] duration-500 ease-[var(--ease-spring)]" style={{ transform: `translateX(${pill.x}px) translateY(-50%)`, width: pill.w, opacity: pill.visible ? 1 : 0 }} />
            {dropdown("servicos", "Serviços", serviceNav, "/servicos", "Ver todos os serviços")}
            {dropdown("segmentos", "Segmentos", segmentNav, "/segmentos", "Ver todos os segmentos")}
            {mainNav.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={closeAll}
                  onMouseEnter={(e) => movePill(e.currentTarget)}
                  onFocus={(e) => movePill(e.currentTarget)}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className="relative z-10 flex h-11 items-center rounded-full px-4 text-[0.9375rem] text-text-primary"
                >
                  {l.label}
                  {isActive(l.href) ? <span aria-hidden className="absolute bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full bg-bg-fill-brand" /> : null}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <TrackedLink href={CTA_PRIMARY.href} trackLabel={CTA_PRIMARY.label} trackLocation="header" className={btn("primary", "min-h-11 px-5 text-[0.92rem]")}>
              {CTA_PRIMARY.label}
            </TrackedLink>
          </div>
          <button
            ref={mobileBtn}
            type="button"
            className="relative grid size-11 place-items-center rounded-full transition-colors hover:bg-bg-fill-secondary lg:hidden"
            aria-expanded={mobile}
            aria-controls={`${uid}-mobile`}
            aria-label={mobile ? "Fechar menu" : "Abrir menu"}
            onClick={() => setMobile((v) => !v)}
          >
            <span aria-hidden className={cx("absolute h-[1.5px] w-5 bg-text-primary transition-transform duration-300", mobile ? "rotate-45" : "-translate-y-[4px]")} />
            <span aria-hidden className={cx("absolute h-[1.5px] w-5 bg-text-primary transition-transform duration-300", mobile ? "-rotate-45" : "translate-y-[4px]")} />
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <div
        id={`${uid}-mobile`}
        ref={mobilePanel}
        inert={!mobile}
        className={cx(
          "surface-dark fixed inset-x-0 bottom-0 top-[4.5rem] overflow-y-auto overscroll-contain transition-[opacity,transform,visibility] duration-500 ease-[var(--ease-spring)] lg:hidden",
          mobile ? "visible translate-y-0 opacity-100" : "invisible -translate-y-4 opacity-0",
        )}
      >
        <nav aria-label="Menu principal (celular)" className="mx-auto flex min-h-full max-w-xl flex-col px-5 pb-10 pt-4 sm:px-8">
          {[
            { key: "s", label: "Serviços", items: serviceNav, hub: "/servicos", hubLabel: "Todos os serviços" },
            { key: "g", label: "Segmentos", items: segmentNav, hub: "/segmentos", hubLabel: "Todos os segmentos" },
          ].map((g) => (
            <details key={g.key} className="acc border-b border-border-tertiary">
              <summary className="flex min-h-16 items-center justify-between text-xl font-medium">
                {g.label}
                <span className="acc-icon grid size-10 place-items-center" aria-hidden>
                  <svg viewBox="0 0 20 20" width="20" height="20"><path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
                </span>
              </summary>
              <ul className="pb-4">
                {g.items.map((it) => (
                  <li key={it.href}>
                    <Link href={it.href} onClick={closeAll} className="flex min-h-12 items-center text-base text-text-secondary hover:text-text-primary">
                      {it.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href={g.hub} onClick={closeAll} className="flex min-h-12 items-center gap-2 text-base font-medium text-text-primary">
                    {g.hubLabel} <ArrowIcon />
                  </Link>
                </li>
              </ul>
            </details>
          ))}
          {[...mainNav, { href: "/contato", label: "Contato" }].map((l) => (
            <Link key={l.href} href={l.href} onClick={closeAll} className="flex min-h-16 items-center border-b border-border-tertiary text-xl font-medium">
              {l.label}
            </Link>
          ))}
          <TrackedLink href={CTA_PRIMARY.href} onClick={closeAll} trackLabel={CTA_PRIMARY.label} trackLocation="mobile_menu" className={btn("primary", "mt-8 w-full")}>
            {CTA_PRIMARY.label}
            <ArrowIcon />
          </TrackedLink>
          <p className="mt-6 text-sm text-text-secondary">
            De {site.location.city} ({site.location.state}) para empresas de todo o Brasil.
          </p>
        </nav>
      </div>
    </header>
  );
}
