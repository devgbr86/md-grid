# md-editor

O md-editor é um editor de Markdown leve que roda diretamente no navegador, com uma estética visual escura inspirada no tema Tron/ARES. Não há backend, não há dependências para instalar e não é necessário criar conta. Basta abrir o arquivo HTML no navegador e começar a escrever.

Todo o processamento acontece no lado do cliente. Nenhum dado é enviado a qualquer servidor.

Acesso: https://devgbr86.github.io/md-editor/

---

## O que o projeto faz

O md-editor permite escrever Markdown em uma área de texto estilizada e exportar o conteúdo em três formatos distintos: arquivo `.md`, `.pdf` via o diálogo de impressão do navegador, e `.html` como um arquivo autocontido. Também é possível importar arquivos `.md` ou `.txt` existentes diretamente para o editor.

---

## Como executar

Não há etapa de compilação, servidor obrigatório nem instalação de pacotes.

1. Clone ou baixe este repositório.
2. Abra o arquivo `index.html` em qualquer navegador moderno (Chrome, Firefox, Edge, Safari).

O editor estará pronto para uso imediatamente.

Caso prefira servir o projeto localmente para evitar restrições do protocolo `file://`, qualquer servidor estático resolve:

```bash
# Usando Python
python -m http.server 8080

# Usando Node.js
npx serve .
```

Em seguida, acesse `http://localhost:8080`.

---

## Funcionalidades

**Importar MD**
Clique em "Import MD" para carregar um arquivo `.md` ou `.txt` do seu computador. O conteúdo do arquivo é inserido diretamente na área de texto. Também é possível arrastar e soltar um arquivo sobre o editor.

**Exportar MD**
Faz o download do conteúdo atual do editor como um arquivo `document.md`. O arquivo exportado é Markdown puro, sem nenhuma conversão.

**Exportar PDF**
Converte o Markdown em HTML usando a biblioteca marked.js, abre uma prévia pronta para impressão em uma nova janela e aciona o diálogo de impressão do navegador. A partir daí, basta escolher "Salvar como PDF" nas opções de impressora.

A saída em PDF utiliza um layout tipográfico limpo com a fonte Source Serif 4, separado do tema escuro do editor, adequado para leitura e compartilhamento.

**Exportar HTML**
Converte o Markdown em um arquivo `.html` completamente autocontido, com estilos embutidos, e faz o download como `document.html`. O arquivo resultante pode ser aberto em qualquer navegador ou hospedado em qualquer servidor estático sem dependências adicionais.

**Contador de caracteres e linhas**
A barra inferior do editor é atualizada em tempo real conforme o usuário digita, exibindo a contagem atual de caracteres e de linhas.

---

## Como a exportação funciona

O projeto carrega a biblioteca marked.js dinamicamente a partir de uma CDN quando a página é aberta. Ao acionar uma exportação:

1. O conteúdo bruto da área de texto é capturado.
2. `marked.parse()` converte o Markdown em HTML com as opções `gfm: true` (GitHub Flavored Markdown) e `breaks: true`.
3. Para PDF: o HTML é injetado em uma nova janela com estilos de impressão e `window.print()` é chamado após um pequeno atraso para permitir o carregamento das fontes.
4. Para HTML: o conteúdo é envolvido em um template de documento completo com CSS embutido e baixado como um Blob via um elemento âncora temporário.
5. Para MD: o conteúdo bruto da área de texto é baixado diretamente, sem nenhuma conversão.

---

## Personalização do tema

Todos os tokens visuais estão definidos como propriedades customizadas de CSS no início do arquivo `main.css`:

```css
:root {
  --bg: #050508;
  --bg2: #0a0a0f;
  --red: #cc0000;
  --red-hot: #ff1a1a;
  --red-glow: #ff000066;
  --red-dim: #660000;
  --text: #e8e8e8;
  --text-dim: #888;
  --font-main: 'Orbitron', monospace;
  --font-mono: 'Share Tech Mono', monospace;
  --nav-h: 64px;
}
```

Alterar esses valores é suficiente para aplicar um novo tema a toda a interface sem tocar em nenhuma outra parte do CSS.

---

## Fontes utilizadas

- **Orbitron** — utilizada em títulos, rótulos e botões.
- **Share Tech Mono** — utilizada na área de texto do editor e em elementos monoespaçados da interface.
- **Source Serif 4** — utilizada exclusivamente na saída de exportação em PDF e HTML.

Todas as fontes são carregadas do Google Fonts via CDN.

---

## Compatibilidade com navegadores

O md-editor utiliza APIs web padrão e não possui polyfills. Funciona em todos os navegadores modernos. O Internet Explorer não é suportado.

---

## Estrutura do projeto

```
md-editor/
├── index.html        — marcação e estrutura da aplicação
├── main.css          — estilos visuais e tema Tron/ARES
├── main.js           — lógica do editor e funções de exportação
├── assets/icons/     — ícones utilizados na interface
├── pages/            — páginas auxiliares (privacidade, termos, cookies)
├── robots.txt        — regras de rastreamento para mecanismos de busca
└── sitemap.xml       — mapa do site para indexação
```

---

## Contexto

O md-editor é um projeto utilitário desenvolvido por Guilherme Ribeiro (devgbr86). Ele está arquivado e documentado dentro do md-grid, repositório pessoal que centraliza projetos e referências técnicas.

O projeto demonstra como um editor funcional e com identidade visual própria pode ser construído apenas com HTML, CSS e JavaScript, sem frameworks, sem etapa de build e sem qualquer dependência de servidor.

Fonte: https://github.com/devgbr86/md-editor