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
| Tokens de design (cor, raio, tipografia) | `src/app/globals.css` — primitivos (`--grey-*`, `--lime-*`) → semânticos `color-{elemento}-{prioridade}-{estado}`, remapeados por superfície (`.surface-dark`, `.surface-light`…). A cor da marca é **provisória**: troque só `--lime-*`. |
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

## Regras de design (padrão DX)

- Cor da marca **só** no CTA principal e em indicadores de estado; o resto é neutro.
- Um botão `primary` por área (`btn("primary" | "secondary" | "ghost")` em `src/components/ui.tsx`); ação principal à direita.
- Agrupar por proximidade; superfície (`bg-bg-surface*`, `.surface-dark`) apenas como ênfase.
- Line-height no grid de 4px; ícones de 20px em caixa de 24px com 8px de gap (`IconItem`).
- Raios: externo = interno + padding (`--radius-sm` 8 → `--radius-xl` 32 / `--radius-2xl` 40 nos painéis do formulário).
- Formulário: opções curtas como chips de seleção única, rótulos em forma de pergunta, campos agrupados por decisão.
- Hero da home: gradiente de luz em uma única cor (matiz da marca, 4 stops em HSL — `--glow-*` em `globals.css`), texto curto e centralizado. Demais páginas: mesmo gradiente, suave, com texto à esquerda.
- Densidade: frases curtas; listas longas mostram os itens principais e o detalhe fica em acordeão.
- Formulário em uma coluna, opcionais marcados com "(opcional)", erro com ícone + texto.
- Componentes usam apenas tokens semânticos (ex.: `text-text-secondary`, `bg-bg-fill-brand`, `border-border-tertiary`).
