# Direção visual e experiência

## Conceito

Um portfólio de alguém que conecta a infraestrutura ao produto digital. A composição parte da pessoa e do trabalho: retrato fornecido, tipografia FinalSix, uma órbita como representação de conexões e uma galeria com a identidade real de cada projeto.

A abertura é assimétrica, com mensagem à esquerda e retrato à direita. O Mimic ocupa a área seguinte, com imagem e descrição lado a lado, destaque para open source e acesso direto ao repositório. A Tiiv aparece em uma seção própria como conceito de marca. A apresentação pessoal vem depois do trabalho. O contato encerra a página em uma superfície azul contínua.

## Tokens

| Função | Cor |
| --- | --- |
| Fundo | `#121821` |
| Texto | `#e3e9f2` |
| Ação e identidade | `#95a5ff` |
| Texto secundário | `#a1adbd` |
| Superfície secundária | `#18222f` |
| Divisórias | `#303b4b` |

FinalSix Heavy sustenta a abertura; Bold organiza os títulos; Medium marca ações; Book conduz os textos. As fontes locais foram convertidas para WOFF2 para reduzir o tamanho transferido.

## Revisão do conceito

O conteúdo original tinha estrutura de currículo. A nova hierarquia prioriza projetos, contexto e acesso ao trabalho real. A apresentação profissional combina uma narrativa curta com as seis habilidades do currículo, descritas por sua aplicação prática: Linux, Docker, Proxmox, Redes, Observabilidade e PostgreSQL. Go, Python, APIs e IA aplicada conectam esse repertório aos projetos. A trajetória completa fica acessível pelo LinkedIn.

O Mimic usa elementos de rede e terminal para conectar sua identidade à infraestrutura. A Tiiv mantém o símbolo do dragão na apresentação do conceito de marca. A continuidade vem da tipografia e do espaçamento. A paleta de grafite azulado reduz a luminosidade da página, com azul claro nos destaques e azul mais fechado nas ações e no contato. A fotografia fornecida é reutilizada em escala de cinza, com recorte feito pelo CSS.

## Psicologia aplicada

Referência de pesquisa: [Awesome Design Resources List](https://github.com/darelova/Awesome-Design-Resources-List), especialmente as seções de inspiração, tipografia, UX, animação e acessibilidade, e os recursos [Laws of UX](https://lawsofux.com/) e [The Psychology of Design](https://growth.design/psychology).

| Princípio | Aplicação no portfólio |
| --- | --- |
| Hierarquia visual e atenção seletiva | Nome, proposta, foto e uma ação principal na abertura. |
| Lei de Hick e carga cognitiva | Um projeto open source em destaque e três destinos principais na navegação. |
| Divulgação progressiva | A galeria oferece um resumo; os detalhes de contexto e construção aparecem ao abrir um projeto. |
| Lei de Fitts | A área visual inteira do projeto funciona como botão. Ações principais têm áreas de toque amplas. |
| Proximidade e região comum | Nome, descrição, categorias e detalhes permanecem agrupados por projeto. |
| Efeito Von Restorff | Ação principal em azul e encerramento azul diferenciam os próximos passos. |
| Reconhecimento e familiaridade | LinkedIn, GitHub, links externos e fechamento de diálogo usam convenções reconhecíveis. |
| Efeito de posição serial | Abertura com identidade clara e encerramento com contato direto. |
| Regra do pico e do fim | Retrato com órbitas como momento visual principal; contato com tipografia grande e ação imediata no final. |
| Feedback | Confirmação de cópia do e-mail, estados de foco e retorno ao botão ao fechar um projeto. |

Esses princípios orientam a composição. Qualquer impacto em conversão precisará ser medido com uso real.

## Movimento

- Entrada tipográfica orquestrada com GSAP.
- Perspectiva do retrato controlada pelo ponteiro, com retorno suave à posição inicial.
- Órbita, asterisco e marca d'água respondendo à rolagem.
- Lenis sincronizado ao ticker GSAP.
- React Bits Magnet nos principais convites à ação.
- React Bits DecryptedText na assinatura, ativado por hover.
- Habilidades: título revelado palavra por palavra, entrada dos cartões pela rolagem, ícones flutuantes apenas enquanto visíveis e perspectiva/brilho controlados pelo ponteiro.
- Movimento reduzido: conteúdo completo sem transições de entrada, flutuação, perspectiva ou rolagem suavizada.

## Materiais e origem

- Retrato: arquivo fornecido pelo proprietário em Downloads, convertido para WebP.
- FinalSix: fontes fornecidas na pasta `fonts/`.
- Mimic: identidade extraída do ZIP fornecido. Funcionalidades confirmadas no [repositório oficial](https://github.com/brunoavila55/mimic_backup).
- Tiiv: logotipo e símbolo extraídos do ZIP fornecido. Posicionamento consultado em [tiiv.com.br](https://www.tiiv.com.br/).
- React Bits: [Magnet](https://github.com/DavidHDev/react-bits/tree/main/src/content/Animations/Magnet) e [DecryptedText](https://github.com/DavidHDev/react-bits/tree/main/src/content/TextAnimations/DecryptedText). Licença original preservada em `components/react-bits/LICENSE.md`.
- Ícones de marcas: Font Awesome Free, já presentes no projeto; licença preservada em `public/contact-icons/LICENSE.txt`.
- Demais ícones: Lucide React.
