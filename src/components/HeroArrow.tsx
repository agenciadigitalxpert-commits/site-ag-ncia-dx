/**
 * Arte do hero da home: seta de crescimento em prata metálico, com face lateral (3D)
 * e pílulas flutuantes. Original da DX (inspirada no branding, não copiada de banco).
 * Decorativa: aria-hidden. Animação respeita Reduzir Movimento (globals.css).
 */

// Linha central da seta (viewBox 600×600): sobe em zigue-zague até a ponta.
const PTS: [number, number][] = [
  [-40, 600],
  [150, 400],
  [250, 470],
  [440, 250],
];
const TIP_LEN = 112; // comprimento da ponta
const HALF_W = 70; // meia largura da base da ponta
const DEPTH: [number, number] = [14, 18]; // deslocamento da face lateral

function arrowHead(): string {
  const [a, b] = [PTS[PTS.length - 2], PTS[PTS.length - 1]];
  const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
  const [dx, dy] = [(b[0] - a[0]) / len, (b[1] - a[1]) / len];
  const [px, py] = [-dy, dx];
  const p1 = [b[0] + px * HALF_W, b[1] + py * HALF_W];
  const p2 = [b[0] - px * HALF_W, b[1] - py * HALF_W];
  const tip = [b[0] + dx * TIP_LEN, b[1] + dy * TIP_LEN];
  return [p1, tip, p2].map((p) => p.map((n) => n.toFixed(1)).join(",")).join(" ");
}

const LINE = PTS.map((p) => p.join(",")).join(" ");
const HEAD = arrowHead();

const pills = [
  { label: "Google Ads", className: "left-[44%] top-[40%]", delay: "0s" },
  { label: "Meta Ads", className: "left-[6%] top-[52%]", delay: "-2.2s" },
  { label: "Vendas", className: "right-[2%] top-[8%]", delay: "-4.1s" },
];

export function HeroArrow({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`hero-arrow relative ${className}`}>
      <svg viewBox="0 0 600 600" className="block h-auto w-full overflow-visible">
        <defs>
          <linearGradient id="dx-chrome" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#6f6f74" />
            <stop offset="0.35" stopColor="#d9d9d5" />
            <stop offset="0.6" stopColor="#ffffff" />
            <stop offset="0.8" stopColor="#c9c9c5" />
            <stop offset="1" stopColor="#f4f2ec" />
          </linearGradient>
          <linearGradient id="dx-side" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#141416" />
            <stop offset="0.6" stopColor="#3a3a3f" />
            <stop offset="1" stopColor="#56565b" />
          </linearGradient>
          {/* a cauda da seta some no escuro (sai do quadro como no branding) */}
          <linearGradient id="dx-tail-fade" x1="0" y1="1" x2="0.55" y2="0.45">
            <stop offset="0" stopColor="#000" />
            <stop offset="0.35" stopColor="#fff" />
          </linearGradient>
          <mask id="dx-tail" maskUnits="userSpaceOnUse" x="-80" y="0" width="720" height="640">
            <rect x="-80" y="0" width="720" height="640" fill="url(#dx-tail-fade)" />
          </mask>
          <radialGradient id="dx-halo">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.16" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="330" cy="300" r="290" fill="url(#dx-halo)" />
        <g mask="url(#dx-tail)">
          {/* face lateral (profundidade) */}
          <g transform={`translate(${DEPTH[0]} ${DEPTH[1]})`}>
            <polyline className="arrow-draw" pathLength={1} points={LINE} fill="none" stroke="url(#dx-side)" strokeWidth="44" strokeLinejoin="miter" strokeMiterlimit={8} />
            <polygon className="arrow-head" points={HEAD} fill="url(#dx-side)" />
          </g>
          {/* face frontal metálica */}
          <polyline className="arrow-draw" pathLength={1} points={LINE} fill="none" stroke="url(#dx-chrome)" strokeWidth="44" strokeLinejoin="miter" strokeMiterlimit={8} />
          <polygon className="arrow-head" points={HEAD} fill="url(#dx-chrome)" />
          {/* brilho fino na aresta */}
          <polyline className="arrow-draw" pathLength={1} points={LINE} fill="none" stroke="#fff" strokeOpacity="0.55" strokeWidth="1.5" transform="translate(-6 -8)" />
        </g>
      </svg>
      {pills.map((p) => (
        <span
          key={p.label}
          className={`hero-pill absolute rounded-full border border-white/10 bg-[rgb(28_28_31/0.82)] px-4 py-2 text-[0.8125rem] leading-5 text-[var(--grey-0)] shadow-xl shadow-black/40 backdrop-blur-md sm:px-5 sm:py-2.5 sm:text-[0.9375rem] ${p.className}`}
          style={{ ["--float-delay" as string]: p.delay }}
        >
          {p.label}
        </span>
      ))}
    </div>
  );
}
