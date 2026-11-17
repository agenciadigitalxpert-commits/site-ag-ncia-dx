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
import { ArrowIcon, CheckIcon, btn, cx } from "./ui";

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
}: {
  integrationReady: boolean;
  location: string;
  defaultSegment?: string;
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

  const field =
    "mt-2 block min-h-12 w-full rounded-sm border border-border-secondary bg-bg-fill-secondary px-4 py-3 text-base leading-6 text-text-primary transition-colors duration-150 outline-none placeholder:text-text-placeholder hover:border-text-secondary focus:border-border-focus focus-visible:outline-2";
  const errCls = "!border-text-critical";
  const errText = "mt-2 text-sm leading-5 text-text-critical";
  const hint = "mt-2 text-sm leading-5 text-text-secondary";
  const label = "text-[0.9375rem] font-medium leading-6";
  const groupTitle = "mb-4 text-xs font-medium uppercase leading-4 tracking-[0.14em] text-text-secondary";

  if (status === "success") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="focus:outline-none">
        <span className="grid size-12 place-items-center rounded-full bg-bg-fill-brand text-text-on-brand">
          <CheckIcon className="!text-current" />
        </span>
        <h3 className="mt-6 text-h3">Recebemos sua solicitação.</h3>
        <p className="mt-2 text-text-secondary">
          Obrigado, {values.nome.split(" ")[0]}. Nossa equipe vai analisar as informações e entrar em contato pelo WhatsApp informado para conversar sobre o diagnóstico.
        </p>
        <p className="mt-6 text-sm leading-5 text-text-secondary">
          Enquanto isso, veja <Link className="underline underline-offset-2 hover:text-text-primary" href="/metodologia">como funciona nossa metodologia</Link>.
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

  /** Seleção única visível (2–7 opções): radios estilizados como chips. */
  const chips = (k: keyof LeadInput, legend: string, options: readonly string[], describedBy?: string) => (
    <fieldset aria-describedby={[errors[k] ? `${id(k)}-err` : "", describedBy ?? ""].join(" ").trim() || undefined}>
      <legend className={label}>{legend}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((o, i) => (
          <label key={o} className="relative cursor-pointer">
            <input
              type="radio"
              name={k}
              value={o}
              id={i === 0 ? id(k) : undefined}
              checked={values[k] === o}
              onChange={() => set(k, o)}
              onFocus={onFocusAny}
              className="peer absolute inset-0 opacity-0"
            />
            <span
              className={cx(
                "inline-flex min-h-11 items-center rounded-sm border px-4 py-2 text-[0.9375rem] leading-6 transition-colors duration-150",
                "border-border-secondary text-text-primary hover:border-text-primary hover:bg-bg-fill-secondary",
                "peer-checked:border-transparent peer-checked:bg-bg-fill-inverse peer-checked:text-text-on-inverse",
                "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--color-border-focus)]",
                errors[k] && "!border-text-critical",
              )}
            >
              {o}
            </span>
          </label>
        ))}
      </div>
      {errorFor(k)}
    </fieldset>
  );

  return (
    <div>
      {!integrationReady ? (
        <div role="note" className="mb-6 rounded-sm border border-dashed border-border-note bg-bg-note p-4 text-sm leading-5 text-text-note">
          <strong>Formulário em configuração.</strong> A integração com o sistema de atendimento ainda não foi conectada, então os envios não estão sendo recebidos.
        </div>
      ) : null}

      {/* Progresso segmentado */}
      <div className="mb-8">
        <div className="flex gap-2" aria-hidden>
          <span className="h-1 flex-1 rounded-full bg-bg-fill-brand" />
          <span className={cx("h-1 flex-1 rounded-full transition-colors duration-300", step === 2 ? "bg-bg-fill-brand" : "bg-bg-fill-secondary-hover")} />
        </div>
        <p className="mt-3 text-sm leading-5 text-text-secondary" aria-live="polite">
          Etapa {step} de 2 · {step === 1 ? "Seus dados" : "Contexto (opcional)"}
        </p>
      </div>

      <form noValidate onSubmit={step === 1 ? goStep2 : submit} aria-busy={status === "submitting"}>
        {/* honeypot: invisível para pessoas, preenchido por robôs */}
        <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor={id("website")}>Não preencha este campo</label>
          <input ref={honeypot} id={id("website")} name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        {step === 1 ? (
          <div key="s1" className="step-in space-y-10">
            <fieldset>
              <legend className={groupTitle}>Contato</legend>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor={id("nome")} className={label}>Qual é o seu nome?</label>
                  <input {...fieldProps("nome")} type="text" autoComplete="name" required onChange={(e) => set("nome", e.target.value)} className={cx(field, errors.nome && errCls)} />
                  {errorFor("nome")}
                </div>
                <div>
                  <label htmlFor={id("whatsapp")} className={label}>Qual é o seu WhatsApp?</label>
                  <input {...fieldProps("whatsapp")} type="tel" inputMode="tel" autoComplete="tel-national" placeholder="(47) 99999-9999" required onChange={(e) => set("whatsapp", e.target.value)} className={cx(field, errors.whatsapp && errCls)} />
                  {errorFor("whatsapp")}
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend className={groupTitle}>Empresa</legend>
              <div className="space-y-6">
                <div>
                  <label htmlFor={id("empresa")} className={label}>Qual é o nome da empresa?</label>
                  <input {...fieldProps("empresa")} type="text" autoComplete="organization" required onChange={(e) => set("empresa", e.target.value)} className={cx(field, errors.empresa && errCls)} />
                  {errorFor("empresa")}
                </div>
                {chips("segmento", "Em qual segmento ela atua?", SEGMENT_OPTIONS)}
                {chips("desafio", "Qual é o principal desafio hoje?", CHALLENGE_OPTIONS)}
              </div>
            </fieldset>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm leading-5 text-text-secondary sm:max-w-xs">Na próxima etapa, você pode adicionar contexto (opcional) e enviar.</p>
              <button type="submit" className={btn("primary", "w-full sm:w-auto")}>
                Continuar
                <ArrowIcon className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        ) : (
          <div key="s2" className="step-in space-y-8">
            <h3 ref={step2Heading} tabIndex={-1} className="text-lg font-medium leading-7 focus:outline-none">
              Quer adiantar o contexto? Todas as perguntas abaixo são opcionais.
            </h3>
            {chips("investeAnuncios", "Vocês já investem em anúncios?", ADS_OPTIONS)}
            {chips("investimentoMidia", "Quanto investem por mês em mídia?", BUDGET_OPTIONS, `${id("investimentoMidia")}-hint`)}
            <p id={`${id("investimentoMidia")}-hint`} className="-mt-5 text-sm leading-5 text-text-secondary">
              Valor pago às plataformas (Google, Meta). Não inclui os honorários da agência.
            </p>
            <div>
              <label htmlFor={id("siteOuInstagram")} className={label}>Qual é o site ou Instagram da empresa?</label>
              <input {...fieldProps("siteOuInstagram")} type="text" placeholder="seusite.com.br ou @suaempresa" onChange={(e) => set("siteOuInstagram", e.target.value)} className={cx(field, errors.siteOuInstagram && errCls)} />
              {errorFor("siteOuInstagram")}
            </div>
            <div>
              <label htmlFor={id("detalhes")} className={label}>Quer contar algo mais?</label>
              <textarea {...fieldProps("detalhes")} rows={3} onChange={(e) => set("detalhes", e.target.value)} className={cx(field, "resize-y", errors.detalhes && errCls)} />
              {errorFor("detalhes")}
            </div>
            {/* Ações à direita: secundária → primária */}
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button type="button" onClick={() => setStep(1)} className={btn("ghost")}>
                Voltar e revisar
              </button>
              <button type="submit" disabled={status === "submitting"} className={btn("primary", "disabled:cursor-wait")}>
                {status === "submitting" ? (
                  <>
                    <span aria-hidden className="size-4 animate-spin rounded-full border-2 border-current/30 border-t-current" />
                    Enviando…
                  </>
                ) : (
                  <>Enviar solicitação <ArrowIcon className="transition-transform duration-200 group-hover:translate-x-0.5" /></>
                )}
              </button>
            </div>
          </div>
        )}

        <div ref={statusRef} tabIndex={-1} aria-live="polite" className="focus:outline-none">
          {status === "error" ? (
            <p role="alert" className="mt-6 rounded-sm border border-text-critical/50 p-4 text-[0.9375rem] leading-6 text-text-critical">
              {message}
            </p>
          ) : null}
        </div>

        <p className={cx(hint, "mt-8")}>
          Usamos seus dados apenas para responder a esta solicitação. Veja a <Link href="/politica-de-privacidade" className="underline underline-offset-2 hover:text-text-primary">política de privacidade</Link>.
        </p>
      </form>
    </div>
  );
}
