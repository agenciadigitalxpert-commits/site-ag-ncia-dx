# Mapa de eventos e mensuração

Todos os eventos passam por `src/lib/analytics.ts` (`track()`), que:

- empurra o evento para `window.dataLayer` (fila local — nada sai do navegador sem GTM/GA4/Pixel carregados);
- envia para o GA4 direto **apenas** quando ele é usado sem GTM;
- envia ao Meta Pixel somente `generate_lead` (como `Lead`) e `whatsapp_click` (como `WhatsAppClick`, evento personalizado);
- **descarta** parâmetros com nomes que indiquem dados pessoais (nome, e-mail, telefone etc.).

**Container GTM:** `GTM-NL8SVB3Z` (definido em `src/config/env.ts`; a variável `NEXT_PUBLIC_GTM_ID` sobrescreve).

### Como o carregamento funciona
1. No `<head>`, antes de tudo, o site cria `window.dataLayer`, a função `gtag` e envia **Consent Mode v2 com tudo negado** (`consent default`). Se o visitante já escolheu antes, a escolha salva é reaplicada (`consent update`) na mesma hora.
2. Logo em seguida, o snippet oficial do GTM carrega o `gtm.js` em **todas as páginas** (há também o `<noscript>` no início do `<body>`).
3. Enquanto o visitante não aceita, as tags do Google funcionam no modo avançado do Consent Mode (sem cookies). Ao aceitar ou recusar no aviso, o site envia `consent update` e o evento `consent_update` para o dataLayer.
4. **Importante (LGPD):** tags que não são do Google (ex.: Meta Pixel) precisam, no GTM, de **Configurações de consentimento → Exigir consentimento adicional → `ad_storage`**. Assim elas só disparam depois do aceite.

## Eventos

| Evento | Quando dispara | Parâmetros | Uso recomendado |
|---|---|---|---|
| `page_view` | Carregamento da página e **cada navegação interna** (o site troca de página sem recarregar) | `page_location` (URL completa, com UTMs), `page_path`, `page_title`, `page_referrer`, `content_group` | Page view do GA4. |
| `cta_click` | Clique em qualquer CTA rastreado ("Quero um diagnóstico", "Conheça nossa estratégia") | `cta_label`, `cta_location`, `destination` | Engajamento. **Não** é conversão. |
| `whatsapp_click` | Clique no botão/links de WhatsApp (só existem com número configurado) | `link_location` | Microconversão de intenção. **Não** é lead nem venda. |
| `form_start` | Primeiro foco em qualquer campo do formulário (1x por carregamento) | `form_location` | Funil do formulário. |
| `form_step_complete` | Etapa 1 validada no navegador | `form_location`, `step` | Funil do formulário. |
| `form_error` | Envio recusado ou com falha (validação, integração, rede) | `form_location`, `error_code` (`validation`, `not_configured`, `delivery_failed`, `rate_limited`, `network`...) | Diagnóstico de problemas no formulário. |
| `material_download` | Clique em "Baixar" na página /materiais | `material`, `file_format` | Interesse em conteúdo (não é lead). |
| `generate_lead` | **Somente** após o servidor confirmar que o webhook recebeu o lead (HTTP 2xx) | `form_location`, `invests_in_ads`, `lead_id` | **Conversão principal** (GA4 key event / Google Ads / Meta `Lead`). |

O segmento é digitado livremente e por isso **não** é enviado ao analytics (vai só para o CRM). A página de origem do envio fica em `form_location` (ex.: `segment_delivery_final`, `contact_page`).

`generate_lead` é protegido contra disparo duplicado (uma vez por envio confirmado).
`lead_id` é um UUID gerado no servidor e pode ser usado para deduplicação.

`content_group`: `home`, `servico`, `servicos_hub`, `segmento`, `segmentos_hub`, `artigo`, `conteudos_hub`, `cases`, `contato`, `institucional`, `legal`.

## Configuração no GTM (passo a passo)

**Variáveis** (Variável da camada de dados): `page_location`, `page_path`, `page_title`, `page_referrer`, `content_group`, `cta_label`, `cta_location`, `destination`, `form_location`, `step`, `error_code`, `invests_in_ads`, `lead_id`, `link_location`.

**Acionadores** (Evento personalizado, nome exato): `page_view`, `cta_click`, `whatsapp_click`, `form_start`, `form_step_complete`, `form_error`, `generate_lead`.

**Tags:**
1. **Tag do Google (GA4)** com o ID de medição `G-XXXXXXX`, acionador *Initialization – All Pages*, com o parâmetro de configuração `send_page_view` = `false` (o page view vem do evento do site, evitando duplicidade).
2. **Evento GA4 `page_view`** no acionador `page_view`, enviando `page_location`, `page_title`, `page_referrer` e `content_group`.
3. **Eventos GA4** para `cta_click`, `whatsapp_click`, `form_start`, `form_step_complete`, `form_error` e `generate_lead`, com os parâmetros acima. No GA4, marque `generate_lead` como **evento principal** (conversão).
4. **Google Ads – Acompanhamento de conversões** no acionador `generate_lead` (use `lead_id` como ID da transação para evitar duplicidade) e **Vinculador de conversões** em todas as páginas.
5. **Meta Pixel** (base em todas as páginas, `Lead` no acionador `generate_lead`).
6. Em *Configurações do contêiner*, ative a **visão geral do consentimento**: as tags do Google respeitam o Consent Mode automaticamente; para o Meta Pixel, exija `ad_storage` concedido.

> Não use clique no WhatsApp como conversão de lead ou venda.

## Origem dos leads (UTM)

`src/lib/utm.ts` guarda em `sessionStorage` os parâmetros `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, a página de entrada e o domínio de referência da **primeira página da sessão**. Esses dados vão **junto com o lead para o webhook/CRM** — nunca para as ferramentas de analytics nem para a URL.

## Payload do webhook

```json
{
  "type": "diagnostico",
  "id": "1e368412-2615-422b-851a-70a31dbcb242",
  "receivedAt": "2026-11-13T19:39:19.627Z",
  "lead": {
    "nome": "…", "empresa": "…", "whatsapp": "5547999998888",
    "segmento": "…", "desafio": "…",
    "investeAnuncios": "…", "investimentoMidia": "…", "siteOuInstagram": "…", "detalhes": "…"
  },
  "page": "/contato",
  "attribution": { "utm_source": "google", "utm_campaign": "…", "landing_page": "/servicos/google-ads" }
}
```

Com `LEAD_WEBHOOK_SECRET`, o header `X-DX-Signature` traz o HMAC SHA-256 (hex) do corpo.

### Google Sheets (Apps Script)
Código pronto em `docs/google-apps-script/Codigo.gs` (instruções no topo do arquivo). O Apps Script não lê cabeçalhos, então a autenticação vai na URL: `LEAD_WEBHOOK_URL = https://script.google.com/macros/s/<ID>/exec?token=<TOKEN>`. Para URLs do Apps Script, o site só confirma o envio quando a resposta é `{ "ok": true }`. O `id` evita linhas duplicadas.


## GCLID e conversões offline (Google Ads)

1. **Site** (`src/lib/utm.ts`): quando a visita chega com `gclid` (ou `gbraid`/`wbraid`) na URL, o identificador fica guardado na sessão. Com consentimento de publicidade, fica também por 90 dias no navegador (para quem volta outro dia). Ele vai junto com o lead, em `attribution.gclid` e `attribution.click_at`.
2. **Planilha** (`docs/google-apps-script/Codigo.gs`): grava as colunas "GCLID (clique no anúncio)", "GBRAID/WBRAID", "Data do clique" e "Enviado ao Google Ads".
3. **Status → conversão**: ao mudar o Status para Qualificado, Diagnóstico agendado ou Proposta enviada, o script escreve "Lead qualificado" na aba "Conversões Google Ads". Em "Ganho", escreve também "Cliente fechado". Cada conversão sai uma vez por lead.
4. **Google Ads**: Metas → Conversões → Nova ação de conversão → Importar → "Outras fontes de dados ou CRMs" → "Rastrear conversões de cliques". Criar "Lead qualificado" e "Cliente fechado" (nomes idênticos aos do script). Depois: Ferramentas → Uploads → Programações → Google Planilhas, apontando para a aba "Conversões Google Ads", frequência diária.
5. Lead sem GCLID (não veio de anúncio do Google, ou recusou cookies e voltou outro dia) não vira conversão offline; a coluna "Enviado ao Google Ads" explica o motivo.
