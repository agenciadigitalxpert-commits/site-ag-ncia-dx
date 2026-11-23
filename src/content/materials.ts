import type { Material } from "./types";

/**
 * Materiais para download (/materiais), pensados para o EMPRESÁRIO (não para gestores de tráfego).
 * São liberados depois de um formulário curto (o contato vai para a aba "Leads frios" da planilha).
 *
 * `file` NÃO aparece no HTML: a API /api/material só devolve o caminho depois do envio confirmado.
 * Os nomes têm um sufixo aleatório e a pasta /materiais/arquivos fica fora do índice de busca.
 * Para gerar os arquivos: `node scripts/materiais/gerar-pdfs.mjs` e
 * `python3 scripts/materiais/gerar-planilhas.py` (os nomes estão em scripts/materiais/arquivos.json).
 */
export const materials: Material[] = [
  {
    slug: "planilha-controle-de-leads",
    title: "Planilha de controle de leads",
    description: "Registre cada contato, de onde ele veio, em que etapa está e qual é o próximo passo. O resumo mostra quantos viraram cliente.",
    file: "/materiais/arquivos/planilha-controle-de-leads-35e0f16e.xlsx",
    format: "XLSX",
    contents: ["Uma linha por contato, com status em lista", "Origem de cada contato", "Próximo passo e data do retorno", "Resumo automático do funil"],
    forWhom: "Empresas que atendem pelo WhatsApp e não querem mais perder contato no meio do caminho.",
    related: { services: ["crm-automacao-ia", "estruturacao-comercial"], articles: ["crm-ou-planilha-para-leads", "qualificacao-de-leads-antes-da-reuniao"] },
  },
  {
    slug: "roteiro-atendimento-whatsapp",
    title: "Roteiro de atendimento no WhatsApp",
    description: "Mensagens prontas para responder, entender o que o cliente precisa, marcar o próximo passo e retomar quem parou de responder.",
    file: "/materiais/arquivos/roteiro-atendimento-whatsapp-313c3ba7.pdf",
    format: "PDF",
    contents: ["Primeira resposta", "Perguntas para entender o cliente", "Como propor o próximo passo", "Resposta para “qual o valor?”", "Mensagens de retomada"],
    forWhom: "Donos e equipes que atendem os pedidos de orçamento pelo WhatsApp.",
    related: { services: ["estruturacao-comercial", "crm-automacao-ia"], articles: ["roteiro-de-atendimento-no-whatsapp", "trafego-pago-e-processo-comercial"] },
  },
  {
    slug: "site-pronto-para-anuncios",
    title: "Seu site está pronto para receber anúncios?",
    description: "Checklist simples para conferir se a página que vai receber os anúncios convence o cliente e facilita o contato, antes de investir.",
    file: "/materiais/arquivos/site-pronto-para-anuncios-9d00b86a.pdf",
    format: "PDF",
    contents: ["O que o cliente precisa ver primeiro", "Provas que geram confiança", "Contato fácil no celular", "Erros que fazem o cliente desistir"],
    forWhom: "Empresas que vão começar a anunciar ou que recebem visitas no site, mas poucos contatos.",
    related: { services: ["landing-pages"], articles: ["landing-page-ou-site-institucional", "formulario-instantaneo-ou-landing-page"] },
  },
  {
    slug: "guia-para-contratar-agencia",
    title: "Guia para contratar uma agência de marketing",
    description: "As perguntas para fazer antes de fechar, os sinais de alerta e o que você deve receber da agência nos primeiros meses.",
    file: "/materiais/arquivos/guia-para-contratar-agencia-3c0c8360.pdf",
    format: "PDF",
    contents: ["Perguntas para a primeira reunião", "Sinais de alerta", "O que deve estar no contrato", "O que acompanhar todo mês"],
    forWhom: "Empresários que vão contratar a primeira agência ou estão pensando em trocar.",
    related: { services: ["trafego-pago"], articles: ["como-escolher-agencia-de-trafego-pago", "agencia-ou-gestor-de-trafego-freelancer"] },
  },
  {
    slug: "briefing-de-campanha",
    title: "Prepare sua empresa para anunciar",
    description: "As perguntas que você precisa responder antes de investir em anúncios: oferta, cliente ideal, região, atendimento e metas.",
    file: "/materiais/arquivos/briefing-de-campanha-0b954084.pdf",
    format: "PDF",
    contents: ["Oferta e diferenciais", "Cliente ideal e região", "Quem atende e como", "Metas e investimento", "Materiais e restrições"],
    forWhom: "Empresas que vão começar a anunciar ou contratar uma agência.",
    related: { services: ["trafego-pago", "criativos-e-roteiros"], articles: ["como-escolher-agencia-de-trafego-pago"] },
  },
  {
    slug: "planilha-meta-de-vendas",
    title: "Planilha de meta de vendas",
    description: "Coloque a meta de faturamento e descubra quantas vendas, oportunidades e contatos você precisa por mês para chegar lá.",
    file: "/materiais/arquivos/planilha-meta-de-vendas-329d72d2.xlsx",
    format: "XLSX",
    contents: ["Meta de faturamento e ticket médio", "Vendas necessárias", "Oportunidades e contatos por mês", "Quanto cada etapa precisa melhorar"],
    forWhom: "Empresários que querem transformar a meta do mês em números do dia a dia.",
    related: { services: ["estruturacao-comercial"], articles: ["como-medir-resultado-do-trafego-pago"] },
  },
  {
    slug: "calculadora-investimento-em-anuncios",
    title: "Calculadora de investimento em anúncios",
    description: "Descubra quanto investir por mês a partir de quantos contatos você quer receber e de quanto vale para você conquistar um cliente.",
    file: "/materiais/arquivos/calculadora-investimento-em-anuncios-84244a35.xlsx",
    format: "XLSX",
    contents: ["Investimento mensal e diário", "Custo por contato", "Custo por cliente", "Exemplo preenchido para entender"],
    forWhom: "Quem quer decidir o investimento em anúncios com conta, não no chute.",
    related: { services: ["trafego-pago", "google-ads"], articles: ["como-medir-resultado-do-trafego-pago"] },
  },
];
