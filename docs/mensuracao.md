# Mapa de eventos e mensuração

Todos os eventos passam por `src/lib/analytics.ts` (`track()`), que:

- empurra o evento para `window.dataLayer` (fila local — nada sai do navegador sem GTM/GA4/Pixel carregados);
- envia para o GA4 direto **apenas** quando ele é usado sem GTM;
- envia ao Meta Pixel somente `generate_lead` (como `Lead`) e `whatsapp_click` (como `WhatsAppClick`, evento personalizado);
- **descarta** parâmetros com nomes que indiquem dados pessoais (nome, e-mail, telefone etc.).

Scripts opcionais só são carregados **depois do consentimento** (`src/components/consent/ConsentManager.tsx`).

## Eventos

| Evento | Quando dispara | Parâmetros | Uso recomendado |
|---|---|---|---|
| `cta_click` | Clique em qualquer CTA rastreado ("Quero um diagnóstico", "Conheça nossa estratégia") | `cta_label`, `cta_location`, `destination` | Engajamento. **Não** é conversão. |
| `whatsapp_click` | Clique no botão/links de WhatsApp (só existem com número configurado) | `link_location` | Microconversão de intenção. **Não** é lead nem venda. |
| `form_start` | Primeiro foco em qualquer campo do formulário (1x por carregamento) | `form_location` | Funil do formulário. |
| `form_step_complete` | Etapa 1 validada no navegador | `form_location`, `step`, `segment` | Funil do formulário. |
| `generate_lead` | **Somente** após o servidor confirmar que o webhook recebeu o lead (HTTP 2xx) | `form_location`, `segment`, `invests_in_ads`, `lead_id` | **Conversão principal** (GA4 key event / Google Ads / Meta `Lead`). |

`generate_lead` é protegido contra disparo duplicado (uma vez por envio confirmado).
`lead_id` é um UUID gerado no servidor e pode ser usado para deduplicação.

## Configuração sugerida no GTM

1. Variáveis de camada de dados: `cta_label`, `cta_location`, `form_location`, `segment`, `lead_id`.
2. Acionadores de evento personalizado para cada nome acima.
3. Tag GA4 (Google Tag + eventos) para todos os eventos.
4. Conversão do Google Ads e evento `Lead` do Meta Pixel **apenas** no acionador `generate_lead`.
5. O site já envia Consent Mode v2 (`consent default` negado + `consent update` conforme a escolha) antes de carregar o GTM.

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
