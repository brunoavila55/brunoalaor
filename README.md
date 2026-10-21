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
npm start           # servir a compilação de produção
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

Cada projeto abre um diálogo nativo com contexto, construção, funcionalidades e link externo real. Escape fecha o diálogo, o foco volta para o botão original e a rolagem da página é restaurada. LinkedIn e GitHub aparecem na navegação, na abertura e no contato. O e-mail pode ser copiado, com confirmação acessível e alternativa visível em caso de falha.

Os perfis e o contato foram aproveitados do conteúdo existente: LinkedIn `/in/brunoalaor/`, GitHub `brunoavila55` e `contato@brunoalaor.com.br`.

A raiz agora produz uma aplicação Next.js. Para publicar, use um ambiente compatível com Next.js/Node; o antigo processo Vite/Worker está arquivado em `legado/`.

## Referências

As decisões visuais, os princípios de UX e a origem dos materiais estão registrados em [`docs/design.md`](./docs/design.md).
