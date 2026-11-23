# Pendências para publicação

Nada abaixo foi inventado no site: enquanto um item não for preenchido, ele simplesmente não aparece (ou aparece como aviso no ambiente de edição).

## Integração e indexação
- [x] **Integração do formulário** — Apps Script + planilha "LEADS GOOGLE AGÊNCIA" funcionando em produção (lead de teste confirmado), com aviso por e-mail.
- [x] **Domínio** — produção da Vercel usa `https://www.agenciadigitalxpert.com.br` automaticamente (indexação liberada; previews seguem com noindex). Search Console verificado e sitemap enviado.

## Identidade
- [x] **Logo oficial** — PNG transparente em `public/brand/` (branca e escura) e wordmark recriado em código. (Opcional: arquivo vetorial SVG, se existir.)
- [x] **Cor institucional** — branding monocromático (preto, grafite e prata).
- [x] Fotos e nomes dos fundadores (Elizandro Uebel e Diego Viana) na página Sobre.
- [x] Fotos dos fundadores (Diego, Liandra, Elizandro) em /sobre.
- [ ] Instagram da Liandra Silva (o botão aparece quando houver).
- [ ] Fotos reais do escritório/equipe (opcional).
- [ ] Definir se os artigos terão autoria de um dos fundadores (hoje a autoria é da agência).

## Contato e dados institucionais (`src/config/site.ts`)
- [ ] Telefone e **WhatsApp** — o botão e o evento `whatsapp_click` só aparecem com número real (passar o número para incluir no código).
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
- [x] GTM configurado: GA4 (G-9YDVMPBV00), Google Ads (AW-18584501439) e eventos do site.
- [x] Conversão `generate_lead` no GA4 e no Google Ads. (Meta Pixel pausado no GTM.)

## Validação de conteúdo
- [ ] **Políticas de privacidade e de cookies** são minutas (a de cookies já lista as ferramentas do GTM automaticamente): revisar com jurídico e então marcar `policiesValidated: true` em `src/config/site.ts` (remove o aviso de minuta).
- [x] **Artigos** publicados em 23/11/2026 (14 no total, incluindo 5 comparativos). Antigos pontos de revisão (referência): revisão editorial, definir datas reais e publicar. Pontos a conferir:
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

## Novos conteúdos (23/11/2026)
- [x] 10 novos segmentos: estética automotiva, climatização, transportes e fretes, advocacia, imobiliárias, construtoras, médicos, nutricionistas, psicólogos, fisioterapeutas.
- [x] 10 páginas de resposta em /respostas e 7 materiais em /materiais (arquivos gerados por `scripts/materiais/`).
- [ ] Revisar com os responsáveis técnicos os blocos de "comunicação responsável" de advocacia (Provimento OAB 205/2021), médicos (CFM), nutricionistas (CFN), psicólogos (CFP) e fisioterapeutas (COFFITO).
- [ ] Ilustrações próprias para os novos segmentos (hoje reaproveitam as mais próximas).
- [ ] Apps Script (versão com Leads frios e planilha de conversões separada): colar, rodar `setup`, autorizar e publicar nova versão da implantação (mesma URL).
- [ ] Google Ads: criar as ações "Lead qualificado" e "Cliente fechado" (importação) e a programação diária lendo a planilha "DX — Conversões Google Ads".
- [x] Materiais liberados por formulário (aba "Leads frios"), focados no empresário.
