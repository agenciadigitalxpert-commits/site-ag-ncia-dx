import type { Article, Category } from "./types";

export const categories: Category[] = [
  {
    slug: "trafego-pago",
    name: "Tráfego pago",
    description:
      "Como planejar, escolher canais e medir campanhas no Google Ads e no Meta Ads pensando em oportunidades reais de venda, não só em cliques.",
  },
  {
    slug: "comercial-e-pre-vendas",
    name: "Comercial e pré-vendas",
    description:
      "Atendimento, qualificação de leads, CRM e rotina comercial para que os contatos gerados pelo marketing tenham o tratamento certo até a venda.",
  },
  {
    slug: "estrategia",
    name: "Estratégia",
    description:
      "Decisões que conectam aquisição, atendimento e vendas, para você investir com mais clareza sobre o que gera resultado no seu negócio.",
  },
];

export const articles: Article[] = [
  /* ------------------------------------------------------------------ */
  /* 1. Tráfego pago e processo comercial                               */
  /* ------------------------------------------------------------------ */
  {
    slug: "trafego-pago-e-processo-comercial",
    title: "Tráfego pago e processo comercial: por que os dois precisam trabalhar juntos",
    metaTitle: "Tráfego pago e processo comercial: por que integrar",
    metaDescription:
      "Entenda por que tráfego pago sem processo comercial desperdiça leads, como identificar sinais de desconexão e o que ajustar para transformar contatos em vendas.",
    excerpt:
      "Campanha boa não compensa atendimento lento, critério de qualificação indefinido ou falta de registro. Veja onde marketing e comercial costumam se desconectar e como alinhar os dois.",
    category: "estrategia",
    keyTakeaway:
      "Tráfego pago gera oportunidades; quem transforma oportunidade em venda é o processo comercial. Quando os dois trabalham separados, a campanha é avaliada pelo custo por lead e o comercial reclama da qualidade dos contatos, sem que ninguém enxergue onde a venda se perde. O ajuste começa por uma definição comum de lead qualificado, tempo de resposta compatível com a demanda e registro da origem de cada contato até o fechamento.",
    status: "review",
    blocks: [
      {
        type: "p",
        text: "É comum uma empresa investir em anúncios, receber contatos e, depois de alguns meses, concluir que o tráfego pago não funciona. Em muitos casos, a campanha até trouxe pessoas interessadas. O problema estava no que aconteceu depois: resposta demorada, conversa sem roteiro, nenhum registro e nenhuma informação voltando para quem gerencia a mídia.",
      },
      {
        type: "p",
        text: "Este conteúdo mostra por que mídia e comercial precisam ser tratados como uma única engrenagem, quais sinais indicam desconexão e o que você pode ajustar na sua operação antes de decidir aumentar ou cortar o investimento.",
      },
      { type: "h2", id: "o-problema-de-olhar-so-para-o-anuncio", text: "O problema de olhar só para o anúncio" },
      {
        type: "p",
        text: "As plataformas de anúncio mostram com facilidade cliques, custo por clique e custo por lead. Esses números são úteis, mas param no momento em que o contato chega. O que interessa para o caixa da empresa acontece depois: quantos desses contatos eram compatíveis com o que você vende, quantos foram atendidos, quantos avançaram e quantos compraram.",
      },
      {
        type: "p",
        text: "Quando a análise fica restrita ao painel da plataforma, a tendência é otimizar para o que é mais barato de gerar, e não para o que vende. Uma campanha pode baixar o custo por lead atraindo pessoas curiosas, fora da região atendida ou sem condição de compra. No relatório, parece melhora. Na rotina do vendedor, aparece como perda de tempo.",
      },
      { type: "h2", id: "onde-a-conexao-costuma-se-romper", text: "Onde a conexão costuma se romper" },
      {
        type: "p",
        text: "A desconexão raramente tem uma causa só. Ela costuma aparecer em quatro pontos do caminho entre o anúncio e a venda.",
      },
      { type: "h3", text: "Na promessa do anúncio" },
      {
        type: "p",
        text: "Se o anúncio fala de uma condição, um produto ou um preço que o time comercial não conhece ou não consegue cumprir, a primeira conversa começa com frustração. O cliente chega esperando uma coisa e encontra outra. Por isso, quem atende precisa saber exatamente o que cada campanha está comunicando.",
      },
      { type: "h3", text: "No tempo de resposta" },
      {
        type: "p",
        text: "Quem clica em um anúncio está, naquele momento, pensando no problema. Algumas horas depois, pode já ter falado com um concorrente ou simplesmente perdido o interesse. O tempo de resposta aceitável muda de negócio para negócio, mas precisa ser definido e acompanhado, inclusive fora do horário comercial quando a demanda acontece nesse período.",
      },
      { type: "h3", text: "Na qualificação" },
      {
        type: "p",
        text: "Sem critério claro, cada atendente decide sozinho quem vale a pena. Uns agendam todo mundo, outros descartam rápido demais. Definir o que é um lead qualificado para a sua empresa, e como identificar isso na conversa, é o que permite comparar campanhas de forma justa. Aprofundamos esse ponto no conteúdo sobre [qualificação de leads antes da reunião](/conteudos/qualificacao-de-leads-antes-da-reuniao).",
      },
      { type: "h3", text: "No registro e no retorno de informação" },
      {
        type: "p",
        text: "Se o contato não é registrado com sua origem, não há como saber qual campanha trouxe as vendas. E se o comercial não devolve ao marketing o que está acontecendo nas conversas, a mídia continua sendo ajustada no escuro.",
      },
      { type: "h2", id: "sintomas-de-desconexao-e-como-ajustar", text: "Sintomas de desconexão e como ajustar" },
      {
        type: "p",
        text: "A tabela abaixo reúne sinais frequentes, a causa mais provável e um ajuste inicial. Use como ponto de partida para investigar, não como diagnóstico definitivo: a mesma queixa pode ter origens diferentes em cada operação.",
      },
      {
        type: "table",
        table: {
          caption: "Sintomas de desconexão entre tráfego pago e comercial",
          columns: ["Sintoma", "Causa provável", "Ajuste inicial"],
          rows: [
            [
              "O comercial diz que os leads são ruins",
              "Falta de critério comum de qualificação ou segmentação da campanha ampla demais",
              "Definir juntos o que é lead qualificado e revisar público, palavras-chave e mensagem do anúncio",
            ],
            [
              "Muitos contatos param de responder após a primeira mensagem",
              "Resposta demorada ou abordagem genérica que não retoma o que o anúncio prometeu",
              "Estabelecer tempo de resposta e um roteiro inicial que cite a oferta da campanha",
            ],
            [
              "Muitas reuniões ou avaliações agendadas, poucas vendas",
              "Agendamento sem qualificação ou desalinhamento entre expectativa e oferta",
              "Incluir perguntas de pré-qualificação e revisar se o anúncio comunica condições reais",
            ],
            [
              "Ninguém sabe qual campanha trouxe as vendas",
              "Origem do contato não registrada ou perdida na troca de canal",
              "Registrar origem e campanha no CRM ou planilha desde o primeiro contato",
            ],
            [
              "O custo por lead caiu, mas o faturamento não acompanhou",
              "Otimização voltada para volume, e não para contatos com potencial de compra",
              "Acompanhar custo por oportunidade qualificada e por venda, não só custo por lead",
            ],
            [
              "Picos de contatos que o time não dá conta de atender",
              "Investimento em mídia acima da capacidade de atendimento",
              "Ajustar orçamento e horários das campanhas à capacidade real do time",
            ],
          ],
        },
      },
      {
        type: "example",
        title: "Revenda de veículos com anúncios de carros específicos",
        text: "Uma revenda anuncia modelos do estoque e recebe muitas mensagens perguntando por um carro em particular. O vendedor responde horas depois e, em parte dos casos, o veículo já foi vendido. A conversa termina ali, sem oferta de alternativa e sem registro do motivo. O ajuste envolve manter os anúncios sincronizados com o estoque, criar uma resposta padrão que apresente opções semelhantes quando o carro não estiver mais disponível e registrar no CRM o interesse do cliente para um contato futuro. Veja mais sobre essa realidade em [intermediação e revendas](/segmentos/intermediacao-e-revendas).",
      },
      { type: "h2", id: "o-que-precisa-estar-alinhado", text: "O que precisa estar alinhado entre marketing e comercial" },
      {
        type: "p",
        text: "Não é preciso uma estrutura complexa para começar. O essencial é que marketing e comercial concordem sobre alguns pontos e revisem esses pontos com frequência.",
      },
      {
        type: "ul",
        items: [
          "**Definição de lead qualificado:** quais características tornam um contato uma oportunidade real para a sua empresa.",
          "**Promessa de cada campanha:** o que está sendo comunicado, para quem e com qual condição, para que o atendimento dê continuidade.",
          "**Capacidade de atendimento:** quantos contatos o time consegue tratar bem por dia e em quais horários.",
          "**Canal de entrada:** se o contato chega por formulário, WhatsApp, ligação ou direct, e quem é responsável por cada um.",
          "**Registro mínimo:** origem, campanha, etapa do funil, próximo passo e motivo de perda.",
          "**Retorno periódico:** um momento fixo para o comercial contar ao marketing o que está ouvindo dos clientes.",
        ],
      },
      {
        type: "p",
        text: "Esse alinhamento é parte do trabalho de [estruturação comercial](/servicos/estruturacao-comercial) e muda a forma de gerenciar a mídia. A gestão de [tráfego pago](/servicos/trafego-pago) passa a usar informação do atendimento, e não só dados da plataforma, para decidir onde investir.",
      },
      {
        type: "callout",
        text: "Antes de aumentar o investimento em mídia, confirme se o time consegue atender bem o volume atual de contatos. Mais leads em um processo que já perde oportunidades tende a ampliar o desperdício, não as vendas.",
      },
      { type: "h2", id: "como-medir-a-campanha-ate-a-venda", text: "Como medir a campanha até a venda" },
      {
        type: "p",
        text: "Medir até a venda não exige ferramenta sofisticada no início. Exige disciplina para registrar sempre as mesmas informações. A escolha entre CRM, planilha ou ferramenta de automação depende do volume e da rotina da sua operação.",
      },
      {
        type: "ol",
        items: [
          "Registre a origem de cada contato no momento em que ele chega, incluindo a campanha quando possível.",
          "Defina etapas simples para o funil, como novo contato, qualificado, proposta ou agendamento, venda e perda.",
          "Peça ao time que registre o motivo de cada perda, com opções fechadas para facilitar a análise.",
          "Compare campanhas pelo custo por oportunidade qualificada e pelo custo por venda, além do custo por lead.",
          "Quando houver volume e registro consistente, avalie enviar às plataformas os eventos que acontecem fora do site, como uma venda fechada.",
        ],
      },
      {
        type: "p",
        text: "Esse último ponto é conhecido como conversão offline. Google Ads e Meta Ads permitem importar eventos registrados no seu sistema para que a otimização considere quais contatos viraram negócio, e não apenas quais preencheram um formulário. Para funcionar, o registro precisa ser feito de forma correta e frequente, por isso a organização do [CRM e das automações](/servicos/crm-automacao-ia) vem antes.",
      },
      {
        type: "example",
        title: "Clínica odontológica com muitas avaliações agendadas e baixo comparecimento",
        text: "Uma clínica odontológica recebe pedidos de avaliação pelos anúncios, a recepção agenda quase todos, mas uma parte relevante dos pacientes não comparece. Olhando só a plataforma, a campanha parece ótima. Ao acompanhar o funil, a clínica percebe que não envia confirmação antes da consulta e que a recepção não conhece a oferta divulgada. Os ajustes incluem um roteiro de primeiro contato alinhado ao anúncio, uma mensagem de confirmação e o registro do comparecimento como etapa do funil, para que a campanha passe a ser avaliada por pacientes que efetivamente chegaram à clínica.",
      },
      { type: "h2", id: "resultado-depende-dos-dois-lados", text: "Resultado depende dos dois lados" },
      {
        type: "p",
        text: "Integrar tráfego e comercial não elimina outras variáveis. Oferta pouco competitiva, mercado com demanda baixa, investimento insuficiente ou time sem tempo para atender continuam afetando o resultado. A diferença é que, com o processo conectado, você consegue enxergar qual dessas variáveis está pesando e agir sobre ela, em vez de trocar de agência, de canal ou de vendedor sem saber o motivo.",
      },
      { type: "h2", id: "resumo-e-proximo-passo", text: "Resumo e próximo passo" },
      {
        type: "ul",
        items: [
          "Custo por lead é um indicador intermediário. O que importa é quantos contatos viram oportunidade e venda.",
          "A desconexão costuma aparecer na promessa do anúncio, no tempo de resposta, na qualificação e no registro.",
          "Marketing e comercial precisam de uma definição comum de lead qualificado e de um momento fixo de troca de informação.",
          "Medir até a venda começa com registro consistente de origem, etapa e motivo de perda.",
        ],
      },
      {
        type: "p",
        text: "Um bom próximo passo é mapear o caminho atual de um contato, do clique até a venda ou a perda, e anotar onde a informação se perde. Esse mapeamento é o ponto de partida da [nossa forma de trabalho](/metodologia), que começa pelo diagnóstico antes de qualquer mudança em mídia.",
      },
    ],
    relatedServices: ["trafego-pago", "estruturacao-comercial", "crm-automacao-ia"],
    relatedSegments: ["intermediacao-e-revendas", "clinicas-odontologicas"],
    cta: {
      title: "Quer saber onde sua operação está perdendo vendas?",
      text: "No diagnóstico, analisamos juntos suas campanhas, seu atendimento e o caminho dos contatos até a venda para identificar o que ajustar primeiro.",
    },
  },

  /* ------------------------------------------------------------------ */
  /* 2. Qualificação de leads antes da reunião                          */
  /* ------------------------------------------------------------------ */
  {
    slug: "qualificacao-de-leads-antes-da-reuniao",
    title: "Como melhorar a qualificação dos leads antes de agendar uma reunião",
    metaTitle: "Qualificação de leads antes da reunião: como fazer",
    metaDescription:
      "Veja como definir critérios de qualificação, quais perguntas fazer no formulário e na primeira conversa e como registrar tudo no CRM para melhorar o marketing.",
    excerpt:
      "Agendar todo contato que chega lota a agenda e esconde as oportunidades reais. Veja como qualificar antes da reunião sem criar atrito para quem tem interesse de verdade.",
    category: "comercial-e-pre-vendas",
    keyTakeaway:
      "Qualificar antes de agendar significa confirmar, com poucas perguntas, se existe necessidade, momento, condição de investimento, poder de decisão e aderência ao que a sua empresa atende. Parte disso pode ser feita no formulário e parte na primeira conversa, sempre com cuidado para não afastar quem tem interesse. Registrar as respostas no CRM e devolvê-las ao marketing é o que permite ajustar as campanhas para trazer contatos melhores.",
    status: "review",
    blocks: [
      {
        type: "p",
        text: "Agenda cheia nem sempre significa vendas. Quando todo contato vira reunião, avaliação ou visita, o time gasta tempo com quem não pode ou não quer comprar agora, e quem estava pronto para decidir espera mais do que deveria.",
      },
      {
        type: "p",
        text: "A qualificação antes do agendamento resolve esse problema. A seguir, você vai ver como definir critérios adaptados à sua operação, o que perguntar no formulário e na primeira conversa, como evitar atrito excessivo e como transformar essas informações em ajuste de campanha.",
      },
      { type: "h2", id: "por-que-qualificar-antes-de-agendar", text: "Por que qualificar antes de agendar" },
      {
        type: "p",
        text: "Uma reunião comercial, uma avaliação presencial ou uma visita técnica custam tempo de alguém experiente. Se esse tempo é consumido por contatos sem aderência, sobra menos espaço para as oportunidades boas e a taxa de fechamento cai, mesmo que o time esteja trabalhando bem.",
      },
      {
        type: "p",
        text: "Qualificar também melhora a própria reunião. Quando quem vai atender já sabe o contexto, a necessidade e o momento do cliente, a conversa começa do ponto certo. O cliente percebe preparo, e não um roteiro repetido.",
      },
      { type: "h2", id: "criterios-de-qualificacao", text: "Critérios de qualificação: adapte à sua operação" },
      {
        type: "p",
        text: "Existem vários modelos conhecidos de qualificação, mas nenhum deve ser aplicado sem adaptação. O ponto de partida é entender quais informações separam, na sua realidade, um contato que costuma comprar de um que costuma travar. Os critérios abaixo cobrem a maior parte dos casos.",
      },
      {
        type: "ul",
        items: [
          "**Necessidade:** o problema que a pessoa descreve é algo que a sua empresa resolve.",
          "**Momento ou urgência:** existe intenção de agir agora, em breve ou apenas uma pesquisa inicial.",
          "**Capacidade de investimento:** a pessoa tem condição de contratar o que você oferece, à vista, parcelado ou financiado.",
          "**Poder de decisão:** quem está conversando decide sozinho ou depende de sócio, cônjuge, gestor ou outra aprovação.",
          "**Aderência ao que você atende:** região, tipo de serviço, porte ou perfil compatíveis com a sua operação.",
        ],
      },
      {
        type: "table",
        table: {
          caption: "Critérios de qualificação e perguntas correspondentes",
          columns: ["Critério", "O que você quer descobrir", "Pergunta possível", "Sinal de atenção"],
          rows: [
            [
              "Necessidade",
              "Se o problema do cliente está dentro do que você resolve",
              "O que levou você a procurar esse serviço agora?",
              "Pedido muito diferente do que a empresa oferece",
            ],
            [
              "Momento ou urgência",
              "Quando a pessoa pretende resolver",
              "Você pensa em resolver isso nos próximos dias ou ainda está pesquisando?",
              "Sem previsão nenhuma, apenas curiosidade",
            ],
            [
              "Capacidade de investimento",
              "Se existe condição compatível com a faixa de valor do serviço",
              "Você já tem uma ideia de investimento ou de forma de pagamento?",
              "Expectativa de valor muito distante da realidade do serviço",
            ],
            [
              "Poder de decisão",
              "Quem participa da escolha",
              "Mais alguém participa dessa decisão com você?",
              "Decisor não estará na reunião",
            ],
            [
              "Aderência",
              "Se o contato está dentro do que a empresa atende",
              "Em qual cidade ou bairro você está?",
              "Fora da área de atendimento ou do perfil atendido",
            ],
          ],
        },
      },
      {
        type: "callout",
        text: "Sinal de atenção não é motivo automático de descarte. Um contato que ainda está pesquisando pode virar cliente mais adiante, desde que seja registrado e receba um acompanhamento adequado ao momento dele.",
      },
      { type: "h2", id: "o-papel-do-formulario", text: "O papel do formulário" },
      {
        type: "p",
        text: "O formulário é o primeiro filtro. Ele pode estar em uma [landing page](/servicos/landing-pages), em um formulário dentro da própria plataforma de anúncios ou em uma mensagem automática no WhatsApp. Em todos os casos, a lógica é a mesma: coletar o mínimo necessário para orientar a primeira conversa.",
      },
      { type: "h3", text: "O que perguntar no formulário" },
      {
        type: "ul",
        items: [
          "Dados de contato essenciais, como nome e telefone.",
          "Uma pergunta sobre a necessidade, de preferência com opções de resposta.",
          "Uma pergunta de aderência, como cidade, região ou tipo de serviço.",
          "Quando fizer sentido, uma pergunta sobre momento, como prazo para resolver.",
        ],
      },
      { type: "h3", text: "Como evitar atrito excessivo" },
      {
        type: "p",
        text: "Cada pergunta a mais reduz a chance de alguém concluir o formulário. Isso não é necessariamente ruim, porque também afasta quem não tem interesse real. O risco está em exagerar e perder bons contatos. Perguntas sobre orçamento, por exemplo, costumam funcionar melhor na conversa do que em um campo obrigatório.",
      },
      {
        type: "p",
        text: "Formulários nativos das plataformas, como os formulários instantâneos do Meta Ads, costumam ter preenchimento mais rápido porque trazem dados do perfil já preenchidos. Isso tende a aumentar o volume e pode reduzir a intenção média dos contatos. Incluir perguntas de qualificação e uma etapa de revisão antes do envio ajuda a equilibrar volume e qualidade.",
      },
      {
        type: "example",
        title: "Funilaria que recebia pedidos de orçamento sem contexto",
        text: "Uma funilaria recebe muitos pedidos de orçamento pelo formulário, mas quase todos chegam só com nome e telefone. A equipe precisa ligar para descobrir o básico, e muitos não atendem. O formulário passa a perguntar se o reparo será pelo seguro ou particular, qual é o tipo de dano e se o cliente pode enviar fotos pelo WhatsApp. Com isso, o atendente já entra em contato sabendo o que oferecer e prioriza quem precisa de atendimento rápido. Veja outras situações desse mercado em [oficinas e funilarias](/segmentos/oficinas-e-funilarias).",
      },
      { type: "h2", id: "a-primeira-conversa", text: "A primeira conversa" },
      {
        type: "p",
        text: "A primeira conversa, seja por ligação ou mensagem, completa o que o formulário não captou. Ela não é um interrogatório. O objetivo é entender o contexto e decidir qual é o próximo passo adequado para aquele contato.",
      },
      {
        type: "ol",
        items: [
          "Retome o que a pessoa informou e o que o anúncio ofereceu, para mostrar que você leu.",
          "Faça perguntas abertas sobre a necessidade e o momento, ouvindo mais do que falando.",
          "Esclareça dúvidas simples ali mesmo, sem empurrar tudo para a reunião.",
          "Explique o que acontece no próximo passo e quanto tempo ele leva.",
          "Decida com clareza: agendar, nutrir para um contato futuro, encaminhar para outro serviço ou encerrar com respeito.",
        ],
      },
      {
        type: "example",
        title: "Revenda que passou a qualificar antes da visita à loja",
        text: "Uma revenda recebe mensagens perguntando por um veículo anunciado e convida todos para visitar a loja. Muitos não aparecem, e outros chegam sem saber se conseguem aprovar um financiamento. A pré-venda passa a perguntar se o cliente tem um carro para dar na troca, qual é a forma de pagamento pretendida e quando pretende comprar. Quem está pronto é encaminhado ao vendedor com um resumo da conversa. Quem ainda está pesquisando recebe opções e um retorno combinado para mais adiante.",
      },
      { type: "h2", id: "registro-no-crm", text: "Registro no CRM" },
      {
        type: "p",
        text: "Qualificação que não é registrada se perde na troca de turno, de canal ou de atendente. O registro também é o que permite analisar, depois de algumas semanas, quais campanhas trazem contatos que avançam. Não importa se a ferramenta é um CRM completo ou uma planilha bem organizada: o essencial é registrar sempre os mesmos campos.",
      },
      {
        type: "ul",
        items: [
          "Origem do contato e campanha, quando disponível.",
          "Respostas às perguntas de qualificação.",
          "Classificação do contato, como qualificado, em nutrição ou desqualificado.",
          "Próximo passo combinado e data.",
          "Motivo de desqualificação ou de perda, com opções fechadas.",
        ],
      },
      {
        type: "p",
        text: "Quando o volume cresce, automações podem ajudar a distribuir contatos, lembrar retornos e organizar mensagens iniciais. A escolha da ferramenta e do nível de automação depende da operação, e esse desenho faz parte do trabalho de [CRM, automação e IA](/servicos/crm-automacao-ia).",
      },
      { type: "h2", id: "feedback-para-o-marketing", text: "Feedback para o marketing" },
      {
        type: "p",
        text: "A qualificação só melhora as campanhas se as informações chegarem a quem gerencia a mídia. Com os motivos de desqualificação registrados, fica possível perceber padrões: muitos contatos fora da região, muitos pedidos de um serviço que você não oferece ou muitos curiosos vindos de um anúncio específico.",
      },
      {
        type: "ul",
        items: [
          "Contatos fora da área atendida indicam ajuste de segmentação geográfica.",
          "Pedidos de serviços que você não faz sugerem revisar palavras-chave, termos negativos ou a mensagem do anúncio.",
          "Expectativa de preço distante do real pode pedir mais clareza sobre a oferta no criativo ou na página.",
          "Campanhas com muitos contatos e poucos qualificados merecem revisão antes de receber mais orçamento.",
        ],
      },
      {
        type: "p",
        text: "Essa troca entre atendimento e mídia é o centro do que explicamos em [tráfego pago e processo comercial](/conteudos/trafego-pago-e-processo-comercial). Sem ela, cada área otimiza o próprio indicador e o resultado final não melhora.",
      },
      { type: "h2", id: "resumo-e-proximo-passo", text: "Resumo e próximo passo" },
      {
        type: "ul",
        items: [
          "Defina critérios de qualificação a partir do que diferencia, na sua operação, quem compra de quem trava.",
          "Use o formulário para o essencial e a primeira conversa para aprofundar, sem criar atrito desnecessário.",
          "Nem todo contato não qualificado deve ser descartado. Alguns precisam de outro momento.",
          "Registre respostas, classificação e motivo de perda sempre nos mesmos campos.",
          "Devolva essas informações ao marketing para ajustar público, mensagem e orçamento.",
        ],
      },
      {
        type: "p",
        text: "Para começar, revise os últimos contatos que viraram reunião e não fecharam. Pergunte ao time o que poderia ter sido identificado antes. As respostas costumam mostrar quais critérios faltam no seu processo e são a base para uma [estruturação comercial](/servicos/estruturacao-comercial) mais consistente.",
      },
    ],
    relatedServices: ["estruturacao-comercial", "crm-automacao-ia", "landing-pages"],
    relatedSegments: ["oficinas-e-funilarias", "intermediacao-e-revendas"],
    cta: {
      title: "Sua agenda está cheia, mas as vendas não acompanham?",
      text: "No diagnóstico, revisamos seus formulários, seu roteiro de atendimento e o registro dos contatos para definir critérios de qualificação adequados à sua operação.",
    },
  },

  /* ------------------------------------------------------------------ */
  /* 3. Google Ads ou Meta Ads                                          */
  /* ------------------------------------------------------------------ */
  {
    slug: "google-ads-ou-meta-ads",
    title: "Google Ads ou Meta Ads: como escolher de acordo com a jornada do cliente",
    metaTitle: "Google Ads ou Meta Ads: como escolher pela jornada",
    metaDescription:
      "Google Ads ou Meta Ads? Entenda a diferença entre capturar e gerar demanda, como seu segmento muda a escolha e como medir cada canal até a venda.",
    excerpt:
      "Não existe canal melhor em qualquer situação. A escolha depende de como seu cliente descobre, pesquisa e decide, e de como você vai medir cada canal até a venda.",
    category: "trafego-pago",
    keyTakeaway:
      "Google Ads costuma ser mais indicado para capturar quem já está procurando o que você vende, enquanto Meta Ads tende a funcionar melhor para despertar interesse em quem ainda não estava buscando. Na maioria dos negócios, os dois se complementam em etapas diferentes da jornada. A escolha depende de como seu cliente decide, do seu segmento, do orçamento disponível e da sua capacidade de medir cada canal até a venda.",
    status: "review",
    blocks: [
      {
        type: "p",
        text: "Google Ads ou Meta Ads é uma das primeiras dúvidas de quem decide investir em tráfego pago. A pergunta faz sentido, mas costuma ser feita do jeito errado: como se um canal fosse melhor que o outro em qualquer situação.",
      },
      {
        type: "p",
        text: "A escolha fica mais clara quando você olha para a jornada do seu cliente. Como ele percebe que tem um problema, onde procura solução, quanto tempo leva para decidir e o que pesa na escolha. É isso que define qual canal entra primeiro e como os dois podem trabalhar juntos.",
      },
      { type: "h2", id: "nao-existe-resposta-universal", text: "Não existe resposta universal" },
      {
        type: "p",
        text: "Os dois canais funcionam de formas diferentes. No Google, a pessoa digita o que procura e o anúncio aparece como resposta. No Facebook e no Instagram, a pessoa está navegando por outros motivos e o anúncio aparece no meio do conteúdo. Uma lógica não é superior à outra. Cada uma atende a um momento diferente da decisão.",
      },
      {
        type: "p",
        text: "Por isso, a mesma empresa pode ter resultados muito diferentes em cada canal dependendo da oferta, do criativo, da página de destino e do atendimento. Resultado também depende do mercado, do investimento disponível e da execução comercial depois que o contato chega.",
      },
      { type: "h2", id: "demanda-existente-x-geracao-de-demanda", text: "Demanda existente x geração de demanda" },
      { type: "h3", text: "Google Ads: capturar quem já está procurando" },
      {
        type: "p",
        text: "Na rede de pesquisa, você anuncia para pessoas que já expressaram uma intenção ao digitar uma busca. Isso costuma trazer contatos mais próximos da decisão, mas o volume é limitado ao número de pessoas que procuram aquele assunto na sua região. Se ninguém busca pelo que você vende, não há demanda para capturar.",
      },
      {
        type: "p",
        text: "A qualidade depende muito da escolha de termos. Palavras-chave negativas, que impedem o anúncio de aparecer em buscas sem relação com o seu serviço, são parte importante da gestão. O Google também oferece formatos de descoberta, como YouTube e rede de display, mas o ponto forte para a maioria dos negócios locais continua sendo a pesquisa. Saiba mais sobre a [gestão de Google Ads](/servicos/google-ads).",
      },
      { type: "h3", text: "Meta Ads: criar interesse em quem ainda não procurou" },
      {
        type: "p",
        text: "No Meta Ads, você alcança pessoas com base em localização, interesses, comportamento e públicos que você mesmo constrói. Elas não estavam procurando o seu serviço naquele momento, então o anúncio precisa chamar atenção, despertar uma necessidade e dar um motivo para agir.",
      },
      {
        type: "p",
        text: "Isso torna o criativo o centro do resultado. Imagem, vídeo, texto e oferta fazem mais diferença do que a segmentação em si. Por isso, [criativos e roteiros](/servicos/criativos-e-roteiros) bem pensados costumam pesar tanto quanto a configuração da campanha.",
      },
      {
        type: "table",
        table: {
          caption: "Google Ads e Meta Ads por etapa da jornada do cliente",
          columns: ["Etapa da jornada", "Google Ads", "Meta Ads", "O que observar"],
          rows: [
            [
              "Ainda não percebeu o problema ou a oportunidade",
              "Pouco alcance, porque a pessoa ainda não pesquisa",
              "Forte para apresentar a solução e despertar interesse",
              "Alcance qualificado, interação com o conteúdo, visitas à página",
            ],
            [
              "Começou a pesquisar",
              "Forte, especialmente em buscas pelo serviço e pela região",
              "Pode reforçar a marca para quem já interagiu",
              "Termos de busca reais, taxa de contato a partir da página",
            ],
            [
              "Comparando opções",
              "Útil em buscas por preço, avaliação ou comparação",
              "Útil com conteúdos que respondem objeções e mostram diferenciais",
              "Perguntas recorrentes no atendimento, objeções registradas",
            ],
            [
              "Pronto para decidir",
              "Forte em buscas com intenção de contratar ou comprar",
              "Remarketing com oferta clara e chamada para contato",
              "Contatos qualificados, agendamentos, propostas",
            ],
            [
              "Já é cliente",
              "Uso pontual, como buscas pelo nome da empresa",
              "Comunicação para recompra, retorno ou indicação",
              "Recompra, retorno e vendas para clientes da base",
            ],
          ],
        },
      },
      { type: "h2", id: "como-o-segmento-muda-a-escolha", text: "Como o segmento muda a escolha" },
      {
        type: "p",
        text: "A mesma lógica gera respostas diferentes conforme o negócio. Três situações mostram bem essa variação.",
      },
      { type: "h3", text: "Oficina mecânica: demanda emergencial" },
      {
        type: "p",
        text: "Quando o carro apresenta um problema, o dono procura uma solução rápida e perto de onde está. Essa busca acontece no Google, muitas vezes no celular. Para esse tipo de demanda, pesquisa local tende a ser o canal principal. O Meta Ads pode entrar em serviços planejados, como revisão preventiva ou estética automotiva, que dependem de lembrar o cliente na hora certa.",
      },
      {
        type: "example",
        title: "Oficina com dois tipos de serviço e dois canais",
        text: "Uma oficina percebe que os contatos de conserto chegam principalmente por buscas como problema no freio ou oficina perto de mim, enquanto serviços de revisão quase não aparecem nas buscas. A empresa concentra o Google Ads nas buscas emergenciais da sua região, com atendimento preparado para responder rápido, e usa o Meta Ads com anúncios de revisão antes de viagens e feriados, direcionados a moradores do entorno. Cada canal passa a ser avaliado pelo tipo de serviço que traz.",
      },
      { type: "h3", text: "Clínica de estética: decisão mais emocional" },
      {
        type: "p",
        text: "Em procedimentos estéticos, a decisão costuma envolver confiança, identificação com o profissional e tempo de reflexão. Muitas pessoas só passam a considerar um procedimento depois de ver um conteúdo que esclarece dúvidas. Aqui, o Meta Ads tende a ter papel importante na descoberta e na construção de confiança, enquanto o Google captura quem já pesquisa um procedimento específico.",
      },
      {
        type: "p",
        text: "A comunicação na área da saúde segue as normas do conselho profissional aplicável, e as peças devem ser validadas pelo profissional responsável. Isso influencia o tipo de criativo e de promessa que pode ser usado. Veja como isso funciona para [clínicas de estética](/segmentos/clinicas-de-estetica).",
      },
      { type: "h3", text: "Delivery: raio de entrega e horário" },
      {
        type: "p",
        text: "No delivery, o que manda é a área de entrega e o momento da fome. Os dois canais permitem limitar a veiculação por região e programar horários. A busca captura quem procura um tipo de comida perto de casa. O Meta Ads ajuda a lembrar o cliente na hora da refeição e a divulgar promoções do dia para quem está dentro do raio atendido.",
      },
      {
        type: "example",
        title: "Delivery que ajustou a mídia ao raio e aos horários de pico",
        text: "Um delivery veicula anúncios o dia inteiro para toda a cidade e recebe pedidos de endereços fora da área de entrega, além de contatos fora do horário de funcionamento. A empresa restringe as campanhas ao raio atendido, concentra o investimento antes e durante os horários de pico e usa anúncios no Instagram com o cardápio do dia. No Google, mantém a busca por categoria de comida na região. Saiba mais sobre [delivery e alimentação](/segmentos/delivery).",
      },
      { type: "h2", id: "uso-combinado-e-remarketing", text: "Uso combinado e remarketing" },
      {
        type: "p",
        text: "Na prática, muitos negócios usam os dois canais em papéis diferentes. Um anúncio no Instagram pode apresentar a empresa, e dias depois a mesma pessoa busca o nome dela no Google. Separar os canais como se fossem concorrentes esconde essa relação.",
      },
      {
        type: "p",
        text: "O remarketing é o ponto de encontro mais comum. Ambas as plataformas permitem mostrar anúncios para quem já visitou o seu site, e o Meta Ads também para quem interagiu com seu perfil ou seus vídeos. Também é possível criar públicos personalizados a partir de listas de clientes, sempre respeitando as regras de privacidade e as políticas das plataformas.",
      },
      {
        type: "ul",
        items: [
          "Use remarketing para retomar quem demonstrou interesse e não entrou em contato.",
          "Adapte a mensagem: quem já conhece a empresa precisa de um motivo para agir, não de apresentação.",
          "Exclua das campanhas de remarketing quem já virou cliente, quando a oferta não fizer sentido para essa pessoa.",
          "Evite repetir o mesmo anúncio por muito tempo para o mesmo público.",
        ],
      },
      {
        type: "callout",
        text: "Com orçamento limitado, geralmente faz mais sentido começar por um canal bem executado do que dividir pouco dinheiro entre os dois. Comece pelo canal mais próximo do momento em que seu cliente decide e amplie quando tiver dados de venda para comparar.",
      },
      { type: "h2", id: "como-medir-cada-um-ate-a-venda", text: "Como medir cada um até a venda" },
      {
        type: "p",
        text: "Comparar Google Ads e Meta Ads só pelo custo por lead leva a conclusões erradas. Os contatos chegam em momentos diferentes da jornada e com níveis diferentes de intenção. A comparação justa considera o que acontece depois do contato.",
      },
      {
        type: "ul",
        items: [
          "**Registre a origem:** marque cada contato com canal e campanha, usando parâmetros nos links e registro no CRM ou planilha.",
          "**Cuide do WhatsApp:** contatos que chegam por mensagem perdem a origem com facilidade. Mensagens iniciais diferentes por campanha ajudam a identificar de onde vieram.",
          "**Acompanhe as etapas:** compare contatos qualificados, agendamentos, propostas e vendas por canal.",
          "**Respeite o tempo de decisão:** em negócios com ciclo longo, o efeito de uma campanha de descoberta aparece semanas depois.",
          "**Use conversões offline quando possível:** enviar às plataformas as vendas registradas no seu sistema ajuda a otimização a buscar contatos com mais chance de compra.",
        ],
      },
      {
        type: "p",
        text: "Esse acompanhamento depende do comercial registrar o que acontece com cada contato. A relação entre mídia e atendimento é o tema de [tráfego pago e processo comercial](/conteudos/trafego-pago-e-processo-comercial).",
      },
      { type: "h2", id: "perguntas-para-decidir", text: "Perguntas para decidir por onde começar" },
      {
        type: "ol",
        items: [
          "As pessoas procuram ativamente o que você vende na sua região?",
          "A decisão do seu cliente é rápida e prática ou depende de confiança e reflexão?",
          "Você tem capacidade de produzir criativos com frequência?",
          "Seu atendimento consegue responder no tempo que a demanda exige?",
          "Você consegue registrar a origem dos contatos até a venda?",
          "Qual orçamento está disponível para testar sem comprometer a operação?",
        ],
      },
      { type: "h2", id: "resumo-e-proximo-passo", text: "Resumo e próximo passo" },
      {
        type: "ul",
        items: [
          "Google Ads tende a capturar demanda existente. Meta Ads tende a gerar demanda nova.",
          "O segmento muda o papel de cada canal: urgência, emoção e localização pesam de formas diferentes.",
          "Os canais costumam se complementar, e o remarketing é um ponto natural de integração.",
          "A comparação justa olha contatos qualificados e vendas, não só custo por lead.",
        ],
      },
      {
        type: "p",
        text: "Se você ainda não sabe qual canal faz mais sentido, comece respondendo às perguntas acima com base no que o seu time ouve dos clientes. Essa leitura da jornada é o ponto de partida do nosso trabalho em [tráfego pago](/servicos/trafego-pago).",
      },
    ],
    relatedServices: ["google-ads", "meta-ads", "criativos-e-roteiros"],
    relatedSegments: ["oficinas-e-funilarias", "clinicas-de-estetica", "delivery"],
    cta: {
      title: "Em dúvida sobre onde investir primeiro?",
      text: "No diagnóstico, analisamos a jornada do seu cliente, seu segmento e sua estrutura de atendimento para indicar qual canal faz mais sentido e como medir cada um até a venda.",
    },
  },
];
