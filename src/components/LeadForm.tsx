"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import {
  ADS_OPTIONS,
  BUDGET_OPTIONS,
  CHALLENGE_OPTIONS,
  STEP1_FIELDS,
  formatBrPhone,
  validateLead,
  type LeadErrors,
  type LeadInput,
} from "@/lib/lead";
import { site } from "@/config/site";
import { track } from "@/lib/analytics";
import { readAttribution } from "@/lib/utm";
import { ArrowIcon, CheckIcon, btn, cx } from "./ui";
import { Select } from "./Select";

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
}: {
  integrationReady: boolean;
  location: string;
}) {
  const uid = useId();
  const [step, setStep] = useState<1 | 2>(1);
  const [values, setValues] = useState<LeadInput>(empty);
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
    track("form_step_complete", { form_location: location, step: 1 });
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
    "mt-2 block min-h-[3.25rem] w-full rounded-[var(--radius-field)] border border-border-secondary bg-bg-fill-secondary px-4 py-3 text-base leading-6 text-text-primary transition-colors duration-150 outline-none placeholder:text-text-placeholder hover:border-text-secondary focus:border-border-focus focus-visible:outline-2";
  const errCls = "!border-text-critical";
  const errText = "mt-2 flex gap-2 text-sm leading-5 text-text-critical";
  const hint = "mt-2 text-sm leading-5 text-text-secondary";
  const label = "text-[0.9375rem] font-medium leading-6";
  const groupTitle = "mb-4 text-xs font-medium uppercase leading-4 tracking-[0.14em] text-text-secondary";

  if (status === "success") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="step-in focus:outline-none">
        <span className="grid size-12 place-items-center rounded-full bg-bg-fill-brand text-text-on-brand">
          <CheckIcon className="!text-current" />
        </span>
        <h3 className="mt-6 text-h3">Recebemos sua solicitação, {values.nome.trim().split(" ")[0]}.</h3>
        <p className="mt-2 text-text-secondary">Veja o que acontece agora:</p>
        <ol className="mt-6 space-y-4">
          {[
            ["Analisamos o contexto", "Lemos as informações antes de falar com você."],
            ["Chamamos no WhatsApp", `No número ${values.whatsapp}, com uma pessoa da equipe.`],
            ["Conversamos sobre o diagnóstico", "Onde estão as oportunidades e o que priorizar."],
          ].map(([t, d], i) => (
            <li key={t} className="flex gap-4">
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-bg-fill-secondary text-sm tabular-nums leading-5">{i + 1}</span>
              <span>
                <span className="block font-medium">{t}</span>
                <span className="block text-sm leading-5 text-text-secondary">{d}</span>
              </span>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-sm leading-5 text-text-secondary">
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
      <p id={`${id(k)}-err`} className={errText}>
        <svg aria-hidden viewBox="0 0 20 20" width="20" height="20" className="shrink-0" fill="none">
          <circle cx="10" cy="10" r="7.25" stroke="currentColor" strokeWidth="1.5" />
          <path d="M10 6.5v4M10 13.5v.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        {errors[k]}
      </p>
    ) : null;

  /** Dropdown no padrão do site (ver Select.tsx). */
  const dropdown = (k: keyof LeadInput, labelText: string, options: readonly string[], opts: { optional?: boolean; describedBy?: string } = {}) => (
    <div>
      <label id={`${id(k)}-label`} htmlFor={id(k)} className={label}>
        {labelText} {opts.optional ? <span className="font-normal text-text-secondary">(opcional)</span> : null}
      </label>
      <Select
        id={id(k)}
        name={k}
        labelId={`${id(k)}-label`}
        value={values[k] ?? ""}
        options={options}
        placeholder={opts.optional ? "Prefiro não informar" : "Selecione"}
        required={!opts.optional}
        invalid={Boolean(errors[k])}
        describedBy={[errors[k] ? `${id(k)}-err` : "", opts.describedBy ?? ""].join(" ").trim() || undefined}
        onFocus={onFocusAny}
        onChange={(v) => set(k, v)}
        className="mt-2"
      />
      {errorFor(k)}
    </div>
  );

  return (
    <div>
      {!integrationReady ? (
        <div role="note" className="mb-6 rounded-[var(--radius-field)] border border-dashed border-border-note bg-bg-note p-4 text-sm leading-5 text-text-note">
          <strong>Formulário em configuração.</strong> A integração com o sistema de atendimento ainda não foi conectada, então os envios não estão sendo recebidos.{" "}
          <a href={site.contact.diagnosticForm} className="font-medium underline underline-offset-2">Solicitar pelo formulário da DX no Respondi</a>.
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
              <div className="space-y-5">
                <div>
                  <label htmlFor={id("nome")} className={label}>Qual é o seu nome?</label>
                  <input {...fieldProps("nome")} type="text" autoComplete="name" enterKeyHint="next" required onChange={(e) => set("nome", e.target.value)} className={cx(field, errors.nome && errCls)} />
                  {errorFor("nome")}
                </div>
                <div>
                  <label htmlFor={id("whatsapp")} className={label}>Qual é o seu WhatsApp?</label>
                  <input {...fieldProps("whatsapp")} type="tel" inputMode="tel" autoComplete="tel-national" enterKeyHint="next" placeholder="(47) 99999-9999" required onChange={(e) => set("whatsapp", e.target.value)} className={cx(field, errors.whatsapp && errCls)} />
                  {errorFor("whatsapp")}
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend className={groupTitle}>Empresa</legend>
              <div className="space-y-6">
                <div>
                  <label htmlFor={id("empresa")} className={label}>Qual é o nome da empresa?</label>
                  <input {...fieldProps("empresa")} type="text" autoComplete="organization" enterKeyHint="next" required onChange={(e) => set("empresa", e.target.value)} className={cx(field, errors.empresa && errCls)} />
                  {errorFor("empresa")}
                </div>
                <div>
                  <label htmlFor={id("segmento")} className={label}>Em qual segmento ela atua?</label>
                  <input {...fieldProps("segmento")} type="text" placeholder="Ex.: oficina mecânica, clínica odontológica, delivery" required onChange={(e) => set("segmento", e.target.value)} className={cx(field, errors.segmento && errCls)} />
                  {errorFor("segmento")}
                </div>
                {dropdown("desafio", "Qual é o principal desafio hoje?", CHALLENGE_OPTIONS)}
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
              Quer adiantar o contexto?
            </h3>
            {dropdown("investeAnuncios", "Vocês já investem em anúncios?", ADS_OPTIONS, { optional: true })}
            {dropdown("investimentoMidia", "Quanto investem por mês em mídia?", BUDGET_OPTIONS, { optional: true, describedBy: `${id("investimentoMidia")}-hint` })}
            <p id={`${id("investimentoMidia")}-hint`} className="-mt-6 text-sm leading-5 text-text-secondary">
              Valor pago às plataformas (Google, Meta). Não inclui os honorários da agência.
            </p>
            <div>
              <label htmlFor={id("siteOuInstagram")} className={label}>Qual é o site ou Instagram da empresa? <span className="font-normal text-text-secondary">(opcional)</span></label>
              <input {...fieldProps("siteOuInstagram")} type="text" placeholder="seusite.com.br ou @suaempresa" onChange={(e) => set("siteOuInstagram", e.target.value)} className={cx(field, errors.siteOuInstagram && errCls)} />
              {errorFor("siteOuInstagram")}
            </div>
            <div>
              <label htmlFor={id("detalhes")} className={label}>Quer contar algo mais? <span className="font-normal text-text-secondary">(opcional)</span></label>
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
            <p role="alert" className="mt-6 rounded-[var(--radius-field)] border border-text-critical/50 p-4 text-[0.9375rem] leading-6 text-text-critical">
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
