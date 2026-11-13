# Pendências para publicação

Nada abaixo foi inventado no site: enquanto um item não for preenchido, ele simplesmente não aparece (ou aparece como aviso no ambiente de edição).

## Bloqueiam a geração de leads
- [ ] **Integração do formulário** — URL de webhook do CRM/automação (`LEAD_WEBHOOK_URL`). Sem ela, o formulário exibe "em configuração" e recusa os envios.
- [ ] **Domínio** (`NEXT_PUBLIC_SITE_URL`) e `NEXT_PUBLIC_SITE_ENV=production` para liberar a indexação.

## Identidade
- [ ] **Logo oficial em vetor (SVG)** — o cabeçalho usa um wordmark recriado em HTML a partir da imagem enviada (150×150 px). `public/brand/logo-dx.png` (a imagem enviada) é usada no schema.
- [ ] **Cor institucional** — o verde-lima é provisório (`--accent` em `src/app/globals.css`).
- [ ] **Fotos reais** da equipe/escritório (página Sobre).
- [ ] Nomes e funções de pessoas responsáveis, se quiserem autoria real nos conteúdos.

## Contato e dados institucionais (`src/config/site.ts`)
- [ ] Telefone e **WhatsApp** (`NEXT_PUBLIC_WHATSAPP_NUMBER`) — o botão só aparece com número real.
- [ ] E-mail comercial.
- [ ] Endereço completo (somente se for público).
- [ ] Perfis sociais.
- [ ] Razão social, CNPJ e canal de privacidade/encarregado (para as políticas).

## Prova
- [ ] **Cases autorizados** com dados verificáveis (período e fonte). A seção de cases fica oculta até existir um publicado.
- [ ] Depoimentos reais, se houver (não há nenhum no site).

## Mensuração
- [ ] IDs reais de GTM e/ou GA4 e Meta Pixel. O aviso de cookies só aparece quando há ferramenta opcional configurada.
- [ ] Configurar conversões (GA4/Google Ads/Meta) no evento `generate_lead` — ver `docs/mensuracao.md`.

## Validação de conteúdo
- [ ] **Políticas de privacidade e de cookies** são minutas: revisar com jurídico e então marcar `policiesValidated: true` em `src/config/site.ts` (remove o aviso de minuta).
- [ ] **Artigos** (3) estão com `status: "review"`: revisão editorial, definir datas reais e publicar. Pontos a conferir:
  - descrições gerais de recursos das plataformas (conversões offline, formulários instantâneos, palavras-chave negativas, públicos por lista);
  - orientação de rastrear origem no WhatsApp com parâmetros/mensagens iniciais por campanha.
- [ ] **Saúde** (estética, dermatologia, odontologia): validar os blocos de "comunicação responsável" com o responsável técnico — citação da Resolução CFM nº 2.336/2023 (sem detalhar o conteúdo), menções genéricas ao CFO e aos conselhos de cada profissão; FAQ sobre divulgação de preço em odontologia deixada em aberto de propósito.
- [ ] **Práticas da DX** que precisam de confirmação:
  - "o recomendado é que a conta de anúncios esteja em nome da sua empresa" (FAQ de Tráfego pago);
  - "na maioria dos casos, a DX escreve o roteiro e orienta a gravação feita pela sua equipe" (Criativos);
  - possibilidade de a DX manter o Perfil da Empresa no Google (oficinas) e apoiar a produção de fotos (delivery), "conforme o escopo";
  - afirmação de que a DX não cuida do Instagram orgânico (clínicas de estética);
  - comentário sobre seguradoras e regras de apólice na escolha da oficina.
- [ ] Revisar texto de sucesso do formulário ("nossa equipe vai entrar em contato pelo WhatsApp") — sem prazo prometido.

## Antes de publicar (verificações externas)
- [ ] Validar JSON-LD no Teste de pesquisa aprimorada e no Validador Schema.org (a sintaxe foi validada localmente; elegibilidade depende da ferramenta do Google).
- [ ] Medir Core Web Vitals em campo (Search Console / CrUX) após a publicação. Metas: LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1.
- [ ] Limitação de taxa do formulário é em memória (por instância). Em hospedagem serverless com várias instâncias, considerar Turnstile/reCAPTCHA ou limitação no provedor.
