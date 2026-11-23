import type { Material } from "./types";

/**
 * Materiais para download (/materiais). Os arquivos ficam em public/materiais e são
 * gerados por scripts/materiais/ (rode `node scripts/materiais/gerar-pdfs.mjs` e
 * `python3 scripts/materiais/gerar-planilhas.py` depois de editar o conteúdo).
 */
export const materials: Material[] = [
  {
    slug: "checklist-campanha-google-ads",
    title: "Checklist de campanha no Google Ads",
    description: "Tudo o que conferir antes de subir uma campanha de pesquisa e o que acompanhar na primeira semana, para não pagar por clique de quem não vai comprar.",
    file: "/materiais/checklist-campanha-google-ads.pdf",
    format: "PDF",
    contents: ["Mensuração e conversões", "Estrutura de campanhas e grupos", "Palavras-chave e negativas", "Anúncios e recursos", "Rotina da primeira semana"],
    forWhom: "Quem vai criar ou revisar uma campanha de pesquisa no Google Ads.",
    related: { services: ["google-ads", "trafego-pago"], articles: ["palavras-chave-negativas-google-ads", "leads-ruins-no-google-ads"] },
  },
  {
    slug: "palavras-chave-negativas-google-ads",
    title: "Lista de palavras-chave negativas para quem vende serviços",
    description: "Lista pronta para colar no Google Ads, separada por grupo: emprego e estudo, faça você mesmo, ferramentas e login, seguidores e engajamento.",
    file: "/materiais/palavras-chave-negativas-google-ads.csv",
    format: "CSV",
    contents: ["Mais de 80 termos negativos", "Tipo de correspondência de cada um", "Grupo e motivo do bloqueio", "Pronto para colar no Google Ads"],
    forWhom: "Empresas de serviço que anunciam no Google e recebem muitos cliques de curiosos.",
    related: { services: ["google-ads"], articles: ["palavras-chave-negativas-google-ads", "leads-ruins-no-google-ads"] },
  },
  {
    slug: "planilha-controle-de-leads",
    title: "Planilha de controle de leads",
    description: "Planilha para registrar cada contato, a origem, o status no funil e o próximo passo, com resumo automático de qualificação e fechamento.",
    file: "/materiais/planilha-controle-de-leads.xlsx",
    format: "XLSX",
    contents: ["Aba de leads com status em lista", "Origem e campanha de cada contato", "Próximo passo e data do retorno", "Resumo automático do funil"],
    forWhom: "Equipes que ainda não usam CRM e querem parar de perder contato no WhatsApp.",
    related: { services: ["crm-automacao-ia", "estruturacao-comercial"], articles: ["crm-ou-planilha-para-leads", "qualificacao-de-leads-antes-da-reuniao"] },
  },
  {
    slug: "roteiro-atendimento-whatsapp",
    title: "Roteiro de atendimento no WhatsApp",
    description: "Mensagens-modelo para a primeira resposta, perguntas de qualificação, agendamento, objeção de preço e follow-up, para adaptar ao seu negócio.",
    file: "/materiais/roteiro-atendimento-whatsapp.pdf",
    format: "PDF",
    contents: ["Primeira resposta", "Perguntas de qualificação", "Proposta de próximo passo", "Resposta para “qual o valor?”", "Sequência de follow-up"],
    forWhom: "Quem atende os leads que chegam dos anúncios pelo WhatsApp.",
    related: { services: ["estruturacao-comercial", "crm-automacao-ia"], articles: ["roteiro-de-atendimento-no-whatsapp", "trafego-pago-e-processo-comercial"] },
  },
  {
    slug: "checklist-landing-page",
    title: "Checklist de landing page que converte",
    description: "Os pontos que uma página de campanha precisa ter para transformar clique em contato: promessa, prova, formulário, velocidade e mensuração.",
    file: "/materiais/checklist-landing-page.pdf",
    format: "PDF",
    contents: ["Topo da página e promessa", "Provas e objeções", "Formulário e WhatsApp", "Celular e velocidade", "Mensuração e LGPD"],
    forWhom: "Quem vai criar ou revisar a página de destino de uma campanha.",
    related: { services: ["landing-pages"], articles: ["landing-page-ou-site-institucional", "formulario-instantaneo-ou-landing-page"] },
  },
  {
    slug: "briefing-de-campanha",
    title: "Modelo de briefing de campanha",
    description: "As perguntas que precisam estar respondidas antes de investir em anúncios: oferta, público, região, capacidade de atendimento, metas e restrições.",
    file: "/materiais/briefing-de-campanha.pdf",
    format: "PDF",
    contents: ["Empresa, oferta e diferenciais", "Público e região", "Atendimento e capacidade", "Metas e investimento", "Materiais e restrições"],
    forWhom: "Empresas que vão começar a anunciar ou trocar de agência.",
    related: { services: ["trafego-pago", "criativos-e-roteiros"], articles: ["como-escolher-agencia-de-trafego-pago"] },
  },
  {
    slug: "calculadora-orcamento-de-midia",
    title: "Calculadora de orçamento de mídia",
    description: "Planilha que calcula quanto investir por mês a partir dos leads que você quer, do CPC do seu mercado e da taxa de conversão da página.",
    file: "/materiais/calculadora-orcamento-de-midia.xlsx",
    format: "XLSX",
    contents: ["Cliques necessários", "Orçamento mensal e diário", "Custo por lead e por lead qualificado", "Custo de mídia por cliente"],
    forWhom: "Quem quer definir o investimento em Google Ads ou Meta Ads com conta, não no chute.",
    related: { services: ["trafego-pago", "google-ads"], articles: ["como-medir-resultado-do-trafego-pago"] },
  },
];
