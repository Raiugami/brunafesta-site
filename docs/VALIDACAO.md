# Verificação da proposta — 16/10/2026

- Sintaxe de `script.js` e `portfolio.data.js` conferida com Node.
- Verificação estática: IDs únicos, um H1, referências locais, âncoras, imagens com alt/dimensões e integridade dos 41 registros. As URLs de trabalhos foram mantidas do site original.
- Contagens: 38 textos, dois vídeos, um áudio; curadoria inicial de nove trabalhos no desktop e oito no celular, alinhada às três e duas colunas da grade.
- No navegador: filtros de vídeo e áudio, atualização das contagens, ampliação em páginas que completam as linhas da grade, índice com 41 entradas, busca por Torre Negra retornando um item e busca sem resultados com mensagem adequada.
- Layout conferido em desktop, 360 × 800 e 412 × 850 px. Sem rolagem horizontal da página nos tamanhos testados. Menu mobile abre e fecha ao navegar.
- O contato aponta para `mailto:bruna_festa@outlook.com`. Cópia de e-mail funcionou. Nenhuma mensagem foi enviada à cliente.
- Imagens carregadas sem falha nos estados conferidos. Imagens do acervo são carregadas sob demanda. Não há player, embed de rede social, biblioteca de animação ou requisição a fontes externas no navegador.
- A preferência de movimento reduzido é tratada em CSS. A ferramenta disponível não emula essa preferência; nenhuma animação contínua foi criada. Apenas uma transição breve de saturação nas miniaturas ao apontar o mouse.
- A revisão combina checks estáticos e teste funcional/visual; não representa uma pontuação Lighthouse. Os assets originais somavam aproximadamente 1,2 MB. Com o master de retrato em 4K o diretório passou a aproximadamente 14,7 MB; o PNG master não é referenciado no HTML. A capa carrega o retrato WebP de aproximadamente 196 KB.

## Capa com retrato e nome em camadas

Alteração solicitada pelo proprietário: Bruna centralizada e protagonista da primeira tela, com o nome atrás da foto. Usa `hero-portrait.css` e o recorte WebP; os demais conteúdos do portfólio foram preservados.

- Conferido em 1280 × 720, 360 × 800, 412 × 850 e 768 × 1024 px.
- Foto carregada, transparência sobre o fundo papel, camada do retrato à frente do título. O nome permanece um H1 acessível com o texto completo, mesmo com a sobreposição visual.
- Sem rolagem horizontal da página. Menu mobile abre e fecha ao navegar; CTA da capa aponta para os trabalhos. Clicar no recorte da capa leva ao Perfil.
- Texto lateral simplificado no desktop e oculto em telas menores para dar espaço ao retrato.
- Nenhum erro ou aviso no console durante a revisão. Não foram adicionados efeitos contínuos ou scripts para a sobreposição.

## Ajustes posteriores da prévia

- A grade inicia com nove matérias em telas largas e oito em celulares; ao mudar o breakpoint, a quantidade visível se ajusta para terminar em uma linha completa. Cada ampliação acrescenta três linhas.
- O Perfil mostra uma foto única sem carrossel; o PNG preserva transparência e o WebP é carregado com dimensões declaradas e `loading="lazy"`. O retoque reduziu os fios arrepiados (frizz) sem mudar pose ou roupa.
- A capa é um link acessível para o Perfil. A prévia atualizada foi conferida visualmente no navegador; a imagem aparece sem moldura e o retrato único está carregado.
- Validações estáticas após as mudanças: `node --check script.js`, `node --check portfolio.data.js`, `python scripts/verificar_site.py` (11 referências locais, 9 âncoras, 2 imagens HTML e 41 trabalhos) e `git diff --check` (sem erros; apenas avisos de conversão de fim de linha do Git).
- O zoom da foto de capa continua ativo para ponteiro e mouse: 2,5% em 420 ms; fica desativado quando `prefers-reduced-motion` está ativo.
- Destino confirmado: `https://raiugami.github.io/brunafesta-site/`, GitHub Pages em `main`/raiz com HTTPS forçado. Canonical, Open Graph, Twitter Card, `robots.txt` e `sitemap.xml` apontam para essa URL; cartão social PNG de 1200 × 630 px conferido visualmente.

Issue #1 continua aberta para receber a PR; o merge na `main` publica esta revisão. A proposta não altera o site Carrd existente.
