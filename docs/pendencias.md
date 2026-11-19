# Pendências para publicação

Nada abaixo foi inventado no site: enquanto um item não for preenchido, ele simplesmente não aparece (ou aparece como aviso no ambiente de edição).

## Integração e indexação
- [ ] **Integração do formulário** — Apps Script pronto para a planilha "LEADS GOOGLE AGÊNCIA" (`docs/google-apps-script/Codigo.gs`): falta implantar e cadastrar `LEAD_WEBHOOK_URL` (URL /exec + `?token=`) na Vercel e fazer Redeploy. Até lá, o formulário permanece no site e seu aviso de configuração inclui um link para o Respondi.
- [ ] **Domínio** (`NEXT_PUBLIC_SITE_URL`) e `NEXT_PUBLIC_SITE_ENV=production` para liberar a indexação.

## Identidade
- [ ] **Logo oficial em vetor (SVG)** — o cabeçalho usa um wordmark recriado em HTML a partir da imagem enviada (150×150 px). `public/brand/logo-dx.png` (a imagem enviada) é usada no schema.
- [ ] **Cor institucional** — o verde-lima é provisório (`--accent` em `src/app/globals.css`).
- [x] Fotos e nomes dos fundadores (Elizandro Uebel e Diego Viana) na página Sobre.
- [ ] Fotos reais do escritório/equipe (opcional).
- [ ] Definir se os artigos terão autoria de um dos fundadores (hoje a autoria é da agência).

## Contato e dados institucionais (`src/config/site.ts`)
- [ ] Telefone e **WhatsApp** (`NEXT_PUBLIC_WHATSAPP_NUMBER`) — o botão só aparece com número real.
- [ ] E-mail comercial.
- [ ] Endereço completo (somente se for público).
- [x] Instagram e YouTube oficiais da agência.
- [ ] Razão social, CNPJ e canal de privacidade/encarregado (para as políticas).

## Prova
- [x] Três depoimentos em vídeo na home e em Cases, com capa, resumo e link para a publicação original.
- [ ] Estudos de caso detalhados, com período, fonte e autorização. Cada estudo aparece em Cases quando recebe `published: true`.

## Mensuração
- [x] GTM `GTM-NL8SVB3Z` instalado no `<head>` de todas as páginas, com Consent Mode v2 (tudo negado até o aceite).
- [ ] No GTM: Meta Pixel e outras tags que não são do Google com "Exigir consentimento adicional: ad_storage".
- [ ] Configurar dentro do GTM: tag do Google/GA4, Google Ads e Meta Pixel (passo a passo em `docs/mensuracao.md`).
- [ ] Configurar conversões (GA4/Google Ads/Meta) no evento `generate_lead` — ver `docs/mensuracao.md`.

## Validação de conteúdo
- [ ] **Políticas de privacidade e de cookies** são minutas (a de cookies já lista as ferramentas do GTM automaticamente): revisar com jurídico e então marcar `policiesValidated: true` em `src/config/site.ts` (remove o aviso de minuta).
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
