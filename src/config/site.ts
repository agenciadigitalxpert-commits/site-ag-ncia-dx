/**
 * Dados institucionais centralizados.
 * Campos `null` são PENDÊNCIAS: nada é exibido nem enviado ao schema enquanto
 * não forem preenchidos com dados reais.
 */
export const site = {
  name: "Agência Digital Xpert",
  shortName: "DX",
  alternateName: ["DX", "Digital Xpert"],
  tagline: "Tráfego pago, criativos e estrutura comercial",
  description:
    "A Agência Digital Xpert (DX) é uma agência de marketing digital de Balneário Camboriú (SC) que conecta tráfego pago no Google Ads e Meta Ads, criativos, landing pages, estruturação comercial, CRM e automação para gerar demanda e transformar atendimento em vendas.",
  location: {
    city: "Balneário Camboriú",
    state: "SC",
    stateName: "Santa Catarina",
    country: "BR",
    countryName: "Brasil",
    /** Endereço completo só se for público. PENDÊNCIA. */
    streetAddress: null as string | null,
    postalCode: null as string | null,
  },
  areaServed: "Brasil",
  contact: {
    /** PENDÊNCIA: e-mail comercial oficial. */
    email: null as string | null,
    /** PENDÊNCIA: telefone no formato +55 47 9XXXX-XXXX. */
    phone: null as string | null,
  },
  /** PENDÊNCIA: URLs reais dos perfis. Só os preenchidos aparecem. */
  social: {
    instagram: null as string | null,
    linkedin: null as string | null,
    youtube: null as string | null,
    facebook: null as string | null,
  },
  /** PENDÊNCIA: razão social e CNPJ para as políticas. */
  legal: {
    legalName: null as string | null,
    cnpj: null as string | null,
    /** Canal do encarregado (DPO) ou responsável por privacidade. */
    privacyContact: null as string | null,
  },
  /** Mude para true somente após revisão jurídica das políticas. Até lá, exibem aviso de minuta. */
  policiesValidated: false,
  /** Data da última revisão das minutas de política (AAAA-MM-DD). */
  policiesUpdatedAt: "2026-11-13",
} as const;

export type SocialKey = keyof typeof site.social;
