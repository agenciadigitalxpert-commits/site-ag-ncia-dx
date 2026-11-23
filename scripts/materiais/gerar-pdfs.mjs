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
const out = join(root, "public", "materiais");
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
    file: "checklist-campanha-google-ads.pdf",
    html: page("Checklist", "Checklist de campanha no Google Ads", "O que conferir antes de subir uma campanha de pesquisa e o que acompanhar na primeira semana. Marque cada item conforme for resolvendo.",
      `<h2>1. Mensuração</h2>${checks([
        "Uma única conversão principal de lead (formulário enviado e confirmado), sem duplicar com a importada do GA4.",
        "Conversões secundárias marcadas como secundárias (ex.: clique no WhatsApp).",
        "Marcação automática ligada, para o GCLID chegar junto com o lead.",
        "Sufixo de URL final com UTMs (campanha, grupo e palavra-chave).",
        "Teste de envio feito no Tag Assistant, com o lead conferido na planilha ou no CRM.",
        "Aviso de cookies e Modo de Consentimento funcionando.",
      ])}
      <h2>2. Estrutura</h2>${checks([
        "Campanhas separadas por intenção (marca, serviço, segmento, região).",
        "Cada grupo de anúncios com um tema só e uma página de destino coerente.",
        "Somente Rede de Pesquisa: parceiros de pesquisa e Display desligados no início.",
        "Local com a opção “Presença: pessoas no local”.",
        "Idioma, programação e dispositivos revisados.",
        "Estratégia de lances definida (ex.: Maximizar conversões no início).",
      ])}
      <h2>3. Palavras-chave e negativas</h2>${checks([
        "Palavras com intenção de contratar ou comprar, em correspondência de frase e exata.",
        "Volume e CPC conferidos no Planejador de palavras-chave.",
        "Nenhuma palavra solta e genérica demais (ex.: só “marketing”).",
        "Listas de negativas aplicadas: emprego e estudo, faça você mesmo, ferramentas e login, seguidores.",
        "Termos de outros grupos negativados para cada busca cair no anúncio certo.",
      ])}
      <h2>4. Anúncios e recursos</h2>${checks([
        "15 títulos e 4 descrições por grupo, com a palavra-chave e o diferencial.",
        "Nada de promessa de resultado, “a melhor” ou números que você não pode provar.",
        "Força do anúncio “Boa” ou “Excelente”.",
        "Sitelinks, frases de destaque, snippets estruturados, logotipo e imagens cadastrados.",
      ])}
      <h2>5. Página de destino</h2>${checks([
        "Repete a promessa do anúncio no título.",
        "Formulário curto ou WhatsApp visível no celular sem rolar muito.",
        "Carrega rápido no 4G e funciona bem no celular.",
      ])}
      <h2>6. Primeira semana</h2>${checks([
        "Relatório de termos de pesquisa todos os dias; negativar o que não tem intenção.",
        "Cada lead conferido e marcado como qualificado ou não.",
        "Sem mexer em lances e orçamento enquanto a campanha aprende.",
        "Anotar dúvidas e objeções que aparecem no atendimento para ajustar anúncios e página.",
      ])}
      <p class="tip">Campanha boa não compensa atendimento lento. Combine com a equipe quem responde os leads e em quanto tempo.</p>`),
  },
  {
    file: "roteiro-atendimento-whatsapp.pdf",
    html: page("Roteiro", "Roteiro de atendimento no WhatsApp", "Mensagens-modelo para não perder os leads que chegam dos anúncios. Adapte as palavras ao jeito da sua empresa e troque o que está entre chaves.",
      `<h2>Princípios</h2>${checks([
        "Responda o quanto antes: quem pediu orçamento costuma falar com mais de uma empresa.",
        "Apresente-se pelo nome. Pessoa conversa com pessoa.",
        "Uma pergunta por mensagem. Lista longa de perguntas afasta.",
        "Sempre termine com um próximo passo claro (horário, visita, proposta).",
        "Registre tudo no CRM ou na planilha: origem, status e próximo contato.",
      ])}
      <h2>1. Primeira resposta</h2>
      ${msg("Mensagem", "Olá, {nome}! Aqui é {seu nome}, da {empresa}. Vi que você pediu {serviço}. Posso te fazer 3 perguntas rápidas para te indicar a melhor opção?")}
      <h2>2. Qualificação</h2>
      ${msg("Necessidade", "O que você precisa resolver hoje? Se puder, me manda uma foto ou um detalhe do caso.")}
      ${msg("Prazo", "Para quando você precisa? Já tem uma data em mente?")}
      ${msg("Local", "Em qual cidade ou bairro seria o atendimento?")}
      ${msg("Decisão", "Além de você, mais alguém participa da decisão?")}
      <h2>3. Próximo passo</h2>
      ${msg("Agendamento", "Perfeito, {nome}. Tenho {dia} às {hora} ou {dia} às {hora}. Qual fica melhor para você?")}
      ${msg("Proposta", "Com essas informações eu consigo montar a proposta. Te envio até {quando}, combinado?")}
      <h2>4. Quando perguntam “qual o valor?” logo no início</h2>
      ${msg("Resposta", "Consigo te passar, sim. O valor depende de {o que muda o preço}. Me conta {1 informação} que eu te digo certinho, sem enrolação.")}
      <h2>5. Follow-up (quando a pessoa some)</h2>
      ${msg("No dia seguinte", "Oi, {nome}! Conseguiu ver a mensagem de ontem? Se preferir, posso te ligar rapidinho.")}
      ${msg("Alguns dias depois", "{nome}, ainda faz sentido resolver {necessidade}? Se o momento mudou, sem problema, é só me avisar.")}
      ${msg("Encerramento", "Vou encerrar seu atendimento por aqui para não te incomodar. Quando quiser retomar, é só mandar mensagem.")}
      <p class="tip">Depois de cada conversa, atualize o status do lead. É assim que você descobre quais campanhas trazem clientes, e não só contatos.</p>`),
  },
  {
    file: "checklist-landing-page.pdf",
    html: page("Checklist", "Checklist de landing page que converte", "Os pontos que uma página de campanha precisa ter para transformar clique em contato. Use antes de colocar a página no ar e a cada revisão.",
      `<h2>1. Topo da página</h2>${checks([
        "Título repete a promessa do anúncio que levou a pessoa até ali.",
        "Subtítulo diz para quem é e o que a pessoa ganha.",
        "Botão de ação visível sem rolar, com verbo claro (ex.: “Pedir orçamento”).",
        "Imagem real do produto, do serviço ou da equipe (evite banco de imagens).",
      ])}
      <h2>2. Conteúdo</h2>${checks([
        "Como funciona em 3 passos simples.",
        "Diferenciais concretos, não adjetivos (“resposta no mesmo dia” vale mais que “excelência”, se for verdade).",
        "Provas reais: depoimentos autorizados, fotos de trabalhos, números verificáveis.",
        "Respostas para as objeções mais comuns (preço, prazo, garantia, região).",
      ])}
      <h2>3. Contato</h2>${checks([
        "Formulário curto: só o necessário para o primeiro contato.",
        "Perguntas que ajudam a qualificar sem afastar (ex.: segmento, prazo).",
        "WhatsApp como alternativa, com mensagem inicial preenchida.",
        "Mensagem de sucesso só depois do envio confirmado, explicando o próximo passo.",
      ])}
      <h2>4. Celular e velocidade</h2>${checks([
        "Testada no celular: textos legíveis, botões fáceis de tocar.",
        "Carrega rápido no 4G (imagens otimizadas, sem scripts desnecessários).",
        "Nada de pop-up que cobre a página no celular.",
      ])}
      <h2>5. Mensuração e LGPD</h2>${checks([
        "Conversão disparada só quando o lead chega de fato no CRM ou na planilha.",
        "UTMs e GCLID gravados junto com o lead.",
        "Aviso de cookies e política de privacidade acessíveis.",
        "Teste completo feito: clique no anúncio, envio, lead registrado, conversão contada uma vez.",
      ])}`),
  },
  {
    file: "briefing-de-campanha.pdf",
    html: page("Modelo", "Modelo de briefing de campanha", "Responda antes de investir em anúncios ou de começar com uma agência. Quanto mais claro o briefing, mais rápido a campanha aprende o que funciona.",
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
