"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { btn } from "../ui";
import { CONSENT_EVENT, OPEN_PREFS_EVENT, readConsent, saveConsent, type Consent } from "./store";

const SSR = "__ssr__";
function subscribe(cb: () => void) {
  window.addEventListener(CONSENT_EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(CONSENT_EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}
function snapshot() {
  try {
    return localStorage.getItem("dx-consent") ?? "";
  } catch {
    return "";
  }
}

type Ids = { gtmId: string | null; ga4Id: string | null; metaPixelId: string | null };

/**
 * Gerencia o consentimento (LGPD) e atualiza o Consent Mode v2.
 * Regras para evitar disparos duplicados:
 *  - Com GTM configurado (carregado no <head>, tudo negado por padrão), GA4 e Meta Pixel
 *    ficam DENTRO do GTM; tags que não são do Google precisam exigir consentimento lá.
 *  - Sem GTM, GA4 e Meta Pixel são carregados diretamente, cada um conforme sua categoria.
 */
export function ConsentManager({ ids }: { ids: Ids }) {
  // Lê a escolha salva sem setState em efeito (e sem divergência de hidratação).
  const raw = useSyncExternalStore(subscribe, snapshot, () => SSR);
  const ready = raw !== SSR;
  const consent: Consent | null = ready && raw ? readConsent() : null;
  const [dismissed, setDismissed] = useState(false);
  const banner = ready && !consent && !dismissed;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [draft, setDraft] = useState({ analytics: false, ads: false });
  const loaded = useRef({ gtm: false, ga4: false, pixel: false });

  const hasAnalyticsTool = Boolean(ids.gtmId || ids.ga4Id);
  const hasAdsTool = Boolean(ids.gtmId || ids.metaPixelId);

  const apply = useCallback(
    (c: Consent) => {
      const w = window;
      w.dataLayer = w.dataLayer || [];
      // eslint-disable-next-line prefer-rest-params
      w.gtag = w.gtag || function () { w.dataLayer!.push(arguments); };
      const consentState = {
        analytics_storage: c.analytics ? "granted" : "denied",
        ad_storage: c.ads ? "granted" : "denied",
        ad_user_data: c.ads ? "granted" : "denied",
        ad_personalization: c.ads ? "granted" : "denied",
      };

      if (ids.gtmId) {
        // O GTM já carrega no <head> com tudo negado; aqui só atualizamos o consentimento.
        w.gtag("consent", "update", consentState);
        w.dataLayer.push({ event: "consent_update", analytics_consent: consentState.analytics_storage, ads_consent: consentState.ad_storage });
        return;
      }

      if (ids.ga4Id && c.analytics && !loaded.current.ga4) {
        w.gtag("consent", "update", consentState);
        w.gtag("js", new Date());
        w.gtag("config", ids.ga4Id);
        inject(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ids.ga4Id)}`);
        w.__dxGa4Direct = true;
        loaded.current.ga4 = true;
      }

      if (ids.metaPixelId && c.ads && !loaded.current.pixel) {
        loadPixel(ids.metaPixelId);
        loaded.current.pixel = true;
      }
    },
    [ids],
  );

  // Aplica a escolha às ferramentas (sistema externo).
  useEffect(() => {
    if (consent) apply(consent);
  }, [consent?.analytics, consent?.ads, apply]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const open = () => {
      const c = readConsent();
      setDraft({ analytics: c?.analytics ?? false, ads: c?.ads ?? false });
      dialogRef.current?.showModal();
    };
    window.addEventListener(OPEN_PREFS_EVENT, open);
    return () => window.removeEventListener(OPEN_PREFS_EVENT, open);
  }, []);

  const decide = (analytics: boolean, ads: boolean) => {
    const prev = consent;
    dialogRef.current?.close();
    setDismissed(true);
    saveConsent(analytics, ads); // dispara CONSENT_EVENT → snapshot atualiza → efeito aplica
    // Revogação: recarrega para descarregar scripts já ativos.
    if (prev && ((prev.analytics && !analytics) || (prev.ads && !ads))) window.location.reload();
  };

  const choiceButton = "min-h-11 rounded-full border border-border-secondary px-3 text-sm font-medium hover:bg-bg-fill-secondary-hover";

  if (!ready) return null;

  return (
    <>
      <PixelPageViews enabled={Boolean(!ids.gtmId && ids.metaPixelId && consent?.ads)} />
      {banner ? (
        <div
          role="region"
          aria-label="Aviso de cookies"
          className="cookie-banner surface-graphite border border-border-secondary p-3 shadow-xl sm:p-4"
        >
          <p className="text-sm leading-5">
            Com sua permissão, usamos cookies de {hasAnalyticsTool ? "medição" : ""}
            {hasAnalyticsTool && hasAdsTool ? " e " : ""}{hasAdsTool ? "publicidade" : ""}.
          </p>
          <div className="mt-2 grid grid-cols-[auto_1fr_1fr] items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setDraft({ analytics: false, ads: false });
                dialogRef.current?.showModal();
              }}
              className="min-h-11 px-1 text-sm underline underline-offset-4 hover:text-text-secondary"
            >
              Configurar
            </button>
            <button type="button" onClick={() => decide(false, false)} className={choiceButton}>Rejeitar</button>
            <button type="button" onClick={() => decide(true, true)} className={choiceButton}>Aceitar</button>
          </div>
        </div>
      ) : null}

      <dialog
        ref={dialogRef}
        aria-labelledby="cookie-prefs-title"
        className="surface-graphite m-auto w-[min(36rem,calc(100vw-1.5rem))] max-h-[90dvh] overflow-y-auto rounded-lg p-0 shadow-2xl shadow-black/50 backdrop:bg-black/70 backdrop:backdrop-blur-[20px]"
      >
        <form
          method="dialog"
          className="p-6 sm:p-8"
          onSubmit={(e) => {
            e.preventDefault();
            decide(draft.analytics, draft.ads);
          }}
        >
          <div className="flex items-start justify-between gap-4">
            <h2 id="cookie-prefs-title" className="text-h3">Preferências de cookies</h2>
            <button type="button" aria-label="Fechar" onClick={() => dialogRef.current?.close()} className="-mr-2 -mt-1 grid size-10 shrink-0 place-items-center rounded-full text-text-secondary hover:bg-bg-fill-secondary hover:text-text-primary">
              <svg aria-hidden viewBox="0 0 20 20" width="20" height="20"><path d="M5 5l10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
            </button>
          </div>
          <p className="mt-2 text-sm leading-5 text-text-secondary">Você pode mudar sua escolha pelo rodapé do site. Consulte a <Link href="/politica-de-cookies" onClick={() => dialogRef.current?.close()} className="underline underline-offset-2">política de cookies</Link>.</p>
          <fieldset className="mt-6 space-y-6">
            <legend className="sr-only">Categorias</legend>
            <Toggle id="c-nec" label="Necessários" desc="Funcionamento básico, segurança e registro desta escolha. Sempre ativos." checked disabled onChange={() => {}} />
            {hasAnalyticsTool ? (
              <Toggle id="c-ana" label="Medição de audiência" desc="Estatísticas de uso do site (ex.: Google Analytics) para melhorar páginas e conteúdos." checked={draft.analytics} onChange={(v) => setDraft((d) => ({ ...d, analytics: v }))} />
            ) : null}
            {hasAdsTool ? (
              <Toggle id="c-ads" label="Publicidade" desc="Medição de campanhas e públicos de anúncios (ex.: Meta Pixel, Google Ads)." checked={draft.ads} onChange={(v) => setDraft((d) => ({ ...d, ads: v }))} />
            ) : null}
          </fieldset>
          <div className="mt-8 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button type="button" onClick={() => dialogRef.current?.close()} className={btn("secondary")}>
              Cancelar
            </button>
            <button type="submit" className={btn("primary")}>
              Salvar preferências
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}

function Toggle({ id, label, desc, checked, disabled, onChange }: { id: string; label: string; desc: string; checked: boolean; disabled?: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-start justify-between gap-6">
      <div>
        <label htmlFor={id} className="font-medium leading-6">{label}</label>
        <p id={`${id}-d`} className="text-sm leading-5 text-text-secondary">{desc}</p>
      </div>
      <input
        id={id}
        type="checkbox"
        role="switch"
        aria-describedby={`${id}-d`}
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 size-5 shrink-0 accent-[var(--lime-400)] disabled:opacity-60"
      />
    </div>
  );
}

function PixelPageViews({ enabled }: { enabled: boolean }) {
  const pathname = usePathname();
  const first = useRef(true);
  useEffect(() => {
    if (!enabled) return;
    if (first.current) {
      first.current = false;
      return; // o PageView inicial é enviado no carregamento do Pixel
    }
    window.fbq?.("track", "PageView");
  }, [pathname, enabled]);
  return null;
}

function inject(src: string) {
  const s = document.createElement("script");
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

function loadPixel(id: string) {
  /* eslint-disable */
  const w = window as any;
  if (w.fbq) return;
  const n: any = (w.fbq = function () {
    n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
  });
  if (!w._fbq) w._fbq = n;
  n.push = n;
  n.loaded = true;
  n.version = "2.0";
  n.queue = [];
  inject("https://connect.facebook.net/en_US/fbevents.js");
  w.fbq("init", id);
  w.fbq("track", "PageView");
  /* eslint-enable */
}
