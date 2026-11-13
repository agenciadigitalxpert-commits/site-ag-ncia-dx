# Site — Agência Digital Xpert (DX)

Site institucional multipáginas, orientado à geração de oportunidades comerciais.
Next.js 16 (App Router, Cache Components), TypeScript, Tailwind CSS 4. Conteúdo estruturado em TypeScript.

## Rodando

```bash
npm install
cp .env.example .env.local   # preencha o que já estiver disponível
npm run dev                  # ambiente de edição: mostra rascunhos e notas de pendência
npm run build && npm start   # build de produção
```

## Ambientes

| | Edição (`npm run dev`) | Preview (build sem `NEXT_PUBLIC_SITE_ENV=production`) | Produção |
|---|---|---|---|
| Indexação | — | **bloqueada** (meta noindex, `X-Robots-Tag`, robots.txt `Disallow: /`) | liberada (exige `NEXT_PUBLIC_SITE_URL`) |
| Artigos em revisão | visíveis | visíveis com aviso, noindex | **não publicados** (404) |
| Cases `published: false` | visíveis com aviso | ocultos (404) | ocultos (404) |
| Notas de pendência | visíveis | ocultas | ocultas |

## Onde editar

| O quê | Arquivo |
|---|---|
| Dados institucionais, contatos, redes, CNPJ | `src/config/site.ts` |
| Domínio, ambiente, IDs de mensuração, WhatsApp, webhook | variáveis de ambiente (`.env.example`) |
| Menus e CTAs | `src/config/navigation.ts` |
| Cores e tipografia (tokens) | `src/app/globals.css` (`:root`) — a cor de destaque é **provisória** |
| Serviços | `src/content/services.ts` |
| Segmentos | `src/content/segments.ts` |
| Artigos e categorias | `src/content/articles.ts` |
| Cases | `src/content/cases.ts` |
| Etapas da metodologia | `src/content/method.ts` |

Texto com links internos usa `[texto](/rota)` e negrito `**texto**`.

### Publicar um artigo
Revise o texto, troque `status: "review"` por `"published"` e preencha `publishedAt` (e `updatedAt`, quando houver) com datas reais.

### Publicar um case
Somente com autorização registrada do cliente e resultados com período e fonte. Preencha e marque `published: true`.

## Checklist de publicação

1. `NEXT_PUBLIC_SITE_URL` com o domínio real e `NEXT_PUBLIC_SITE_ENV=production`, novo build.
2. Conferir: `/robots.txt` com `Allow` e `Sitemap`; `<meta name="robots" content="index, follow">` nas páginas; ausência do header `X-Robots-Tag`.
3. `LEAD_WEBHOOK_URL` configurado e um envio de teste chegando ao CRM.
4. Validar JSON-LD no [Teste de pesquisa aprimorada](https://search.google.com/test/rich-results) e no [Validador Schema.org](https://validator.schema.org/).
5. Enviar o sitemap no Google Search Console.
6. Se usar mensuração: IDs configurados, tags conferidas no modo de visualização do GTM e políticas revisadas.

Mais detalhes: `docs/mensuracao.md` e `docs/pendencias.md`.
