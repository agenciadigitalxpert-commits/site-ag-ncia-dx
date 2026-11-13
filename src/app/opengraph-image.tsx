import { ImageResponse } from "next/og";

export const alt = "Agência Digital Xpert — tráfego pago, criativos e estrutura comercial";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#0a0a0b", color: "#fff", padding: "72px 80px", position: "relative" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 22, letterSpacing: 6, opacity: 0.85 }}>
            <div style={{ width: 90, height: 2, background: "#fff" }} />
            agência
            <div style={{ width: 20, height: 2, background: "#fff" }} />
          </div>
          <div style={{ display: "flex", alignItems: "baseline", fontSize: 64, marginTop: 4 }}>
            digital<span style={{ fontWeight: 800, fontSize: 76 }}>X</span>pert
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 60, lineHeight: 1.08, fontWeight: 700, letterSpacing: -1.5, maxWidth: 980 }}>
            Mais oportunidades de venda. Um comercial preparado para aproveitar cada uma.
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 36, fontSize: 26, color: "#a1a1a6" }}>
            <div style={{ width: 14, height: 14, borderRadius: 14, background: "#c8f53c" }} />
            Tráfego pago · Criativos · Estrutura comercial · Balneário Camboriú — SC
          </div>
        </div>
      </div>
    ),
    size,
  );
}
