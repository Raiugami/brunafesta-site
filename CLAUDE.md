# Manutenção — Bruna Festa

Leia também `D:\Sites - Clientes\CLAUDE.md`. Projeto independente da marca Imprima.se. Não reutilizar contatos, domínio ou repositório de outro cliente.

Esta é uma proposta local de portfólio, fundamentada no site https://brunafesta.carrd.co/. O conceito ainda não foi aprovado pela cliente. Não criar repositório remoto ou publicar sem confirmar nome, visibilidade e domínio com o proprietário. Não modificar o Carrd existente.

## Identidade e conteúdo

- Cliente: jornalista e editora de vídeo Bruna Festa. Não confundir o sobrenome Festa com uma empresa de eventos.
- Direção proposta: editorial/fanzine, fundo papel, tinta preta e vinho. Contexto e fontes em `docs/CONCEITO.md`. Diferenciar dados confirmados da interpretação de gosto pessoal.
- Capa atual solicitada pelo proprietário: foto da Bruna centralizada em primeiro plano, com o nome grande por trás. A foto é a protagonista da primeira tela; não recolocar a colagem de trabalhos como destaque da capa. Layout em `hero-portrait.css`, carregado depois de `style.css`.
- Retrato restaurado e recortado com IA a pedido do proprietário: `assets/bruna-festa-recorte-web.webp` na capa. Master de 4096 px em `assets/bruna-festa-recorte-4k.png`; usar a versão WebP no navegador para evitar carregar o master de 13 MB. Prompts e limitações em `docs/RETRATO-EDITADO.md`.
- Contato público: `bruna_festa@outlook.com`. Não inventar WhatsApp, localização ou perfis sociais adicionais.
- Dados do acervo em `portfolio.data.js`: 41 trabalhos, 38 textos, dois vídeos e um áudio. Preservar títulos, veículo, data e destino. Fotos dos trabalhos são referências do portfólio original; não criar trabalhos falsos com IA.
- O retrato original tem 225 × 225 px. Pedir arquivo melhor apenas se a cliente quiser uma apresentação fotográfica maior. Não gerar uma pessoa substituta.
- Formação/experiência: apenas informações da biografia pública. Não inventar cargos, períodos, métricas, depoimentos, prêmios ou clientes.
- Sem formulário que envie dados, servidor ou analytics. Links abrem destinos originais; contato por mailto. Não enviar mensagens à cliente sem autorização explícita.

## Código

HTML/CSS/JS/SVG puros; sem build. `style.css` reúne identidade e layouts de desktop/celular. `script.js` controla filtros, índice/busca, menu e cópia de e-mail. `portfolio.data.js` carrega antes dele. Inputs/dados são escapados antes de renderização em HTML.

Para ver: `python -m http.server 4175 --bind 127.0.0.1`. Para validar: `python scripts/verificar_site.py`, `node --check script.js`, `node --check portfolio.data.js`. Testar 360 e 412 px, menu/Escape, foco/teclado, filtros com contagem, busca sem resultados, índice com 41 itens e links corretos. Respeitar `prefers-reduced-motion`, evitar loops, grandes movimentos ou vídeos que carreguem automaticamente.

Fontes locais: Barlow Condensed Black, licença em `assets/fonts/OFL-BarlowCondensed.txt`; demais são fontes do sistema. Arquivos e créditos em `docs/`. Não adicionar frameworks, monitoramento ou dependências ao navegador para uma página estática.

## Quando a publicação for autorizada

Criar repositório próprio. Iniciar a tarefa com Issue, trabalhar em branch e entrar por PR com `Closes #N`, conforme regra da pasta principal. Não publicar em outro repositório de cliente. Configurar GitHub Pages em main/raiz e domínio confirmado; ajustar canonical, og:url, imagem de compartilhamento com o nome/assinatura da jornalista, CNAME, robots e sitemap com a URL real. Verificar HTTPS, redirecionamento e assets.

Não publicar screenshots de QA, diretórios temporários, credenciais ou orçamento. Orçamento só após confirmar valores/dados/validade com o proprietário. Atualizar README com URLs finais e estado real da publicação.
