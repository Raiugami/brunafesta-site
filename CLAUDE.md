# Manutenção — Bruna Festa

Leia também `D:\Sites - Clientes\CLAUDE.md`. Projeto independente da marca Imprima.se. Não reutilizar contatos, domínio ou repositório de outro cliente.

Esta é uma proposta de portfólio fundamentada no site https://brunafesta.carrd.co/. Em 16/10/2026, o proprietário autorizou a publicação desta revisão no repositório público existente `Raiugami/brunafesta-site`, usando https://raiugami.github.io/brunafesta-site/. O domínio personalizado não faz parte desta publicação. Não modificar o Carrd existente.

## Identidade e conteúdo

- Cliente: jornalista e editora de vídeo Bruna Festa. Não confundir o sobrenome Festa com uma empresa de eventos.
- Direção base: editorial, fundo papel, tinta preta e vinho. A exploração de jornal contemporâneo em `conceito-jornal.css` compõe a direção visual desta revisão. Contexto e fontes em `docs/CONCEITO.md`. Diferenciar dados confirmados da interpretação de gosto pessoal.
- Capa atual solicitada pelo proprietário: foto da Bruna centralizada em primeiro plano, com o nome grande por trás. A foto é a protagonista da primeira tela; não recolocar a colagem de trabalhos como destaque da capa. Layout em `hero-portrait.css`, carregado depois de `style.css`.
- O proprietário selecionou `assets/bruna-festa-recorte-jornal.png` como retrato, pediu íris azul-acinzentadas e depois corrigiu as tatuagens da capa usando fotos de referência. A imagem ativa no hero é `assets/bruna-festa-recorte-jornal-tatuagens-integradas.webp` (PNG master ao lado). Os dois mockups do proprietário orientam a escala e posição: preservar as tatuagens dos dois braços, integradas à pele, sem bordas de recorte, seleção do Paint ou fundo branco. Detalhes em `docs/RETRATO-EDITADO.md`.
- A exploração do masthead usa UnifrakturCook, uma alternativa blackletter aberta; licença SIL OFL em `assets/fonts/OFL-UnifrakturCook.txt`. Não redistribuir fontes proprietárias do New York Times.
- A seção Perfil usa `assets/jornal-textura.svg` como fundo de jornal discreto. Preserve o baixo contraste do padrão para manter o texto legível. O retrato único fica na coluna esquerda original, sem carrossel: `assets/bruna-perfil-retrato-individual.webp` usa o retrato mais recente escolhido pelo proprietário, com ajuste sutil de frizz; o PNG transparente master fica ao lado. Os três retratos anteriores do leque permanecem arquivados em `assets/`, mas não são exibidos. Não alterar a estrutura do texto à direita.
- Contato público: `bruna_festa@outlook.com`; TikTok confirmado pelo proprietário: [@brunafesta_](https://www.tiktok.com/@brunafesta_). Na seção de contato, exibir só os ícones clicáveis, sem usuário ou endereço de e-mail visíveis. Não inventar WhatsApp, localização ou perfis sociais adicionais.
- O contato encerra o portfólio com textura discreta de jornal, carimbo gráfico sem texto e uma entrada curta de impressão; respeitar `prefers-reduced-motion`.
- Dados do acervo em `portfolio.data.js`: 41 trabalhos, 38 textos, dois vídeos e um áudio. Preservar títulos, veículo, data e destino. Fotos dos trabalhos são referências do portfólio original; não criar trabalhos falsos com IA.
- O retrato original do portfólio tem 225 × 225 px e continua guardado em `assets/bruna-festa.webp`; a capa e o Perfil usam o recorte escolhido acima, mais nítido e com tatuagens nos dois braços.
- Formação/experiência: apenas informações da biografia pública. Não inventar cargos, períodos, métricas, depoimentos, prêmios ou clientes.
- Sem formulário que envie dados, servidor ou analytics. Links abrem destinos originais; contato por mailto. Não enviar mensagens à cliente sem autorização explícita.

## Código

HTML/CSS/JS/SVG puros; sem build. `style.css` reúne identidade e layouts de desktop/celular; `hero-portrait.css` compõe a capa solicitada; `conceito-jornal.css` é uma proposta isolada ainda em avaliação. `script.js` controla filtros, índice/busca, menu e motion do perfil. `portfolio.data.js` carrega antes dele. Inputs/dados são escapados antes de renderização em HTML.

Para ver: `python -m http.server 4175 --bind 127.0.0.1`. Para validar: `python scripts/verificar_site.py`, `node --check script.js`, `node --check portfolio.data.js`. Testar 360 e 412 px, menu/Escape, foco/teclado, filtros com contagem, busca sem resultados, índice com 41 itens e links corretos. Respeitar `prefers-reduced-motion`, evitar loops, grandes movimentos ou vídeos que carreguem automaticamente.

Fontes locais: Barlow Condensed Black, licença em `assets/fonts/OFL-BarlowCondensed.txt`; demais são fontes do sistema. Arquivos e créditos em `docs/`. Não adicionar frameworks, monitoramento ou dependências ao navegador para uma página estática.

## Quando a publicação for autorizada

Criar repositório próprio. Iniciar a tarefa com Issue, trabalhar em branch e entrar por PR com `Closes #N`, conforme regra da pasta principal. Não publicar em outro repositório de cliente. Configurar GitHub Pages em main/raiz e domínio confirmado; ajustar canonical, og:url, imagem de compartilhamento com o nome/assinatura da jornalista, CNAME, robots e sitemap com a URL real. Verificar HTTPS, redirecionamento e assets.

Não publicar screenshots de QA, diretórios temporários, credenciais ou orçamento. Orçamento só após confirmar valores/dados/validade com o proprietário. Atualizar README com URLs finais e estado real da publicação.
