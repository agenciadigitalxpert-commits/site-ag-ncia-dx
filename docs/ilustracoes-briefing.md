# Briefing — ilustrações dos heroes (Agência Digital Xpert)

> **Atualização de branding:** o site passou a ser monocromático (preto, grafite e prata). Onde este briefing diz verde-lima `#C8F53C`, use prata `#EEEEEB`. O script `scripts/animate-illustrations.py` já faz essa troca automaticamente.

Cada página interna do site tem uma imagem própria à direita do título (no celular, pequena, acima do título). Hoje são ilustrações em SVG feitas em código (veja `ilustracoes-svg/` e `folha-atual.png`). Este briefing serve para gerar uma versão mais refinada numa IA de imagem (ex.: ChatGPT).

## Direção de arte recomendada

**Objetos 3D minimalistas, esculpidos em preto fosco, com luz de recorte verde-lima.**
Mesmo clima das fotos dos fundadores: fundo preto, um brilho verde-lima vindo de um lado, muito espaço vazio. Premium, silencioso, sem cara de banco de imagem.

- Material: preto fosco/acetinado (cerâmica, metal escovado escuro), com detalhes pontuais em vidro fumê.
- Luz: estúdio suave + **uma luz de recorte verde-lima `#C8F53C`** desenhando a borda do objeto.
- Cor: quase monocromática. **Só um elemento por imagem em verde-lima** (é a cor de destaque do site).
- Câmera: leve ângulo 3/4, lente 85mm, objeto centralizado, ocupando ~65% do quadro.
- Fundo: **transparente** (PNG) — ou, se não der, preto `#0A0A0B` liso, sem textura.
- Proibido: texto, letras, números, logos ou marcas (Google, Instagram, WhatsApp…), pessoas, mãos, telas com interface detalhada, métricas.

## Especificações técnicas

- Formato quadrado **1:1**, mínimo **1200 × 1200 px**.
- PNG com fundo transparente (preferido) ou fundo `#0A0A0B`.
- Margem de segurança: nada encostando nas bordas (~15%).
- Nome do arquivo = chave da lista abaixo (ex.: `google-ads.png`).
- Gerar todas **na mesma conversa**, depois do prompt mestre, para manter a consistência.

## 1) Prompt mestre (cole primeiro)

> Vamos criar uma série de 22 ilustrações 3D para o site de uma agência de marketing digital. Todas devem seguir exatamente este estilo: objeto único, minimalista e escultural, em material preto fosco/acetinado com pequenos detalhes em vidro fumê; iluminação de estúdio suave com uma luz de recorte verde-lima (#C8F53C) vinda da esquerda, desenhando as bordas; apenas UM elemento da composição na cor verde-lima #C8F53C; fundo transparente (ou preto #0A0A0B liso); câmera em leve ângulo 3/4, lente 85mm, objeto centralizado ocupando cerca de 65% do quadro, muito espaço negativo; acabamento premium, estilo render de produto da Apple; formato quadrado 1:1, 1200×1200. Nunca inclua texto, letras, números, logos, marcas, pessoas ou mãos. Confirme que entendeu e aguarde os temas, que vou mandar um por vez.

## 2) Prompts por imagem

| Arquivo | Página | Prompt |
|---|---|---|
| `trafego-pago` | Tráfego pago | Um radar/alvo circular em camadas concêntricas de vidro fumê sobre base preta, com um feixe de varredura sutil; o ponto central é uma pequena esfera verde-lima. |
| `google-ads` | Google Ads | Uma barra de busca flutuante em vidro fosco com uma lupa esculpida à esquerda; abaixo, três placas finas empilhadas representando resultados; a primeira placa tem uma pequena etiqueta verde-lima. |
| `meta-ads` | Meta Ads | Um smartphone preto levemente inclinado com três cartões de feed saindo da tela em profundidade; um pequeno coração verde-lima flutuando à frente. |
| `criativos-e-roteiros` | Criativos e roteiros | Uma claquete de cinema minimalista em preto fosco ao lado de um smartphone vertical; um botão de play triangular verde-lima flutua à frente. |
| `landing-pages` | Landing pages | Uma janela de navegador explodida em camadas (cabeçalho, bloco principal, cards) flutuando em profundidade; um botão arredondado verde-lima em destaque na camada central. |
| `estruturacao-comercial` | Estruturação comercial | Um funil escultural em vidro fumê com pequenas esferas pretas descendo; uma única esfera verde-lima saindo pela base. |
| `crm-automacao-ia` | CRM, automação e IA | Um quadro kanban 3D com três colunas e cartões em relevo; um cartão verde-lima avançando entre colunas; uma pequena estrela de quatro pontas acima. |
| `intermediacao-e-revendas` | Intermediação e revendas | Um sedã moderno em miniatura, estilo maquete escultural em preto fosco, de perfil 3/4; ao lado, uma chave de carro com uma pequena etiqueta verde-lima. |
| `oficinas-e-funilarias` | Oficinas e funilarias | Uma engrenagem robusta e uma chave combinada cruzadas, em metal preto acetinado; o contorno da chave iluminado em verde-lima. |
| `clinicas-de-estetica` | Clínicas de estética | Um espelho de mão redondo em preto fosco ao lado de um frasco de sérum em vidro fumê com conta-gotas; um pequeno brilho de quatro pontas verde-lima. |
| `dermatologistas` | Dermatologistas | Uma lupa elegante sobre um bloco abstrato com camadas onduladas (representação estilizada da pele, sem realismo médico); o aro da lupa em verde-lima. |
| `clinicas-odontologicas` | Clínicas odontológicas | Um dente estilizado em cerâmica fosca sobre um pequeno pedestal preto; ao lado, um selo circular com um check verde-lima. |
| `delivery` | Delivery e alimentação | Um pino de mapa sobre um mapa urbano minimalista em relevo preto, com ondas concêntricas de raio de entrega; o pino com centro verde-lima; uma pequena caixa de entrega ao lado. |
| `servicos` | Serviços (lista) | Sete esferas pretas orbitando uma esfera central verde-lima, conectadas por fios finos de luz, como uma constelação. |
| `segmentos` | Segmentos (lista) | Uma colmeia de hexágonos em relevo preto fosco; um único hexágono verde-lima ligeiramente elevado. |
| `sobre` | Sobre a DX | A letra X monumental esculpida em preto fosco, com a borda recortada pela luz verde-lima (apenas o X, nenhuma outra letra). |
| `metodologia` | Metodologia | Cinco marcos/pilares de alturas crescentes conectados por um arco de luz; um pequeno ponto verde-lima percorrendo o arco. |
| `conteudos` | Conteúdos | Um caderno/pilha de folhas espessas em preto fosco, com um marcador de página verde-lima. |
| `cases` | Cases | Quatro barras verticais em vidro fumê de alturas crescentes; a mais alta em verde-lima (sem números ou eixos). |
| `legal` | Políticas | Um escudo em vidro fumê com um check verde-lima em relevo. |
| `contato` | Contato | Dois balões de conversa em vidro fosco sobrepostos; dentro do maior, três pontos de digitação, o do meio verde-lima. |
| `404` | Página não encontrada | Um caminho pontilhado em relevo que se interrompe no meio; um pequeno ponto verde-lima no ponto de quebra. |

Dica: depois de gerar, peça ao GPT "recorte com fundo transparente" se a imagem vier com fundo.

## 3) Alternativa: refinar os SVGs (ilustração vetorial)

Se preferir manter ilustração vetorial (leve, animável), envie os arquivos de `ilustracoes-svg/` e use:

> Estes são SVGs de ilustrações de um site (viewBox 400×400, fundo #0A0A0B). Redesenhe cada um com qualidade de ilustração editorial premium: formas mais elegantes e bem proporcionadas, construção geométrica precisa, curvas suaves, detalhes que dão sofisticação (sombras sutis com opacidade, camadas, pequenos elementos de apoio), mantendo o mesmo assunto. Regras: viewBox 0 0 400 400; traços em branco #FFFFFF com opacidades entre 0.15 e 0.85; preenchimentos escuros #0A0A0B para sobrepor; apenas UM elemento em verde-lima #C8F53C; sem texto; sem gradientes coloridos além do verde-lima; código limpo, sem imagens embutidas. Devolva um SVG por arquivo, com o mesmo nome.

## Como devolver

Mande os arquivos com os nomes da tabela (PNG ou SVG). Eu otimizo, coloco em `public/ilustracoes/` e ligo em `src/config/illustrations.ts`. Cada página passa a usar a imagem nova automaticamente.
