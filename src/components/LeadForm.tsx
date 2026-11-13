"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import {
  ADS_OPTIONS,
  BUDGET_OPTIONS,
  CHALLENGE_OPTIONS,
  SEGMENT_OPTIONS,
  STEP1_FIELDS,
  formatBrPhone,
  validateLead,
  type LeadErrors,
  type LeadInput,
} from "@/lib/lead";
import { track } from "@/lib/analytics";
import { readAttribution } from "@/lib/utm";
import { ArrowIcon, CheckIcon, cx } from "./ui";

type Status = "idle" | "submitting" | "success" | "error";

const empty: LeadInput = {
  nome: "", empresa: "", whatsapp: "", segmento: "", desafio: "",
  investeAnuncios: "", investimentoMidia: "", siteOuInstagram: "", detalhes: "",
};

/**
 * Formulário de diagnóstico em duas etapas (a segunda é opcional).
 * `integrationReady` vem do servidor: sem webhook configurado o formulário
 * informa a pendência e o envio é recusado — nunca exibe sucesso falso.
 */
export function LeadForm({
  integrationReady,
  location,
  defaultSegment,
  tone = "dark",
}: {
  integrationReady: boolean;
  location: string;
  defaultSegment?: string;
  tone?: "dark" | "light";
}) {
  const uid = useId();
  const [step, setStep] = useState<1 | 2>(1);
  const [values, setValues] = useState<LeadInput>({ ...empty, segmento: defaultSegment ?? "" });
  const [errors, setErrors] = useState<LeadErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const startedAt = useRef<number | null>(null);
  const mountedAt = useRef<number>(0);
  const leadSent = useRef(false);
  const statusRef = useRef<HTMLDivElement>(null);
  const step2Heading = useRef<HTMLHeadingElement>(null);
  const honeypot = useRef<HTMLInputElement>(null);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  const id = (k: string) => `${uid}-${k}`;
  const set = (k: keyof LeadInput, v: string) => {
    setValues((s) => ({ ...s, [k]: k === "whatsapp" ? formatBrPhone(v) : v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };
  const onFocusAny = () => {
    if (startedAt.current === null) {
      // Executado apenas no evento de foco (o compilador não distingue o handler do render).
      // eslint-disable-next-line react-hooks/purity
      startedAt.current = Date.now();
      track("form_start", { form_location: location });
    }
  };
  const onBlur = (k: keyof LeadInput) => {
    const e = validateLead({ ...values }, "step1");
    if ((STEP1_FIELDS as readonly string[]).includes(k)) setErrors((cur) => ({ ...cur, [k]: e[k] }));
  };

  const focusFirstError = (e: LeadErrors) => {
    const first = Object.keys(e)[0];
    if (first) document.getElementById(id(first))?.focus();
  };

  const goStep2 = (ev: FormEvent) => {
    ev.preventDefault();
    const e = validateLead(values, "step1");
    setErrors(e);
    if (Object.keys(e).length) {
      focusFirstError(e);
      return;
    }
    track("form_step_complete", { form_location: location, step: 1, segment: values.segmento });
    setStep(2);
    requestAnimationFrame(() => step2Heading.current?.focus());
  };

  const submit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (status === "submitting") return;
    const e = validateLead(values, "all");
    setErrors(e);
    if (Object.keys(e).length) {
      const s1 = STEP1_FIELDS.some((k) => e[k]);
      if (s1) setStep(1);
      requestAnimationFrame(() => focusFirstError(e));
      return;
    }
    setStatus("submitting");
    setMessage("");
    try {
      const res = await fetch("/api/diagnostico", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          website: honeypot.current?.value ?? "",
          elapsedMs: Date.now() - (startedAt.current ?? mountedAt.current),
          page: window.location.pathname,
          attribution: readAttribution(),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok === true) {
        setStatus("success");
        if (!leadSent.current) {
          leadSent.current = true;
          track("generate_lead", {
            form_location: location,
            segment: values.segmento,
            invests_in_ads: values.investeAnuncios || "nao_informado",
            lead_id: data.id,
          });
        }
        requestAnimationFrame(() => statusRef.current?.focus());
        return;
      }
      if (data.errors) {
        setErrors(data.errors);
        if (STEP1_FIELDS.some((k) => data.errors[k])) setStep(1);
      }
      setStatus("error");
      setMessage(data.message || "Não foi possível enviar agora. Tente novamente em instantes.");
      track("form_error", { form_location: location, error_code: data.code || `http_${res.status}` });
    } catch {
      track("form_error", { form_location: location, error_code: "network" });
      setStatus("error");
      setMessage("Sem conexão com o servidor. Verifique sua internet; seus dados continuam no formulário.");
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  };

  const dark = tone === "dark";
  const field = cx(
    "mt-2 block min-h-12 w-full rounded-xl border px-4 py-3 text-base transition-colors outline-none focus-visible:outline-2",
    dark
      ? "border-white/20 bg-white/[0.04] text-white placeholder:text-white/40 focus:border-accent"
      : "border-ink/20 bg-white text-ink placeholder:text-ink/40 focus:border-ink",
  );
  const errCls = dark ? "border-danger-dark" : "border-danger";
  const errText = cx("mt-2 text-sm", dark ? "text-danger-dark" : "text-danger");
  const hint = cx("mt-1.5 text-sm", dark ? "text-muted-dark" : "text-muted-light");

  if (status === "success") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className={cx("rounded-2xl border p-8", dark ? "border-accent/50 bg-white/[0.03]" : "border-ink/15 bg-white")}>
        <span className="grid size-11 place-items-center rounded-full bg-accent text-accent-ink"><CheckIcon /></span>
        <h3 className="mt-5 text-h3">Recebemos sua solicitação.</h3>
        <p className={cx("mt-3 leading-relaxed", dark ? "text-white/80" : "text-muted-light")}>
          Obrigado, {values.nome.split(" ")[0]}. Nossa equipe vai analisar as informações e entrar em contato pelo WhatsApp informado para conversar sobre o diagnóstico.
        </p>
        <p className={cx("mt-6 text-sm", dark ? "text-muted-dark" : "text-muted-light")}>
          Enquanto isso, veja <Link className="underline underline-offset-2" href="/metodologia">como funciona nossa metodologia</Link>.
        </p>
      </div>
    );
  }

  const fieldProps = (k: keyof LeadInput) => ({
    id: id(k),
    name: k,
    value: values[k] ?? "",
    onFocus: onFocusAny,
    onBlur: () => onBlur(k),
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${id(k)}-err` : undefined,
  });
  const errorFor = (k: keyof LeadInput) =>
    errors[k] ? (
      <p id={`${id(k)}-err`} className={errText}>{errors[k]}</p>
    ) : null;

  return (
    <div className={dark ? "text-white" : "text-ink"}>
      {!integrationReady ? (
        <div role="note" className={cx("mb-6 rounded-xl border border-dashed p-4 text-sm leading-relaxed", dark ? "border-amber-300/60 bg-amber-300/10 text-amber-100" : "border-amber-600 bg-amber-50 text-amber-900")}>
          <strong>Formulário em configuração.</strong> A integração com o sistema de atendimento ainda não foi conectada, então os envios não estão sendo recebidos.
        </div>
      ) : null}

      <div className="mb-6 flex items-center gap-3 text-sm" aria-hidden>
        <span className={cx("grid size-7 place-items-center rounded-full font-medium", step === 1 ? "bg-accent text-accent-ink" : dark ? "bg-white/15" : "bg-ink/10")}>1</span>
        <span className={cx("h-px w-8", dark ? "bg-white/25" : "bg-ink/20")} />
        <span className={cx("grid size-7 place-items-center rounded-full font-medium", step === 2 ? "bg-accent text-accent-ink" : dark ? "bg-white/15" : "bg-ink/10")}>2</span>
        <span className={dark ? "text-muted-dark" : "text-muted-light"}>{step === 1 ? "Seus dados" : "Contexto (opcional)"}</span>
      </div>

      <form noValidate onSubmit={step === 1 ? goStep2 : submit} aria-busy={status === "submitting"}>
        {/* honeypot: invisível para pessoas, preenchido por robôs */}
        <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor={id("website")}>Não preencha este campo</label>
          <input ref={honeypot} id={id("website")} name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        {step === 1 ? (
          <fieldset className="grid gap-5 sm:grid-cols-2">
            <legend className="sr-only">Etapa 1 de 2: seus dados</legend>
            <div>
              <label htmlFor={id("nome")} className="text-[0.95rem] font-medium">Nome</label>
              <input {...fieldProps("nome")} type="text" autoComplete="name" required onChange={(e) => set("nome", e.target.value)} className={cx(field, errors.nome && errCls)} />
              {errorFor("nome")}
            </div>
            <div>
              <label htmlFor={id("empresa")} className="text-[0.95rem] font-medium">Empresa</label>
              <input {...fieldProps("empresa")} type="text" autoComplete="organization" required onChange={(e) => set("empresa", e.target.value)} className={cx(field, errors.empresa && errCls)} />
              {errorFor("empresa")}
            </div>
            <div>
              <label htmlFor={id("whatsapp")} className="text-[0.95rem] font-medium">WhatsApp</label>
              <input {...fieldProps("whatsapp")} type="tel" inputMode="tel" autoComplete="tel-national" placeholder="(47) 99999-9999" required onChange={(e) => set("whatsapp", e.target.value)} className={cx(field, errors.whatsapp && errCls)} />
              {errorFor("whatsapp")}
            </div>
            <div>
              <label htmlFor={id("segmento")} className="text-[0.95rem] font-medium">Segmento</label>
              <select {...fieldProps("segmento")} required onChange={(e) => set("segmento", e.target.value)} className={cx(field, "appearance-none", errors.segmento && errCls, dark && "[&>option]:text-ink")}>
                <option value="">Selecione</option>
                {SEGMENT_OPTIONS.map((o) => <option key={o}>{o}</option>)}
              </select>
              {errorFor("segmento")}
            </div>
            <div className="sm:col-span-2">
              <label htmlFor={id("desafio")} className="text-[0.95rem] font-medium">Principal desafio hoje</label>
              <select {...fieldProps("desafio")} required onChange={(e) => set("desafio", e.target.value)} className={cx(field, "appearance-none", errors.desafio && errCls, dark && "[&>option]:text-ink")}>
                <option value="">Selecione</option>
                {CHALLENGE_OPTIONS.map((o) => <option key={o}>{o}</option>)}
              </select>
              {errorFor("desafio")}
            </div>
            <div className="sm:col-span-2">
              <button type="submit" className="group inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full bg-accent px-6 font-medium text-accent-ink transition-colors hover:bg-white sm:w-auto">
                Continuar
                <ArrowIcon className="transition-transform group-hover:translate-x-0.5" />
              </button>
              <p className={hint}>Na próxima etapa, você pode adicionar contexto (opcional) e enviar.</p>
            </div>
          </fieldset>
        ) : (
          <fieldset className="grid gap-5 sm:grid-cols-2">
            <legend className="sr-only">Etapa 2 de 2: contexto opcional</legend>
            <h3 ref={step2Heading} tabIndex={-1} className="text-lg font-medium sm:col-span-2 focus:outline-none">
              Quer adiantar o contexto? Todos os campos abaixo são opcionais.
            </h3>
            <div>
              <label htmlFor={id("investeAnuncios")} className="text-[0.95rem] font-medium">Já investe em anúncios?</label>
              <select {...fieldProps("investeAnuncios")} onChange={(e) => set("investeAnuncios", e.target.value)} className={cx(field, "appearance-none", dark && "[&>option]:text-ink")}>
                <option value="">Prefiro não informar</option>
                {ADS_OPTIONS.map((o) => <option key={o}>{o}</option>)}
              </select>
              {errorFor("investeAnuncios")}
            </div>
            <div>
              <label htmlFor={id("investimentoMidia")} className="text-[0.95rem] font-medium">Investimento mensal em mídia</label>
              <select {...fieldProps("investimentoMidia")} aria-describedby={`${id("investimentoMidia")}-hint`} onChange={(e) => set("investimentoMidia", e.target.value)} className={cx(field, "appearance-none", dark && "[&>option]:text-ink")}>
                <option value="">Prefiro não informar</option>
                {BUDGET_OPTIONS.map((o) => <option key={o}>{o}</option>)}
              </select>
              <p id={`${id("investimentoMidia")}-hint`} className={hint}>Valor pago às plataformas (Google, Meta). Não inclui os honorários da agência.</p>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor={id("siteOuInstagram")} className="text-[0.95rem] font-medium">Site ou Instagram</label>
              <input {...fieldProps("siteOuInstagram")} type="text" placeholder="seusite.com.br ou @suaempresa" onChange={(e) => set("siteOuInstagram", e.target.value)} className={cx(field, errors.siteOuInstagram && errCls)} />
              {errorFor("siteOuInstagram")}
            </div>
            <div className="sm:col-span-2">
              <label htmlFor={id("detalhes")} className="text-[0.95rem] font-medium">Algo mais que devemos saber?</label>
              <textarea {...fieldProps("detalhes")} rows={3} onChange={(e) => set("detalhes", e.target.value)} className={cx(field, "resize-y", errors.detalhes && errCls)} />
              {errorFor("detalhes")}
            </div>
            <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-accent px-6 font-medium text-accent-ink transition-colors hover:bg-white disabled:cursor-wait disabled:opacity-70"
              >
                {status === "submitting" ? (
                  <>
                    <span aria-hidden className="size-4 animate-spin rounded-full border-2 border-accent-ink/30 border-t-accent-ink" />
                    Enviando…
                  </>
                ) : (
                  <>Enviar solicitação <ArrowIcon className="transition-transform group-hover:translate-x-0.5" /></>
                )}
              </button>
              <button type="button" onClick={() => setStep(1)} className="min-h-12 px-2 text-[0.95rem] underline underline-offset-4">
                Voltar e revisar
              </button>
            </div>
          </fieldset>
        )}

        <div ref={statusRef} tabIndex={-1} aria-live="polite" className="focus:outline-none">
          {status === "error" ? (
            <p role="alert" className={cx("mt-5 rounded-xl border p-4 text-[0.95rem]", dark ? "border-danger-dark/60 bg-danger-dark/10 text-danger-dark" : "border-danger/40 bg-red-50 text-danger")}>
              {message}
            </p>
          ) : null}
        </div>

        <p className={cx(hint, "mt-6")}>
          Usamos seus dados apenas para responder a esta solicitação. Veja a <Link href="/politica-de-privacidade" className="underline underline-offset-2">política de privacidade</Link>.
        </p>
      </form>
    </div>
  );
}
