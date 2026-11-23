/**
 * ============================================================================
 *  Agência Digital Xpert — Recebimento de leads do site no Google Sheets
 * ============================================================================
 *
 *  O site envia cada solicitação de diagnóstico (POST JSON) para este Web App.
 *  O script valida o token, evita duplicados, grava uma linha na aba "Leads",
 *  formata o WhatsApp com link clicável e (opcional) avisa por e-mail.
 *
 *  INSTALAÇÃO (uma vez):
 *   1. Na planilha: Extensões → Apps Script. Apague o conteúdo e cole este arquivo.
 *   2. Ajuste CONFIG abaixo (e-mails de aviso, se quiser) e salve (Ctrl+S).
 *   3. Selecione a função "setup" no menu de funções e clique em Executar.
 *      Autorize o acesso. Ao final, o registro de execução mostra o TOKEN.
 *   4. Implantar → Nova implantação → tipo "App da Web":
 *        - Executar como: Eu
 *        - Quem pode acessar: Qualquer pessoa
 *      Copie a URL que termina em /exec.
 *   5. Na Vercel → Settings → Environment Variables:
 *        LEAD_WEBHOOK_URL = <URL /exec>?token=<TOKEN>
 *      Depois: Deployments → Redeploy (a variável só vale após novo build).
 *   6. Teste enviando o formulário do site. A linha aparece na aba "Leads".
 *
 *  ATUALIZAR O CÓDIGO DEPOIS: Implantar → Gerenciar implantações → editar (lápis)
 *  → Versão: "Nova versão" → Implantar. Assim a URL /exec continua a mesma.
 *
 *  Funções úteis (menu "Leads DX" na planilha ou executando no editor):
 *   - setup()             cria/formata a aba e gera o token (pode rodar de novo)
 *   - mostrarToken()      mostra o token atual
 *   - gerarNovoToken()    troca o token (atualize a URL na Vercel depois!)
 *   - testarRecebimento() grava um lead de teste para conferir a planilha
 *   - exportarConversoesPendentes() envia à aba "Conversões Google Ads" os leads
 *                         qualificados/ganhos que ainda não foram enviados
 * ============================================================================
 */

const CONFIG = {
  /** Nome da aba onde os leads são gravados (criada automaticamente). */
  SHEET_NAME: 'Leads',
  /** Aba de registro de erros (criada automaticamente quando necessário). */
  ERROR_SHEET_NAME: 'Erros',
  /** Fuso horário da data/hora gravada. */
  TIMEZONE: 'America/Sao_Paulo',
  /** E-mails que recebem aviso a cada novo lead. Deixe [] para não enviar. */
  NOTIFY_EMAILS: ['agenciadigitalxpert@gmail.com'], // adicione outros separados por vírgula
  /** Quantas linhas recentes conferir para evitar lead duplicado. */
  DEDUPE_LOOKBACK: 300,
  /** Opções da coluna "Status" (lista suspensa). */
  STATUS_OPTIONS: ['Novo', 'Em contato', 'Qualificado', 'Diagnóstico agendado', 'Proposta enviada', 'Ganho', 'Perdido', 'Sem perfil'],
  /** Aba lida pelo Google Ads (importação programada de conversões offline). */
  CONVERSIONS_SHEET_NAME: 'Conversões Google Ads',
  /**
   * Status → nome da ação de conversão no Google Ads. O nome precisa ser IDÊNTICO
   * ao criado em Metas → Conversões → Nova ação → Importar. Cada lead gera cada
   * conversão uma vez só.
   */
  OFFLINE_CONVERSIONS: {
    'Qualificado': ['Lead qualificado'],
    'Diagnóstico agendado': ['Lead qualificado'],
    'Proposta enviada': ['Lead qualificado'],
    'Ganho': ['Lead qualificado', 'Cliente fechado'],
  },
  /** O Google Ads só aceita conversões até 90 dias depois do clique. */
  CLICK_WINDOW_DAYS: 90,
};

/** Colunas da aba (a ordem define a planilha). */
const COLUMNS = [
  { key: 'receivedAt', title: 'Data/hora', width: 140 },
  { key: 'status', title: 'Status', width: 150 },
  { key: 'nome', title: 'Nome', width: 160 },
  { key: 'empresa', title: 'Empresa', width: 170 },
  { key: 'whatsapp', title: 'WhatsApp', width: 160 },
  { key: 'segmento', title: 'Segmento', width: 170 },
  { key: 'desafio', title: 'Principal desafio', width: 240 },
  { key: 'investeAnuncios', title: 'Investe em anúncios?', width: 170 },
  { key: 'investimentoMidia', title: 'Investimento em mídia/mês', width: 200 },
  { key: 'siteOuInstagram', title: 'Site ou Instagram', width: 180 },
  { key: 'detalhes', title: 'Detalhes', width: 280 },
  { key: 'responsavel', title: 'Responsável', width: 130 },
  { key: 'observacoes', title: 'Observações internas', width: 240 },
  { key: 'page', title: 'Página do envio', width: 180 },
  { key: 'utm_source', title: 'utm_source', width: 110 },
  { key: 'utm_medium', title: 'utm_medium', width: 110 },
  { key: 'utm_campaign', title: 'utm_campaign', width: 160 },
  { key: 'utm_term', title: 'utm_term', width: 140 },
  { key: 'utm_content', title: 'utm_content', width: 140 },
  { key: 'landing_page', title: 'Página de entrada', width: 180 },
  { key: 'referrer_host', title: 'Origem (referrer)', width: 150 },
  { key: 'id', title: 'ID do lead', width: 280 },
  // Conversões offline (Google Ads): preenchidas pelo site e pelo script.
  { key: 'gclid', title: 'GCLID (clique no anúncio)', width: 220 },
  { key: 'gbraid', title: 'GBRAID/WBRAID', width: 160 },
  { key: 'click_at', title: 'Data do clique', width: 140 },
  { key: 'conv_sent', title: 'Enviado ao Google Ads', width: 240 },
];

/* ------------------------------------------------------------------------- */
/*  Web App                                                                  */
/* ------------------------------------------------------------------------- */

/** Recebe o lead do site. */
function doPost(e) {
  try {
    if (!isValidToken_(e)) {
      return json_({ ok: false, error: 'unauthorized' });
    }
    if (!e || !e.postData || !e.postData.contents) {
      return json_({ ok: false, error: 'empty_body' });
    }

    let body;
    try {
      body = JSON.parse(e.postData.contents);
    } catch (err) {
      return json_({ ok: false, error: 'invalid_json' });
    }

    const lead = body.lead || {};
    const attribution = body.attribution || {};
    // Obrigatórios no site: nome, empresa e WhatsApp (o restante é contexto opcional).
    const missing = ['nome', 'empresa', 'whatsapp'].filter((k) => !String(lead[k] || '').trim());
    if (missing.length) {
      return json_({ ok: false, error: 'missing_fields', fields: missing });
    }

    const id = String(body.id || Utilities.getUuid()).slice(0, 64);
    const lock = LockService.getScriptLock();
    lock.waitLock(20000);
    try {
      const sheet = getLeadsSheet_();
      if (isDuplicate_(sheet, id)) {
        return json_({ ok: true, id: id, duplicate: true });
      }
      const receivedAt = body.receivedAt ? new Date(body.receivedAt) : new Date();
      const values = {
        receivedAt: isNaN(receivedAt.getTime()) ? new Date() : receivedAt,
        status: 'Novo',
        nome: lead.nome,
        empresa: lead.empresa,
        whatsapp: lead.whatsapp,
        segmento: lead.segmento || '',
        desafio: lead.desafio || '',
        investeAnuncios: lead.investeAnuncios || '',
        investimentoMidia: lead.investimentoMidia || '',
        siteOuInstagram: lead.siteOuInstagram || '',
        detalhes: lead.detalhes || '',
        responsavel: '',
        observacoes: '',
        page: body.page || '',
        utm_source: attribution.utm_source || '',
        utm_medium: attribution.utm_medium || '',
        utm_campaign: attribution.utm_campaign || '',
        utm_term: attribution.utm_term || '',
        utm_content: attribution.utm_content || '',
        landing_page: attribution.landing_page || '',
        referrer_host: attribution.referrer_host || '',
        id: id,
        gclid: attribution.gclid || '',
        gbraid: attribution.gbraid || attribution.wbraid || '',
        click_at: attribution.click_at && !isNaN(new Date(attribution.click_at).getTime()) ? new Date(attribution.click_at) : '',
        conv_sent: '',
      };

      const isDate = (k) => k === 'receivedAt' || k === 'click_at';
      const row = COLUMNS.map((c) => (isDate(c.key) ? values[c.key] : safeText_(values[c.key])));
      sheet.appendRow(row);
      const rowIndex = sheet.getLastRow();
      formatNewRow_(sheet, rowIndex, values);
      SpreadsheetApp.flush();
    } finally {
      lock.releaseLock();
    }

    notify_(lead, attribution, id);
    return json_({ ok: true, id: id });
  } catch (err) {
    logError_(err, e);
    return json_({ ok: false, error: 'server_error' });
  }
}

/** Verificação simples de funcionamento (não expõe dados). */
function doGet() {
  return json_({ ok: true, service: 'dx-leads' });
}

/* ------------------------------------------------------------------------- */
/*  Configuração e utilidades de menu                                        */
/* ------------------------------------------------------------------------- */

/** Cria/formata a aba "Leads" e garante um token. Pode ser executada várias vezes. */
function setup() {
  const ss = SpreadsheetApp.getActive();
  ss.setSpreadsheetTimeZone(CONFIG.TIMEZONE);
  const sheet = getLeadsSheet_();

  // Cabeçalho
  const header = sheet.getRange(1, 1, 1, COLUMNS.length);
  header.setValues([COLUMNS.map((c) => c.title)])
    .setFontWeight('bold')
    .setFontColor('#ffffff')
    .setBackground('#0a0a0b')
    .setVerticalAlignment('middle')
    .setWrap(true);
  sheet.setRowHeight(1, 36);
  sheet.setFrozenRows(1);
  sheet.setFrozenColumns(3);
  COLUMNS.forEach((c, i) => sheet.setColumnWidth(i + 1, c.width));

  // Data/hora
  sheet.getRange(2, colIndex_('receivedAt'), sheet.getMaxRows() - 1, 1).setNumberFormat('dd/MM/yyyy HH:mm');
  sheet.getRange(2, colIndex_('click_at'), sheet.getMaxRows() - 1, 1).setNumberFormat('dd/MM/yyyy HH:mm');

  // Status: lista suspensa + cores
  const statusRange = sheet.getRange(2, colIndex_('status'), sheet.getMaxRows() - 1, 1);
  statusRange.setDataValidation(
    SpreadsheetApp.newDataValidation().requireValueInList(CONFIG.STATUS_OPTIONS, true).setAllowInvalid(false).build()
  );
  const colors = {
    'Novo': ['#e8f7c2', '#2f4a00'],
    'Em contato': ['#fff4c2', '#5c4600'],
    'Qualificado': ['#dbeafe', '#1e3a8a'],
    'Diagnóstico agendado': ['#e0e7ff', '#312e81'],
    'Proposta enviada': ['#f3e8ff', '#581c87'],
    'Ganho': ['#c8f53c', '#0a0a0b'],
    'Perdido': ['#fee2e2', '#7f1d1d'],
    'Sem perfil': ['#eeeeee', '#555555'],
  };
  const rules = sheet.getConditionalFormatRules().filter((r) => {
    const ranges = r.getRanges();
    return !ranges.some((rg) => rg.getColumn() === colIndex_('status'));
  });
  Object.keys(colors).forEach((status) => {
    rules.push(
      SpreadsheetApp.newConditionalFormatRule()
        .whenTextEqualTo(status)
        .setBackground(colors[status][0])
        .setFontColor(colors[status][1])
        .setRanges([statusRange])
        .build()
    );
  });
  sheet.setConditionalFormatRules(rules);

  // Filtro no cabeçalho
  if (!sheet.getFilter()) {
    sheet.getRange(1, 1, Math.max(sheet.getLastRow(), 2), COLUMNS.length).createFilter();
  }

  // Remove a aba vazia padrão ("Página1"/"Sheet1"), se existir e estiver vazia
  ss.getSheets().forEach((sh) => {
    if (sh.getName() !== CONFIG.SHEET_NAME && sh.getLastRow() === 0 && ss.getSheets().length > 1 && /^(Página|Sheet)\d+$/i.test(sh.getName())) {
      ss.deleteSheet(sh);
    }
  });

  // Aba lida pelo Google Ads (conversões offline)
  getConversionsSheet_();

  const token = getOrCreateToken_();
  console.log('Configuração concluída.');
  console.log('TOKEN: ' + token);
  console.log('Use na Vercel: LEAD_WEBHOOK_URL = <URL do App da Web>/exec?token=' + token);
  try {
    SpreadsheetApp.getUi().alert('Planilha configurada.\n\nTOKEN:\n' + token + '\n\nUse na Vercel:\nLEAD_WEBHOOK_URL = <URL do App da Web>/exec?token=' + token);
  } catch (err) {
    // Sem interface (executado pelo editor): o token está no registro de execução.
  }
}

/** Menu na planilha. */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Leads DX')
    .addItem('Configurar planilha', 'setup')
    .addItem('Mostrar token', 'mostrarToken')
    .addItem('Gerar novo token', 'gerarNovoToken')
    .addSeparator()
    .addItem('Gravar lead de teste', 'testarRecebimento')
    .addSeparator()
    .addItem('Enviar conversões pendentes ao Google Ads', 'exportarConversoesPendentes')
    .addToUi();
}

/* ------------------------------------------------------------------------- */
/*  Conversões offline (Google Ads)                                          */
/* ------------------------------------------------------------------------- */
/*
 *  Como funciona:
 *   1. O site grava o GCLID (identificador do clique no anúncio) junto com o lead.
 *   2. Quando a equipe muda o Status para "Qualificado", "Diagnóstico agendado",
 *      "Proposta enviada" ou "Ganho", este script escreve uma linha na aba
 *      "Conversões Google Ads", no formato que o Google Ads importa.
 *   3. No Google Ads, uma importação programada lê essa aba todo dia e atribui a
 *      conversão à campanha, ao grupo e à palavra-chave do clique original.
 *  Lead sem GCLID (não veio de anúncio do Google, ou o visitante recusou cookies
 *  e voltou outro dia) não gera conversão: a coluna "Enviado ao Google Ads" diz o motivo.
 */

/** Gatilho simples: roda sozinho quando alguém edita a planilha. */
function onEdit(e) {
  try {
    if (!e || !e.range) return;
    const sheet = e.range.getSheet();
    if (sheet.getName() !== CONFIG.SHEET_NAME) return;
    const statusCol = colIndex_('status');
    const first = e.range.getColumn();
    const last = first + e.range.getNumColumns() - 1;
    if (statusCol < first || statusCol > last) return;
    const top = e.range.getRow();
    for (let r = top; r < top + e.range.getNumRows(); r++) {
      if (r > 1) registrarConversoes_(sheet, r);
    }
  } catch (err) {
    logError_(err, null);
  }
}

/** Menu: revisa todos os leads e envia o que estiver pendente (útil depois de editar em massa). */
function exportarConversoesPendentes() {
  const sheet = getLeadsSheet_();
  let total = 0;
  for (let r = 2; r <= sheet.getLastRow(); r++) total += registrarConversoes_(sheet, r);
  const msg = total + ' conversão(ões) adicionada(s) na aba "' + CONFIG.CONVERSIONS_SHEET_NAME + '".';
  console.log(msg);
  try { SpreadsheetApp.getUi().alert(msg); } catch (err) {}
}

/** Escreve as conversões devidas para a linha do lead. Retorna quantas foram adicionadas. */
function registrarConversoes_(sheet, row) {
  const get = (key) => sheet.getRange(row, colIndex_(key)).getValue();
  const status = String(get('status') || '');
  const names = CONFIG.OFFLINE_CONVERSIONS[status];
  if (!names) return 0;

  const sentCell = sheet.getRange(row, colIndex_('conv_sent'));
  const sent = String(sentCell.getValue() || '').split(';').map((x) => x.trim()).filter(Boolean)
    .filter((x) => !/^Sem GCLID|^Fora da janela/.test(x));
  const pending = names.filter((n) => sent.indexOf(n) === -1);
  if (!pending.length) return 0;

  const gclid = String(get('gclid') || '').trim();
  if (!gclid) {
    if (!sent.length) sentCell.setValue('Sem GCLID: lead não veio de clique em anúncio do Google');
    return 0;
  }
  const clickAt = get('click_at') || get('receivedAt');
  const clickDate = clickAt instanceof Date ? clickAt : new Date(clickAt);
  if (!isNaN(clickDate.getTime()) && Date.now() - clickDate.getTime() > CONFIG.CLICK_WINDOW_DAYS * 864e5) {
    sentCell.setValue('Fora da janela de ' + CONFIG.CLICK_WINDOW_DAYS + ' dias do clique');
    return 0;
  }

  const conv = getConversionsSheet_();
  const when = Utilities.formatDate(new Date(), CONFIG.TIMEZONE, 'yyyy-MM-dd HH:mm:ss');
  pending.forEach((name) => conv.appendRow([gclid, name, when, '', 'BRL']));
  sentCell.setValue(sent.concat(pending).join('; '));
  return pending.length;
}

/** Aba no formato de importação do Google Ads (fuso na 1ª linha, cabeçalho na 2ª). */
function getConversionsSheet_() {
  const ss = SpreadsheetApp.getActive();
  let sh = ss.getSheetByName(CONFIG.CONVERSIONS_SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(CONFIG.CONVERSIONS_SHEET_NAME);
    // Texto puro: o Google Ads precisa ler a data exatamente neste formato.
    sh.getRange('A:E').setNumberFormat('@');
    sh.getRange(1, 1).setValue('Parameters:TimeZone=' + CONFIG.TIMEZONE);
    sh.getRange(2, 1, 1, 5)
      .setValues([['Google Click ID', 'Conversion Name', 'Conversion Time', 'Conversion Value', 'Conversion Currency']])
      .setFontWeight('bold');
    sh.setFrozenRows(2);
    sh.setColumnWidth(1, 280);
    sh.setColumnWidth(2, 170);
    sh.setColumnWidth(3, 170);
  }
  return sh;
}

function mostrarToken() {
  const token = getOrCreateToken_();
  console.log('TOKEN: ' + token);
  try { SpreadsheetApp.getUi().alert('TOKEN atual:\n' + token); } catch (err) {}
}

function gerarNovoToken() {
  const token = Utilities.getUuid().replace(/-/g, '') + Utilities.getUuid().replace(/-/g, '').slice(0, 8);
  PropertiesService.getScriptProperties().setProperty('DX_TOKEN', token);
  console.log('NOVO TOKEN: ' + token + ' — atualize LEAD_WEBHOOK_URL na Vercel e faça Redeploy.');
  try { SpreadsheetApp.getUi().alert('Novo token gerado:\n' + token + '\n\nAtualize LEAD_WEBHOOK_URL na Vercel e faça Redeploy.'); } catch (err) {}
}

/** Simula um envio do site (útil para conferir a planilha). */
function testarRecebimento() {
  const fake = {
    parameter: { token: getOrCreateToken_() },
    postData: {
      contents: JSON.stringify({
        type: 'diagnostico',
        id: 'teste-' + Utilities.getUuid(),
        receivedAt: new Date().toISOString(),
        lead: {
          nome: 'Lead de teste',
          empresa: 'Empresa Exemplo',
          whatsapp: '5547999999999',
          segmento: 'Teste',
          desafio: 'Gerar mais oportunidades de venda',
          investeAnuncios: 'Ainda não invisto',
          investimentoMidia: 'Ainda não sei / prefiro não informar',
          siteOuInstagram: '@exemplo',
          detalhes: 'Registro de teste criado pelo Apps Script — pode apagar.',
        },
        page: '/contato',
        attribution: { utm_source: 'teste', utm_medium: 'apps-script', landing_page: '/' },
      }),
    },
  };
  const out = doPost(fake).getContent();
  console.log(out);
  try { SpreadsheetApp.getUi().alert('Resultado do teste:\n' + out); } catch (err) {}
}

/* ------------------------------------------------------------------------- */
/*  Funções internas                                                         */
/* ------------------------------------------------------------------------- */

function getLeadsSheet_() {
  const ss = SpreadsheetApp.getActive();
  let sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SHEET_NAME, 0);
    sheet.getRange(1, 1, 1, COLUMNS.length).setValues([COLUMNS.map((c) => c.title)]).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function colIndex_(key) {
  return COLUMNS.findIndex((c) => c.key === key) + 1;
}

function getOrCreateToken_() {
  const props = PropertiesService.getScriptProperties();
  let token = props.getProperty('DX_TOKEN');
  if (!token) {
    token = Utilities.getUuid().replace(/-/g, '') + Utilities.getUuid().replace(/-/g, '').slice(0, 8);
    props.setProperty('DX_TOKEN', token);
  }
  return token;
}

/** Compara o token recebido em ?token= com o salvo (tempo constante). */
function isValidToken_(e) {
  const expected = PropertiesService.getScriptProperties().getProperty('DX_TOKEN') || '';
  const got = String((e && e.parameter && e.parameter.token) || '');
  if (!expected || got.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) diff |= expected.charCodeAt(i) ^ got.charCodeAt(i);
  return diff === 0;
}

/** Evita duplicados: confere o ID nas últimas linhas. */
function isDuplicate_(sheet, id) {
  const last = sheet.getLastRow();
  if (last < 2) return false;
  const n = Math.min(CONFIG.DEDUPE_LOOKBACK, last - 1);
  const ids = sheet.getRange(last - n + 1, colIndex_('id'), n, 1).getValues();
  return ids.some((r) => String(r[0]) === id);
}

/** Impede que um texto vire fórmula na planilha (=, +, -, @) e limita o tamanho. */
function safeText_(value) {
  let s = value === null || value === undefined ? '' : String(value);
  s = s.replace(/\u0000/g, '').slice(0, 2000);
  return /^[=+\-@\t\r]/.test(s) ? "'" + s : s;
}

/** WhatsApp formatado e clicável; destaque leve na linha nova. */
function formatNewRow_(sheet, row, values) {
  const digits = String(values.whatsapp || '').replace(/\D/g, '');
  if (digits) {
    const local = digits.startsWith('55') ? digits.slice(2) : digits;
    const pretty = local.length === 11
      ? '(' + local.slice(0, 2) + ') ' + local.slice(2, 7) + '-' + local.slice(7)
      : local.length === 10
        ? '(' + local.slice(0, 2) + ') ' + local.slice(2, 6) + '-' + local.slice(6)
        : local;
    const link = 'https://wa.me/' + (digits.startsWith('55') ? digits : '55' + digits);
    const rich = SpreadsheetApp.newRichTextValue().setText(pretty).setLinkUrl(link).build();
    sheet.getRange(row, colIndex_('whatsapp')).setRichTextValue(rich);
  }
  sheet.getRange(row, colIndex_('receivedAt')).setNumberFormat('dd/MM/yyyy HH:mm');
  sheet.getRange(row, 1, 1, COLUMNS.length).setVerticalAlignment('top');
  sheet.getRange(row, colIndex_('detalhes')).setWrap(true);
}

/** Aviso por e-mail (opcional). Não inclui dados além do necessário para o contato. */
function notify_(lead, attribution, id) {
  if (!CONFIG.NOTIFY_EMAILS.length) return;
  try {
    const digits = String(lead.whatsapp || '').replace(/\D/g, '');
    const wa = digits ? 'https://wa.me/' + (digits.startsWith('55') ? digits : '55' + digits) : '';
    const sheetUrl = SpreadsheetApp.getActive().getUrl();
    const linhas = [
      ['Nome', lead.nome],
      ['Empresa', lead.empresa],
      ['WhatsApp', digits],
      ['Segmento', lead.segmento],
      ['Principal desafio', lead.desafio],
      ['Investe em anúncios?', lead.investeAnuncios],
      ['Investimento em mídia/mês', lead.investimentoMidia],
      ['Site ou Instagram', lead.siteOuInstagram],
      ['Detalhes', lead.detalhes],
      ['Origem', [attribution.utm_source, attribution.utm_medium, attribution.utm_campaign].filter(String).join(' / ')],
    ].filter((r) => r[1]);
    const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    const html =
      '<div style="font-family:Arial,sans-serif;font-size:14px;color:#111">' +
      '<h2 style="margin:0 0 12px">Novo pedido de diagnóstico</h2>' +
      '<table cellpadding="6" style="border-collapse:collapse">' +
      linhas.map((r) => '<tr><td style="color:#666">' + esc(r[0]) + '</td><td><strong>' + esc(r[1]) + '</strong></td></tr>').join('') +
      '</table>' +
      (wa ? '<p><a href="' + wa + '" style="background:#c8f53c;color:#0a0a0b;padding:10px 16px;border-radius:999px;text-decoration:none;font-weight:bold">Chamar no WhatsApp</a></p>' : '') +
      '<p><a href="' + sheetUrl + '">Abrir planilha de leads</a></p>' +
      '<p style="color:#999;font-size:12px">ID: ' + esc(id) + '</p></div>';
    MailApp.sendEmail({
      to: CONFIG.NOTIFY_EMAILS.join(','),
      subject: 'Novo lead DX: ' + lead.nome + ' — ' + lead.empresa,
      htmlBody: html,
      name: 'Site Agência Digital Xpert',
    });
  } catch (err) {
    logError_(err, null);
  }
}

/** Registra erros numa aba própria (sem o conteúdo do formulário). */
function logError_(err, e) {
  try {
    console.error(err);
    const ss = SpreadsheetApp.getActive();
    let sh = ss.getSheetByName(CONFIG.ERROR_SHEET_NAME);
    if (!sh) {
      sh = ss.insertSheet(CONFIG.ERROR_SHEET_NAME);
      sh.appendRow(['Data/hora', 'Erro', 'Tamanho do corpo']);
      sh.setFrozenRows(1);
    }
    const size = e && e.postData && e.postData.contents ? e.postData.contents.length : 0;
    sh.appendRow([new Date(), String(err && err.stack ? err.stack : err).slice(0, 1000), size]);
  } catch (ignored) {}
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
