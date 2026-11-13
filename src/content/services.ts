import type { Service } from "./types";

export const services: Service[] = [
  // ---------------------------------------------------------------------------
  // 1. Tráfego pago (visão estratégica e multicanal)
  // ---------------------------------------------------------------------------
  {
    slug: "trafego-pago",
    name: "Gestão de Tráfego Pago",
    navLabel: "Tráfego pago",
    metaTitle: "Gestão de Tráfego Pago conectada ao comercial",
    metaDescription:
      "Gestão de tráfego pago que define canais, divide a verba entre Google e Meta e mede o que vira venda, com ciclo de testes e integração ao seu comercial.",
    eyebrow: "Estratégia de aquisição",
    h1: "Gestão de tráfego pago que começa pela decisão de onde investir",
    lead: "Antes de subir campanha, a pergunta é outra: onde está a demanda do seu negócio, quanto dela já procura por você e quanto precisa ser despertada. A DX organiza essa decisão e acompanha o que acontece depois do clique.",
    summary:
      "Planejamento e gestão de mídia paga multicanal: escolha de canais, divisão do investimento entre Google e Meta, mensuração ligada ao comercial e ciclo contínuo de testes.",
    definition: {
      question: "O que é gestão de tráfego pago?",
      answer:
        "Gestão de tráfego pago é o planejamento, a operação e a otimização de anúncios em plataformas como Google e Meta para gerar oportunidades de venda. Envolve decidir canais, distribuir o investimento, definir como cada resultado será medido e ajustar as campanhas com base no que o comercial realmente fecha. Não é só configurar anúncios: é administrar uma verba com critério de negócio.",
      paragraphs: [
        "Na prática, a maior parte do trabalho acontece fora do gerenciador de anúncios. É preciso entender ticket médio, margem, sazonalidade, capacidade de atendimento e quanto tempo um lead leva para virar cliente. Sem isso, a campanha otimiza para o número mais barato, que nem sempre é o que paga as contas.",
        "Nesta página tratamos a visão estratégica: como os canais se combinam e como a verba é dividida. A operação de cada plataforma tem detalhes próprios, explicados em [gestão de Google Ads](/servicos/google-ads) e [gestão de Meta Ads](/servicos/meta-ads).",
        "O que mais diferencia uma gestão de outra é a ligação com o comercial. Quando a equipe de vendas registra o que aconteceu com cada lead, o investimento passa a ser decidido por oportunidade qualificada e venda, e não por curtida ou clique. Esse tema é aprofundado no conteúdo sobre [tráfego pago e processo comercial](/conteudos/trafego-pago-e-processo-comercial).",
      ],
    },
    forWhom: {
      intro:
        "Faz sentido para empresas que já vendem, têm uma oferta clara e querem previsibilidade na entrada de oportunidades, com alguém olhando o conjunto e não só uma plataforma.",
      items: [
        "Empresas que anunciam em Google e Meta sem saber qual canal traz os clientes que fecham",
        "Negócios que dependem de indicação e querem uma segunda fonte de demanda, mais controlável",
        "Gestores que recebem relatórios de cliques e alcance, mas não conseguem ligar o investimento às vendas",
        "Operações com equipe comercial ou atendimento dedicado, capaz de responder os contatos que chegam",
        "Empresas que vão abrir uma nova unidade, lançar um serviço ou entrar em uma nova região",
        "Quem já testou impulsionar publicações e quer passar para uma estrutura com objetivo, verba e critério de decisão",
      ],
      notFor: [
        "Quando ainda não há oferta definida ou preço validado. Mídia paga acelera o que já funciona, mas não substitui a validação do produto.",
        "Quando ninguém consegue atender os contatos em tempo razoável. Gerar demanda sem capacidade de resposta queima verba e reputação; nesse caso, organizar o comercial costuma vir antes.",
        "Quando a verba disponível é tão pequena que não permite aprender com os dados. Nesse cenário, vale conversar sobre prioridades antes de abrir canais.",
      ],
    },
    problems: [
      {
        title: "Verba dividida por intuição",
        text: "O investimento vai para o canal que o dono usa mais ou para o que o concorrente parece usar. Sem critério, a divisão entre Google e Meta não acompanha onde está a demanda real do negócio.",
      },
      {
        title: "Cada canal com um responsável e ninguém olhando o conjunto",
        text: "Uma pessoa cuida do Google, outra do Instagram, e ninguém compara o custo de uma venda em cada um. O resultado é otimização isolada, às vezes com campanhas disputando o mesmo cliente.",
      },
      {
        title: "Relatório que para no lead",
        text: "Os números mostram quantos contatos chegaram, mas não quantos foram atendidos, qualificados ou viraram venda. Sem esse retorno, a campanha é ajustada no escuro.",
      },
      {
        title: "Leads que chegam e esfriam",
        text: "O marketing entrega contatos, o comercial reclama da qualidade e parte deles espera horas por resposta. Muitas vezes o problema está no meio do caminho, não no anúncio.",
      },
      {
        title: "Testes sem método",
        text: "Muda-se tudo ao mesmo tempo, ou nada muda por meses. Sem hipótese, tempo mínimo de leitura e critério de decisão, não dá para saber o que funcionou.",
      },
    ],
    deliverables: {
      intro:
        "O escopo é definido no diagnóstico, de acordo com os canais envolvidos, a maturidade da operação e o que já existe. Entre as entregas que podem fazer parte:",
      items: [
        {
          title: "Diagnóstico de canais e demanda",
          text: "Leitura de como seu público procura e decide, do histórico de campanhas (quando existe) e de onde há demanda ativa ou demanda a ser criada.",
        },
        {
          title: "Plano de mídia e divisão de investimento",
          text: "Proposta de distribuição da verba entre Google, Meta e outros canais quando fizer sentido, com o papel de cada um e critérios claros para remanejar.",
        },
        {
          title: "Estrutura de mensuração",
          text: "Definição de quais eventos contam como conversão, como cada lead é identificado pela origem e como o resultado do comercial volta para a análise.",
        },
        {
          title: "Integração com o fluxo comercial",
          text: "Alinhamento sobre para onde vão os contatos, quem responde, em quanto tempo e como o status de cada oportunidade é registrado.",
        },
        {
          title: "Gestão das campanhas nas plataformas",
          text: "Operação contínua das contas de anúncio, com a profundidade descrita nas páginas de cada canal.",
        },
        {
          title: "Roteiro de testes",
          text: "Lista priorizada de hipóteses de oferta, público, criativo e página, com o que define um vencedor e quando a leitura pode ser feita.",
        },
        {
          title: "Leitura periódica de resultados",
          text: "Análise que cruza investimento, leads, qualificação e vendas por canal, com recomendações objetivas de ajuste.",
        },
      ],
      note: "A composição final das entregas depende do escopo contratado e fica registrada na proposta.",
    },
    process: [
      {
        title: "Diagnóstico",
        text: "Entendemos oferta, margem, ticket, região de atuação, ciclo de venda e capacidade de atendimento. Olhamos o que já foi feito em mídia e o que os dados disponíveis mostram.",
      },
      {
        title: "Planejamento de canais",
        text: "Definimos o papel de cada canal, a divisão inicial do investimento e as metas de cada etapa do funil, do clique à venda.",
      },
      {
        title: "Mensuração e integração",
        text: "Antes de escalar, garantimos que a origem de cada lead fica registrada e que o comercial tem como devolver o resultado.",
      },
      {
        title: "Implementação",
        text: "Campanhas, criativos e páginas entram no ar em uma estrutura que permite comparar canais em base equivalente.",
      },
      {
        title: "Acompanhamento e otimização",
        text: "Ajustamos verba, públicos e mensagens a partir dos dados de qualificação e venda, e rodamos o roteiro de testes em ciclos.",
      },
    ],
    roles: {
      dx: [
        "Recomendar canais e a divisão do investimento com base em dados e no momento do negócio",
        "Estruturar e operar as campanhas nas plataformas definidas no escopo",
        "Definir os eventos de conversão e a forma de identificar a origem de cada lead",
        "Conduzir o roteiro de testes e registrar o que foi aprendido",
        "Apresentar leituras de resultado que cruzam mídia e comercial, com próximos passos",
      ],
      client: [
        "Pagar o investimento em mídia diretamente às plataformas, separado dos honorários da agência",
        "Compartilhar informações sobre ticket, margem, sazonalidade e metas de venda",
        "Responder os leads com rapidez e registrar o status de cada um",
        "Avisar quando a capacidade de atendimento mudar, para mais ou para menos",
        "Aprovar ofertas, peças e páginas antes da veiculação",
      ],
    },
    measurement: {
      intro:
        "Em tráfego pago multicanal, o indicador que importa é o que permite comparar canais pelo que eles geram de negócio. Alguns dos que costumam guiar as decisões:",
      items: [
        {
          metric: "Custo por oportunidade qualificada, por canal",
          why: "Compara Google e Meta pelo que interessa ao comercial, não pelo volume bruto de contatos. Um canal com lead mais caro pode sair mais barato por venda.",
        },
        {
          metric: "Participação de cada canal nas vendas",
          why: "Mostra de onde vêm os clientes que fecham. Exige que a origem do lead seja registrada no CRM ou na planilha comercial.",
        },
        {
          metric: "Custo de aquisição de cliente",
          why: "Investimento em mídia dividido pelo número de vendas no período. É o número que conversa com margem e ticket.",
        },
        {
          metric: "Taxa de lead para venda por origem",
          why: "Revela diferenças de qualidade entre canais e campanhas que o custo por lead esconde.",
        },
        {
          metric: "Retorno sobre o investimento em mídia",
          why: "Quando há dados de faturamento por venda, indica quanto voltou para cada real investido. Precisa respeitar o ciclo de venda do negócio para não tirar conclusões cedo demais.",
        },
        {
          metric: "Proporção de leads atendidos",
          why: "Se parte dos contatos nem é respondida, o problema não está na mídia. Esse número protege a verba de decisões erradas.",
        },
      ],
    },
    comparison: {
      caption: "Google Ads, Meta Ads e uso combinado: o papel de cada canal",
      columns: ["Critério", "Google Ads", "Meta Ads"],
      rows: [
        [
          "Momento da demanda",
          "Captura quem já está procurando pelo serviço ou produto",
          "Gera interesse em quem ainda não estava procurando",
        ],
        [
          "Tipo de intenção",
          "Declarada na busca, geralmente mais próxima da decisão",
          "Latente, despertada pela mensagem e pelo contexto",
        ],
        [
          "Papel do criativo",
          "Texto e página respondem a uma pergunta que a pessoa já fez",
          "O criativo chama atenção e funciona como principal filtro de público",
        ],
        [
          "Formatos mais comuns",
          "Pesquisa, Performance Max, YouTube, Display e Perfil da Empresa no Google",
          "Vídeos curtos, imagens, carrosséis e anúncios para mensagens no Instagram e no Facebook",
        ],
        [
          "Limite natural",
          "O volume depende de quantas pessoas buscam; não cria demanda nova",
          "Exige renovação constante de criativos e qualificação mais cuidadosa",
        ],
        [
          "Quando priorizar",
          "Serviços com busca ativa, urgência ou forte componente local",
          "Ofertas visuais, de desejo ou que precisam ser apresentadas ao público",
        ],
        [
          "No uso combinado",
          "Fecha a demanda que o Meta ajudou a criar, quando a pessoa pesquisa a marca ou o serviço",
          "Alimenta o topo do funil e o remarketing para quem visitou a página e não converteu",
        ],
      ],
    },
    faqs: [
      {
        q: "Devo investir em Google Ads ou Meta Ads?",
        a: "Depende de como o seu cliente procura pelo que você vende. Se existe busca ativa pelo serviço, o Google tende a capturar essa demanda; se a compra começa pelo desejo ou pela descoberta, o Meta costuma ter mais espaço. Na maioria dos negócios os dois se complementam, e a divisão é ajustada pelos dados. O conteúdo [Google Ads ou Meta Ads](/conteudos/google-ads-ou-meta-ads) aprofunda essa escolha.",
      },
      {
        q: "Qual o investimento mínimo em tráfego pago?",
        a: "Não existe um valor único: depende da região, da concorrência, do ticket e de quantos canais serão usados. Vale separar duas coisas: o investimento em mídia, pago diretamente ao Google e à Meta, e os honorários da agência pela gestão. No diagnóstico, avaliamos se a verba disponível permite gerar dados suficientes para tomar decisões.",
      },
      {
        q: "Em quanto tempo aparecem os resultados?",
        a: "Não há prazo que possa ser prometido com honestidade. O início serve para as plataformas aprenderem e para validar a mensuração; a leitura confiável vem quando há volume de leads e retorno do comercial. Negócios com ciclo de venda longo levam mais tempo para fechar essa conta.",
      },
      {
        q: "Vocês só cuidam das campanhas ou também olham o comercial?",
        a: "Olhamos o comercial, porque é onde a verba vira, ou não, venda. A gestão de mídia pode ser contratada isoladamente, mas recomendamos ao menos alinhar tempo de resposta e registro de status dos leads. Quando há lacunas maiores, a [estruturação comercial](/servicos/estruturacao-comercial) entra no escopo.",
      },
      {
        q: "Como saber qual canal está trazendo os clientes que fecham?",
        a: "É preciso registrar a origem de cada lead e o que aconteceu com ele depois. Isso pode ser feito com parâmetros nos links, formulários que guardam a origem e um CRM ou planilha atualizados pela equipe. Sem esse registro, a comparação fica restrita ao custo por lead.",
      },
      {
        q: "Posso começar por um canal e incluir outro depois?",
        a: "Sim, e muitas vezes é o caminho mais sensato. Começar por um canal concentra a verba e acelera o aprendizado; o segundo entra quando o primeiro estiver estável e bem medido.",
      },
      {
        q: "O investimento em mídia passa pela agência?",
        a: "Não. O valor de mídia é pago diretamente às plataformas, e o recomendado é que a conta de anúncios esteja em nome da sua empresa. Os honorários da agência são cobrados à parte.",
      },
    ],
    related: ["google-ads", "meta-ads", "estruturacao-comercial"],
    segments: ["intermediacao-e-revendas", "clinicas-de-estetica", "clinicas-odontologicas", "delivery"],
    cta: {
      title: "Quer saber onde investir primeiro?",
      text: "Conte como sua empresa vende hoje. No diagnóstico, avaliamos canais, verba e atendimento antes de recomendar qualquer campanha.",
    },
  },

  // ---------------------------------------------------------------------------
  // 2. Google Ads
  // ---------------------------------------------------------------------------
  {
    slug: "google-ads",
    name: "Gestão de Google Ads",
    navLabel: "Google Ads",
    metaTitle: "Agência de Google Ads para gerar contatos qualificados",
    metaDescription:
      "Agência de Google Ads focada em quem já procura pelo seu serviço: palavras-chave, termos negativos, conversões bem configuradas e páginas que convertem.",
    eyebrow: "Demanda que já existe",
    h1: "Gestão de Google Ads para aparecer quando o cliente já está procurando",
    lead: "Quem pesquisa “funilaria perto de mim” ou “clareamento dental preço” já decidiu que precisa resolver algo. O trabalho é estar ali com o anúncio certo, a página certa e uma conversão medida de verdade.",
    summary:
      "Planejamento e operação de campanhas no Google Ads para capturar a demanda de quem já pesquisa pelo serviço, com controle de termos, conversões confiáveis e páginas alinhadas à busca.",
    definition: {
      question: "O que é gestão de Google Ads?",
      answer:
        "Gestão de Google Ads é a operação contínua das campanhas da sua empresa na rede do Google, principalmente na Pesquisa, para aparecer quando alguém busca pelo que você oferece. Inclui escolher palavras-chave, bloquear buscas que não interessam, escrever anúncios, configurar conversões e ajustar lances e orçamento. O objetivo é pagar pelos cliques que têm chance real de virar cliente.",
      paragraphs: [
        "A força do Google está na intenção: a pessoa diz o que quer na caixa de busca. A limitação é que o volume se restringe ao que já é procurado, e muitas buscas parecidas com o seu serviço não têm nada a ver com compra. Para criar demanda nova, o caminho costuma ser outro, como o [Meta Ads](/servicos/meta-ads).",
        "Além da Pesquisa, formatos como Performance Max, YouTube e Display podem entrar quando há objetivo claro e conversões confiáveis para alimentá-los. Para negócios locais, o Perfil da Empresa no Google costuma fazer parte da estratégia, porque aparece no mapa e influencia quem está escolhendo entre opções próximas.",
        "Esta página trata da operação no Google. A decisão de quanto investir aqui em relação a outros canais está em [gestão de tráfego pago](/servicos/trafego-pago).",
      ],
    },
    forWhom: {
      intro:
        "Google Ads tende a funcionar melhor quando existe gente buscando ativamente pelo seu serviço, produto ou solução na região que você atende.",
      items: [
        "Oficinas, funilarias e serviços automotivos que recebem demanda por urgência ou por orçamento",
        "Clínicas odontológicas e de estética com procedimentos que as pessoas pesquisam pelo nome",
        "Revendas de veículos que querem aparecer para quem busca modelo, financiamento ou avaliação de usado",
        "Negócios locais que dependem de ligação ou WhatsApp e querem aparecer no mapa e na busca",
        "Empresas que já anunciam no Google, mas não sabem quais buscas geram contato real",
        "Operações que querem medir ligações, formulários e conversas de WhatsApp de forma separada",
      ],
      notFor: [
        "Quando quase ninguém pesquisa pelo que você vende, como em um produto novo ou pouco conhecido. Aí o trabalho é criar demanda, e campanhas no Instagram e no Facebook costumam ser o ponto de partida.",
        "Quando a página de destino é lenta, confusa ou não explica a oferta. Nesse caso, a página precisa ser resolvida junto ou antes.",
        "Quando o mercado local é tão pequeno que a verba mínima para competir não se paga com o ticket do serviço.",
      ],
    },
    problems: [
      {
        title: "Pagando por buscas que nunca vão comprar",
        text: "Sem revisão frequente dos termos de pesquisa, a campanha aparece para quem procura emprego, curso, tutorial ou serviço gratuito. Cada um desses cliques sai do mesmo orçamento.",
      },
      {
        title: "Conversão contada errado",
        text: "Clique no botão do WhatsApp contado como venda, formulário duplicado, ligação de poucos segundos registrada como lead. Com o dado errado, a automação de lances otimiza para o lado errado.",
      },
      {
        title: "Campanha automática sem controle",
        text: "Formatos automatizados entregam bem quando recebem bons sinais. Sem conversões confiáveis e sem exclusões, gastam verba em posicionamentos que não trazem nada.",
      },
      {
        title: "Anúncio específico levando para a página inicial",
        text: "A pessoa busca um serviço específico e cai em uma página que fala de tudo. A chance de contato cai, e a qualidade percebida pelo Google também.",
      },
      {
        title: "Perfil da Empresa abandonado",
        text: "Para negócio local, horário errado, fotos antigas e avaliações sem resposta afastam quem está comparando no mapa, mesmo que o anúncio esteja bem feito.",
      },
    ],
    deliverables: {
      intro:
        "O que entra no trabalho é definido no diagnóstico, conforme o tamanho da conta, os serviços prioritários e o que já existe configurado. Pode fazer parte:",
      items: [
        {
          title: "Pesquisa e organização de palavras-chave",
          text: "Mapeamento das buscas ligadas a cada serviço e região, agrupadas por intenção, com leitura da concorrência em cada grupo.",
        },
        {
          title: "Gestão de termos negativos",
          text: "Revisão recorrente do que as pessoas realmente pesquisaram e bloqueio das buscas sem potencial comercial.",
        },
        {
          title: "Anúncios responsivos e recursos",
          text: "Títulos e descrições alinhados a cada grupo de busca, além de recursos como sitelinks, chamada, frases de destaque e local, quando aplicáveis.",
        },
        {
          title: "Configuração de conversões",
          text: "Separação entre conversões principais, como formulário enviado e ligação qualificada, e microconversões, como clique no WhatsApp, para o algoritmo não confundir interesse com resultado.",
        },
        {
          title: "Conversões offline a partir do CRM",
          text: "Quando a operação permite, importação de leads qualificados ou vendas registradas no CRM, para que as campanhas aprendam com o que de fato fecha.",
        },
        {
          title: "Campanhas além da Pesquisa",
          text: "Performance Max, YouTube ou Display quando houver objetivo claro, criativos adequados e mensuração que sustente o formato.",
        },
        {
          title: "Ajustes no Perfil da Empresa no Google",
          text: "Para negócios locais, orientação sobre informações, categorias, fotos e respostas a avaliações, integrada à estratégia de anúncios.",
        },
        {
          title: "Recomendações para a página de destino",
          text: "Análise de aderência entre busca, anúncio e página, com sugestões de mensagem, formulário e velocidade, ou a criação de uma [landing page](/servicos/landing-pages) dedicada.",
        },
      ],
      note: "A composição das entregas depende do escopo contratado e do acesso às contas e ferramentas da sua empresa.",
    },
    process: [
      {
        title: "Auditoria e diagnóstico",
        text: "Revisamos a conta existente ou o ponto de partida, as conversões configuradas, os termos que já trouxeram cliques e a página de destino.",
      },
      {
        title: "Estrutura da conta",
        text: "Organizamos campanhas por serviço, região e intenção, com orçamento distribuído conforme a prioridade comercial.",
      },
      {
        title: "Mensuração",
        text: "Configuramos e testamos as conversões antes de escalar. Quando possível, preparamos o caminho para importar resultados do CRM.",
      },
      {
        title: "Lançamento",
        text: "As campanhas entram no ar com acompanhamento próximo dos primeiros termos de pesquisa e do custo por contato.",
      },
      {
        title: "Otimização contínua",
        text: "Refinamos negativos, anúncios, lances e páginas a partir do que o comercial informa sobre a qualidade dos contatos.",
      },
    ],
    roles: {
      dx: [
        "Montar e operar a estrutura de campanhas no Google Ads",
        "Revisar termos de pesquisa e manter a lista de negativos atualizada",
        "Configurar e validar as conversões, separando principais e secundárias",
        "Escrever e testar anúncios e recursos",
        "Indicar ajustes de página e de Perfil da Empresa que afetam o desempenho",
        "Explicar os resultados em linguagem de negócio, não de plataforma",
      ],
      client: [
        "Dar acesso à conta de anúncios, ao site e às ferramentas de análise da empresa",
        "Pagar o investimento em mídia diretamente ao Google",
        "Informar quais serviços têm prioridade, margem melhor ou agenda disponível",
        "Atender ligações e mensagens no horário em que os anúncios estão ativos",
        "Marcar no CRM ou na planilha quais leads eram qualificados e quais viraram venda",
      ],
    },
    measurement: {
      intro:
        "No Google Ads, as métricas da plataforma são o começo da leitura. O que define se a conta está saudável é a qualidade do que chega ao comercial. Indicadores que acompanhamos com mais atenção:",
      items: [
        {
          metric: "Custo por conversão principal",
          why: "Considera apenas formulários enviados e ligações qualificadas, sem misturar com cliques no WhatsApp ou visitas à página.",
        },
        {
          metric: "Microconversões e o que elas viram",
          why: "Cliques no WhatsApp ou no telefone mostram interesse, mas precisam ser lidos à parte. Quando crescem sem virar conversa real, algo está errado na página ou no atendimento.",
        },
        {
          metric: "Parcela do gasto em termos irrelevantes",
          why: "Quanto do orçamento foi para buscas sem potencial comercial. É um termômetro direto da qualidade da gestão de negativos.",
        },
        {
          metric: "Parcela de impressões nas buscas prioritárias",
          why: "Indica se você está aparecendo nas pesquisas mais importantes ou perdendo espaço por orçamento ou por classificação do anúncio.",
        },
        {
          metric: "Taxa de conversão da página de destino",
          why: "Mostra se o problema está no clique ou no que acontece depois dele.",
        },
        {
          metric: "Leads qualificados importados do CRM",
          why: "Quando a importação está ativa, permite comparar e otimizar campanhas pela qualidade, e não só pela quantidade de contatos.",
        },
      ],
    },
    faqs: [
      {
        q: "Vale a pena anunciar no Google se meu negócio é local?",
        a: "Sim, quando existe busca pelo seu serviço na sua região. As campanhas podem ser limitadas a um raio ou a cidades específicas, e o Perfil da Empresa no Google ajuda a aparecer no mapa. O cuidado é não pagar por buscas de fora da área que você atende.",
      },
      {
        q: "Qual o investimento mínimo para Google Ads?",
        a: "Depende do volume de buscas e da concorrência no seu serviço e na sua região. O investimento em mídia é pago diretamente ao Google e é diferente dos honorários da agência. No diagnóstico, estimamos se a verba permite competir nas buscas que importam.",
      },
      {
        q: "Em quanto tempo o Google Ads começa a dar resultado?",
        a: "Impressões e cliques aparecem logo após a aprovação dos anúncios, mas isso ainda não é resultado. Leva algum tempo para limpar termos irrelevantes, validar conversões e ter volume para decidir, e não há prazo que possa ser garantido.",
      },
      {
        q: "Clique no WhatsApp conta como conversão?",
        a: "Pode contar, mas como microconversão. O clique mostra intenção, não garante que a conversa aconteceu. Por isso, separamos esse evento das conversões principais e, quando possível, cruzamos com o que o atendimento registrou.",
      },
      {
        q: "Performance Max funciona para o meu negócio?",
        a: "Pode funcionar, desde que receba bons sinais de conversão e criativos adequados. Sem isso, tende a distribuir verba em posicionamentos difíceis de controlar. Avaliamos caso a caso, e em geral a Pesquisa vem primeiro.",
      },
      {
        q: "O que são conversões offline?",
        a: "São resultados que acontecem fora do site, como um lead qualificado ou uma venda registrada no CRM, enviados de volta ao Google Ads. Com isso, a plataforma passa a aprender com quem realmente comprou. A viabilidade depende de como o formulário e o CRM estão organizados, tema tratado em [CRM, automação e IA](/servicos/crm-automacao-ia).",
      },
      {
        q: "Por que meus anúncios aparecem para buscas que não têm nada a ver?",
        a: "Porque o Google interpreta variações e sinônimos das palavras-chave, especialmente nas correspondências mais amplas. A solução é revisar com frequência os termos de pesquisa e incluir negativos. É um trabalho contínuo, não algo feito só na criação da conta.",
      },
    ],
    related: ["trafego-pago", "landing-pages", "crm-automacao-ia"],
    segments: ["oficinas-e-funilarias", "clinicas-odontologicas", "intermediacao-e-revendas", "dermatologistas"],
    cta: {
      title: "Quanto da sua verba vai para buscas erradas?",
      text: "No diagnóstico, analisamos sua conta ou seu ponto de partida, as conversões e as páginas antes de propor qualquer mudança.",
    },
  },

  // ---------------------------------------------------------------------------
  // 3. Meta Ads
  // ---------------------------------------------------------------------------
  {
    slug: "meta-ads",
    name: "Gestão de Meta Ads",
    navLabel: "Meta Ads",
    metaTitle: "Gestão de Meta Ads para Instagram e Facebook",
    metaDescription:
      "Gestão de Meta Ads para gerar demanda no Instagram e no Facebook: criativos que filtram o público, remarketing, campanhas de mensagens e leads com qualidade.",
    eyebrow: "Demanda que precisa ser criada",
    h1: "Gestão de Meta Ads para chegar em quem ainda não está procurando",
    lead: "No Instagram e no Facebook, ninguém entrou para procurar o seu serviço. O anúncio precisa interromper, explicar e despertar interesse em segundos, e o lead que chega precisa ser filtrado antes de ocupar o seu comercial.",
    summary:
      "Gestão de campanhas no Instagram e no Facebook para gerar demanda nova, com criativos como principal alavanca, remarketing, objetivos ligados ao comercial e atenção à qualidade do lead.",
    definition: {
      question: "O que é gestão de Meta Ads?",
      answer:
        "Gestão de Meta Ads é o planejamento e a operação de anúncios no Instagram, no Facebook e nos demais posicionamentos da Meta para gerar interesse e contatos comerciais. Envolve definir objetivo de campanha, públicos, criativos, destino do lead e forma de mensuração. O foco está em despertar demanda em pessoas que ainda não estavam procurando pelo que você oferece.",
      paragraphs: [
        "Com a segmentação cada vez mais automática, o criativo virou o principal filtro de quem vê e responde ao anúncio. Um vídeo que fala da dor de quem está com o para-choque amassado atrai um público diferente de um vídeo genérico sobre a oficina. Por isso, a gestão de Meta Ads anda junto com [criativos e roteiros](/servicos/criativos-e-roteiros).",
        "Outro ponto decisivo é o destino do lead. Formulário instantâneo, conversa no WhatsApp e landing page geram contatos com volumes e qualidades diferentes, e a escolha depende de como o seu comercial atende.",
        "Esta página trata da operação na Meta. A divisão de verba com o [Google Ads](/servicos/google-ads) e o papel de cada canal estão em [gestão de tráfego pago](/servicos/trafego-pago).",
      ],
    },
    forWhom: {
      intro:
        "Meta Ads costuma fazer mais sentido quando o seu produto ou serviço pode ser mostrado, desejado ou lembrado, mesmo por quem não estava pensando nele naquele momento.",
      items: [
        "Clínicas de estética e consultórios de dermatologia que precisam explicar procedimentos e gerar avaliações",
        "Deliveries e restaurantes que querem lembrar o público na hora da fome e trazer pedidos recorrentes",
        "Revendas de veículos com estoque visual que se renova com frequência",
        "Estéticas automotivas com serviços que funcionam bem em vídeo, como polimento e proteção de pintura",
        "Negócios que atendem principalmente por WhatsApp e querem campanhas que abram conversas",
        "Empresas que já têm visitas no site ou seguidores e ainda não fazem remarketing estruturado",
      ],
      notFor: [
        "Quando não há como produzir criativos com alguma frequência, mesmo gravados no celular. Sem renovação, as campanhas perdem desempenho.",
        "Quando o serviço é puramente de urgência e quase ninguém compra por descoberta. Nesse caso, capturar a busca no Google tende a vir primeiro.",
        "Quando o comercial não tem estrutura para filtrar contatos frios. Meta gera volume, e volume sem triagem sobrecarrega o atendimento.",
      ],
    },
    problems: [
      {
        title: "Muito lead, pouca conversa",
        text: "O formulário instantâneo enche a planilha, mas boa parte não atende o telefone ou nem lembra de ter se cadastrado. O custo por lead parece bom e o custo por venda não fecha.",
      },
      {
        title: "Criativo cansado",
        text: "O mesmo anúncio roda por semanas, a frequência sobe e o custo acompanha. Sem um fluxo de novas peças, a conta perde fôlego sem motivo aparente.",
      },
      {
        title: "Objetivo de campanha errado",
        text: "Campanhas de engajamento ou alcance usadas para gerar venda. A plataforma entrega exatamente o que foi pedido: curtidas e visualizações, não contatos.",
      },
      {
        title: "Remarketing ausente ou desorganizado",
        text: "Quem visitou a página, assistiu ao vídeo ou conversou e não fechou não recebe uma segunda mensagem pensada para esse momento.",
      },
      {
        title: "Sinais de conversão fracos",
        text: "Sem Pixel bem configurado e, quando cabível, a API de Conversões, a plataforma recebe pouca informação sobre quem converte e otimiza com menos precisão.",
      },
    ],
    deliverables: {
      intro:
        "O escopo é definido no diagnóstico, considerando o objetivo comercial, o destino dos leads e a capacidade de produzir criativos. Pode fazer parte:",
      items: [
        {
          title: "Estratégia de campanhas por objetivo",
          text: "Escolha entre cadastro, mensagens no WhatsApp ou tráfego para página, conforme o processo de atendimento e o tipo de oferta.",
        },
        {
          title: "Estrutura de públicos",
          text: "Combinação de segmentação ampla guiada pelo criativo, públicos semelhantes e listas próprias, quando houver base autorizada para isso.",
        },
        {
          title: "Remarketing por etapa",
          text: "Mensagens diferentes para quem viu vídeos, visitou a página, iniciou conversa ou deixou um cadastro sem avançar.",
        },
        {
          title: "Definição do destino do lead",
          text: "Análise entre formulário instantâneo, landing page ou conversa direta, com perguntas de qualificação quando o volume justificar.",
        },
        {
          title: "Pixel e API de Conversões",
          text: "Revisão dos eventos enviados e, quando a estrutura técnica permitir, envio de eventos pelo servidor para sinais mais completos.",
        },
        {
          title: "Calendário de criativos e testes",
          text: "Planejamento de novas peças e variações para combater a fadiga e testar ângulos de comunicação diferentes.",
        },
        {
          title: "Leitura de qualidade dos leads",
          text: "Cruzamento dos resultados da plataforma com o retorno do comercial, para ajustar campanhas por quem avança no funil.",
        },
      ],
      note: "As entregas que efetivamente entram no trabalho dependem do escopo contratado e são descritas na proposta.",
    },
    process: [
      {
        title: "Diagnóstico",
        text: "Entendemos oferta, público, histórico da conta, como os leads são atendidos hoje e que tipo de criativo é possível produzir.",
      },
      {
        title: "Estratégia e criativos",
        text: "Definimos objetivos, ângulos de comunicação e o primeiro lote de peças, junto com o destino de cada campanha.",
      },
      {
        title: "Configuração de sinais",
        text: "Revisamos Pixel, eventos e integrações para que a plataforma saiba quem converteu de verdade.",
      },
      {
        title: "Veiculação e leitura inicial",
        text: "Campanhas no ar com acompanhamento de custo, frequência e das primeiras respostas do comercial sobre a qualidade dos contatos.",
      },
      {
        title: "Renovação e otimização",
        text: "Trocamos criativos antes da fadiga, ajustamos públicos e concentramos verba no que gera conversas que avançam.",
      },
    ],
    roles: {
      dx: [
        "Planejar e operar campanhas no Gerenciador de Anúncios da Meta",
        "Definir ângulos de comunicação e orientar a produção de criativos",
        "Configurar e revisar Pixel, eventos e, quando possível, API de Conversões",
        "Monitorar frequência e sinais de fadiga para planejar a renovação das peças",
        "Ajustar campanhas a partir da qualidade informada pelo comercial",
      ],
      client: [
        "Gravar ou fornecer material conforme os roteiros e orientações combinados",
        "Aprovar criativos e textos antes da veiculação",
        "Pagar o investimento em mídia diretamente à Meta",
        "Responder rapidamente quem chega por formulário ou WhatsApp",
        "Registrar no CRM ou na planilha quais contatos avançaram e quais não tinham perfil",
      ],
    },
    measurement: {
      intro:
        "Em Meta Ads, o custo por lead sozinho engana. O que interessa é quantos desses contatos respondem, avançam e compram. Alguns indicadores que usamos:",
      items: [
        {
          metric: "Taxa de contato efetivo",
          why: "Percentual de leads que atendem, respondem a mensagem ou confirmam interesse. É o primeiro filtro de qualidade, especialmente em formulários instantâneos.",
        },
        {
          metric: "Custo por conversa que avança",
          why: "Em campanhas de mensagens, separa conversas que pararam na primeira resposta das que seguiram para orçamento ou agendamento.",
        },
        {
          metric: "Frequência e evolução do custo por criativo",
          why: "Quando a frequência sobe e o custo cresce junto, é sinal de fadiga. Ajuda a decidir o momento de trocar a peça.",
        },
        {
          metric: "Retenção nos primeiros segundos do vídeo",
          why: "Mostra se a abertura está segurando a atenção. Um vídeo que perde o público no início não tem chance de entregar a mensagem.",
        },
        {
          metric: "Conversão do remarketing",
          why: "Indica se a segunda mensagem está trazendo pessoas de volta ou apenas repetindo impressões para quem já decidiu não comprar.",
        },
        {
          metric: "Qualidade do lead por destino",
          why: "Compara formulário instantâneo, landing page e WhatsApp pela taxa de avanço no funil, não pelo volume.",
        },
      ],
    },
    faqs: [
      {
        q: "Formulário instantâneo ou landing page: qual gera leads melhores?",
        a: "Em geral, a landing page traz menos contatos e mais intenção, e o formulário instantâneo traz mais volume, com mais curiosos. O formulário é rápido porque já vem preenchido, o que reduz o esforço e também o comprometimento. Perguntas de qualificação e uma tela de revisão ajudam a equilibrar; a escolha depende da capacidade do seu comercial.",
      },
      {
        q: "Qual o investimento mínimo em Meta Ads?",
        a: "Não há um número fixo; depende do público, da região e de quantos objetivos e testes rodam ao mesmo tempo. A verba de mídia é paga diretamente à Meta e não se confunde com os honorários da agência. O importante é ter investimento suficiente para testar criativos e ler os resultados.",
      },
      {
        q: "Em quanto tempo o Meta Ads traz resultados?",
        a: "Os primeiros contatos costumam chegar cedo, mas a leitura de qualidade só vem depois de alguns ciclos de atendimento. É preciso tempo para saber quais criativos e públicos geram leads que avançam, e esse prazo varia de negócio para negócio.",
      },
      {
        q: "Preciso gravar vídeos?",
        a: "Na maioria dos casos, sim. Vídeos curtos costumam ser o formato com mais espaço para explicar a oferta e filtrar o público. Eles podem ser gravados pela sua equipe no celular, com roteiro e orientação da DX.",
      },
      {
        q: "Campanha para WhatsApp funciona?",
        a: "Funciona bem quando há alguém pronto para responder rápido e uma primeira mensagem bem pensada. Sem isso, a conversa esfria e o investimento se perde. Automações e triagem inicial podem ajudar, como explicamos em [CRM, automação e IA](/servicos/crm-automacao-ia).",
      },
      {
        q: "O que é a API de Conversões da Meta?",
        a: "É uma forma de enviar eventos de conversão para a Meta a partir do servidor ou de outra ferramenta, complementando o Pixel instalado no site. Ajuda a recuperar sinais que se perdem por bloqueadores e restrições de navegador. A implementação depende do site e das ferramentas que você usa.",
      },
      {
        q: "Por que o resultado cai depois de algumas semanas?",
        a: "O motivo mais comum é a fadiga de criativo: o público já viu o anúncio várias vezes e deixa de reagir. Mudanças na concorrência e sazonalidade também pesam. A resposta costuma ser renovar peças e testar novos ângulos, não só aumentar a verba.",
      },
    ],
    related: ["criativos-e-roteiros", "trafego-pago", "landing-pages"],
    segments: ["clinicas-de-estetica", "delivery", "intermediacao-e-revendas", "dermatologistas"],
    cta: {
      title: "Seus leads da Meta chegam, mas não respondem?",
      text: "Vamos olhar campanhas, criativos e o caminho do lead até o seu atendimento. O diagnóstico mostra onde a qualidade está se perdendo.",
    },
  },

  // ---------------------------------------------------------------------------
  // 4. Criativos e roteiros
  // ---------------------------------------------------------------------------
  {
    slug: "criativos-e-roteiros",
    name: "Criativos e Roteiros para Anúncios",
    navLabel: "Criativos e roteiros",
    metaTitle: "Criativos e Roteiros para Anúncios em vídeo e imagem",
    metaDescription:
      "Roteiros de vídeo curto, estáticos e carrosséis pensados para anúncio: ângulos de comunicação, variações para teste e promessa alinhada ao que você entrega.",
    eyebrow: "Comunicação que filtra e convence",
    h1: "Criativos e roteiros para anúncios que dizem a coisa certa para a pessoa certa",
    lead: "Em mídia paga, o criativo decide quem para, quem entende e quem chama. A DX planeja ângulos, escreve roteiros e orienta a gravação para que cada peça tenha uma função clara na campanha.",
    summary:
      "Planejamento de ângulos de comunicação, roteiros de vídeo curto, estáticos e carrosséis para anúncios, com variações para teste e alinhamento entre promessa, página e atendimento.",
    definition: {
      question: "O que são criativos e roteiros para anúncios?",
      answer:
        "Criativos para anúncios são as peças que o público vê na campanha: vídeos, imagens, carrosséis e textos. O roteiro é a estrutura que organiza o que cada vídeo precisa dizer, em que ordem e com qual chamada para ação. Juntos, definem quem presta atenção no anúncio e que tipo de contato chega ao seu comercial.",
      paragraphs: [
        "Um bom criativo de anúncio não é a peça mais bonita, é a que comunica uma ideia clara para um público específico. Ele precisa de um gancho que segure a atenção nos primeiros segundos, um desenvolvimento que mostre por que aquilo importa e uma chamada que diga qual é o próximo passo.",
        "Também precisa prometer só o que a empresa entrega. Se o anúncio fala em orçamento na hora e o atendimento leva um dia para responder, a campanha gera frustração. Por isso, cada roteiro é conferido com a [landing page](/servicos/landing-pages) e com o que o comercial consegue cumprir.",
        "Muitos vídeos que funcionam bem em anúncio são gravados com celular, por quem conhece o negócio. A DX escreve o roteiro e orienta a gravação; o formato de produção, mais simples ou mais elaborado, é definido no escopo.",
      ],
    },
    forWhom: {
      intro:
        "Este serviço é para quem anuncia em [Meta Ads](/servicos/meta-ads), no YouTube ou em outros canais e percebe que o gargalo está no que é dito, não só em onde é veiculado.",
      items: [
        "Empresas que repetem o mesmo anúncio há meses por falta de ideias novas",
        "Donos de negócio dispostos a aparecer em vídeo, mas sem saber o que falar",
        "Clínicas que precisam comunicar procedimentos com clareza e dentro das normas do conselho profissional",
        "Oficinas e estéticas automotivas com serviços que ganham força quando mostrados em processo",
        "Revendas que querem anúncios além da foto do carro com preço",
        "Equipes de mídia que precisam de variações para testar com mais frequência",
      ],
      notFor: [
        "Quando a oferta ainda não está clara. Criativo bom não compensa uma proposta que nem a própria empresa consegue explicar.",
        "Quando a expectativa é uma produção audiovisual de estúdio para campanha institucional. O foco aqui é criativo de performance.",
        "Quando não haverá veiculação paga nem teste. Sem dados de campanha, perde-se o principal mecanismo de aprendizado.",
      ],
    },
    problems: [
      {
        title: "Anúncio com cara de propaganda",
        text: "Peças muito produzidas, com linguagem de folheto, que o público reconhece como anúncio e passa sem ler.",
      },
      {
        title: "Gancho fraco",
        text: "O vídeo começa com logo, vinheta ou apresentação longa. Nos primeiros segundos, a pessoa não entende por que deveria continuar assistindo.",
      },
      {
        title: "Um único ângulo para todo mundo",
        text: "Preço, qualidade, rapidez e confiança são motivações diferentes. Usar sempre a mesma abordagem limita o público que responde.",
      },
      {
        title: "Promessa que o atendimento não sustenta",
        text: "O anúncio garante algo que a operação não entrega, como resposta imediata ou uma condição especial que o vendedor desconhece.",
      },
      {
        title: "Produção travada",
        text: "A empresa quer gravar, mas trava por não saber o que dizer, como enquadrar ou quantas versões fazer. O resultado é a mesma peça rodando por tempo demais.",
      },
    ],
    deliverables: {
      intro:
        "O volume e o formato das peças são definidos no diagnóstico, conforme canais, ritmo de testes e capacidade de gravação da sua equipe. Pode fazer parte:",
      items: [
        {
          title: "Mapa de ângulos de comunicação",
          text: "Levantamento de dores, desejos, objeções e motivações de compra do seu público, transformados em linhas de mensagem testáveis.",
        },
        {
          title: "Roteiros de vídeo curto",
          text: "Estrutura com gancho, desenvolvimento e chamada, com falas sugeridas, cenas e indicação do que mostrar em cada trecho.",
        },
        {
          title: "Estáticos e carrosséis",
          text: "Textos e direção para peças de imagem, com hierarquia de informação pensada para leitura rápida no celular.",
        },
        {
          title: "Guia de gravação",
          text: "Orientações práticas sobre enquadramento, luz, áudio, duração e postura para quem vai gravar com o próprio celular.",
        },
        {
          title: "Variações para teste",
          text: "Versões de um mesmo criativo com ganchos, chamadas ou ordem de argumentos diferentes, para descobrir o que move o público.",
        },
        {
          title: "Textos de anúncio",
          text: "Títulos, legendas e textos de apoio adequados a cada plataforma e posicionamento.",
        },
        {
          title: "Checagem de alinhamento",
          text: "Revisão de cada peça contra a página de destino e o roteiro de atendimento, para que a promessa seja a mesma do anúncio ao fechamento.",
        },
      ],
      note: "A quantidade de roteiros, peças e variações depende do escopo contratado e do ritmo de testes combinado.",
    },
    process: [
      {
        title: "Imersão",
        text: "Conversamos com quem vende e com quem atende para ouvir as perguntas, objeções e argumentos que aparecem no dia a dia.",
      },
      {
        title: "Ângulos e hipóteses",
        text: "Definimos as linhas de mensagem a testar e o que cada uma pretende provar.",
      },
      {
        title: "Roteiro e orientação",
        text: "Escrevemos os roteiros e preparamos a orientação de gravação. Ajustes de linguagem são feitos com quem vai aparecer no vídeo.",
      },
      {
        title: "Gravação e finalização",
        text: "Sua equipe grava conforme o roteiro; edição e finalização seguem o formato definido no escopo.",
      },
      {
        title: "Teste e leitura",
        text: "As peças entram nas campanhas em variações comparáveis, e os resultados indicam quais ângulos merecem novas versões.",
      },
    ],
    roles: {
      dx: [
        "Levantar ângulos de comunicação a partir da operação e dos dados de campanha",
        "Escrever roteiros, textos de anúncio e direção de peças estáticas",
        "Orientar a gravação e revisar o material antes da veiculação",
        "Planejar variações e ler os resultados de cada uma",
        "Conferir o alinhamento entre anúncio, página e roteiro de atendimento",
      ],
      client: [
        "Gravar os vídeos conforme roteiro e orientação, ou indicar quem vai gravar",
        "Validar informações técnicas, condições comerciais e prazos citados nas peças",
        "Aprovar roteiros e criativos antes da veiculação",
        "Em negócios de saúde, garantir a validação pelo profissional responsável, conforme as normas do conselho aplicável",
        "Contar o que o comercial está ouvindo dos clientes, para alimentar novos ângulos",
      ],
    },
    measurement: {
      intro:
        "Criativo se mede pelo que ele provoca na campanha e no comercial. Os indicadores abaixo ajudam a separar o que chama atenção do que gera oportunidade:",
      items: [
        {
          metric: "Retenção do gancho",
          why: "Proporção de pessoas que continuam assistindo após os primeiros segundos. Indica se a abertura do vídeo está funcionando.",
        },
        {
          metric: "Taxa de cliques por variação",
          why: "Compara versões do mesmo criativo para identificar qual gancho ou chamada leva mais gente ao próximo passo.",
        },
        {
          metric: "Custo por lead por ângulo",
          why: "Agrupa as peças pela linha de mensagem e mostra quais motivações atraem contatos a um custo sustentável.",
        },
        {
          metric: "Taxa de qualificação por criativo",
          why: "Quando a origem é registrada, revela quais peças trazem leads com perfil e quais só geram curiosidade.",
        },
        {
          metric: "Vida útil do criativo",
          why: "Quanto tempo uma peça mantém desempenho antes de cansar. Ajuda a planejar o ritmo de produção.",
        },
        {
          metric: "Coerência percebida pelo comercial",
          why: "Indicador qualitativo: o lead chega sabendo o que foi oferecido? Divergências apontam promessa desalinhada.",
        },
      ],
    },
    faqs: [
      {
        q: "Vocês gravam os vídeos?",
        a: "O formato de produção é definido no escopo. Na maioria dos casos, a DX escreve o roteiro e orienta a gravação feita pela sua equipe, porque vídeos com pessoas reais do negócio costumam ter boa aceitação em anúncio. Outros formatos podem ser combinados no diagnóstico.",
      },
      {
        q: "Preciso aparecer no vídeo?",
        a: "Não obrigatoriamente, mas ajuda. Rosto e voz de quem conhece o serviço transmitem confiança. Quando o dono não quer aparecer, alguém da equipe pode gravar, ou a peça pode mostrar o processo, o ambiente ou o próprio serviço sendo feito.",
      },
      {
        q: "Quantos criativos preciso por mês?",
        a: "Depende da verba, do tamanho do público e de quão rápido as peças cansam. Contas com mais investimento e público menor precisam de renovação mais frequente. Esse ritmo é definido no planejamento e revisado conforme os dados.",
      },
      {
        q: "Como funciona para clínicas e consultórios?",
        a: "Os roteiros seguem as normas do conselho profissional aplicável, como o CFM para médicos e o CFO para cirurgiões-dentistas, e não trabalham com promessa de resultado. Toda peça é validada pelo profissional responsável antes de ir ao ar.",
      },
      {
        q: "Em quanto tempo sei se um criativo funciona?",
        a: "Os primeiros sinais, como retenção e cliques, aparecem rápido; a resposta sobre qualidade do lead leva mais tempo. Não há prazo fixo, porque depende da verba e do volume de contatos que a peça gera.",
      },
      {
        q: "Os criativos servem para Google e Meta?",
        a: "Servem, com adaptações. Vídeos curtos podem rodar no Meta e no YouTube, mas cada plataforma tem formatos, proporções e comportamentos diferentes. Já os anúncios de pesquisa do [Google Ads](/servicos/google-ads) seguem outra lógica, ligada ao que a pessoa digitou.",
      },
    ],
    related: ["meta-ads", "landing-pages", "google-ads"],
    segments: ["clinicas-de-estetica", "oficinas-e-funilarias", "delivery", "dermatologistas"],
    cta: {
      title: "Falta assunto para os seus anúncios?",
      text: "No diagnóstico, levantamos o que o seu público pergunta e o que o seu comercial já sabe responder. É daí que saem os melhores ângulos.",
    },
  },

  // ---------------------------------------------------------------------------
  // 5. Landing pages
  // ---------------------------------------------------------------------------
  {
    slug: "landing-pages",
    name: "Landing Pages e Páginas de Conversão",
    navLabel: "Landing pages",
    metaTitle: "Landing Pages e Páginas de Conversão para campanhas",
    metaDescription:
      "Landing pages dedicadas a cada oferta, com mensagem alinhada ao anúncio, formulário que qualifica, carregamento rápido no celular e integração com CRM.",
    eyebrow: "Do clique ao contato",
    h1: "Landing pages feitas para transformar o clique do anúncio em contato",
    lead: "A pessoa clicou porque o anúncio prometeu algo. A página precisa confirmar essa promessa em segundos, responder as dúvidas certas e facilitar o próximo passo, sem desviar a atenção.",
    summary:
      "Criação e otimização de páginas dedicadas a ofertas e campanhas, com mensagem coerente com o anúncio, formulário com qualificação, foco em celular, mensuração de eventos e integração com o atendimento.",
    definition: {
      question: "O que é uma landing page?",
      answer:
        "Landing page é uma página criada para um único objetivo, como pedir um orçamento, agendar uma avaliação ou iniciar uma conversa. Diferente do site institucional, ela não apresenta a empresa inteira: concentra a mensagem em uma oferta e em uma ação. Em campanhas pagas, é o lugar onde o clique vira contato ou se perde.",
      paragraphs: [
        "O primeiro teste de uma landing page acontece logo que ela abre: a pessoa precisa reconhecer ali o que viu no anúncio. Se o anúncio falou em clareamento dental e a página começa com a história da clínica, parte do público vai embora antes de rolar a tela.",
        "Depois vem o formulário. Poucos campos geram mais contatos; algumas perguntas bem escolhidas geram contatos melhores. O equilíbrio depende de quanto o seu time consegue atender e de quanta triagem precisa acontecer antes da conversa, tema aprofundado no conteúdo sobre [qualificação de leads antes da reunião](/conteudos/qualificacao-de-leads-antes-da-reuniao).",
        "Por fim, a página precisa ser medida e conectada. Cada envio de formulário ou clique para WhatsApp vira um evento nas plataformas de anúncio e, idealmente, um registro no CRM com a origem preservada.",
      ],
    },
    forWhom: {
      intro:
        "Landing pages fazem diferença quando há campanha paga, como [Google Ads](/servicos/google-ads) ou [Meta Ads](/servicos/meta-ads), levando visitantes para uma página que não foi pensada para aquela oferta.",
      items: [
        "Empresas que mandam o tráfego dos anúncios para a página inicial do site",
        "Clínicas com procedimentos diferentes que pedem páginas e argumentos separados",
        "Revendas que querem captar interessados em financiamento, avaliação de usado ou um modelo específico",
        "Oficinas que querem uma página de orçamento rápido com envio de fotos ou descrição do problema",
        "Negócios cujo site é lento no celular ou difícil de editar",
        "Campanhas sazonais, lançamentos e condições especiais com prazo definido",
      ],
      notFor: [
        "Quando a demanda principal vem de busca orgânica e você precisa de um site completo, com várias páginas e conteúdo. Nesse caso, o projeto é outro.",
        "Quando não há tráfego previsto para a página. Sem campanha ou divulgação, uma landing page não tem quem a visite.",
        "Quando a operação atende só por WhatsApp e a oferta é simples o bastante para uma campanha de mensagens direta funcionar melhor.",
      ],
    },
    problems: [
      {
        title: "Anúncio e página falando de coisas diferentes",
        text: "A campanha promete uma coisa e a página apresenta outra. A pessoa não encontra o que procurava e volta para o feed ou para a busca.",
      },
      {
        title: "Página pesada no celular",
        text: "Imagens grandes, scripts demais e efeitos desnecessários fazem a página demorar a abrir justamente no aparelho por onde chega a maior parte do tráfego pago.",
      },
      {
        title: "Formulário que não filtra nada",
        text: "Só nome e telefone. O comercial recebe todo mundo igual e gasta tempo com quem não tem perfil, enquanto os melhores contatos esperam.",
      },
      {
        title: "Contato que se perde depois do envio",
        text: "O formulário cai em um e-mail que ninguém olha, sem origem registrada e sem aviso para quem precisa responder.",
      },
      {
        title: "Nenhum evento medido",
        text: "As plataformas de anúncio não sabem quem converteu. Sem esse sinal, as campanhas não aprendem a buscar pessoas parecidas.",
      },
    ],
    deliverables: {
      intro:
        "O que entra em cada projeto é definido no diagnóstico, de acordo com o número de ofertas, a estrutura do site atual e as integrações necessárias. Pode fazer parte:",
      items: [
        {
          title: "Estrutura e texto da página",
          text: "Organização da mensagem a partir do anúncio e da busca: proposta, benefícios, provas disponíveis, objeções respondidas e chamada para ação.",
        },
        {
          title: "Formulário com qualificação",
          text: "Definição de campos e perguntas que ajudam o comercial a priorizar, sem criar atrito desnecessário.",
        },
        {
          title: "Layout pensado para celular",
          text: "Hierarquia de informação, botões e leitura planejados primeiro para a tela pequena.",
        },
        {
          title: "Otimização de velocidade",
          text: "Cuidados com imagens, fontes e scripts para a página abrir rápido em conexões móveis.",
        },
        {
          title: "Mensuração de eventos",
          text: "Configuração dos eventos de envio de formulário, clique no WhatsApp e ligação nas ferramentas de análise e nas plataformas de anúncio.",
        },
        {
          title: "Integração com CRM ou WhatsApp",
          text: "Envio dos dados do formulário para o CRM, a planilha ou o atendimento, com a origem da campanha preservada e aviso ao responsável.",
        },
        {
          title: "Variações para teste",
          text: "Versões com títulos, ordem de seções ou formulários diferentes, para comparar desempenho com tráfego real.",
        },
      ],
      note: "O número de páginas, variações e integrações depende do escopo contratado e da estrutura técnica disponível.",
    },
    process: [
      {
        title: "Briefing da oferta",
        text: "Definimos para quem é a página, qual campanha vai alimentá-la, qual ação é esperada e o que o comercial precisa saber do lead.",
      },
      {
        title: "Arquitetura da mensagem",
        text: "Montamos a sequência de argumentos e o formulário antes de pensar no visual.",
      },
      {
        title: "Criação e publicação",
        text: "A página é desenhada e publicada, com atenção a velocidade e leitura no celular.",
      },
      {
        title: "Mensuração e integrações",
        text: "Conectamos eventos, CRM e avisos de novo lead e testamos o fluxo de ponta a ponta antes de ligar as campanhas.",
      },
      {
        title: "Testes e ajustes",
        text: "Com tráfego real, comparamos variações e ajustamos a página a partir dos dados e do retorno do atendimento.",
      },
    ],
    roles: {
      dx: [
        "Estruturar a mensagem e o texto a partir da campanha e da oferta",
        "Propor os campos de qualificação do formulário",
        "Criar e publicar a página na estrutura combinada",
        "Configurar os eventos de conversão e as integrações previstas no escopo",
        "Planejar e analisar testes de variação",
      ],
      client: [
        "Fornecer informações corretas sobre oferta, condições, endereço e diferenciais",
        "Enviar fotos, vídeos e provas reais que possam ser usadas na página",
        "Aprovar textos e layout antes da publicação",
        "Garantir acesso ao domínio, ao site ou à ferramenta onde a página será publicada",
        "Atender os leads que chegam pela página no tempo combinado",
      ],
    },
    measurement: {
      intro:
        "Uma landing page é avaliada pelo que ela faz com o tráfego que recebe. Os indicadores abaixo ajudam a separar problema de página de problema de campanha:",
      items: [
        {
          metric: "Taxa de conversão da página",
          why: "Proporção de visitantes que enviam o formulário ou iniciam contato. É o principal número para comparar versões.",
        },
        {
          metric: "Tempo de carregamento no celular",
          why: "Páginas lentas perdem visitantes antes mesmo de exibir a oferta. Acompanhar esse número evita culpar o anúncio por um problema técnico.",
        },
        {
          metric: "Abandono do formulário",
          why: "Quantos começam a preencher e desistem. Ajuda a identificar campos que geram atrito.",
        },
        {
          metric: "Distribuição das respostas de qualificação",
          why: "Mostra o perfil de quem está chegando e se a campanha está atraindo o público certo.",
        },
        {
          metric: "Profundidade de rolagem",
          why: "Indica até onde as pessoas leem e se argumentos importantes estão escondidos no fim da página.",
        },
        {
          metric: "Leads com origem registrada no CRM",
          why: "Confere se a integração está funcionando e se cada contato pode ser ligado à campanha que o trouxe.",
        },
      ],
    },
    comparison: {
      caption: "Landing page, site institucional e formulário instantâneo: quando usar cada um",
      columns: ["Critério", "Landing page", "Site institucional", "Formulário instantâneo"],
      rows: [
        [
          "Objetivo principal",
          "Converter o visitante em contato para uma oferta específica",
          "Apresentar a empresa, seus serviços e sua história",
          "Captar o cadastro sem a pessoa sair da rede social",
        ],
        [
          "Foco da mensagem",
          "Uma oferta e uma ação",
          "Vários serviços e caminhos de navegação",
          "Poucas linhas de texto e as perguntas do formulário",
        ],
        [
          "Esforço para o usuário",
          "Médio: a página precisa carregar e o formulário ser preenchido",
          "Alto: o visitante precisa encontrar o que procura",
          "Baixo: parte dos dados já vem preenchida pela plataforma",
        ],
        [
          "Qualidade do lead",
          "Tende a ser maior, porque a pessoa leu a oferta antes de enviar",
          "Variável, depende de onde a pessoa chegou no site",
          "Mais volume e mais curiosos; exige triagem",
        ],
        [
          "Mensuração",
          "Eventos completos nas ferramentas de análise e nas plataformas de anúncio",
          "Possível, mas mais difícil de atribuir a uma campanha",
          "Medida dentro da plataforma; a integração com o CRM precisa ser configurada",
        ],
        [
          "Quando faz mais sentido",
          "Campanhas pagas com oferta clara e necessidade de qualificar",
          "Tráfego orgânico, indicação e quem quer conhecer a empresa",
          "Ofertas simples, testes rápidos e comercial preparado para filtrar",
        ],
      ],
    },
    faqs: [
      {
        q: "Preciso de uma landing page se já tenho site?",
        a: "Na maioria das campanhas pagas, sim. O site apresenta a empresa; a landing page concentra a atenção em uma oferta e em uma ação. Isso costuma facilitar a conversão e a mensuração, sem substituir o site.",
      },
      {
        q: "Quantos campos o formulário deve ter?",
        a: "O suficiente para o comercial priorizar, e não mais que isso. Nome e telefone geram volume; uma ou duas perguntas sobre necessidade, prazo ou região já ajudam a separar quem tem perfil. O equilíbrio é ajustado com dados reais.",
      },
      {
        q: "A página fica no domínio da minha empresa?",
        a: "O ideal é que sim, em um endereço da sua empresa. Isso depende do acesso ao domínio e da estrutura técnica disponível, avaliados no diagnóstico.",
      },
      {
        q: "O formulário pode ir direto para o WhatsApp ou para o CRM?",
        a: "Pode, conforme as ferramentas que você usa. O importante é que o dado chegue a quem vai atender, com a origem da campanha registrada e um aviso de novo lead. Veja mais em [CRM, automação e IA](/servicos/crm-automacao-ia).",
      },
      {
        q: "Qual o investimento para uma landing page?",
        a: "Depende do número de páginas, das variações e das integrações necessárias, por isso é definido no diagnóstico. Lembre que a página precisa de visitantes: o investimento em mídia é separado e pago diretamente às plataformas de anúncio.",
      },
      {
        q: "Em quanto tempo sei se a página está funcionando?",
        a: "Depende do volume de visitas que as campanhas trazem. Com pouco tráfego, leva mais tempo para comparar versões com segurança. Não há prazo fixo, mas a leitura começa assim que os eventos estão sendo medidos.",
      },
      {
        q: "Formulário instantâneo não é mais fácil?",
        a: "É mais fácil para o usuário, e por isso traz mais volume. A contrapartida é uma parcela maior de contatos com pouca intenção. Em alguns casos ele é a melhor escolha, e a comparação desta página ajuda a decidir.",
      },
    ],
    related: ["google-ads", "meta-ads", "crm-automacao-ia"],
    segments: ["clinicas-odontologicas", "intermediacao-e-revendas", "oficinas-e-funilarias", "clinicas-de-estetica"],
    cta: {
      title: "Seu anúncio leva para onde?",
      text: "Se o clique cai na página inicial ou em uma página lenta, há espaço para melhorar. No diagnóstico, olhamos anúncio, página e atendimento juntos.",
    },
  },

  // ---------------------------------------------------------------------------
  // 6. Estruturação comercial
  // ---------------------------------------------------------------------------
  {
    slug: "estruturacao-comercial",
    name: "Estruturação Comercial",
    navLabel: "Estruturação comercial",
    metaTitle: "Estruturação Comercial: processo de pré-vendas e vendas",
    metaDescription:
      "Estruturação comercial para empresas que geram leads: etapas do funil, critérios de qualificação, roteiros de follow-up, tempo de resposta e indicadores.",
    eyebrow: "Processo comercial",
    h1: "Estruturação comercial: um caminho claro do primeiro contato ao fechamento",
    lead: "Muitas empresas não têm um problema de demanda, têm um problema de processo. A DX desenha como o lead é recebido, qualificado, acompanhado e fechado, e apoia a sua equipe a colocar isso em prática.",
    summary:
      "Desenho e apoio à implantação do processo de pré-vendas e vendas: etapas do funil, qualificação, roteiros de abordagem e follow-up, distribuição de leads, rotina de acompanhamento e indicadores.",
    definition: {
      question: "O que é estruturação comercial?",
      answer:
        "Estruturação comercial é a organização do caminho que um contato percorre até virar cliente, com etapas, responsáveis, critérios e rotinas definidos. Inclui como o lead é recebido, quem responde, como ele é qualificado, quando é feito o follow-up e como o resultado é registrado. O objetivo é que vender deixe de depender do improviso e passe a seguir um processo que pode ser medido e melhorado.",
      paragraphs: [
        "Em empresas que investem em anúncios, é o processo comercial que decide se a verba vira venda. Um lead respondido horas depois, sem roteiro e sem follow-up, tem chance muito menor do que o mesmo lead atendido rapidamente por alguém que sabe o que perguntar.",
        "A DX desenha o processo e apoia a implantação: define etapas, critérios e roteiros, ajuda a organizar a rotina e acompanha os indicadores. A execução das vendas, com ligações, conversas e fechamentos, continua com o seu time, que conhece o cliente e o produto.",
        "O processo também devolve informação para o marketing. Quando o comercial registra por que um lead não fechou, as campanhas podem ser ajustadas para atrair menos perfis errados. Esse ciclo é detalhado em [tráfego pago e processo comercial](/conteudos/trafego-pago-e-processo-comercial).",
      ],
    },
    forWhom: {
      intro:
        "Faz sentido para empresas que já recebem contatos com alguma regularidade, mas sentem que estão deixando vendas pelo caminho.",
      items: [
        "Empresas em que cada vendedor atende do seu jeito e não existe padrão de abordagem",
        "Negócios que recebem leads por vários canais e não sabem quantos foram respondidos",
        "Clínicas em que a recepção agenda, mas ninguém acompanha quem pediu orçamento e sumiu",
        "Revendas com vários vendedores e dificuldade de distribuir e cobrar o atendimento dos leads",
        "Gestores que querem acompanhar o comercial por números, e não só por sensação",
        "Empresas que vão começar a investir em mídia e querem estar prontas para atender a demanda",
      ],
      notFor: [
        "Quando o volume de contatos é tão baixo que o dono atende tudo pessoalmente e com bom resultado. Pode ser cedo para formalizar etapas.",
        "Quando a expectativa é terceirizar a venda. A DX não assume a execução comercial; atendimento e fechamento continuam com a sua equipe.",
        "Quando não há disposição para registrar informações e mudar a rotina. Processo só funciona se for seguido.",
      ],
    },
    problems: [
      {
        title: "Lead respondido tarde",
        text: "O contato chega no meio da manhã e é respondido no fim do dia. Nesse intervalo, ele pode já ter falado com outras empresas.",
      },
      {
        title: "Follow-up que não acontece",
        text: "A primeira conversa termina em um “vou pensar” e ninguém volta a procurar. Boa parte das vendas perdidas fica parada nessa etapa.",
      },
      {
        title: "Qualificação no feeling",
        text: "Não há critério claro para separar quem tem perfil, quem está pesquisando e quem não tem condição de comprar. O vendedor gasta o mesmo tempo com todos.",
      },
      {
        title: "Distribuição sem regra",
        text: "Os leads vão para quem pega primeiro ou para quem o gestor lembra. Alguns vendedores ficam sobrecarregados e outros sem oportunidade.",
      },
      {
        title: "Nenhum dado sobre o funil",
        text: "Ninguém sabe quantos leads viraram agendamento, quantos agendamentos viraram proposta e onde está a maior perda.",
      },
      {
        title: "Marketing e comercial sem conversa",
        text: "O comercial reclama da qualidade dos leads, o marketing não recebe retorno estruturado e as campanhas continuam iguais.",
      },
    ],
    deliverables: {
      intro:
        "O desenho do processo parte do diagnóstico da sua operação atual, e o escopo é definido a partir dele. Pode fazer parte:",
      items: [
        {
          title: "Mapeamento do processo atual",
          text: "Levantamento de como os leads chegam, quem atende, o que é registrado e onde as oportunidades se perdem.",
        },
        {
          title: "Etapas do funil",
          text: "Definição das fases de pré-vendas e vendas, com critério claro de entrada e saída em cada uma.",
        },
        {
          title: "Critérios de qualificação",
          text: "Perguntas e sinais que ajudam a classificar o lead por perfil, necessidade, prazo e condição de compra. O conteúdo sobre [qualificação de leads antes da reunião](/conteudos/qualificacao-de-leads-antes-da-reuniao) mostra a lógica.",
        },
        {
          title: "Roteiros de abordagem e follow-up",
          text: "Sugestões de primeira mensagem, perguntas de descoberta, tratamento de objeções comuns e cadência de retomada de contato.",
        },
        {
          title: "Regras de distribuição de leads",
          text: "Critérios para direcionar cada contato ao responsável certo, com prazo de primeira resposta definido.",
        },
        {
          title: "Rotina de acompanhamento",
          text: "Proposta de rituais de gestão, como revisão de oportunidades paradas e leitura de indicadores, adaptados ao tamanho do time.",
        },
        {
          title: "Painel de indicadores comerciais",
          text: "Definição dos números que o gestor precisa ver e de onde cada um vem.",
        },
        {
          title: "Retorno do comercial para o marketing",
          text: "Forma simples de registrar motivo de perda e qualidade do lead, para alimentar os ajustes de campanha.",
        },
      ],
      note: "A profundidade do desenho e do apoio à implantação depende do escopo contratado e do tamanho da equipe comercial.",
    },
    process: [
      {
        title: "Diagnóstico da operação",
        text: "Conversamos com quem atende, analisamos conversas e registros existentes e entendemos o ciclo de venda do seu negócio.",
      },
      {
        title: "Desenho do processo",
        text: "Propomos etapas, critérios, roteiros e regras de distribuição, validados com o gestor e com a equipe.",
      },
      {
        title: "Preparação da equipe",
        text: "Apresentamos o processo ao time, ajustamos roteiros à linguagem de quem atende e alinhamos o que precisa ser registrado.",
      },
      {
        title: "Implantação acompanhada",
        text: "No início da implantação, acompanhamos a aplicação, identificamos desvios e ajustamos o que não se encaixou na rotina real.",
      },
      {
        title: "Indicadores e melhoria",
        text: "Com o processo rodando, os números mostram onde estão as perdas e orientam as próximas mudanças.",
      },
    ],
    roles: {
      dx: [
        "Mapear a operação atual e identificar os pontos de perda",
        "Desenhar etapas, critérios de qualificação e regras de distribuição",
        "Escrever roteiros de abordagem e follow-up junto com a equipe",
        "Apoiar a implantação e adaptar o processo à rotina real",
        "Definir indicadores e ajudar o gestor a interpretá-los",
      ],
      client: [
        "Executar o atendimento, as negociações e os fechamentos",
        "Liberar tempo da equipe para o diagnóstico e a implantação",
        "Registrar o status de cada oportunidade no CRM ou na ferramenta definida",
        "Garantir que o gestor acompanhe a rotina e cobre o processo",
        "Informar mudanças de equipe, de capacidade de atendimento ou de oferta",
      ],
    },
    measurement: {
      intro:
        "Os indicadores comerciais mostram onde o funil perde força. Diferente das métricas de mídia, eles medem o que acontece depois que o contato chega:",
      items: [
        {
          metric: "Tempo de primeira resposta",
          why: "Intervalo entre a chegada do lead e o primeiro contato da equipe. Em vendas que dependem de atendimento, costuma pesar muito na conversão.",
        },
        {
          metric: "Taxa de lead para agendamento",
          why: "Proporção de contatos que viram visita, avaliação, test drive ou reunião. Mostra a eficiência da pré-venda.",
        },
        {
          metric: "Taxa de comparecimento",
          why: "Quantos agendados realmente aparecem. Indica a qualidade da confirmação e do compromisso criado na conversa.",
        },
        {
          metric: "Taxa de agendamento para venda",
          why: "Mede a etapa de fechamento e ajuda a separar problema de atendimento de problema de proposta.",
        },
        {
          metric: "Oportunidades sem próximo passo",
          why: "Leads parados sem tarefa agendada. É o retrato do follow-up que não está acontecendo.",
        },
        {
          metric: "Motivos de perda",
          why: "Classificação de por que as vendas não fecharam, como preço, prazo, perfil ou falta de retorno. Alimenta ajustes no comercial e no marketing.",
        },
        {
          metric: "Distribuição de leads por responsável",
          why: "Mostra se a carga está equilibrada e se cada vendedor responde dentro do prazo definido.",
        },
      ],
    },
    faqs: [
      {
        q: "A DX faz as vendas por mim?",
        a: "Não. A DX desenha o processo, prepara roteiros e apoia a implantação, mas a execução das vendas é do seu time. Quem conhece o produto e o cliente é quem deve conduzir a conversa e o fechamento.",
      },
      {
        q: "Preciso ter um CRM para estruturar o comercial?",
        a: "Não necessariamente no começo, mas ajuda muito. É possível iniciar com uma planilha bem organizada e evoluir para um CRM quando o volume pedir. A escolha da ferramenta é tratada em [CRM, automação e IA](/servicos/crm-automacao-ia).",
      },
      {
        q: "Quanto tempo leva para implantar um processo comercial?",
        a: "Depende do tamanho da equipe, do volume de leads e do quanto a rotina atual precisa mudar. A implantação é gradual, e o processo costuma ser ajustado algumas vezes até encaixar na operação real. Não há prazo que valha para todas as empresas.",
      },
      {
        q: "Qual o investimento para estruturar o comercial?",
        a: "É definido no diagnóstico, conforme o tamanho da operação e a profundidade do apoio à implantação. O serviço pode ser contratado sozinho ou junto com a gestão de mídia, quando faz sentido conectar as duas frentes.",
      },
      {
        q: "O que é pré-vendas?",
        a: "Pré-vendas é a etapa entre a chegada do lead e a conversa de venda propriamente dita. Nela, alguém faz o primeiro contato, entende a necessidade, qualifica e agenda o próximo passo. Em operações menores, a mesma pessoa pode fazer pré-venda e venda, desde que as etapas estejam claras.",
      },
      {
        q: "Minha equipe é pequena. Ainda faz sentido?",
        a: "Faz, com um desenho proporcional. Em equipes pequenas, o ganho costuma vir de roteiros simples, prazo de resposta definido e uma rotina de follow-up que não dependa da memória de ninguém. Processo não precisa ser burocrático.",
      },
      {
        q: "Como o comercial ajuda a melhorar as campanhas?",
        a: "Registrando o que acontece com cada lead. Quando o motivo de perda e a qualidade do contato são anotados, o marketing consegue ajustar público, mensagem e oferta nas campanhas de [tráfego pago](/servicos/trafego-pago). Esse retorno faz parte do processo que desenhamos.",
      },
    ],
    related: ["crm-automacao-ia", "trafego-pago", "landing-pages"],
    segments: ["intermediacao-e-revendas", "clinicas-odontologicas", "clinicas-de-estetica", "oficinas-e-funilarias"],
    cta: {
      title: "Quantos leads ficaram sem resposta este mês?",
      text: "Se a pergunta não tem resposta fácil, vale começar pelo processo. No diagnóstico, mapeamos como sua equipe atende hoje e onde as oportunidades se perdem.",
    },
  },

  // ---------------------------------------------------------------------------
  // 7. CRM, automação e IA no atendimento
  // ---------------------------------------------------------------------------
  {
    slug: "crm-automacao-ia",
    name: "CRM, Automação e IA no Atendimento",
    navLabel: "CRM, automação e IA",
    metaTitle: "CRM e automação de atendimento com IA supervisionada",
    metaDescription:
      "CRM e automação de atendimento para organizar leads, distribuir contatos, automatizar lembretes e follow-up e usar IA na triagem com supervisão humana.",
    eyebrow: "Atendimento organizado",
    h1: "CRM e automação de atendimento para responder rápido sem perder o controle",
    lead: "Quando os leads chegam por formulário, WhatsApp e telefone ao mesmo tempo, contatos começam a escapar. A DX organiza o pipeline, automatiza o que é repetitivo e aplica IA onde ela ajuda, sempre com uma pessoa no controle.",
    summary:
      "Organização de leads em CRM, automações de distribuição, lembretes e follow-up, integração de formulários e WhatsApp e uso de IA na triagem inicial com supervisão humana.",
    definition: {
      question: "O que é CRM e automação de atendimento?",
      answer:
        "CRM é o sistema onde cada lead e cada oportunidade ficam registrados, com origem, histórico de conversas e etapa do funil. Automação de atendimento são regras que executam tarefas repetitivas sem depender de alguém lembrar, como distribuir um novo lead, enviar uma confirmação ou criar um lembrete de follow-up. Juntos, garantem que nenhum contato fique esquecido e que o gestor saiba o que está acontecendo.",
      paragraphs: [
        "A ferramenta em si é a parte menos importante. O que define se um CRM funciona é o pipeline refletir o processo comercial, os campos registrarem o que importa e a equipe usar no dia a dia. Por isso, este trabalho costuma andar junto com a [estruturação comercial](/servicos/estruturacao-comercial), e a escolha da ferramenta considera a sua operação e o que você já usa.",
        "A inteligência artificial entra como apoio: responder perguntas frequentes fora do horário, fazer as primeiras perguntas de triagem, resumir conversas para o vendedor. Ela não substitui o vendedor, e as respostas precisam de limites claros e revisão humana, principalmente em temas como preço, prazo e, em clínicas, qualquer assunto de saúde.",
        "Dados de clientes exigem cuidado. A configuração considera a Lei Geral de Proteção de Dados (LGPD): coletar apenas o necessário, informar como os dados serão usados e controlar quem tem acesso a eles.",
      ],
    },
    forWhom: {
      intro:
        "Faz sentido para empresas em que o volume de contatos já passou do ponto em que dá para controlar de cabeça ou em conversas soltas no WhatsApp.",
      items: [
        "Empresas que atendem por WhatsApp com vários atendentes e perdem o histórico das conversas",
        "Negócios que recebem leads de formulário por e-mail e copiam tudo manualmente para uma planilha",
        "Clínicas que querem confirmar consultas e lembrar retornos sem sobrecarregar a recepção",
        "Revendas que precisam distribuir leads entre vendedores e acompanhar quem respondeu",
        "Operações que recebem mensagens fora do horário e querem uma primeira resposta organizada",
        "Gestores que querem ver o funil atualizado sem pedir relatório para a equipe",
      ],
      notFor: [
        "Quando ainda não existe um processo comercial definido. Automatizar um processo confuso só faz o erro acontecer mais rápido; o desenho do processo vem antes.",
        "Quando a expectativa é colocar a IA para vender sozinha. A IA entra em triagem e apoio, com supervisão, não como substituta do atendimento humano.",
        "Quando o volume de contatos é pequeno e uma planilha bem organizada resolve. Uma ferramenta nova sem necessidade vira mais uma tarefa.",
      ],
    },
    problems: [
      {
        title: "Leads espalhados",
        text: "Parte está no WhatsApp de um vendedor, parte no e-mail, parte em um caderno. Quando alguém sai da empresa, os contatos vão junto.",
      },
      {
        title: "Tarefas repetitivas consumindo o time",
        text: "Copiar dados de formulário, mandar a mesma mensagem de confirmação, lembrar de retornar. É tempo que poderia estar em conversas de venda.",
      },
      {
        title: "CRM que ninguém usa",
        text: "A ferramenta foi contratada, mas o pipeline não reflete o processo real e os campos não fazem sentido. A equipe volta para o WhatsApp e o CRM fica desatualizado.",
      },
      {
        title: "Contato fora do horário sem resposta",
        text: "A mensagem chega à noite ou no fim de semana e só é vista horas depois, quando o interesse já esfriou.",
      },
      {
        title: "IA sem limites",
        text: "Robôs que respondem errado, prometem o que não podem ou deixam o cliente preso em um menu. A experiência piora e a confiança cai.",
      },
    ],
    deliverables: {
      intro:
        "A definição do que será configurado parte do diagnóstico do seu processo e das ferramentas que você já tem. Pode fazer parte:",
      items: [
        {
          title: "Desenho do pipeline",
          text: "Etapas do funil no CRM espelhando o processo comercial, com critérios claros para mudar de etapa.",
        },
        {
          title: "Campos e origem do lead",
          text: "Definição das informações que precisam ser registradas, incluindo a campanha e o canal de origem.",
        },
        {
          title: "Integração de formulários",
          text: "Envio automático dos leads de [landing pages](/servicos/landing-pages) e de formulários de anúncio para o CRM, com aviso ao responsável.",
        },
        {
          title: "Automação de distribuição",
          text: "Regras para direcionar cada novo lead ao atendente ou vendedor certo, por região, serviço ou rodízio.",
        },
        {
          title: "Lembretes, confirmações e follow-up",
          text: "Mensagens automáticas de confirmação de agendamento, lembretes de compromisso e tarefas de retomada de contato.",
        },
        {
          title: "Organização do atendimento por WhatsApp",
          text: "Estrutura para centralizar conversas, registrar histórico e conectar o WhatsApp ao pipeline, conforme as soluções viáveis para a operação.",
        },
        {
          title: "IA na triagem e nas respostas iniciais",
          text: "Assistente para perguntas frequentes e primeiras perguntas de qualificação, com limites definidos e passagem para uma pessoa.",
        },
        {
          title: "Regras de uso e revisão",
          text: "Definição do que a automação e a IA podem ou não responder, de quem revisa as conversas e de como os dados pessoais são tratados.",
        },
      ],
      note: "As ferramentas, integrações e automações implementadas dependem do escopo contratado e da estrutura técnica disponível na sua empresa.",
    },
    process: [
      {
        title: "Diagnóstico do atendimento",
        text: "Mapeamos por onde chegam os contatos, quem responde, o que é registrado e quais ferramentas já existem.",
      },
      {
        title: "Desenho do fluxo",
        text: "Definimos pipeline, campos, regras de distribuição e o que pode ser automatizado sem prejudicar a experiência do cliente.",
      },
      {
        title: "Configuração e integrações",
        text: "Configuramos a ferramenta escolhida, conectamos formulários e canais e testamos cada automação antes de ativá-la.",
      },
      {
        title: "IA supervisionada",
        text: "Quando faz sentido, implantamos a triagem com IA em escopo limitado e revisamos conversas reais antes de ampliar o uso.",
      },
      {
        title: "Treinamento e ajuste",
        text: "Orientamos a equipe no uso diário e ajustamos as regras conforme a operação revela exceções.",
      },
    ],
    roles: {
      dx: [
        "Desenhar o pipeline e as regras de automação a partir do processo comercial",
        "Recomendar ferramentas considerando a operação e o que a empresa já usa",
        "Configurar as integrações e automações previstas no escopo",
        "Definir limites, roteiros e pontos de passagem para atendimento humano na IA",
        "Revisar conversas e automações para corrigir falhas",
      ],
      client: [
        "Contratar e manter as ferramentas escolhidas, quando forem pagas",
        "Usar o CRM no dia a dia e manter o status das oportunidades atualizado",
        "Revisar e aprovar as respostas automáticas e os roteiros da IA",
        "Assumir as conversas que a automação encaminha para atendimento humano",
        "Definir, com apoio jurídico quando necessário, as regras de tratamento de dados pessoais",
      ],
    },
    measurement: {
      intro:
        "Em CRM e automação, o objetivo é velocidade com controle. Os indicadores mostram se o sistema está ajudando a equipe ou só criando mais uma tela para alimentar:",
      items: [
        {
          metric: "Tempo de primeira resposta, dentro e fora do horário",
          why: "Mostra o efeito das automações e da triagem inicial na velocidade de atendimento, separando o horário comercial do restante.",
        },
        {
          metric: "Leads com etapa e responsável definidos",
          why: "Percentual de contatos devidamente registrados no pipeline. Indica a adesão da equipe ao CRM.",
        },
        {
          metric: "Taxa de passagem da IA para humano",
          why: "Quantas conversas a triagem encaminha para uma pessoa e em que momento. Ajuda a calibrar os limites do assistente.",
        },
        {
          metric: "Respostas automáticas reprovadas na revisão",
          why: "Proporção de respostas consideradas inadequadas por quem revisa. É o principal controle de qualidade da IA.",
        },
        {
          metric: "Faltas em agendamentos com lembrete automático",
          why: "Compara agendamentos com e sem lembrete para avaliar se a automação está reduzindo ausências.",
        },
        {
          metric: "Follow-ups vencidos",
          why: "Tarefas de retomada que passaram do prazo sem execução. Mostra onde o processo ainda depende de esforço manual.",
        },
      ],
    },
    comparison: {
      caption: "Atendimento manual, automação e automação com IA supervisionada",
      columns: ["Critério", "Atendimento manual", "Automação", "Automação com IA supervisionada"],
      rows: [
        [
          "Velocidade da primeira resposta",
          "Depende de quem está disponível no momento",
          "Imediata para mensagens padrão, como boas-vindas e confirmação",
          "Imediata, com resposta adaptada à pergunta do cliente",
        ],
        [
          "Personalização",
          "Alta, quando o atendente tem tempo e contexto",
          "Baixa: segue mensagens e regras fixas",
          "Média a alta, dentro dos limites e roteiros definidos",
        ],
        [
          "Escala",
          "Limitada ao tamanho da equipe",
          "Alta para tarefas repetitivas e previsíveis",
          "Alta para triagem e perguntas frequentes",
        ],
        [
          "Riscos principais",
          "Esquecimento, demora e falta de registro",
          "Mensagem fora de contexto quando a regra não prevê a situação",
          "Resposta imprecisa se não houver limites, revisão e passagem para humano",
        ],
        [
          "Manutenção",
          "Treinamento e cobrança da rotina",
          "Revisão periódica das regras e integrações",
          "Revisão frequente de conversas, atualização da base de respostas e ajuste dos limites",
        ],
        [
          "Quando faz mais sentido",
          "Volume baixo, vendas consultivas e negociação",
          "Confirmações, lembretes, distribuição e avisos internos",
          "Muitas dúvidas repetidas e contatos fora do horário",
        ],
      ],
    },
    faqs: [
      {
        q: "Qual CRM vocês usam?",
        a: "Não partimos de uma ferramenta fixa. A escolha considera o tamanho da equipe, os canais de atendimento, o orçamento e o que a sua empresa já usa. Às vezes o melhor caminho é organizar a ferramenta que já existe.",
      },
      {
        q: "A IA vai substituir meu atendente?",
        a: "Não, e não é esse o objetivo. A IA ajuda na primeira resposta, nas perguntas frequentes e na triagem, e passa a conversa para uma pessoa quando o assunto exige. Negociação, fechamento e casos sensíveis ficam com a equipe.",
      },
      {
        q: "É seguro usar IA no WhatsApp da empresa?",
        a: "Pode ser, com cuidados. É preciso definir o que a IA pode responder, revisar conversas com frequência, oferecer saída para atendimento humano e tratar os dados conforme a LGPD. Em clínicas e consultórios, a IA não deve dar orientação de saúde.",
      },
      {
        q: "Qual o investimento para implantar CRM e automações?",
        a: "Depende do número de canais, das integrações e do nível de automação desejado, por isso é definido no diagnóstico. Há também o custo das próprias ferramentas, quando pagas, contratadas diretamente pela sua empresa.",
      },
      {
        q: "Em quanto tempo a equipe se adapta?",
        a: "Varia conforme o tamanho da equipe e o quanto a rotina muda. A adoção tende a ser mais rápida quando o pipeline reflete o processo real e as automações tiram trabalho em vez de criar. Não há prazo garantido; acompanhamos a adesão pelos próprios dados do CRM.",
      },
      {
        q: "Dá para levar os leads dos anúncios direto para o CRM?",
        a: "Na maioria dos casos, sim. Formulários de landing page e formulários instantâneos de anúncio podem ser conectados ao CRM, preservando a origem da campanha, e a viabilidade depende das ferramentas envolvidas. É essa integração que permite medir a [gestão de tráfego pago](/servicos/trafego-pago) até a venda.",
      },
      {
        q: "Preciso trocar o número de WhatsApp da empresa?",
        a: "Nem sempre. Depende da solução escolhida para centralizar o atendimento e das regras do WhatsApp para uso empresarial. Isso é avaliado no diagnóstico, antes de qualquer mudança.",
      },
    ],
    related: ["estruturacao-comercial", "landing-pages", "trafego-pago"],
    segments: ["clinicas-odontologicas", "clinicas-de-estetica", "dermatologistas", "intermediacao-e-revendas"],
    cta: {
      title: "Quantas conversas estão espalhadas no WhatsApp da equipe?",
      text: "No diagnóstico, mapeamos canais, ferramentas e rotinas para mostrar o que pode ser organizado, automatizado e mantido com supervisão humana.",
    },
  },
];
