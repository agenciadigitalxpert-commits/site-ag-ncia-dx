/**
 * Gera os PDFs de /materiais a partir do conteúdo abaixo (HTML impresso pelo Chromium).
 * Uso (na raiz do projeto): node scripts/materiais/gerar-pdfs.mjs
 */
import { readFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const out = join(root, "public", "materiais", "arquivos");
const NAMES = JSON.parse(readFileSync(join(root, "scripts", "materiais", "arquivos.json"), "utf8"));
mkdirSync(out, { recursive: true });
const logo = `data:image/png;base64,${readFileSync(join(root, "public", "brand", "logo-dx-escura.png")).toString("base64")}`;
const SITE = "agenciadigitalxpert.com.br";

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const checks = (items) => `<ul class="check">${items.map((i) => `<li><span class="box"></span><span>${esc(i)}</span></li>`).join("")}</ul>`;
const msg = (label, text) => `<div class="msg"><p class="label">${esc(label)}</p><p>${esc(text)}</p></div>`;
const field = (q, hint, h = 64) => `<div class="field"><p class="q">${esc(q)}</p>${hint ? `<p class="hint">${esc(hint)}</p>` : ""}<div class="lines" style="height:${h}px"></div></div>`;

const css = `
@page { size: A4; margin: 18mm 16mm 18mm; }
* { box-sizing: border-box; }
body { font-family: "DM Sans", "Helvetica Neue", Arial, sans-serif; color: #0a0a0b; font-size: 10.5pt; line-height: 1.5; margin: 0; }
header { display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #dcdcd6; padding-bottom: 10px; margin-bottom: 22px; }
header img { height: 30px; }
header span { font-size: 8.5pt; color: #55565b; letter-spacing: .08em; text-transform: uppercase; }
h1 { font-size: 24pt; line-height: 1.1; letter-spacing: -.02em; font-weight: 500; margin: 0 0 8px; }
.lead { color: #55565b; font-size: 11pt; margin: 0 0 20px; max-width: 150mm; }
h2 { font-size: 13pt; font-weight: 600; margin: 22px 0 8px; break-after: avoid; }
p { margin: 0 0 8px; }
.check { list-style: none; padding: 0; margin: 0; }
.check li { display: flex; gap: 10px; padding: 5px 0; border-bottom: 1px solid #ebebe6; break-inside: avoid; }
.box { flex: none; width: 12px; height: 12px; border: 1.3px solid #0a0a0b; border-radius: 3px; margin-top: 3px; }
.msg { border: 1px solid #dcdcd6; border-radius: 10px; padding: 10px 14px; margin: 8px 0; break-inside: avoid; background: #fafaf8; }
.msg .label { font-size: 8.5pt; text-transform: uppercase; letter-spacing: .08em; color: #55565b; margin-bottom: 4px; }
.tip { border-left: 3px solid #0a0a0b; padding: 6px 12px; margin: 14px 0; background: #f5f5f2; break-inside: avoid; }
.field { margin: 0 0 12px; break-inside: avoid; }
.field .q { font-weight: 600; margin: 0 0 2px; }
.field .hint { color: #55565b; font-size: 9pt; margin: 0 0 4px; }
.lines { border: 1px solid #dcdcd6; border-radius: 8px; background: repeating-linear-gradient(#fff 0 21px, #ebebe6 21px 22px); }
footer { margin-top: 26px; padding-top: 10px; border-top: 1px solid #dcdcd6; font-size: 8.5pt; color: #55565b; display: flex; justify-content: space-between; }
`;

const page = (kind, title, lead, body) => `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet">
<style>${css}</style></head><body>
<header><img src="${logo}" alt="Agência Digital Xpert"><span>${esc(kind)}</span></header>
<h1>${esc(title)}</h1><p class="lead">${esc(lead)}</p>
${body}
<footer><span>Agência Digital Xpert · Balneário Camboriú (SC) · atendimento em todo o Brasil</span><span>${SITE}/materiais</span></footer>
</body></html>`;

const docs = [
  {
    file: NAMES["roteiro-atendimento-whatsapp"],
    html: page("Roteiro", "Roteiro de atendimento no WhatsApp", "Mensagens-modelo para não perder os leads que chegam dos anúncios. Adapte as palavras ao jeito da sua empresa e troque o que está entre chaves.",
      `<h2>Princípios</h2>${checks([
        "Responda o quanto antes: quem pediu orçamento costuma falar com mais de uma empresa.",
        "Apresente-se pelo nome. Pessoa conversa com pessoa.",
        "Uma pergunta por mensagem. Lista longa de perguntas afasta.",
        "Sempre termine com um próximo passo claro (horário, visita, proposta).",
        "Anote tudo na planilha ou no CRM: de onde veio, em que etapa está e quando retomar.",
      ])}
      <h2>1. Primeira resposta</h2>
      ${msg("Mensagem", "Olá, {nome}! Aqui é {seu nome}, da {empresa}. Vi que você pediu {serviço}. Posso te fazer 3 perguntas rápidas para te indicar a melhor opção?")}
      <h2>2. Entender o que o cliente precisa</h2>
      ${msg("Necessidade", "O que você precisa resolver hoje? Se puder, me manda uma foto ou um detalhe do caso.")}
      ${msg("Prazo", "Para quando você precisa? Já tem uma data em mente?")}
      ${msg("Local", "Em qual cidade ou bairro seria o atendimento?")}
      ${msg("Decisão", "Além de você, mais alguém participa da decisão?")}
      <h2>3. Próximo passo</h2>
      ${msg("Agendamento", "Perfeito, {nome}. Tenho {dia} às {hora} ou {dia} às {hora}. Qual fica melhor para você?")}
      ${msg("Proposta", "Com essas informações eu consigo montar a proposta. Te envio até {quando}, combinado?")}
      <h2>4. Quando perguntam “qual o valor?” logo no início</h2>
      ${msg("Resposta", "Consigo te passar, sim. O valor depende de {o que muda o preço}. Me conta {1 informação} que eu te digo certinho, sem enrolação.")}
      <h2>5. Retomar quem parou de responder</h2>
      ${msg("No dia seguinte", "Oi, {nome}! Conseguiu ver a mensagem de ontem? Se preferir, posso te ligar rapidinho.")}
      ${msg("Alguns dias depois", "{nome}, ainda faz sentido resolver {necessidade}? Se o momento mudou, sem problema, é só me avisar.")}
      ${msg("Encerramento", "Vou encerrar seu atendimento por aqui para não te incomodar. Quando quiser retomar, é só mandar mensagem.")}
      <p class="tip">Depois de cada conversa, atualize o status do lead. É assim que você descobre quais campanhas trazem clientes, e não só contatos.</p>`),
  },
  {
    file: NAMES["site-pronto-para-anuncios"],
    html: page("Checklist", "Seu site está pronto para receber anúncios?", "Antes de pagar por cada visita, confira se a página convence o cliente e facilita o contato. Abra seu site no celular e marque o que já está certo.",
      `<h2>1. O que o cliente vê primeiro</h2>${checks([
        "Em poucos segundos dá para entender o que você vende e para quem.",
        "O título fala do que o cliente ganha, não só do nome da empresa.",
        "O botão para pedir orçamento ou chamar no WhatsApp aparece sem precisar rolar.",
        "As fotos são do seu trabalho, da sua equipe ou do seu espaço (não de banco de imagens).",
      ])}
      <h2>2. Confiança</h2>${checks([
        "Depoimentos de clientes reais, com autorização.",
        "Fotos ou exemplos de trabalhos já feitos.",
        "Endereço, região de atendimento e horário claros.",
        "Respostas para as dúvidas mais comuns: prazo, forma de pagamento, garantia do seu serviço.",
      ])}
      <h2>3. Contato fácil</h2>${checks([
        "Formulário curto: só o necessário para o primeiro contato.",
        "Botão de WhatsApp que já abre com uma mensagem pronta.",
        "Depois do envio, a pessoa sabe o que vai acontecer e quando.",
        "Alguém da equipe está pronto para responder quem entrar em contato.",
      ])}
      <h2>4. Celular</h2>${checks([
        "Abre rápido no 4G.",
        "Textos legíveis sem dar zoom e botões fáceis de tocar.",
        "Nenhuma janela ou propaganda cobrindo a página.",
      ])}
      <h2>5. Erros que fazem o cliente desistir</h2>${checks([
        "Anúncio promete uma coisa e a página fala de outra.",
        "Formulário com muitas perguntas logo de cara.",
        "Telefone ou WhatsApp que ninguém atende.",
        "Página sem nenhuma prova de que a empresa é real.",
      ])}
      <p class="tip">Página boa não compensa atendimento lento. Antes de anunciar, combine quem responde os contatos e em quanto tempo.</p>`),
  },
  {
    file: NAMES["guia-para-contratar-agencia"],
    html: page("Guia", "Guia para contratar uma agência de marketing", "Use na primeira reunião com qualquer agência, inclusive com a gente. Boas respostas são concretas; respostas vagas são um sinal para perguntar de novo.",
      `<h2>1. Perguntas para a primeira reunião</h2>${checks([
        "Como vocês vão medir se a campanha está dando resultado? Cliques, contatos ou vendas?",
        "O que vocês precisam saber do meu atendimento e das minhas vendas?",
        "Quem vai cuidar da minha conta no dia a dia e como falo com essa pessoa?",
        "Com que frequência vou receber relatório e o que vem nele?",
        "O que vocês fazem quando os contatos chegam, mas não viram venda?",
        "Vocês já atenderam empresas parecidas com a minha? O que aprenderam?",
      ])}
      <h2>2. Sinais de alerta</h2>${checks([
        "Promessa de resultado garantido, “primeiro lugar no Google” ou número de vendas certo.",
        "A conta de anúncios fica no nome da agência e você não tem acesso.",
        "Relatório só com cliques, curtidas e alcance, sem falar de contatos e vendas.",
        "Ninguém pergunta como sua equipe atende os clientes.",
        "Valor fechado sem entender seu negócio.",
      ])}
      <h2>3. O que deve estar combinado por escrito</h2>${checks([
        "Escopo: o que está incluso (anúncios, criativos, páginas, atendimento) e o que não está.",
        "Separação entre o valor da agência e o investimento em anúncios, pago direto ao Google ou à Meta.",
        "De quem são as contas de anúncio, o site e os dados (devem ser seus).",
        "Prazo de aviso para encerrar o contrato e como os acessos são devolvidos.",
      ])}
      <h2>4. O que acompanhar todo mês</h2>${checks([
        "Quanto foi investido e quantos contatos chegaram.",
        "Quantos contatos tinham perfil e quantos viraram venda.",
        "Quanto custou cada contato e cada cliente.",
        "O que foi testado, o que mudou e qual é o plano do próximo mês.",
      ])}
      <p class="tip">Nos primeiros meses, o mais importante é ter clareza: saber de onde vem cada contato e o que acontece com ele até a venda.</p>`),
  },
  {
    file: NAMES["briefing-de-campanha"],
    html: page("Briefing", "Prepare sua empresa para anunciar", "Responda antes de investir em anúncios ou de começar com uma agência. Quanto mais claras as respostas, mais rápido a campanha aprende o que funciona.",
      `<h2>Empresa e oferta</h2>
      ${field("O que você vende e qual oferta quer anunciar?", "Produto ou serviço principal, condições, o que está incluso.")}
      ${field("Quais são seus diferenciais reais?", "O que os clientes elogiam e o que você consegue provar.")}
      ${field("Ticket médio e margem (opcional)", "Ajuda a definir quanto vale pagar por um cliente.", 44)}
      <h2>Público e região</h2>
      ${field("Quem é o cliente ideal?", "Perfil, momento de compra, o que ele pesquisa.")}
      ${field("Onde você atende?", "Cidades, raio, se atende online.", 44)}
      ${field("Quais clientes você NÃO quer atender?", "Ajuda a montar as palavras negativas e os filtros do formulário.", 44)}
      <h2>Atendimento</h2>
      ${field("Quem atende os leads, em quais horários e por qual canal?", "WhatsApp, telefone, e-mail. Quantos contatos por dia a equipe consegue atender bem.")}
      ${field("Como você registra os contatos e as vendas hoje?", "CRM, planilha, caderno, nada ainda.", 44)}
      <h2>Metas e investimento</h2>
      ${field("Qual é o objetivo da campanha?", "Ex.: pedidos de orçamento, agendamentos, visitas à loja.", 44)}
      ${field("Quanto pode investir em mídia por mês?", "Valor pago direto ao Google ou à Meta, separado dos honorários da agência.", 44)}
      ${field("O que já foi testado e qual foi o resultado?", "Campanhas anteriores, canais, o que funcionou e o que não funcionou.")}
      <h2>Materiais e restrições</h2>
      ${field("Quais materiais você tem?", "Fotos, vídeos, depoimentos autorizados, logotipo, identidade visual.", 44)}
      ${field("Existe alguma regra legal ou do seu conselho profissional sobre o que pode ser anunciado?", "Saúde, advocacia e outras profissões regulamentadas têm normas próprias.", 44)}
      ${field("Quem são seus principais concorrentes?", "", 44)}`),
  },
];

const browser = await chromium.launch();
const pageObj = await browser.newPage();
for (const d of docs) {
  await pageObj.setContent(d.html, { waitUntil: "networkidle", timeout: 30000 }).catch(() => pageObj.setContent(d.html));
  await pageObj.pdf({ path: join(out, d.file), format: "A4", printBackground: true, preferCSSPageSize: true });
  console.log("ok", d.file);
}
await browser.close();
