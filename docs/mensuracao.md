# Mapa de eventos e mensuração

Todos os eventos passam por `src/lib/analytics.ts` (`track()`), que:

- empurra o evento para `window.dataLayer` (fila local — nada sai do navegador sem GTM/GA4/Pixel carregados);
- envia para o GA4 direto **apenas** quando ele é usado sem GTM;
- envia ao Meta Pixel somente `generate_lead` (como `Lead`) e `whatsapp_click` (como `WhatsAppClick`, evento personalizado);
- **descarta** parâmetros com nomes que indiquem dados pessoais (nome, e-mail, telefone etc.).

**Container GTM:** `GTM-MLGX6B67` (definido em `src/config/env.ts`; a variável `NEXT_PUBLIC_GTM_ID` sobrescreve).

### Como o carregamento funciona
1. No `<head>`, antes de tudo, o site cria `window.dataLayer`, a função `gtag` e envia **Consent Mode v2 com tudo negado** (`consent default`). Se o visitante já escolheu antes, a escolha salva é reaplicada (`consent update`) na mesma hora.
2. Eventos do site (`page_view`, `cta_click`...) vão para o dataLayer desde o início.
3. O GTM (`gtm.js`) só é carregado **depois do consentimento** (medição ou publicidade). Ao carregar, ele processa os eventos que já estavam na fila, na ordem.
4. Se o visitante recusar, o GTM não carrega.

## Eventos

| Evento | Quando dispara | Parâmetros | Uso recomendado |
|---|---|---|---|
| `page_view` | Carregamento da página e **cada navegação interna** (o site troca de página sem recarregar) | `page_location` (URL completa, com UTMs), `page_path`, `page_title`, `page_referrer`, `content_group` | Page view do GA4. |
| `cta_click` | Clique em qualquer CTA rastreado ("Quero um diagnóstico", "Conheça nossa estratégia") | `cta_label`, `cta_location`, `destination` | Engajamento. **Não** é conversão. |
| `whatsapp_click` | Clique no botão/links de WhatsApp (só existem com número configurado) | `link_location` | Microconversão de intenção. **Não** é lead nem venda. |
| `form_start` | Primeiro foco em qualquer campo do formulário (1x por carregamento) | `form_location` | Funil do formulário. |
| `form_step_complete` | Etapa 1 validada no navegador | `form_location`, `step`, `segment` | Funil do formulário. |
| `form_error` | Envio recusado ou com falha (validação, integração, rede) | `form_location`, `error_code` (`validation`, `not_configured`, `delivery_failed`, `rate_limited`, `network`...) | Diagnóstico de problemas no formulário. |
| `generate_lead` | **Somente** após o servidor confirmar que o webhook recebeu o lead (HTTP 2xx) | `form_location`, `segment`, `invests_in_ads`, `lead_id` | **Conversão principal** (GA4 key event / Google Ads / Meta `Lead`). |

`generate_lead` é protegido contra disparo duplicado (uma vez por envio confirmado).
`lead_id` é um UUID gerado no servidor e pode ser usado para deduplicação.

`content_group`: `home`, `servico`, `servicos_hub`, `segmento`, `segmentos_hub`, `artigo`, `conteudos_hub`, `cases`, `contato`, `institucional`, `legal`.

## Configuração no GTM (passo a passo)

**Variáveis** (Variável da camada de dados): `page_location`, `page_path`, `page_title`, `page_referrer`, `content_group`, `cta_label`, `cta_location`, `destination`, `form_location`, `segment`, `step`, `error_code`, `invests_in_ads`, `lead_id`, `link_location`.

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
