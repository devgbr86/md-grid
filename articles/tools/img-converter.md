# img-converter

O img-converter é uma ferramenta de conversão de imagens que roda inteiramente no navegador. Ela permite converter arquivos entre os formatos PNG, JPG e WebP sem nenhum upload para servidores e sem necessidade de instalar programas ou criar contas.

Todo o processamento acontece localmente, na própria máquina do usuário. Nenhuma imagem é transmitida para fora do navegador.

Acesso: https://devgbr86.github.io/img-converter/

---

## O que o projeto faz

O img-converter recebe uma ou mais imagens como entrada, converte cada uma para o formato escolhido pelo usuário e disponibiliza o arquivo convertido para download diretamente no navegador. É possível converter arquivos individualmente ou processar todos de uma vez com a opção em lote.

---

## Como executar

Não há etapa de compilação, servidor obrigatório nem instalação de pacotes.

1. Clone ou baixe este repositório.
2. Abra o arquivo `index.html` em qualquer navegador moderno (Chrome, Edge, Firefox, Safari 14 ou superior).

A ferramenta estará pronta para uso imediatamente.

---

## Como usar

O fluxo de uso é direto e segue cinco etapas:

1. Clique em "Selecionar Arquivos" ou arraste as imagens para a area indicada na interface.
2. Escolha o formato de saída desejado: PNG, JPG ou WebP.
3. Clique em "Converter Todas" para processar todos os arquivos de uma vez, ou converta cada imagem individualmente.
4. Faça o download dos arquivos convertidos.

A interface exibe miniaturas de previa para cada imagem carregada, facilitando a identificação dos arquivos antes da conversao.

---

## Como a conversão funciona

O processo de conversão utiliza exclusivamente APIs nativas do navegador, sem bibliotecas externas. As etapas internas são as seguintes:

1. Cada imagem selecionada é lida pelo navegador e processada pela API `createImageBitmap()`, que decodifica o arquivo de imagem em um objeto de bitmap utilizavel.
2. Esse bitmap é desenhado em um elemento `<canvas>` invisível na página.
3. O método `canvas.toBlob()` é chamado com o tipo MIME do formato de saída escolhido (por exemplo, `image/webp`, `image/jpeg` ou `image/png`), o que instrui o navegador a codificar o conteúdo do canvas no novo formato.
4. O Blob gerado é convertido em uma URL temporária e associado a um elemento de download, que é acionado automaticamente para entregar o arquivo ao usuário.

A qualidade de exportação utilizada por padrão é a máxima disponível (valor `1.0`).

---

## Tecnologias utilizadas

O projeto é construído com HTML, CSS e JavaScript puros, sem frameworks ou ferramentas de compilação.

- **HTML Canvas** é o elemento central da conversão. Ele atua como superfície intermediária onde a imagem original é renderizada antes de ser reexportada no novo formato.
- **`createImageBitmap()`** é uma API nativa que decodifica arquivos de imagem de forma eficiente, suportando os principais formatos de entrada.
- **`canvas.toBlob()`** realiza a codificação final da imagem no formato de saída escolhido, gerando um arquivo binário pronto para download.

---

## Observações importantes

- Os metadados EXIF das imagens originais não são preservados após a conversão, pois o processo de renderização no Canvas descarta essas informações.
- O formato WebP pode não ser suportado em navegadores mais antigos. Para uso geral, recomenda-se Chrome, Edge, Firefox ou Safari 14 ou superior.
- A conversão de JPG pode apresentar leve perda de qualidade em relação ao original, característica inerente ao formato com compressão lossy.

---

## Estrutura do projeto

```
img-converter/
├── index.html    — marcação e estrutura da aplicação
├── assets/       — recursos visuais utilizados na interface
└── README.md     — documentação do projeto
```

---

## Contexto

O img-converter é um projeto utilitário desenvolvido por Guilherme Ribeiro (devgbr86). Ele está arquivado e documentado dentro do md-grid, repositório pessoal que centraliza projetos e referências técnicas.

O projeto demonstra como operações de processamento de imagem, que normalmente exigem um servidor ou uma biblioteca especializada, podem ser realizadas inteiramente no navegador utilizando apenas APIs nativas do HTML5.

Fonte: https://github.com/devgbr86/img-converter