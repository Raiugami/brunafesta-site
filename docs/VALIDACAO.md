# Verificação da proposta — 16/10/2026

- Sintaxe de `script.js` e `portfolio.data.js` conferida com Node.
- Verificação estática: IDs únicos, um H1, referências locais, âncoras, imagens com alt/dimensões e integridade dos 41 registros. As URLs de trabalhos foram mantidas do site original.
- Contagens: 38 textos, dois vídeos, um áudio; curadoria inicial de oito trabalhos.
- No navegador: filtros de vídeo e áudio, atualização das contagens, ampliação de oito para 17 trabalhos, índice com 41 entradas, busca por Torre Negra retornando um item e busca sem resultados com mensagem adequada.
- Layout conferido em desktop, 360 × 800 e 412 × 850 px. Sem rolagem horizontal da página nos tamanhos testados. Menu mobile abre e fecha ao navegar.
- O contato aponta para `mailto:bruna_festa@outlook.com`. Cópia de e-mail funcionou. Nenhuma mensagem foi enviada à cliente.
- Imagens carregadas sem falha nos estados conferidos. Imagens do acervo são carregadas sob demanda. Não há player, embed de rede social, biblioteca de animação ou requisição a fontes externas no navegador.
- A preferência de movimento reduzido é tratada em CSS. A ferramenta disponível não emula essa preferência; nenhuma animação contínua foi criada. Apenas uma transição breve de saturação nas miniaturas ao apontar o mouse.
- A revisão combina checks estáticos e teste funcional/visual; não representa uma pontuação Lighthouse. Os assets originais somavam aproximadamente 1,2 MB. Com o master de retrato em 4K o diretório passou a aproximadamente 14,7 MB; o PNG master não é referenciado no HTML. A capa carrega o retrato WebP de aproximadamente 196 KB.

## Capa com retrato e nome em camadas

Alteração solicitada pelo proprietário: Bruna centralizada e protagonista da primeira tela, com o nome atrás da foto. Usa `hero-portrait.css` e o recorte WebP; os demais conteúdos do portfólio foram preservados.

- Conferido em 1280 × 720, 360 × 800, 412 × 850 e 768 × 1024 px.
- Foto carregada, transparência sobre o fundo papel, camada do retrato à frente do título. O nome permanece um H1 acessível com o texto completo, mesmo com a sobreposição visual.
- Sem rolagem horizontal da página. Menu mobile abre e fecha ao navegar; CTA da capa aponta para os trabalhos, com oito itens iniciais preservados.
- Texto lateral simplificado no desktop e oculto em telas menores para dar espaço ao retrato.
- Nenhum erro ou aviso no console durante a revisão. Não foram adicionados efeitos contínuos ou scripts para a sobreposição.

Publicação externa ainda depende da confirmação de repositório, visibilidade e domínio. A proposta não altera o site Carrd existente.
