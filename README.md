# Bruna Festa — Portfólio

Proposta de site e identidade visual para a jornalista e editora de vídeo Bruna Festa. Referência: https://brunafesta.carrd.co/.

**Estado:** publicado no GitHub Pages (repositório público `Raiugami/brunafesta-site`). Link: https://brunafesta.imaguiar.com.br/ (depende do registro CNAME na Cloudflare; enquanto isso: https://raiugami.github.io/brunafesta-site/). A versão Carrd não foi modificada.

## Visualizar

Nesta pasta, executar `python -m http.server 4175 --bind 127.0.0.1` e abrir http://127.0.0.1:4175/.

## Conteúdo e experiência

Identidade editorial com referência a fanzines: papel, tinta e vinho, títulos condensados e recortes de trabalhos reais. A capa atual usa a foto da Bruna centralizada e sem fundo, à frente do nome em grande escala, conforme solicitação do proprietário. A justificativa inicial e a distinção entre fatos e inferências estão em [docs/CONCEITO.md](docs/CONCEITO.md).

O site reúne os 41 trabalhos do portfólio original, com seleção inicial de oito itens, filtros por formato, botão para ampliar o acervo e índice com busca. Os trabalhos abrem em seus veículos de origem. A biografia usa dados públicos da cliente, sem inventar credenciais. Contato: bruna_festa@outlook.com.

## Tecnologia e estrutura

HTML, CSS, SVG e JavaScript puros, sem build ou serviços de terceiros no navegador.

- `index.html`: conteúdo e estrutura da página.
- `style.css`: identidade, responsividade, estados de foco e preferência de movimento reduzido.
- `hero-portrait.css`: capa com sobreposição de retrato e nome, incluindo versão de celular.
- `script.js`: filtros, acervo pesquisável, menu e cópia do e-mail.
- `portfolio.data.js`: 41 registros de trabalhos, URLs originais e metadados.
- `assets/`: fotografias e imagens convertidas para WebP, favicon e fonte local licenciada.
- `docs/`: análise de identidade, fontes e rastreabilidade das imagens.
- `scripts/`: verificação e preparação local de assets. Não são necessários para servir o site.
- `CLAUDE.md` e `AGENTS.md`: manutenção e cuidados para agentes.

## Verificar

`python scripts/verificar_site.py`

`node --check script.js`

`node --check portfolio.data.js`

Conferir também no navegador desktop e em 360/412 px: filtros, menu, índice/busca, ampliação do acervo, foco e contato. Não enviar e-mails de teste à cliente.
