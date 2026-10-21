# Bruno Alaor — Portfólio

Portfólio em português, com Next.js App Router, React, TypeScript, Tailwind CSS, GSAP, Lenis e componentes do React Bits. A versão anterior em Vue/Vite está preservada em [`legado/`](./legado/).

## Desenvolvimento

Requer Node.js 22.13 ou superior.

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

```bash
npm run build       # compilação de produção e verificação TypeScript
npm start           # prévia local da build no runtime do Workers
npm run typecheck   # verificar os tipos
npm run test:e2e    # interações em desktop e celular
```

Os testes usam Chromium. Se necessário, instale o navegador com `npx playwright install chromium`. A configuração inicia o servidor de desenvolvimento ou reutiliza um servidor em localhost:3000.

## Estrutura

- `app/`: página, layout, metadados, ícone, imagem de compartilhamento e estilos com Tailwind CSS.
- `components/Portfolio.tsx`: navegação, galeria, detalhes dos projetos, apresentação e contato.
- `components/Skills.tsx`: habilidades do currículo com ferramentas e exemplos de aplicação no trabalho.
- `components/OrbitPortrait.tsx`: foto e órbitas com interação de perspectiva.
- `components/projects.ts`: textos, categorias, tecnologias e link do Mimic, projeto open source. A Tiiv aparece separadamente como conceito de marca.
- `components/react-bits/`: Magnet e DecryptedText do React Bits, com a licença original e declarações TypeScript.
- `fonts/`: fontes FinalSix fornecidas. As versões WOFF2 foram convertidas das OTF e são servidas localmente com `next/font`.
- `public/projects/`: identidades fornecidas para Mimic/Tiiv.
- `tests/`: testes Playwright de navegação, diálogos, foco, contato, movimento reduzido e adaptação de 320 a 1920 pixels.
- `legado/`: código, configurações e imagens da aplicação anterior; fora da compilação Next.js.

## Experiência

A animação de entrada usa GSAP. A rolagem Lenis compartilha o relógio com GSAP e sincroniza os efeitos de rolagem. O retrato responde ao ponteiro, os botões usam Magnet e o texto de assinatura usa DecryptedText. As animações respeitam a preferência por movimento reduzido.

Cada projeto abre um diálogo nativo com contexto, construção, funcionalidades e link externo real. Escape fecha o diálogo, o foco volta para o botão original e a rolagem da página é restaurada. LinkedIn e GitHub aparecem na navegação, na abertura e no contato. O WhatsApp usa o número (55) 99957-2116, com atalho no contato e botão flutuante. O e-mail pode ser copiado, com confirmação acessível e alternativa visível em caso de falha.

Os perfis e o contato foram aproveitados do conteúdo existente: LinkedIn `/in/brunoalaor/`, GitHub `brunoavila55` e `contato@brunoalaor.com.br`.

## Cloudflare Workers

A build exporta o Next.js como site estático. Imagens WebP e fontes locais são servidas diretamente, e as animações e interações continuam no navegador.

- Worker existente: `brunoalaor`.
- Build na Cloudflare: `npm run build`.
- Deploy: `npm run deploy` (ou `npx wrangler deploy`).
- Verificação local de empacotamento: `npm run deploy:check`.
- Node.js: 22, definido em `.node-version`.

A configuração principal é `wrangler.json`. A build também gera `dist/client/`, `dist/server/index.js` e `dist/server/wrangler.json`, preservando o caminho de deploy da versão anterior. Assim, um comando existente como `npx wrangler deploy --config dist/server/wrangler.json` também funciona.

O Next.js gera primeiro `out/`; `scripts/build-worker.mjs` prepara os arquivos de deploy em `dist/`. Use `npm start` para verificar essa saída no Workers local. O portfólio não depende de um servidor Next.js ou do endpoint `/_next/image` em produção.

## Referências

As decisões visuais, os princípios de UX e a origem dos materiais estão registrados em [`docs/design.md`](./docs/design.md).
