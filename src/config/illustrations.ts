/**
 * Imagens dos heroes internos (opcional).
 * Quando uma chave tiver imagem, ela substitui a ilustração em SVG daquela página.
 * Coloque o arquivo em /public/ilustracoes/<chave>.webp (quadrado, 1200×1200,
 * fundo transparente ou #0A0A0B) e descomente/adicione a linha correspondente.
 *
 * Chaves: trafego-pago, google-ads, meta-ads, criativos-e-roteiros, landing-pages,
 * estruturacao-comercial, crm-automacao-ia, intermediacao-e-revendas,
 * oficinas-e-funilarias, clinicas-de-estetica, dermatologistas,
 * clinicas-odontologicas, delivery, servicos, segmentos, sobre, metodologia,
 * conteudos, cases, legal, contato, 404
 */
export const heroImages: Partial<Record<string, string>> = {
  "404": "/ilustracoes/404.svg",
  "cases": "/ilustracoes/cases.svg",
  "clinicas-de-estetica": "/ilustracoes/clinicas-de-estetica.svg",
  "clinicas-odontologicas": "/ilustracoes/clinicas-odontologicas.svg",
  "contato": "/ilustracoes/contato.svg",
  "conteudos": "/ilustracoes/conteudos.svg",
  "criativos-e-roteiros": "/ilustracoes/criativos-e-roteiros.svg",
  "crm-automacao-ia": "/ilustracoes/crm-automacao-ia.svg",
  "delivery": "/ilustracoes/delivery.svg",
  "dermatologistas": "/ilustracoes/dermatologistas.svg",
  "estruturacao-comercial": "/ilustracoes/estruturacao-comercial.svg",
  "google-ads": "/ilustracoes/google-ads.svg",
  "intermediacao-e-revendas": "/ilustracoes/intermediacao-e-revendas.svg",
  "landing-pages": "/ilustracoes/landing-pages.svg",
  "legal": "/ilustracoes/legal.svg",
  "meta-ads": "/ilustracoes/meta-ads.svg",
  "metodologia": "/ilustracoes/metodologia.svg",
  "oficinas-e-funilarias": "/ilustracoes/oficinas-e-funilarias.svg",
  "segmentos": "/ilustracoes/segmentos.svg",
  "servicos": "/ilustracoes/servicos.svg",
  "sobre": "/ilustracoes/sobre.svg",
  "trafego-pago": "/ilustracoes/trafego-pago.svg",
  // Novos segmentos e páginas: reaproveitam as ilustrações mais próximas (trocar por arte própria depois).
  "estetica-automotiva": "/ilustracoes/oficinas-e-funilarias.svg",
  "climatizacao-e-refrigeracao": "/ilustracoes/servicos.svg",
  "transportes-e-fretes": "/ilustracoes/delivery.svg",
  "advocacia": "/ilustracoes/legal.svg",
  "imobiliarias-e-corretores": "/ilustracoes/segmentos.svg",
  "construtoras": "/ilustracoes/cases.svg",
  "medicos-e-consultorios": "/ilustracoes/dermatologistas.svg",
  "nutricionistas": "/ilustracoes/clinicas-de-estetica.svg",
  "psicologos": "/ilustracoes/contato.svg",
  "fisioterapeutas": "/ilustracoes/metodologia.svg",
  "respostas": "/ilustracoes/contato.svg",
  "materiais": "/ilustracoes/conteudos.svg",
};
