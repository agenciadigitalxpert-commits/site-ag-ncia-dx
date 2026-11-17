import type { ReactNode } from "react";
import Image from "next/image";
import { heroImages } from "@/config/illustrations";
import { cx } from "./ui";

/**
 * Ilustrações dos heroes internos — uma por página, no mesmo estilo:
 * traço fino branco, UM elemento na cor da marca, brilho suave e movimento leve
 * (CSS, desligado com "reduzir movimento"). Decorativas: aria-hidden.
 */

const L = { stroke: "currentColor", strokeOpacity: 0.6, strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const F = { stroke: "currentColor", strokeOpacity: 0.16, strokeWidth: 1 };
const A = { stroke: "var(--lime-400)", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const lime = "var(--lime-400)";

const arts: Record<string, ReactNode> = {
  /* ---------- Serviços ---------- */
  "trafego-pago": (
    <>
      {[60, 110, 160].map((r) => <circle key={r} cx="200" cy="200" r={r} {...F} />)}
      <path d="M200 40v320M40 200h320" {...F} />
      <g className="art-spin" style={{ transformOrigin: "200px 200px" }}>
        <path d="M200 200 L200 40 A160 160 0 0 1 313 87 Z" fill="url(#sweep)" />
      </g>
      <circle cx="262" cy="128" r="6" fill={lime} className="art-pulse" />
      <circle cx="132" cy="250" r="4" fill="currentColor" fillOpacity="0.6" className="art-pulse" style={{ animationDelay: "1.2s" }} />
      <circle cx="250" cy="290" r="4" fill="currentColor" fillOpacity="0.6" className="art-pulse" style={{ animationDelay: "2.1s" }} />
      <circle cx="200" cy="200" r="5" fill="currentColor" />
    </>
  ),
  "google-ads": (
    <g className="art-float">
      <rect x="50" y="130" width="300" height="60" rx="30" {...L} strokeOpacity={0.8} />
      <circle cx="88" cy="158" r="11" {...L} />
      <path d="m96 166 9 9" {...L} />
      <rect x="120" y="155" width="110" height="6" rx="3" fill="currentColor" fillOpacity="0.5" />
      <path d="M244 146v24" {...A} className="art-blink" />
      {[225, 265, 305].map((y, i) => (
        <g key={y} opacity={i === 0 ? 1 : 0.6}>
          {i === 0 ? <rect x="60" y={y - 7} width="34" height="14" rx="7" fill={lime} /> : null}
          <rect x={i === 0 ? 102 : 60} y={y - 4} width={i === 0 ? 170 : 210} height="8" rx="4" fill="currentColor" fillOpacity="0.35" />
          <rect x="60" y={y + 12} width="250" height="5" rx="2.5" fill="currentColor" fillOpacity="0.15" />
        </g>
      ))}
    </g>
  ),
  "meta-ads": (
    <>
      <rect x="95" y="90" width="170" height="230" rx="20" {...F} strokeOpacity={0.3} transform="rotate(-10 180 205)" />
      <rect x="135" y="80" width="170" height="230" rx="20" {...F} strokeOpacity={0.3} transform="rotate(7 220 195)" />
      <g className="art-float">
        <rect x="115" y="70" width="170" height="250" rx="20" fill="var(--grey-950)" {...L} strokeOpacity={0.8} />
        <circle cx="140" cy="96" r="9" {...L} />
        <rect x="155" y="92" width="60" height="7" rx="3.5" fill="currentColor" fillOpacity="0.4" />
        <rect x="128" y="118" width="144" height="120" rx="10" fill="currentColor" fillOpacity="0.07" />
        <path d="M168 196l22-26 20 20 14-12 22 18" {...L} strokeOpacity={0.4} />
        <path d="M144 266c0-6 5-10 10-10 4 0 6 2 7 4 1-2 3-4 7-4 5 0 10 4 10 10 0 9-17 18-17 18s-17-9-17-18Z" fill={lime} className="art-pulse" />
        <rect x="190" y="262" width="70" height="6" rx="3" fill="currentColor" fillOpacity="0.35" />
        <rect x="190" y="276" width="46" height="6" rx="3" fill="currentColor" fillOpacity="0.2" />
      </g>
    </>
  ),
  "criativos-e-roteiros": (
    <>
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x="62" y={96 + i * 54} width="56" height="42" rx="8" {...F} strokeOpacity={0.3} />
      ))}
      <g className="art-float">
        <rect x="140" y="60" width="160" height="290" rx="30" fill="var(--grey-950)" {...L} strokeOpacity={0.8} />
        <rect x="188" y="74" width="64" height="8" rx="4" fill="currentColor" fillOpacity="0.25" />
        <path d="M206 180v50l40-25-40-25Z" fill={lime} />
        <rect x="160" y="300" width="120" height="4" rx="2" fill="currentColor" fillOpacity="0.2" />
        <path d="M160 302h120" {...A} className="art-progress" />
      </g>
      <path d="M318 112l10-10M330 130h14M318 148l10 10" {...L} strokeOpacity={0.4} />
    </>
  ),
  "landing-pages": (
    <>
      <g className="art-float">
        <rect x="50" y="80" width="300" height="240" rx="18" fill="var(--grey-950)" {...L} strokeOpacity={0.8} />
        <path d="M50 116h300" {...F} strokeOpacity={0.35} />
        {[72, 88, 104].map((x) => <circle key={x} cx={x} cy="98" r="4" fill="currentColor" fillOpacity="0.35" />)}
        <rect x="80" y="146" width="170" height="14" rx="7" fill="currentColor" fillOpacity="0.55" />
        <rect x="80" y="172" width="130" height="8" rx="4" fill="currentColor" fillOpacity="0.25" />
        <rect x="80" y="210" width="96" height="30" rx="15" fill={lime} />
        <rect x="80" y="266" width="70" height="30" rx="8" {...F} strokeOpacity={0.3} />
        <rect x="165" y="266" width="70" height="30" rx="8" {...F} strokeOpacity={0.3} />
        <rect x="250" y="266" width="70" height="30" rx="8" {...F} strokeOpacity={0.3} />
      </g>
      <path d="M210 232l0 26 7-7 6 13 6-3-6-12 10-1-23-16Z" fill="currentColor" className="art-cursor" />
    </>
  ),
  "estruturacao-comercial": (
    <>
      {[
        [70, 330, 90],
        [100, 300, 150],
        [130, 270, 210],
        [160, 240, 270],
      ].map(([a, b, y], i) => (
        <path key={i} d={`M${a} ${y} L${b} ${y} L${b - 20} ${y + 40} L${a + 20} ${y + 40} Z`} {...L} strokeOpacity={0.35 + i * 0.15} />
      ))}
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={170 + i * 30} cy="70" r="5" fill="currentColor" fillOpacity="0.7" className="art-drop" style={{ animationDelay: `${i * 0.9}s` }} />
      ))}
      <circle cx="200" cy="340" r="9" fill={lime} className="art-pulse" />
    </>
  ),
  "crm-automacao-ia": (
    <>
      {[60, 160, 260].map((x) => (
        <g key={x}>
          <rect x={x} y="90" width="80" height="230" rx="14" {...F} strokeOpacity={0.3} />
          <rect x={x + 14} y="106" width="40" height="6" rx="3" fill="currentColor" fillOpacity="0.35" />
        </g>
      ))}
      {[
        [74, 130],
        [74, 180],
        [174, 130],
        [274, 130],
        [274, 180],
        [274, 230],
      ].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="52" height="38" rx="8" fill="currentColor" fillOpacity="0.08" {...F} strokeOpacity={0.3} />
      ))}
      <rect x="74" y="230" width="52" height="38" rx="8" fill={lime} className="art-move" />
      <path d="M330 52l6 14 14 6-14 6-6 14-6-14-14-6 14-6 6-14Z" fill="currentColor" fillOpacity="0.8" className="art-twinkle" />
    </>
  ),

  /* ---------- Segmentos ---------- */
  "intermediacao-e-revendas": (
    <>
      <g className="art-float">
        <path d="M70 250h260c10 0 16-6 16-14v-18c0-10-6-16-16-18l-40-8-38-40c-6-6-12-8-22-8h-78c-10 0-18 4-24 10l-34 38-24 6c-10 2-16 10-16 20v18c0 8 6 14 16 14Z" {...L} strokeOpacity={0.8} />
        <path d="M128 192l26-30h52l30 30Z" {...F} strokeOpacity={0.35} />
        <circle cx="122" cy="252" r="26" fill="var(--grey-950)" {...L} />
        <circle cx="282" cy="252" r="26" fill="var(--grey-950)" {...L} />
        <circle cx="122" cy="252" r="8" fill="currentColor" fillOpacity="0.4" />
        <circle cx="282" cy="252" r="8" fill="currentColor" fillOpacity="0.4" />
      </g>
      <path d="M140 92c30-30 90-30 120 0" {...A} />
      <path d="M252 78l8 14-16 2" {...A} />
      <path d="M260 322c-30 30-90 30-120 0" {...L} strokeOpacity={0.45} />
      <path d="M148 336l-8-14 16-2" {...L} strokeOpacity={0.45} />
    </>
  ),
  "oficinas-e-funilarias": (
    <>
      <g className="art-spin-slow" style={{ transformOrigin: "200px 200px" }}>
        {Array.from({ length: 10 }).map((_, i) => (
          <rect key={i} x="190" y="66" width="20" height="34" rx="5" {...L} strokeOpacity={0.5} transform={`rotate(${i * 36} 200 200)`} />
        ))}
        <circle cx="200" cy="200" r="104" fill="var(--grey-950)" {...L} strokeOpacity={0.7} />
        <circle cx="200" cy="200" r="38" {...L} />
      </g>
      <path d="M246 132a34 34 0 0 0-44 42L132 244a14 14 0 0 0 20 20l70-70a34 34 0 0 0 42-44l-20 20-18-4-4-18 20-20Z" fill="var(--grey-950)" {...A} />
    </>
  ),
  "clinicas-de-estetica": (
    <>
      <circle cx="200" cy="200" r="130" {...F} strokeOpacity={0.25} />
      <ellipse cx="200" cy="200" rx="90" ry="118" {...L} strokeOpacity={0.45} />
      {[
        [270, 110, 26, true],
        [128, 150, 16, false],
        [250, 270, 18, false],
        [150, 280, 10, false],
        [312, 210, 10, false],
      ].map(([x, y, r, accent], i) => (
        <path
          key={i}
          d={`M${x} ${(y as number) - (r as number)}c${(r as number) * 0.18} ${(r as number) * 0.6} ${(r as number) * 0.22} ${(r as number) * 0.78} ${r} ${r}c-${(r as number) * 0.78} ${(r as number) * 0.22}-${(r as number) * 0.82} ${(r as number) * 0.4}-${r} ${r}c-${(r as number) * 0.18}-${(r as number) * 0.6}-${(r as number) * 0.22}-${(r as number) * 0.78}-${r}-${r}c${(r as number) * 0.78}-${(r as number) * 0.22} ${(r as number) * 0.82}-${(r as number) * 0.4} ${r}-${r}Z`}
          fill={accent ? lime : "currentColor"}
          fillOpacity={accent ? 1 : 0.7}
          className="art-twinkle"
          style={{ animationDelay: `${i * 0.6}s` }}
        />
      ))}
    </>
  ),
  dermatologistas: (
    <>
      {[150, 185, 220, 255].map((y, i) => (
        <path key={y} d={`M50 ${y} C 110 ${y - 22}, 160 ${y + 22}, 220 ${y} S 320 ${y - 22}, 350 ${y}`} {...L} strokeOpacity={0.7 - i * 0.14} />
      ))}
      {[
        [110, 300],
        [170, 315],
        [240, 305],
        [300, 318],
      ].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="9" {...F} strokeOpacity={0.35} />)}
      <g className="art-float">
        <circle cx="240" cy="150" r="58" fill="rgb(10 10 11 / 0.55)" {...A} />
        <path d="M282 192l38 38" {...A} strokeWidth={4} />
        <circle cx="240" cy="150" r="36" {...F} strokeOpacity={0.3} />
      </g>
    </>
  ),
  "clinicas-odontologicas": (
    <>
      <circle cx="200" cy="200" r="150" {...F} strokeOpacity={0.2} />
      <g className="art-float">
        <path d="M200 112c-18-14-40-20-60-12-30 12-34 48-26 78 6 22 10 44 12 68 2 26 8 50 22 50 14 0 16-26 22-50 4-14 16-14 20 0 6 24 8 50 22 50 14 0 20-24 22-50 2-24 6-46 12-68 8-30 4-66-26-78-20-8-42-2-60 12Z" fill="var(--grey-950)" {...L} strokeOpacity={0.85} />
        <path d="M160 140c10-8 24-10 36-4" {...L} strokeOpacity={0.35} />
      </g>
      <circle cx="296" cy="118" r="26" fill="var(--grey-950)" {...A} />
      <path d="M284 118l8 8 16-16" {...A} className="art-check" />
    </>
  ),
  delivery: (
    <>
      {[50, 95, 140].map((r, i) => (
        <circle key={r} cx="200" cy="220" r={r} {...F} strokeOpacity={0.3 - i * 0.07} />
      ))}
      <circle cx="200" cy="220" r="50" {...A} className="art-ring" />
      <path d="M60 330 C 110 300, 120 260, 170 250" {...L} strokeOpacity={0.5} strokeDasharray="4 8" className="art-route" />
      <g className="art-float">
        <path d="M200 90c-30 0-52 22-52 50 0 38 52 80 52 80s52-42 52-80c0-28-22-50-52-50Z" fill="var(--grey-950)" {...L} strokeOpacity={0.9} />
        <circle cx="200" cy="140" r="16" fill={lime} />
      </g>
      {/* caixa de entrega */}
      <g className="art-float" style={{ animationDelay: "1.5s" }}>
        <path d="M312 270l34 16v38l-34 16-34-16v-38l34-16Z" fill="var(--grey-950)" {...L} strokeOpacity={0.7} />
        <path d="M278 286l34 16 34-16M312 302v38" {...L} strokeOpacity={0.5} />
        <path d="M295 278l34 16" {...L} strokeOpacity={0.35} />
      </g>
    </>
  ),

  /* ---------- Institucional ---------- */
  servicos: (
    <>
      <circle cx="200" cy="200" r="130" {...F} strokeOpacity={0.25} />
      <g className="art-spin-slow" style={{ transformOrigin: "200px 200px" }}>
        {Array.from({ length: 7 }).map((_, i) => {
          const a = (i / 7) * Math.PI * 2 - Math.PI / 2;
          const x = 200 + Math.cos(a) * 130;
          const y = 200 + Math.sin(a) * 130;
          return (
            <g key={i}>
              <path d={`M200 200L${x.toFixed(1)} ${y.toFixed(1)}`} {...F} strokeOpacity={0.25} />
              <circle cx={x} cy={y} r="14" fill="var(--grey-950)" {...L} />
            </g>
          );
        })}
      </g>
      <circle cx="200" cy="200" r="26" fill={lime} className="art-pulse" />
    </>
  ),
  segmentos: (
    <>
      {[
        [200, 200, true],
        [200, 110, false],
        [278, 155, false],
        [278, 245, false],
        [200, 290, false],
        [122, 245, false],
        [122, 155, false],
      ].map(([x, y, center], i) => {
        const cx = x as number;
        const cy = y as number;
        const pts = Array.from({ length: 6 })
          .map((_, k) => {
            const a = (Math.PI / 3) * k + Math.PI / 6;
            return `${(cx + Math.cos(a) * 44).toFixed(1)},${(cy + Math.sin(a) * 44).toFixed(1)}`;
          })
          .join(" ");
        return center ? (
          <polygon key={i} points={pts} fill={lime} className="art-pulse" />
        ) : (
          <polygon key={i} points={pts} {...L} strokeOpacity={0.5} className="art-twinkle" style={{ animationDelay: `${i * 0.5}s` }} />
        );
      })}
    </>
  ),
  sobre: (
    <>
      <path d="M78 66h66l56 84 56-84h66l-89 134 89 134h-66l-56-84-56 84H78l89-134L78 66Z" {...L} strokeOpacity={0.7} className="art-draw" pathLength={1} />
      <path d="M78 66h66l56 84 56-84h66l-89 134 89 134h-66l-56-84-56 84H78l89-134L78 66Z" stroke="var(--lime-400)" strokeWidth="2" className="art-trace" pathLength={1} />
    </>
  ),
  metodologia: (
    <>
      <path d="M50 290 C 110 100, 290 100, 350 290" {...L} strokeOpacity={0.4} />
      {[
        [50, 290],
        [104, 186],
        [200, 148],
        [296, 186],
        [350, 290],
      ].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="16" fill="var(--grey-950)" {...L} />
          <text x={x} y={y + 4} textAnchor="middle" fontSize="11" fill="currentColor" fillOpacity="0.7" fontFamily="inherit">
            {i + 1}
          </text>
        </g>
      ))}
      <circle r="7" fill={lime} className="art-path" style={{ offsetPath: "path('M50 290 C 110 100, 290 100, 350 290')" }} />
    </>
  ),
  conteudos: (
    <>
      <rect x="110" y="96" width="170" height="220" rx="14" {...F} strokeOpacity={0.3} transform="rotate(-8 195 206)" />
      <g className="art-float">
        <rect x="120" y="80" width="170" height="230" rx="14" fill="var(--grey-950)" {...L} strokeOpacity={0.8} />
        <rect x="142" y="110" width="100" height="10" rx="5" fill="currentColor" fillOpacity="0.55" />
        {[140, 158, 176, 194, 212, 230, 248].map((y, i) => (
          <rect key={y} x="142" y={y} width={i % 3 === 2 ? 80 : 126} height="5" rx="2.5" fill="currentColor" fillOpacity="0.2" />
        ))}
        <path d="M262 80v46l-12-9-12 9V80" fill={lime} />
      </g>
    </>
  ),
  cases: (
    <>
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={80 + i * 64} y={260 - i * 44} width="44" height={70 + i * 44} rx="8" {...L} strokeOpacity={0.3 + i * 0.12} />
      ))}
      <rect x="272" y="128" width="44" height="202" rx="8" fill={lime} className="art-pulse" />
      <path d="M70 330h270" {...F} strokeOpacity={0.4} />
    </>
  ),
  legal: (
    <>
      <circle cx="200" cy="200" r="140" {...F} strokeOpacity={0.2} />
      <g className="art-float">
        <path d="M200 80l100 36v70c0 66-44 110-100 134-56-24-100-68-100-134v-70l100-36Z" fill="var(--grey-950)" {...L} strokeOpacity={0.85} />
        <path d="M160 200l28 28 54-56" {...A} strokeWidth={3} className="art-check" />
      </g>
    </>
  ),
  contato: (
    <>
      <g className="art-float">
        <path d="M70 110h190a20 20 0 0 1 20 20v80a20 20 0 0 1-20 20H130l-40 30v-30H70a20 20 0 0 1-20-20v-80a20 20 0 0 1 20-20Z" fill="var(--grey-950)" {...L} strokeOpacity={0.8} />
        {[120, 160, 200].map((x, i) => (
          <circle key={x} cx={x} cy="170" r="8" fill={i === 1 ? lime : "currentColor"} fillOpacity={i === 1 ? 1 : 0.6} className="art-typing" style={{ animationDelay: `${i * 0.18}s` }} />
        ))}
      </g>
      <path d="M190 250h140a20 20 0 0 1 20 20v50a20 20 0 0 1-20 20h-10v24l-30-24H190a20 20 0 0 1-20-20v-50a20 20 0 0 1 20-20Z" {...L} strokeOpacity={0.35} />
    </>
  ),
  "404": (
    <>
      <path d="M50 300 C 120 300, 120 160, 190 160" {...L} strokeOpacity={0.6} strokeDasharray="6 10" />
      <path d="M230 160 C 300 160, 300 90, 350 90" {...L} strokeOpacity={0.3} strokeDasharray="6 10" />
      <circle cx="210" cy="160" r="10" fill={lime} className="art-pulse" />
    </>
  ),
};

export type HeroArtKey = keyof typeof arts | string;

/** Exportado para gerar os arquivos SVG estáticos (scripts/export-illustrations). */
export const heroArtKeys = Object.keys(arts);

export function HeroArt({ variant, className }: { variant: HeroArtKey; className?: string }) {
  const image = heroImages[variant];
  if (image) {
    return (
      <div aria-hidden className={cx("hero-illustration pointer-events-none relative aspect-square w-full", className)}>
        <Image src={image} alt="" width={1200} height={1200} sizes="(min-width: 1024px) 30rem, 11rem" className="h-full w-full object-contain" priority />
      </div>
    );
  }
  const art = arts[variant];
  if (!art) return null;
  return (
    <div aria-hidden className={cx("hero-illustration pointer-events-none relative aspect-square w-full text-white", className)}>
      <div className="absolute inset-[14%] rounded-full opacity-60 blur-3xl" style={{ background: "radial-gradient(circle, hsl(76 90% 50% / 0.35), transparent 70%)" }} />
      <svg viewBox="0 0 400 400" fill="none" className="relative h-full w-full overflow-visible">
        <defs>
          <radialGradient id="sweep" cx="200" cy="200" r="160" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="var(--lime-400)" stopOpacity="0" />
            <stop offset="1" stopColor="var(--lime-400)" stopOpacity="0.45" />
          </radialGradient>
        </defs>
        {art}
      </svg>
    </div>
  );
}
