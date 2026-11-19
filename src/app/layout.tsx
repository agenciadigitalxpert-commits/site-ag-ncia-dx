import type { Metadata, Viewport } from "next";
import { DM_Sans, Oswald } from "next/font/google";
import "./globals.css";
import { site } from "@/config/site";
import { isIndexable, siteUrl, tracking, hasOptionalTracking, whatsappNumber } from "@/config/env";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SiteEffects } from "@/components/SiteEffects";
import { RouteTracker } from "@/components/RouteTracker";
import { ConsentManager } from "@/components/consent/ConsentManager";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { JsonLd } from "@/components/JsonLd";
import { founderNodes, graph, organizationNode, websiteNode } from "@/lib/schema";
import { BRAND_SUFFIX } from "@/lib/seo";

/** Branding DX: DM Sans (texto e títulos, pesos leves) + Oswald (só no logotipo). */
const body = DM_Sans({ subsets: ["latin"], variable: "--font-body", display: "swap", axes: ["opsz"] });
const logo = Oswald({ subsets: ["latin"], variable: "--font-logo-face", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${site.name} | Tráfego pago e estrutura comercial`, template: `%s | ${BRAND_SUFFIX}` },
  description: site.description,
  applicationName: site.name,
  robots: isIndexable ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: { type: "website", locale: "pt_BR", siteName: site.name },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false, email: false, address: false },
};

const CONSENT_BOOTSTRAP = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});
try{var c=JSON.parse(localStorage.getItem('dx-consent')||'null');if(c&&c.v===1){gtag('consent','update',{analytics_storage:c.analytics?'granted':'denied',ad_storage:c.ads?'granted':'denied',ad_user_data:c.ads?'granted':'denied',ad_personalization:c.ads?'granted':'denied'});}}catch(e){}`;

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth" className={`${body.variable} ${logo.variable}`} suppressHydrationWarning>
      <head>
        {/* Marca que o JS está ativo: só então elementos .reveal começam ocultos. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        {hasOptionalTracking ? (
          /* dataLayer + Consent Mode v2: tudo negado por padrão; reaplica a escolha salva. O GTM só carrega após consentimento. */
          <script dangerouslySetInnerHTML={{ __html: CONSENT_BOOTSTRAP }} />
        ) : null}
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#conteudo"
          className="fixed left-3 top-3 z-[100] -translate-y-20 rounded-full bg-bg-fill-brand px-5 py-3 font-medium text-text-on-brand transition-transform focus:translate-y-0"
        >
          Pular para o conteúdo
        </a>
        <div aria-hidden className="scroll-progress" />
        <JsonLd data={graph(organizationNode(), websiteNode(), ...founderNodes())} />
        <Header />
        {hasOptionalTracking ? <ConsentManager ids={tracking} /> : null}
        <main id="conteudo" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <Footer />
        <SiteEffects />
        <RouteTracker />
        {whatsappNumber ? <WhatsAppButton number={whatsappNumber} /> : null}
      </body>
    </html>
  );
}
