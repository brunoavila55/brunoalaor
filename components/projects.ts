export type Project = {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  challenge: string;
  approach: string;
  features: string[];
  tags: string[];
  url: string;
  linkLabel: string;
  image: string;
};
export const projects: Project[] = [
  {
    id: "mimic",
    name: "Mimic",
    category: "Software open source",
    tagline: "Sua rede muda. Seu histórico fica.",
    description:
      "Projeto open source para automatizar e versionar backups de configurações de rede. Código público para conhecer a implementação e contribuir.",
    challenge:
      "Configurações de switches, roteadores, OLTs e firewalls mudam todos os dias. Manter o histórico e encontrar diferenças manualmente torna a operação mais difícil.",
    approach:
      "Uma plataforma que conecta aos equipamentos via SSH, agenda capturas, versiona configurações e centraliza a visibilidade da operação. Código aberto para explorar por dentro.",
    features: [
      "Código-fonte público no GitHub, aberto a contribuições",
      "Backups agendados e inventário de equipamentos",
      "Comparação visual entre versões de configurações",
      "Auditoria, alertas e controle de acesso por perfil",
    ],
    tags: ["Open source", "Go", "PostgreSQL", "Docker"],
    url: "https://github.com/brunoavila55/mimic_backup",
    linkLabel: "Ver código-fonte no GitHub",
    image: "/projects/mimic.webp",
  },
];
