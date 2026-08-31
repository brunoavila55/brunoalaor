// Perfil, trajetória profissional e competências informados por Bruno.
// Registros com demo: true continuam como exemplos. Links externos devem usar HTTPS.

export const profile = {
  name: "Bruno Alaor",
  handle: "brunoalaor",
  location: "Brasil",
  role: "Infraestrutura, Redes e Observabilidade",
  availability: "",
  summary:
    "Infraestrutura interna de provedor de internet: servidores, virtualização, monitoramento e sistemas de negócio.",
  intro:
    "Trabalho com a infraestrutura interna de um provedor de internet: servidores Linux, virtualização, monitoramento e sistemas de negócio.",
  bio: [
    "Atuo no NOC da New Life Fibra, com foco em manter a operação do provedor estável e confiável.",
    "Trabalho com infraestrutura e monitoramento, lidando com o ambiente operacional e garantindo a disponibilidade dos serviços.",
    "Trabalho com monitoramento utilizando Zabbix e Grafana, criando dashboards e acompanhando a rede para antecipar falhas.",
    "Na parte de dados, utilizo SQL para estruturar informações operacionais e criar dashboards que auxiliam na análise e tomada de decisão.",
    "Ao longo das atividades, atuo na melhoria contínua da infraestrutura do ISP, trabalhando na expansão de capacidade, substituição de equipamentos e otimização da rede para garantir melhor desempenho e estabilidade.",
    "Também participo de iniciativas de modernização do ambiente, incluindo migração de serviços para containers, além do desenvolvimento de scripts em Python e APIs em Go para integração de sistemas e automação de rotinas.",
    "Mais recentemente, tenho explorado o uso de LLMs integrados a sistemas de helpdesk para automação de fluxos de suporte.",
  ],
  avatar: "/avatar.png",
  email: "contato@brunoalaor.com.br",
  github: "https://github.com/brunoavila55",
  linkedin: "https://www.linkedin.com/in/brunoalaor/",
  whatsapp: "+55 55 999 572 116",
};

export const career = [
  {
    id: "current",
    status: "current",
    demo: false,
    role: "Analista de Infraestrutura",
    company: "New Life Fibra",
    companyLogo: "/brand/new-life-fibra.webp",
    location: "São Gabriel, RS",
    period: "fev/2024 – atual",
    description:
      "Atuação na sustentação, escalabilidade e resiliência da infraestrutura interna do provedor, com foco em disponibilidade, desempenho e melhoria contínua dos serviços.",
    highlights: [
      {
        id: "linux-open-source",
        title: "Linux e soluções Open Source",
        description:
          "Administração de servidores Ubuntu e RHEL e implementação de ferramentas de helpdesk, wiki e comunicação, com foco em disponibilidade e redução de custos de licenciamento.",
      },
      {
        id: "infrastructure",
        title: "Evolução da infraestrutura",
        description:
          "Participação em expansões de capacidade, substituição de equipamentos e otimização da rede e dos virtualizadores para melhorar desempenho e estabilidade.",
      },
      {
        id: "monitoring",
        title: "Monitoramento e telemetria",
        description:
          "Implementação de telemetria e dashboards com Zabbix e Grafana para acompanhar a infraestrutura e os indicadores operacionais.",
      },
      {
        id: "virtualization",
        title: "Virtualização e containers",
        description:
          "Gestão de ambientes com Proxmox e Docker, com otimização dos recursos de hardware e migração de serviços para containers.",
      },
      {
        id: "databases-bi",
        title: "Bancos de dados e BI",
        description:
          "Gestão de bases utilizadas nas rotinas operacionais, desenvolvimento de consultas SQL e construção de dashboards para análise e acompanhamento de indicadores.",
      },
      {
        id: "corporate-networks",
        title: "Redes corporativas",
        description:
          "Configuração de roteadores profissionais e planejamento de redes corporativas, considerando os requisitos de conectividade, segurança e capacidade de cada ambiente.",
      },
      {
        id: "business-systems",
        title: "Sistemas de negócio",
        description:
          "Administração do ERP, configuração e suporte à telefonia PABX IP e manutenção de ferramentas de comunicação automatizada, como chatbots.",
      },
      {
        id: "applied-ai",
        title: "Exploração de IA aplicada",
        description:
          "Desenvolvimento e testes de integrações com modelos de linguagem (LLMs) para automatizar fluxos de helpdesk e suporte técnico.",
      },
    ],
  },
  {
    id: "previous-01",
    status: "previous",
    demo: false,
    role: "Suporte Técnico",
    company: "New Life Fibra",
    companyLogo: "/brand/new-life-fibra.webp",
    location: "São Gabriel, RS",
    period: "nov/2022 – fev/2024",
    description:
      "Atendimento técnico a clientes residenciais e corporativos, com foco no diagnóstico de conectividade, na resolução de incidentes e na qualidade do atendimento.",
    highlights: [
      {
        id: "user-support",
        title: "Suporte ao usuário",
        description:
          "Diagnóstico e resolução de problemas de conectividade em redes residenciais e suporte à configuração básica de roteadores.",
      },
      {
        id: "business-support",
        title: "Atendimento corporativo (B2B)",
        description:
          "Suporte especializado a grandes contas, com atenção aos SLAs e à resolução de incidentes complexos.",
      },
      {
        id: "tcp-ip",
        title: "Redes TCP/IP",
        description:
          "Aplicação de fundamentos de redes para identificar falhas de sinal, autenticação e conectividade.",
      },
      {
        id: "incident-documentation",
        title: "Documentação de chamados",
        description:
          "Registro detalhado dos incidentes no sistema de gestão, mantendo o histórico para continuidade do atendimento e encaminhamento aos demais níveis de suporte.",
      },
    ],
  },
];

export const workProjects = [
  {
    id: "infrastructure-modernization",
    title: "Modernização da infraestrutura",
    description:
      "Participação na migração de serviços para containers, na padronização dos virtualizadores e em expansões de capacidade.",
    icon: "infrastructure",
  },
  {
    id: "telemetry-observability",
    title: "Telemetria e observabilidade",
    description:
      "Implementação de Zabbix e Grafana, com painéis de rede e de indicadores operacionais.",
    icon: "monitoring",
  },
];

export const skills = [
  {
    id: "linux",
    name: "Linux",
    category: "Infraestrutura",
    kind: "Sistemas operacionais",
    demo: false,
    description:
      "Administração de servidores Linux e dos serviços que compõem a infraestrutura interna.",
    uses: [
      "Servidores Ubuntu e RHEL",
      "Administração de serviços",
      "Automação de rotinas com scripts",
    ],
    evidence:
      "No provedor, administro ambientes Ubuntu e RHEL utilizados pelos sistemas de negócio e escrevo scripts em Python para automatizar tarefas recorrentes.",
    projectUrl: "",
  },
  {
    id: "docker",
    name: "Docker",
    category: "Infraestrutura",
    kind: "Containers",
    demo: false,
    description:
      "Organização e execução de serviços em containers, com isolamento de aplicações e suas dependências.",
    uses: [
      "Execução de serviços em containers",
      "Configuração de ambientes",
      "Migração de serviços",
    ],
    evidence:
      "Participo da migração de serviços para containers na modernização da infraestrutura interna do provedor.",
    projectUrl: "",
  },
  {
    id: "proxmox",
    name: "Proxmox",
    category: "Infraestrutura",
    kind: "Virtualização",
    demo: false,
    description:
      "Administração de ambientes virtualizados e dos recursos de infraestrutura destinados aos serviços internos.",
    uses: [
      "Ambientes virtualizados",
      "Organização de recursos",
      "Padronização de virtualizadores",
    ],
    evidence:
      "Administro ambientes em Proxmox e participo da padronização dos virtualizadores e de expansões de capacidade.",
    projectUrl: "",
  },
  {
    id: "networks",
    name: "Redes",
    category: "Redes",
    kind: "Conectividade",
    demo: false,
    description:
      "Suporte à conectividade e acompanhamento da rede, do atendimento técnico à infraestrutura interna.",
    uses: [
      "Diagnóstico de conectividade",
      "Suporte residencial e corporativo",
      "Acompanhamento de indicadores de rede",
    ],
    evidence:
      "Comecei no suporte técnico a clientes residenciais e corporativos. Hoje atuo na infraestrutura interna do provedor, com monitoramento de rede e serviços.",
    projectUrl: "",
  },
  {
    id: "observability",
    name: "Observabilidade",
    category: "Monitoramento",
    kind: "Telemetria e dashboards",
    demo: false,
    description:
      "Monitoramento de infraestrutura e visualização de dados para acompanhar a rede e os indicadores operacionais.",
    uses: [
      "Monitoramento com Zabbix",
      "Dashboards em Grafana",
      "Telemetria e indicadores operacionais",
    ],
    evidence:
      "Implementei Zabbix e Grafana com painéis de rede e de indicadores operacionais para apoiar o acompanhamento dos serviços.",
    projectUrl: "",
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "Dados",
    kind: "Banco de dados relacional",
    demo: false,
    description:
      "Consultas e organização de dados em PostgreSQL para apoiar sistemas de negócio e a análise de informações operacionais.",
    uses: [
      "Consultas SQL",
      "Relacionamento e agregação de dados",
      "Dados para painéis operacionais",
    ],
    evidence:
      "Escrevo consultas SQL e preparo informações para painéis de apoio à operação, conectando os dados dos sistemas às necessidades do dia a dia.",
    projectUrl: "",
  },
];

export const certifications = [
  {
    id: "development",
    title: "Sua certificação",
    category: "Desenvolvimento",
    issuer: "Instituição a informar",
    issuedAt: "",
    credentialId: "",
    credentialUrl: "",
    demo: true,
    description:
      "Adicione o nome da certificação e o que ela comprova sobre sua formação em desenvolvimento.",
  },
  {
    id: "tools",
    title: "Sua formação complementar",
    category: "Ferramentas",
    issuer: "Instituição a informar",
    issuedAt: "",
    credentialId: "",
    credentialUrl: "",
    demo: true,
    description:
      "Um espaço para outro certificado da sua trajetória. Preencha a instituição, a data e o link da credencial.",
  },
  {
    id: "specialization",
    title: "Sua especialização",
    category: "Formação",
    issuer: "Instituição a informar",
    issuedAt: "",
    credentialId: "",
    credentialUrl: "",
    demo: true,
    description:
      "Apresente a especialização, a instituição e os conhecimentos desenvolvidos ao longo da formação.",
  },
];

export const projects = [
  {
    id: "mimic",
    name: "Mimic",
    subtitle: "Automação de backups de rede",
    description:
      "Plataforma para automatizar e centralizar backups de configuração de roteadores, switches e outros equipamentos de rede, com histórico de versões e comparação de alterações.",
    features: [
      "Rotinas agendadas",
      "Histórico e comparação",
      "Alertas e acompanhamento",
    ],
    status: "Em uso diário",
    impact:
      "Já está em operação em um provedor de internet, ajudando diariamente a empresa com os backups dos equipamentos de rede.",
    stack: ["Go", "PostgreSQL", "Docker"],
    demo: false,
    sourceUrl: "https://github.com/brunoavila55/mimic_backup",
  },
  {
    id: "orbit",
    name: "Orbit",
    subtitle: "Um espaço para organizar o próximo grande passo.",
    category: "Aplicações",
    type: "Aplicação web",
    color: "mint",
    stack: ["Vue 3", "TypeScript", "CSS"],
    description:
      "Conceito de um workspace de produtividade, com tarefas, projetos e uma interface que deixa o foco no que importa. Este é um projeto demonstrativo para apresentar o layout do portfólio.",
    demo: true,
    liveUrl: "",
    sourceUrl: "",
  },
  {
    id: "nexus",
    name: "Nexus",
    subtitle: "Informações organizadas para decisões melhores.",
    category: "Interfaces",
    type: "Painel de gestão",
    color: "purple",
    stack: ["Vue 3", "UI Design"],
    description:
      "Conceito de um painel corporativo para acompanhar projetos, indicadores e atividades de uma equipe. Projeto demonstrativo para apresentar a interface, pronto para receber um caso real.",
    demo: true,
    liveUrl: "",
    sourceUrl: "",
  },
  {
    id: "forma",
    name: "Forma",
    subtitle: "Menos ruído. Mais design.",
    category: "Websites",
    type: "Website criativo",
    color: "sand",
    stack: ["Vue 3", "CSS"],
    description:
      "Conceito de um website editorial para um estúdio criativo. Tipografia, contraste e espaço em branco dão ritmo à experiência. Projeto demonstrativo para a primeira versão do portfólio.",
    demo: true,
    liveUrl: "",
    sourceUrl: "",
  },
];
