"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
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
          className="flex h-11 items-center gap-1.5 rounded-full px-3.5 text-[0.95rem] text-white/85 transition-colors hover:text-white aria-expanded:text-white"
        >
          {label}
          <svg aria-hidden viewBox="0 0 12 12" width="12" height="12" className={cx("transition-transform duration-300", isOpen && "rotate-180")}>
            <path d="m3 4.5 3 3 3-3" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />
          </svg>
        </button>
        <div
          id={panelId}
          hidden={!isOpen}
          className="absolute left-1/2 top-full z-50 mt-3 w-[min(34rem,90vw)] -translate-x-1/2 rounded-2xl border border-line-dark bg-graphite p-3 shadow-2xl shadow-black/40"
        >
          <ul className={cx("grid gap-1", items.length > 6 && "sm:grid-cols-2")}>
            {items.map((it) => (
              <li key={it.href}>
                <Link
                  href={it.href}
                  onClick={closeAll}
                  className="block rounded-xl px-4 py-3 transition-colors hover:bg-white/[0.06] focus-visible:bg-white/[0.06]"
                >
                  <span className="block text-[0.97rem] text-white">{it.label}</span>
                  {it.description ? <span className="mt-0.5 block text-sm text-muted-dark">{it.description}</span> : null}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={hubHref}
            onClick={closeAll}
            className="mt-2 flex items-center justify-between rounded-xl border-t border-line-dark px-4 pb-2 pt-4 text-sm text-white/80 hover:text-white"
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
      className={cx(
        "sticky top-0 z-40 border-b text-white transition-[background-color,border-color] duration-300",
        // Sem backdrop-filter com o menu aberto: ele criaria um bloco de contenção para o painel fixo.
        mobile ? "border-line-dark bg-ink" : scrolled ? "border-line-dark bg-ink/90 backdrop-blur-md" : "border-transparent bg-ink",
      )}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-6 px-5 sm:px-8 lg:px-10">
        <Link href="/" onClick={closeAll} className="text-[1.45rem] text-white" aria-label={`${site.name} — página inicial`}>
          <Logo />
        </Link>

        <nav ref={navRef} aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {dropdown("servicos", "Serviços", serviceNav, "/servicos", "Ver todos os serviços")}
            {dropdown("segmentos", "Segmentos", segmentNav, "/segmentos", "Ver todos os segmentos")}
            {mainNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} onClick={closeAll} className="flex h-11 items-center rounded-full px-3.5 text-[0.95rem] text-white/85 transition-colors hover:text-white">
                  {l.label}
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
            className="relative grid size-11 place-items-center rounded-full border border-line-dark lg:hidden"
            aria-expanded={mobile}
            aria-controls={`${uid}-mobile`}
            aria-label={mobile ? "Fechar menu" : "Abrir menu"}
            onClick={() => setMobile((v) => !v)}
          >
            <span aria-hidden className={cx("absolute h-[1.5px] w-5 bg-white transition-transform duration-300", mobile ? "rotate-45" : "-translate-y-[4px]")} />
            <span aria-hidden className={cx("absolute h-[1.5px] w-5 bg-white transition-transform duration-300", mobile ? "-rotate-45" : "translate-y-[4px]")} />
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <div
        id={`${uid}-mobile`}
        ref={mobilePanel}
        hidden={!mobile}
        className="fixed inset-x-0 bottom-0 top-[4.5rem] overflow-y-auto overscroll-contain bg-ink lg:hidden"
      >
        <nav aria-label="Menu principal (celular)" className="mx-auto flex min-h-full max-w-xl flex-col px-5 pb-10 pt-4 sm:px-8">
          {[
            { key: "s", label: "Serviços", items: serviceNav, hub: "/servicos", hubLabel: "Todos os serviços" },
            { key: "g", label: "Segmentos", items: segmentNav, hub: "/segmentos", hubLabel: "Todos os segmentos" },
          ].map((g) => (
            <details key={g.key} className="acc border-b border-line-dark">
              <summary className="flex min-h-16 items-center justify-between text-xl font-medium">
                {g.label}
                <span className="acc-icon grid size-9 place-items-center rounded-full border border-line-dark" aria-hidden>
                  <svg viewBox="0 0 20 20" width="18" height="18"><path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
                </span>
              </summary>
              <ul className="pb-4">
                {g.items.map((it) => (
                  <li key={it.href}>
                    <Link href={it.href} onClick={closeAll} className="flex min-h-12 items-center text-[1.05rem] text-white/80 hover:text-white">
                      {it.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href={g.hub} onClick={closeAll} className="flex min-h-12 items-center gap-2 text-[1.05rem] text-accent">
                    {g.hubLabel} <ArrowIcon />
                  </Link>
                </li>
              </ul>
            </details>
          ))}
          {[...mainNav, { href: "/contato", label: "Contato" }].map((l) => (
            <Link key={l.href} href={l.href} onClick={closeAll} className="flex min-h-16 items-center border-b border-line-dark text-xl font-medium">
              {l.label}
            </Link>
          ))}
          <TrackedLink href={CTA_PRIMARY.href} onClick={closeAll} trackLabel={CTA_PRIMARY.label} trackLocation="mobile_menu" className={btn("primary", "mt-8 w-full")}>
            {CTA_PRIMARY.label}
            <ArrowIcon />
          </TrackedLink>
          <p className="mt-6 text-sm text-muted-dark">
            {site.location.city} — {site.location.state}. Atendimento a empresas de todo o Brasil.
          </p>
        </nav>
      </div>
    </header>
  );
}
