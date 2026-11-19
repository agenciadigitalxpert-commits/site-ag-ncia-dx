import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Tráfego pago, criativos e estrutura comercial na Agência Digital Xpert";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  // Logo oficial (arquivo da marca) embutida como data URL.
  const logo = await readFile(join(process.cwd(), "public/brand/logo-dx.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#000",
          color: "#fff",
          padding: "64px 80px",
        }}
      >
        <img src={logoSrc} width={300} height={107} alt="" style={{ marginLeft: -12 }} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 68, lineHeight: 1.06, fontWeight: 400, letterSpacing: -2, maxWidth: 1000 }}>
            Do clique à venda: anúncios, páginas e atendimento trabalhando juntos.
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 36, fontSize: 26, color: "#b9b9b6" }}>
            <div style={{ width: 12, height: 12, borderRadius: 12, background: "#f1f1ee" }} />
            Google Ads · Meta Ads · Estrutura comercial · Balneário Camboriú (SC)
          </div>
        </div>
      </div>
    ),
    size,
  );
}
