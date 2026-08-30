# Bruno Alaor · Portfólio

Portfólio pessoal em **Vue 3 + Vite**, com Composition API, CSS responsivo e ícones Lucide. Identidade visual própria inspirada na organização de perfis de jogos: capa panorâmica, avatar, vitrine, inventário de tecnologias e detalhes dos projetos.

## Rodar

Node.js 22.13 ou superior.

```sh
npm install
npm run dev
```

O servidor local abre em `http://127.0.0.1:5173`. Para gerar a versão de produção, execute `npm run build`. Para visualizar a produção localmente, execute `npm run preview`.

## Personalizar

- **`app/content.js`**: nome, apresentação, localização, foto, contatos, projetos, tecnologias e links. Os campos de contato estão vazios de propósito. Use URLs HTTPS completas em GitHub, LinkedIn e links de projetos.
- **`app/App.vue`**: estrutura da página, detalhes dos projetos e apresentação visual das miniaturas. Os três projetos atuais são conceitos demonstrativos, identificados na interface, sem métricas ou histórico profissional inventados.
- **`app/globals.css`**: cores, tipografia, espaçamento e regras responsivas.
- **`public/cover.png`**: capa original gerada para este projeto. Para usar uma foto, coloque-a em `public/` e informe seu caminho em `profile.avatar` (exemplo: `/avatar.jpg`).
- **`index.html`**: título, descrição e metadados de compartilhamento.
- **`public/brand/logo-on-dark.svg`**: logo clara fornecida por Bruno, usada no avatar, menu lateral e rodapé. O SVG original mantém a nitidez em qualquer tamanho. `logo-on-light.svg` guarda a versão escura para fundos claros.
- **`public/favicon-32.png`**, **`public/favicon.png`** e **`public/apple-touch-icon.png`**: versões de 32, 192 e 180 pixels do favicon PNG fornecido, redimensionadas sem alterar o desenho.

Filtros de projetos, navegação entre seções e diálogos funcionam localmente. Contato e links externos são habilitados ao preencher os dados; não há formulário, backend de mensagens, login ou rastreamento.

Os diálogos usam o elemento nativo `dialog`, incluindo Escape, foco modal e retorno de foco. O layout considera telas pequenas, navegação por teclado e a preferência por movimento reduzido.

## Publicação

A interface é uma SPA Vue, sem React. `vite build` gera `dist/client`; `scripts/build-worker.mjs` acrescenta uma entrada ESM compatível com Cloudflare Workers em `dist/server`. O plugin Sites inclui os metadados de hospedagem em `dist/.openai`.

Fontes: DM Sans e Space Grotesk (Google Fonts). Ícones: Lucide. Capa: arte original gerada por IA. Nenhum logo, imagem, código ou nome de produto da Steam foi usado.

Os nomes Orbit, Nexus e Forma identificam conceitos visuais de exemplo, não produtos reais ou marcas registradas do autor. Substitua-os pelos seus projetos antes da divulgação pública.
