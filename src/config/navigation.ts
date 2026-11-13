export type NavLink = { href: string; label: string; description?: string };

export const serviceNav: NavLink[] = [
  { href: "/servicos/trafego-pago", label: "Tráfego pago", description: "Estratégia de mídia e canais" },
  { href: "/servicos/google-ads", label: "Google Ads", description: "Quem já está procurando" },
  { href: "/servicos/meta-ads", label: "Meta Ads", description: "Instagram e Facebook" },
  { href: "/servicos/criativos-e-roteiros", label: "Criativos e roteiros", description: "Anúncios que comunicam a oferta" },
  { href: "/servicos/landing-pages", label: "Landing pages", description: "Páginas feitas para converter" },
  { href: "/servicos/estruturacao-comercial", label: "Estruturação comercial", description: "Pré-vendas, processo e rotina" },
  { href: "/servicos/crm-automacao-ia", label: "CRM, automação e IA", description: "Atendimento organizado" },
];

export const segmentNav: NavLink[] = [
  { href: "/segmentos/intermediacao-e-revendas", label: "Intermediação e revendas" },
  { href: "/segmentos/oficinas-e-funilarias", label: "Oficinas e funilarias" },
  { href: "/segmentos/clinicas-de-estetica", label: "Clínicas de estética" },
  { href: "/segmentos/dermatologistas", label: "Dermatologistas" },
  { href: "/segmentos/clinicas-odontologicas", label: "Clínicas odontológicas" },
  { href: "/segmentos/delivery", label: "Delivery e alimentação" },
];

export const mainNav: NavLink[] = [
  { href: "/metodologia", label: "Metodologia" },
  { href: "/sobre", label: "Sobre" },
  { href: "/conteudos", label: "Conteúdos" },
];

export const CTA_PRIMARY = { label: "Quero um diagnóstico", href: "/contato#diagnostico" };
export const CTA_SECONDARY = { label: "Conheça nossa estratégia", href: "/metodologia" };
