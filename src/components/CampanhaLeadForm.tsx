"use client";

import { useEffect, useId, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import { CAMPAIGN_FIELDS, CAMPAIGN_SEGMENTS, validateCampaign, type CampaignErrors, type CampaignInput, type CampaignSegment } from "@/lib/campanha";
import { formatBrPhone } from "@/lib/lead";
import { track } from "@/lib/analytics";
import { readAttribution } from "@/lib/utm";
import { ArrowIcon, CheckIcon, btn } from "./ui";
import { Select } from "./Select";

type Status = "idle" | "submitting" | "success" | "error";

const empty: CampaignInput = { nome: "", loja: "", whatsapp: "", resposta: "" };

/**
 * Formulário das landing pages de campanha: nome, WhatsApp, nome da loja e uma pergunta de qualificação.
 * Sucesso só aparece quando o servidor confirmou o recebimento. Em erro, os campos continuam preenchidos.
 * `integrationReady` vem do servidor: sem webhook o envio é recusado e a pendência fica visível.
 */
export function CampanhaLeadForm({
  segment,
  location,
  integrationReady,
  submitLabel,
  lojaLabel,
}: {
  segment: CampaignSegment;
  location: string;
  integrationReady: boolean;
  submitLabel: string;
  lojaLabel: string;
}) {
  const config = CAMPAIGN_SEGMENTS[segment];
  const uid = useId();
  const [values, setValues] = useState<CampaignInput>(empty);
  const [errors, setErrors] = useState<CampaignErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const startedAt = useRef<number | null>(null);
  const mountedAt = useRef(0);
  const leadSent = useRef(false);
  const statusRef = useRef<HTMLDivElement>(null);
  const honeypot = useRef<HTMLInputElement>(null);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  const id = (k: string) => `${uid}-${k}`;

  const set = (k: keyof CampaignInput, v: string) => {
    setValues((s) => ({ ...s, [k]: k === "whatsapp" ? formatBrPhone(v) : v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const onFocusAny = () => {
    if (startedAt.current === null) {
      // Executado só no evento de foco (não durante o render), como no formulário de diagnóstico.
      // eslint-disable-next-line react-hooks/purity
      startedAt.current = Date.now();
      track("form_start", { form_location: location, segmento: segment });
    }
  };

  const onBlur = (k: keyof CampaignInput) => {
    const e = validateCampaign(values, segment);
    setErrors((cur) => ({ ...cur, [k]: e[k] }));
  };

  const focusFirstError = (e: CampaignErrors) => {
    const first = CAMPAIGN_FIELDS.find((k) => e[k]);
    if (first) document.getElementById(id(first))?.focus();
  };

  const submit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (status === "submitting") return;

    const e = validateCampaign(values, segment);
    setErrors(e);
    if (Object.keys(e).length) {
      requestAnimationFrame(() => focusFirstError(e));
      return;
    }

    setStatus("submitting");
    setMessage("");
    try {
      const res = await fetch("/api/campanha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          segmento: segment,
          website: honeypot.current?.value ?? "",
          elapsedMs: Date.now() - (startedAt.current ?? mountedAt.current),
          page: window.location.pathname,
          attribution: readAttribution(),
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.ok === true) {
        setStatus("success");
        // Conversão principal: uma vez, somente após o envio confirmado pelo servidor.
        if (!leadSent.current) {
          leadSent.current = true;
          track("generate_lead", { form_location: location, segmento: segment, lead_id: data.id });
        }
        requestAnimationFrame(() => statusRef.current?.focus());
        return;
      }

      if (data.errors) setErrors(data.errors);
      setStatus("error");
      setMessage(data.message || "Não foi possível enviar agora. Tente novamente em instantes.");
      track("form_error", { form_location: location, error_code: data.code || `http_${res.status}` });
    } catch {
      track("form_error", { form_location: location, error_code: "network" });
      setStatus("error");
      setMessage("Não conseguimos conectar ao servidor. Seus dados continuam aqui para você tentar de novo.");
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  };

  const field =
    "mt-2 block min-h-[3.25rem] w-full rounded-[var(--radius-field)] border border-border-secondary bg-bg-fill-secondary px-4 py-3 text-base leading-6 text-text-primary transition-colors duration-150 outline-none placeholder:text-text-placeholder hover:border-text-secondary focus:border-border-focus focus-visible:outline-2";
  const errCls = "!border-text-critical";
  const errText = "mt-2 flex gap-2 text-sm leading-5 text-text-critical";
  const label = "text-[0.9375rem] font-medium leading-6";

  if (status === "success") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="step-in focus:outline-none">
        <span className="grid size-12 place-items-center rounded-full bg-bg-fill-brand text-text-on-brand">
          <CheckIcon className="!text-current" />
        </span>
        <h3 className="mt-6 text-h3">Recebemos os dados da sua loja.</h3>
        <p className="mt-3 text-text-secondary">A equipe da DX vai chamar você no WhatsApp para entender o cenário e combinar a conversa.</p>
        <p className="mt-8 text-sm leading-5 text-text-secondary">
          Enquanto isso, veja <Link className="underline underline-offset-2 hover:text-text-primary" href="/metodologia">como trabalhamos</Link>.
        </p>
      </div>
    );
  }

  const errorFor = (k: keyof CampaignInput) =>
    errors[k] ? (
      <p id={`${id(k)}-err`} className={errText}>
        <svg aria-hidden viewBox="0 0 20 20" width="20" height="20" className="shrink-0" fill="none">
          <circle cx="10" cy="10" r="7.25" stroke="currentColor" strokeWidth="1.5" />
          <path d="M10 6.5v4M10 13.5v.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        {errors[k]}
      </p>
    ) : null;

  const inputProps = (k: "nome" | "loja" | "whatsapp") => ({
    id: id(k),
    name: k,
    value: values[k],
    onFocus: onFocusAny,
    onBlur: () => onBlur(k),
    onChange: (e: ChangeEvent<HTMLInputElement>) => set(k, e.target.value),
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${id(k)}-err` : undefined,
    className: `${field} ${errors[k] ? errCls : ""}`,
  });

  return (
    <div>
      {!integrationReady ? (
        <div role="note" className="mb-6 rounded-[var(--radius-field)] border border-dashed border-border-note bg-bg-note p-4 text-sm leading-5 text-text-note">
          <strong>Formulário em configuração.</strong> A integração com o sistema de atendimento ainda não foi conectada. Enquanto isso, os envios são recusados e nada é registrado.
        </div>
      ) : null}

      <form noValidate onSubmit={submit} aria-busy={status === "submitting"} className="space-y-6">
        {/* honeypot: invisível para pessoas, preenchido por robôs */}
        <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor={id("website")}>Não preencha este campo</label>
          <input ref={honeypot} id={id("website")} name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div>
          <label htmlFor={id("nome")} className={label}>Qual é o seu nome?</label>
          <input {...inputProps("nome")} type="text" autoComplete="name" enterKeyHint="next" required maxLength={100} />
          {errorFor("nome")}
        </div>

        <div>
          <label htmlFor={id("whatsapp")} className={label}>Qual é o seu WhatsApp?</label>
          <input {...inputProps("whatsapp")} type="tel" inputMode="tel" autoComplete="tel-national" enterKeyHint="next" placeholder="(47) 99999-9999" required />
          {errorFor("whatsapp")}
        </div>

        <div>
          <label htmlFor={id("loja")} className={label}>{lojaLabel}</label>
          <input {...inputProps("loja")} type="text" autoComplete="organization" enterKeyHint="next" required maxLength={120} />
          {errorFor("loja")}
        </div>

        <div>
          <label id={`${id("resposta")}-label`} htmlFor={id("resposta")} className={label}>{config.pergunta}</label>
          <Select
            id={id("resposta")}
            name="resposta"
            labelId={`${id("resposta")}-label`}
            value={values.resposta}
            options={config.opcoes}
            placeholder="Selecione"
            required
            invalid={Boolean(errors.resposta)}
            describedBy={errors.resposta ? `${id("resposta")}-err` : undefined}
            onFocus={onFocusAny}
            onChange={(v) => set("resposta", v)}
            className="mt-2"
          />
          {errorFor("resposta")}
        </div>

        <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-5 text-text-secondary sm:max-w-xs">Leva menos de 1 minuto. A equipe chama você no WhatsApp.</p>
          <button type="submit" disabled={status === "submitting"} className={btn("primary", "w-full disabled:cursor-wait sm:w-auto")}>
            {status === "submitting" ? (
              <>
                <span aria-hidden className="size-4 animate-spin rounded-full border-2 border-current/30 border-t-current" />
                Enviando…
              </>
            ) : (
              <>
                {submitLabel} <ArrowIcon className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </>
            )}
          </button>
        </div>

        <div ref={statusRef} tabIndex={-1} aria-live="polite" className="focus:outline-none">
          {status === "error" ? (
            <p role="alert" className="rounded-[var(--radius-field)] border border-text-critical/50 p-4 text-[0.9375rem] leading-6 text-text-critical">
              {message}
            </p>
          ) : null}
        </div>

        <p className="text-sm leading-5 text-text-secondary">
          Usamos seus dados apenas para responder a esta solicitação. Veja a{" "}
          <Link href="/politica-de-privacidade" className="underline underline-offset-2 hover:text-text-primary">política de privacidade</Link>.
        </p>
      </form>
    </div>
  );
}
