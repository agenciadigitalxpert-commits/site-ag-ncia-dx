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
  { href: "/segmentos/estetica-automotiva", label: "Estética automotiva" },
  { href: "/segmentos/intermediacao-e-revendas", label: "Intermediação e revendas" },
  { href: "/segmentos/oficinas-e-funilarias", label: "Oficinas e funilarias" },
  { href: "/segmentos/clinicas-de-estetica", label: "Clínicas de estética" },
  { href: "/segmentos/clinicas-odontologicas", label: "Clínicas odontológicas" },
  { href: "/segmentos/medicos-e-consultorios", label: "Médicos e consultórios" },
  { href: "/segmentos/dermatologistas", label: "Dermatologistas" },
  { href: "/segmentos/nutricionistas", label: "Nutricionistas" },
  { href: "/segmentos/psicologos", label: "Psicólogos" },
  { href: "/segmentos/fisioterapeutas", label: "Fisioterapeutas" },
  { href: "/segmentos/advocacia", label: "Advocacia" },
  { href: "/segmentos/imobiliarias-e-corretores", label: "Imobiliárias e corretores" },
  { href: "/segmentos/construtoras", label: "Construtoras" },
  { href: "/segmentos/climatizacao-e-refrigeracao", label: "Climatização e refrigeração" },
  { href: "/segmentos/transportes-e-fretes", label: "Transportes e fretes" },
  { href: "/segmentos/delivery", label: "Delivery e alimentação" },
];

export const mainNav: NavLink[] = [
  { href: "/metodologia", label: "Metodologia" },
  { href: "/cases", label: "Cases" },
  { href: "/sobre", label: "Sobre" },
  { href: "/conteudos", label: "Conteúdos" },
];

export const CTA_PRIMARY = { label: "Quero um diagnóstico", href: "/contato#diagnostico" };
export const CTA_SECONDARY = { label: "Conheça a metodologia", href: "/metodologia" };
