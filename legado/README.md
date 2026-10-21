# Bruno Alaor · Portfólio profissional

Portfólio corporativo em **Vue 3 + Vite**, com experiência profissional, competências técnicas, apresentação e contato. Identidade visual própria, foto de Bruno e capa panorâmica. Layout responsivo com barra lateral direita, sem navbar no topo.

Repositório: [brunoavila55/brunoalaor](https://github.com/brunoavila55/brunoalaor).

## Rodar localmente

Node.js 22.13 ou superior.

```sh
git clone https://github.com/brunoavila55/brunoalaor.git
cd brunoalaor
npm install
npm run dev
```

O servidor local abre em `http://127.0.0.1:5173`. Para gerar a versão de produção, execute `npm run build`. Para visualizar a produção localmente, execute `npm run preview`.

**Execução atual: somente local.** O código é mantido no GitHub; o envio ao repositório não publica o site. Os arquivos de hospedagem existentes foram preservados, sem nova implantação.

## Personalizar

- **`app/content.js`**: perfil, histórico profissional, competências, certificações e projetos.
- **`app/CareerPanel.vue`**: cargo atual, responsabilidades, contribuições e histórico de experiências anteriores.
- **`app/CollectionPanel.vue`**: filtros e detalhes de competências.
- **`app/ProjectsPanel.vue`**: projetos reais, com descrição, tecnologias, uso prático e link para o repositório.
- **`app/SkillIcon.vue`**: SVGs fornecidos por Bruno, compartilhados entre a lista e a barra lateral. Os painéis de detalhes não exibem ícones. Os arquivos ficam em `public/skills`; `networkx.svg` representa Redes e `azure-metrics.svg` representa Observabilidade, sem acrescentar essas ferramentas às competências descritas.
- **`app/App.vue`**: estrutura, navegação, apresentação e contato.
- **`app/ContactIcon.vue`**: ícones de contato; marcas do Font Awesome 6.7.2 em `public/contact-icons`, com licença incluída, e ícone de e-mail do Lucide.
- **`app/globals.css`**: tema, tipografia, espaçamento e responsividade.
- **Paleta original restaurada**: fundo `#0C111B`, superfícies azul-escuras, texto claro e destaque verde-menta `#86D6BE`. As variáveis `--background`, `--card`, `--foreground` e `--accent` centralizam o tema. Layout, barra direita, foto e logos foram mantidos.
- **`public/avatar.png`**: foto fornecida por Bruno, preservada sem alterações.
- **`public/brand/new-life-fibra.webp`**: logo fornecida da New Life Fibra, exibida no cargo atual e na experiência anterior, com a proporção preservada.
- **`public/cover.png`**: capa original do projeto.
- **`public/brand/logo-on-dark.svg`**: logo clara fornecida por Bruno, usada na lateral, no rodapé e como alternativa à foto do perfil. `logo-on-light.svg` guarda a versão para fundos claros.
- **`public/favicon-32.png`**, **`public/favicon.png`** e **`public/apple-touch-icon.png`**: favicon fornecido, preparado em 32, 192 e 180 pixels.
- **`index.html`**: título, descrição, ícones e metadados de compartilhamento.
- **`public/og.png`**: imagem de compartilhamento original, restaurada junto com a primeira paleta.

### Informações profissionais

Os registros com `demo: true` são exemplos identificados, não declarações sobre a carreira de Bruno. Confirme os dados antes de remover esse sinalizador.

O cabeçalho, o texto Sobre, a trajetória profissional e as competências usam as informações fornecidas por Bruno Alaor Ávila. A experiência na New Life Fibra inclui Analista de Infraestrutura (fev/2024 – atual) e Suporte Técnico (nov/2022 – fev/2024), em São Gabriel, RS. A seção de certificações e o quadro correspondente na lateral foram removidos; os dados de exemplo permanecem no código, sem exibição.

- `career`: cargo (`role`), empresa (`company`), localização (`location`), período (`period`) e descrição. Use `status: "current"` no cargo atual e `status: "previous"` nas experiências anteriores. `focus` descreve a área de atuação; `highlights` contém responsabilidades e contribuições, com título e descrição.
- `skills`: Linux, Docker, Proxmox, Redes, Observabilidade e PostgreSQL, com categoria, descrição e conhecimentos (`uses`). `evidence` descreve uma aplicação prática e `projectUrl` pode apontar para um projeto real. Os ícones são associados pelo `id` em `SkillIcon.vue`.
- `certifications`: título, categoria, instituição (`issuer`), emissão (`issuedAt`), código (`credentialId`) e link (`credentialUrl`).
- `projects`: o Mimic apresenta automação de backups de configurações de rede, com Go, PostgreSQL e Docker, conforme o repositório. O uso diário em um provedor foi informado por Bruno. Orbit, Nexus e Forma permanecem como dados demonstrativos no código e não são exibidos; o painel mostra somente registros com `demo: false`.
- `workProjects`: título e descrição das participações profissionais confirmadas. Dados preservados no código, sem exibição no site.

Cada registro deve ter um `id` único. Links externos devem usar HTTPS; campos vazios não geram links fictícios. LinkedIn, GitHub, e-mail e WhatsApp usam os contatos fornecidos por Bruno em `profile`.

## Interações e acessibilidade

Após a hero, as seções aparecem na ordem Sobre mim → Competências → Projetos → Experiência profissional, em uma página contínua. O quadro de navegação foi removido; a barra lateral direita mantém resumo profissional, competências e contato. Os links desses quadros rolam até os respectivos conteúdos, sem ocultar nada. A lateral permanece no fluxo normal da página, sem posição fixa, sobreposição ou rolagem interna. O cabeçalho exibe quatro links diretos com ícones: LinkedIn, GitHub, E-mail e WhatsApp. O bloco de contato duplicado no final foi removido; a âncora `#contact` aponta para os links do cabeçalho. O retorno ao topo continua funcionando.

Filtros de competências e detalhes de experiência funcionam localmente; o contato fica na própria página. O layout considera telas pequenas, navegação por teclado e preferência por movimento reduzido.

Contato e links externos são habilitados ao preencher os dados. Não há formulário, backend de mensagens, login ou rastreamento.

## Estrutura técnica

A interface é uma SPA Vue. `vite build` gera `dist/client`; `scripts/build-worker.mjs` acrescenta a entrada ESM em `dist/server`. O plugin Sites preserva os metadados existentes de hospedagem.

Fontes: DM Sans e Space Grotesk. Ícones: Lucide. Capa: arte original gerada por IA.

A seção Projetos foi retomada para apresentar o Mimic, com link para https://github.com/brunoavila55/mimic_backup. Os antigos projetos demonstrativos e os blocos de projetos no trabalho continuam sem exibição.
