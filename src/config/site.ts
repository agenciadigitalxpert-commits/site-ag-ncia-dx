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
    "A Digital Xpert é uma agência de marketing digital em Balneário Camboriú (SC). A equipe cria campanhas no Google e na Meta, desenvolve páginas e organiza o atendimento comercial de empresas em todo o Brasil.",
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
    diagnosticForm: "https://form.respondi.app/6ajudkVN",
    /** PENDÊNCIA: e-mail comercial oficial. */
    email: null as string | null,
    /** PENDÊNCIA: telefone no formato +55 47 9XXXX-XXXX. */
    phone: null as string | null,
  },
  /** PENDÊNCIA: URLs reais dos perfis. Só os preenchidos aparecem. */
  social: {
    instagram: "https://www.instagram.com/agenciadigitalxpert/",
    linkedin: null as string | null,
    youtube: "https://www.youtube.com/@Ag%C3%AAnciaDigitalXpert",
    facebook: null as string | null,
  },
  /** Fundadores (fotos em /public/equipe, 3:4). */
  founders: [
    {
      id: "elizandro-uebel",
      name: "Elizandro Uebel",
      role: "Sócio-fundador",
      bio: "Empreendedor à frente de empresas em diferentes mercados.",
      photo: "/equipe/elizandro-uebel.webp",
      instagram: "https://www.instagram.com/elizandrouebel/",
    },
    {
      id: "diego-viana",
      name: "Diego Viana",
      role: "Sócio-fundador",
      bio: "Empresário e fundador da Agência Digital Xpert.",
      photo: "/equipe/diego-viana.webp",
      instagram: "https://www.instagram.com/diegouviana/",
    },
  ],
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
