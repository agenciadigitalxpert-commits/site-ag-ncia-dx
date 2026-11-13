/**
 * Configuração por ambiente. Todos os valores vêm de variáveis de ambiente,
 * lidas no build. Veja `.env.example`.
 */

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "") || null;

/** "production" só quando explicitamente definido. Qualquer outro valor = preview. */
export const siteEnv: "production" | "preview" =
  process.env.NEXT_PUBLIC_SITE_ENV === "production" ? "production" : "preview";

/** Domínio real configurado? Sem ele, nenhuma URL absoluta de produção é gerada. */
export const hasProductionDomain = Boolean(rawSiteUrl);

/** Base usada para canonicals, sitemap e @id. Fallback local fora de produção. */
export const siteUrl = rawSiteUrl ?? "http://localhost:3000";

/** Indexação liberada somente em produção com domínio definido. */
export const isIndexable = siteEnv === "production" && hasProductionDomain;

/** Ambiente de edição local: exibe rascunhos e notas de pendência. */
export const isEditing = process.env.NODE_ENV === "development";

export const absoluteUrl = (path = "/") => `${siteUrl}${path === "/" ? "" : path}` || siteUrl;

/** Container oficial do Google Tag Manager (ID público, não é segredo). A variável de ambiente sobrescreve. */
const DEFAULT_GTM_ID = "GTM-MLGX6B67";

export const tracking = {
  gtmId: process.env.NEXT_PUBLIC_GTM_ID?.trim() || DEFAULT_GTM_ID,
  ga4Id: process.env.NEXT_PUBLIC_GA4_ID?.trim() || null,
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() || null,
};

export const hasOptionalTracking = Boolean(tracking.gtmId || tracking.ga4Id || tracking.metaPixelId);

/** WhatsApp só aparece com número real (apenas dígitos, com DDI). Ex.: 5547999999999 */
const rawWhatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") || null;
export const whatsappNumber = rawWhatsapp && rawWhatsapp.length >= 12 ? rawWhatsapp : null;

/** O formulário só funciona com o webhook de leads configurado (variável de servidor). */
export const leadIntegrationReady = Boolean(process.env.LEAD_WEBHOOK_URL);
