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
  // "intermediacao-e-revendas": "/ilustracoes/intermediacao-e-revendas.webp",
};
