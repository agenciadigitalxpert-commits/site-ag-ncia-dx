/** Ilustração do fluxo "do anúncio à venda" — sem métricas, apenas a lógica da operação. */
const steps = [
  { k: "Anúncio", d: "Google Ads · Meta Ads · criativos" },
  { k: "Página ou conversa", d: "Landing page · WhatsApp · formulário" },
  { k: "Qualificação", d: "Critérios · CRM · pré-vendas" },
  { k: "Venda", d: "Acompanhamento · follow-up · retorno" },
];

export function HeroFlow() {
  return (
    <div aria-hidden className="relative">
      <div className="relative rounded-xl bg-bg-surface/80 p-6 backdrop-blur-sm sm:p-8">
        <div className="mb-6 flex items-center justify-between text-xs uppercase leading-4 tracking-[0.14em] text-text-secondary">
          <span>Do clique à venda</span>
          <span className="flex items-center gap-2"><span className="flow-node size-2 rounded-full bg-bg-fill-brand" />uma operação só</span>
        </div>
        <ol className="relative">
          <svg className="absolute left-[1.05rem] top-4 h-[calc(100%-2rem)] w-px overflow-visible" preserveAspectRatio="none" viewBox="0 0 1 100">
            <line x1="0.5" y1="0" x2="0.5" y2="100" stroke="rgb(255 255 255 / 0.28)" strokeWidth="1" vectorEffect="non-scaling-stroke" className="flow-line" />
          </svg>
          {steps.map((s, i) => (
            <li key={s.k} className="hero-rise relative flex items-start gap-4 py-3" style={{ ["--d" as string]: `${300 + i * 120}ms` }}>
              <span className="relative z-10 grid size-9 shrink-0 place-items-center rounded-full bg-bg-surface-recessed text-xs tabular-nums text-text-primary">
                <span className="flow-node absolute inset-0 rounded-full border border-border-secondary" style={{ animationDelay: `${i * 0.9}s` }} />
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>
                <span className="font-display block text-lg font-medium leading-7 text-text-primary">{s.k}</span>
                <span className="block text-sm leading-5 text-text-secondary">{s.d}</span>
              </span>
            </li>
          ))}
        </ol>
        <div className="mt-5 border-t border-border-tertiary pt-5 text-sm leading-6 text-text-secondary">
          Marketing e comercial olhando para o mesmo indicador: <span className="text-text-primary">oportunidade que vira venda</span>.
        </div>
      </div>
    </div>
  );
}

/** "X" do wordmark em contorno, como elemento gráfico de fundo. */
export function BigX({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 100 100" className={className} fill="none">
      <path d="M8 4h22l20 30L70 4h22L61 50l31 46H70L50 66 30 96H8l31-46L8 4Z" stroke="currentColor" strokeWidth="0.35" />
    </svg>
  );
}
