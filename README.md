# Bruna Festa — Portfólio

Proposta de site e identidade visual para a jornalista e editora de vídeo Bruna Festa. Referência: https://brunafesta.carrd.co/.

**Publicação:** repositório público `Raiugami/brunafesta-site`; URL confirmada: https://raiugami.github.io/brunafesta-site/. GitHub Pages publica a branch `main`, na raiz, com HTTPS. O domínio personalizado não faz parte desta publicação. A versão Carrd não foi modificada.

**Direção editorial:** linguagem de jornal/revista, preservando o retrato central e a identidade visual do portfólio. Os detalhes e as decisões de imagem estão em [docs/CONCEITO.md](docs/CONCEITO.md) e [docs/RETRATO-EDITADO.md](docs/RETRATO-EDITADO.md).

## Visualizar

Nesta pasta, executar `python -m http.server 4175 --bind 127.0.0.1` e abrir http://127.0.0.1:4175/.

## Conteúdo e experiência

Identidade editorial com papel, tinta e vinho. A prévia em avaliação troca a linguagem de fanzine por uma hierarquia de jornal: masthead com o nome, editorias, datas e manchetes serifadas. A capa mantém a foto da Bruna centralizada, à frente do nome em grande escala. A direção é uma proposta visual para avaliação, inspirada no repertório de jornalismo da cliente e sem reproduzir o logotipo ou o desenho do New York Times. A justificativa e a distinção entre fatos e inferências estão em [docs/CONCEITO.md](docs/CONCEITO.md).

O site reúne os 41 trabalhos do portfólio original, com nove itens iniciais no desktop e oito no celular para preencher as linhas da grade, filtros por formato, botão para ampliar o acervo e índice com busca. Os trabalhos abrem em seus veículos de origem. A biografia usa dados públicos da cliente, sem inventar credenciais. Contato: bruna_festa@outlook.com.

## Tecnologia e estrutura

HTML, CSS, SVG e JavaScript puros, sem build ou serviços de terceiros no navegador.

- `index.html`: conteúdo e estrutura da página.
- `style.css`: identidade, responsividade, estados de foco e preferência de movimento reduzido.
- `hero-portrait.css`: capa com sobreposição de retrato e nome, incluindo versão de celular.
- `conceito-jornal.css`: exploração editorial local, ainda não publicada.
- `script.js`: filtros, acervo pesquisável, menu e paginação alinhada às colunas da grade.
- `portfolio.data.js`: 41 registros de trabalhos, URLs originais e metadados.
- `assets/`: retrato de capa com tatuagens corrigidas (PNG/WebP), retrato único do Perfil com frizz suavizado (PNG/WebP), fotografias anteriores arquivadas, textura editorial em SVG, favicon e fontes locais licenciadas.
- `assets/bruna-festa-compartilhamento.png`: cartão social 1200 × 630; o SVG ao lado é sua fonte vetorial.
- `robots.txt` e `sitemap.xml`: instruções de indexação e URL canônica do GitHub Pages.
- `docs/`: análise de identidade, fontes e rastreabilidade das imagens.
- `scripts/`: verificação e preparação local de assets. Não são necessários para servir o site.
- `CLAUDE.md` e `AGENTS.md`: manutenção e cuidados para agentes.

## Verificar

`python scripts/verificar_site.py`

`node --check script.js`

`node --check portfolio.data.js`

Conferir também no navegador desktop e em 360/412 px: filtros, menu, índice/busca, ampliação do acervo, foco e contato. Não enviar e-mails de teste à cliente.
