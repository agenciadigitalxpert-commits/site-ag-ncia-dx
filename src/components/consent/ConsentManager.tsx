"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
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
 * Gerencia consentimento e carrega scripts opcionais SOMENTE após a escolha.
 * Regras para evitar disparos duplicados:
 *  - Com GTM configurado, GA4 e Meta Pixel devem ser configurados DENTRO do GTM;
 *    este componente carrega apenas o GTM (com Consent Mode v2).
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
        if (!loaded.current.gtm && (c.analytics || c.ads)) {
          w.gtag("consent", "default", { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
          w.gtag("consent", "update", consentState);
          w.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
          inject(`https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(ids.gtmId)}`);
          w.__dxGtm = true;
          loaded.current.gtm = true;
        } else if (loaded.current.gtm) {
          w.gtag("consent", "update", consentState);
        }
        return;
      }

      if (ids.ga4Id && c.analytics && !loaded.current.ga4) {
        w.gtag("consent", "default", { analytics_storage: "granted", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
        w.gtag("js", new Date());
        w.gtag("config", ids.ga4Id);
        inject(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ids.ga4Id)}`);
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

  if (!ready) return null;

  return (
    <>
      <PixelPageViews enabled={Boolean(!ids.gtmId && ids.metaPixelId && consent?.ads)} />
      {banner ? (
        <div
          role="region"
          aria-label="Aviso de cookies"
          className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-3xl rounded-2xl border border-line-dark bg-graphite p-5 text-white shadow-2xl shadow-black/50 sm:inset-x-6 sm:bottom-6 sm:p-6"
        >
          <p className="text-[0.95rem] leading-relaxed text-white/90">
            Usamos cookies necessários para o site funcionar. Com a sua permissão, também usamos cookies de
            {hasAnalyticsTool ? " medição de audiência" : ""}
            {hasAnalyticsTool && hasAdsTool ? " e de" : ""}
            {hasAdsTool ? " publicidade" : ""} para entender o uso do site e avaliar nossas campanhas.{" "}
            <Link href="/politica-de-cookies" className="underline underline-offset-2">Saiba mais</Link>.
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <button type="button" onClick={() => decide(true, true)} className="min-h-11 rounded-full bg-accent px-5 font-medium text-accent-ink hover:bg-white">
              Aceitar todos
            </button>
            <button type="button" onClick={() => decide(false, false)} className="min-h-11 rounded-full border border-white/30 px-5 font-medium hover:border-white">
              Rejeitar opcionais
            </button>
            <button
              type="button"
              onClick={() => {
                setDraft({ analytics: false, ads: false });
                dialogRef.current?.showModal();
              }}
              className="min-h-11 rounded-full px-5 font-medium underline underline-offset-4 hover:text-accent"
            >
              Configurar
            </button>
          </div>
        </div>
      ) : null}

      <dialog
        ref={dialogRef}
        aria-labelledby="cookie-prefs-title"
        className="m-auto w-[min(36rem,calc(100vw-1.5rem))] rounded-2xl border border-line-dark bg-graphite p-0 text-white backdrop:bg-black/70"
      >
        <form
          method="dialog"
          className="p-6 sm:p-8"
          onSubmit={(e) => {
            e.preventDefault();
            decide(draft.analytics, draft.ads);
          }}
        >
          <h2 id="cookie-prefs-title" className="text-h3">Preferências de cookies</h2>
          <p className="mt-2 text-sm text-muted-dark">Escolha o que podemos usar. Você pode mudar isso a qualquer momento pelo link no rodapé.</p>
          <fieldset className="mt-6 space-y-3">
            <legend className="sr-only">Categorias</legend>
            <Toggle id="c-nec" label="Necessários" desc="Funcionamento básico, segurança e registro desta escolha. Sempre ativos." checked disabled onChange={() => {}} />
            {hasAnalyticsTool ? (
              <Toggle id="c-ana" label="Medição de audiência" desc="Estatísticas de uso do site (ex.: Google Analytics) para melhorar páginas e conteúdos." checked={draft.analytics} onChange={(v) => setDraft((d) => ({ ...d, analytics: v }))} />
            ) : null}
            {hasAdsTool ? (
              <Toggle id="c-ads" label="Publicidade" desc="Medição de campanhas e públicos de anúncios (ex.: Meta Pixel, Google Ads)." checked={draft.ads} onChange={(v) => setDraft((d) => ({ ...d, ads: v }))} />
            ) : null}
          </fieldset>
          <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button type="button" onClick={() => dialogRef.current?.close()} className="min-h-11 rounded-full px-5 underline underline-offset-4">
              Cancelar
            </button>
            <button type="submit" className="min-h-11 rounded-full bg-accent px-6 font-medium text-accent-ink hover:bg-white">
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
    <div className="flex items-start justify-between gap-4 rounded-xl border border-line-dark p-4">
      <div>
        <label htmlFor={id} className="font-medium">{label}</label>
        <p id={`${id}-d`} className="mt-1 text-sm text-muted-dark">{desc}</p>
      </div>
      <input
        id={id}
        type="checkbox"
        role="switch"
        aria-describedby={`${id}-d`}
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 size-5 shrink-0 accent-[var(--accent)] disabled:opacity-60"
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
