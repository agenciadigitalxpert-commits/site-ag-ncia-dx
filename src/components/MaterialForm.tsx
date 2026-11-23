"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { formatBrPhone, validateLead, type LeadErrors } from "@/lib/lead";
import { track } from "@/lib/analytics";
import { readAttribution } from "@/lib/utm";
import { ArrowIcon, btn, cx } from "./ui";

type Contact = { nome: string; empresa: string; whatsapp: string };
const SAVED = "dx-material-contato"; // só na sessão: evita redigitar ao baixar outro material

const readSaved = (): Contact => {
  try {
    return { nome: "", empresa: "", whatsapp: "", ...JSON.parse(sessionStorage.getItem(SAVED) || "{}") };
  } catch {
    return { nome: "", empresa: "", whatsapp: "" };
  }
};

/**
 * Formulário curto que libera um material. O arquivo só é revelado depois que a
 * API confirma o registro do contato na planilha (aba "Leads frios").
 */
export function MaterialForm({ slug, title, format }: { slug: string; title: string; format: string }) {
  const uid = useId();
  const dialog = useRef<HTMLDialogElement>(null);
  const openedAt = useRef(0);
  const honeypot = useRef<HTMLInputElement>(null);
  const [values, setValues] = useState<Contact>({ nome: "", empresa: "", whatsapp: "" });
  const [errors, setErrors] = useState<LeadErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<string | null>(null);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    const onClose = () => document.body.style.removeProperty("overflow");
    d.addEventListener("close", onClose);
    return () => d.removeEventListener("close", onClose);
  }, []);

  const open = () => {
    setValues(readSaved());
    setErrors({});
    setMessage("");
    if (status !== "done") setStatus("idle");
    openedAt.current = Date.now();
    document.body.style.overflow = "hidden";
    dialog.current?.showModal();
  };

  const download = (path: string) => {
    track("material_download", { material: slug, file_format: format });
    const a = document.createElement("a");
    a.href = path;
    a.download = "";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validateLead(values, "step1");
    setErrors(errs);
    if (Object.keys(errs).length) {
      setMessage("Revise os campos destacados.");
      return;
    }
    setStatus("sending");
    setMessage("");
    try {
      const res = await fetch("/api/material", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          material: slug,
          ...values,
          website: honeypot.current?.value ?? "",
          elapsedMs: Date.now() - openedAt.current,
          page: window.location.pathname,
          attribution: readAttribution(),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok || !data.file) {
        setStatus("error");
        setErrors(data.errors ?? {});
        setMessage(data.message ?? "Não conseguimos liberar o material agora. Tente novamente.");
        return;
      }
      try {
        sessionStorage.setItem(SAVED, JSON.stringify(values));
      } catch {}
      track("material_lead", { material: slug });
      setFile(data.file);
      setStatus("done");
      download(data.file);
    } catch {
      setStatus("error");
      setMessage("Sem conexão. Confira sua internet e tente novamente.");
    }
  };

  const field = (k: keyof Contact, label: string, props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <div>
      <label htmlFor={`${uid}-${k}`} className="mb-2 block text-[0.9375rem] font-medium leading-6">{label}</label>
      <input
        id={`${uid}-${k}`}
        name={k}
        value={values[k]}
        onChange={(e) => setValues((s) => ({ ...s, [k]: k === "whatsapp" ? formatBrPhone(e.target.value) : e.target.value }))}
        aria-invalid={errors[k] ? true : undefined}
        aria-describedby={errors[k] ? `${uid}-${k}-err` : undefined}
        className={cx(
          "block min-h-[3.25rem] w-full rounded-[var(--radius-field)] border border-border-secondary bg-bg-fill-secondary px-4 py-3 text-base leading-6 outline-none transition-colors hover:border-text-secondary focus:border-border-focus",
          errors[k] && "!border-text-critical",
        )}
        {...props}
      />
      {errors[k] ? <p id={`${uid}-${k}-err`} className="mt-1.5 text-sm leading-5 text-text-critical">{errors[k]}</p> : null}
    </div>
  );

  return (
    <>
      <button type="button" onClick={status === "done" && file ? () => download(file) : open} className={btn("primary", "mt-auto self-start")}>
        {status === "done" ? `Baixar ${format} de novo` : "Quero o material"}
        <ArrowIcon className="transition-transform duration-200 group-hover:translate-x-0.5" />
      </button>

      <dialog
        ref={dialog}
        aria-labelledby={`${uid}-title`}
        className="surface-dark m-auto w-[min(30rem,calc(100vw-2rem))] rounded-[28px] bg-bg-surface p-0 text-text-primary shadow-2xl backdrop:bg-black/70 backdrop:backdrop-blur-sm"
        onClick={(e) => e.target === dialog.current && dialog.current?.close()}
      >
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[0.8125rem] font-medium uppercase leading-5 tracking-[0.14em] text-text-secondary">Material · {format}</p>
              <h2 id={`${uid}-title`} className="mt-2 text-h3">{title}</h2>
            </div>
            <button type="button" onClick={() => dialog.current?.close()} aria-label="Fechar" className="grid size-11 shrink-0 place-items-center rounded-full hover:bg-bg-fill-secondary">
              <svg aria-hidden viewBox="0 0 20 20" width="20" height="20"><path d="M5 5l10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
            </button>
          </div>

          {status === "done" && file ? (
            <div className="mt-6" role="status">
              <p className="text-lead">Pronto! O download começou.</p>
              <p className="mt-2 text-text-secondary">Se não começou, use o botão abaixo. Quer ajuda para aplicar na sua empresa? Fale com a gente.</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button type="button" onClick={() => download(file)} className={btn("primary")}>Baixar {format}</button>
                <Link href="/contato#diagnostico" onClick={() => dialog.current?.close()} className={btn("secondary")}>Quero um diagnóstico</Link>
              </div>
            </div>
          ) : (
            <form noValidate onSubmit={submit} className="mt-6 space-y-4">
              <p className="text-text-secondary">Preencha para liberar o download. Leva menos de um minuto.</p>
              {field("nome", "Seu nome", { autoComplete: "name", enterKeyHint: "next" })}
              {field("empresa", "Nome da empresa", { autoComplete: "organization", enterKeyHint: "next" })}
              {field("whatsapp", "WhatsApp", { autoComplete: "tel", inputMode: "tel", placeholder: "(47) 99999-9999", enterKeyHint: "send" })}
              <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
                <label>Não preencha<input ref={honeypot} tabIndex={-1} autoComplete="off" name="website" /></label>
              </div>
              {message ? <p role="alert" className="text-sm leading-5 text-text-critical">{message}</p> : null}
              <button type="submit" disabled={status === "sending"} className={btn("primary", "w-full")}>
                {status === "sending" ? "Liberando…" : "Liberar download"}
              </button>
              <p className="text-xs leading-5 text-text-secondary">
                Usamos seus dados para enviar o material e, se fizer sentido, falar com você pelo WhatsApp. Veja a{" "}
                <Link href="/politica-de-privacidade" className="underline underline-offset-2">política de privacidade</Link>.
              </p>
            </form>
          )}
        </div>
      </dialog>
    </>
  );
}
