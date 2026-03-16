# scss-demo

O scss-demo é um projeto de demonstração de habilidades em CSS moderno e arquitetura SASS. Ele reúne em uma única página exemplos funcionais de layouts com Flexbox e Grid, sistemas de componentes, animações e design responsivo, tudo organizado com boas práticas de desenvolvimento frontend.

O objetivo do projeto é servir como referência técnica e portfólio, mostrando como estruturar um sistema de estilos escalável e profissional sem depender de frameworks externos.

Acesso: https://devgbr86.github.io/scss-demo/

---

## O que o projeto demonstra

O projeto cobre sete áreas principais de CSS e SASS:

- Arquitetura modular com SASS, usando partials e variáveis centralizadas
- Layouts com Flexbox, incluindo padrões reais de interface
- Layouts com CSS Grid, incluindo grades responsivas e assimétricas
- Sistema de componentes reutilizáveis (botões e cards)
- Sistema tipográfico completo
- Biblioteca de animações com keyframes e classes utilitárias
- Design responsivo com abordagem mobile-first

---

## Como executar

**Pré-requisitos:** Node.js instalado para compilar o SASS.

1. Clone ou baixe o repositório.
2. Instale o compilador SASS globalmente:

```bash
npm install -g sass
```

3. Compile os arquivos SCSS para CSS:

```bash
sass scss/main.scss css/style.css
```

4. Para desenvolvimento com recompilação automática a cada alteração:

```bash
sass --watch scss/main.scss:css/style.css
```

5. Abra o arquivo `index.html` em qualquer navegador moderno.

Se estiver usando o VS Code com a extensão Live Server, basta clicar com o botão direito em `index.html` e selecionar "Open with Live Server". Lembre-se de recompilar o SASS sempre que fizer alterações nos arquivos `.scss`.

---

## Estrutura do projeto

```
scss-demo/
├── index.html              — página principal com todas as demonstrações
├── css/
│   └── style.css           — CSS compilado a partir dos arquivos SCSS
├── scss/
│   ├── main.scss           — ponto de entrada principal do SASS
│   ├── _variables.scss     — variáveis do sistema de design
│   ├── _reset.scss         — reset e normalização de estilos do navegador
│   ├── _typography.scss    — estilos e hierarquia tipográfica
│   ├── _button.scss        — sistema de componentes de botão
│   ├── _card.scss          — variantes do componente de card
│   ├── _flexbox.scss       — utilitários de layout com Flexbox
│   ├── _grid.scss          — utilitários de sistema de Grid
│   ├── _animations.scss    — keyframes e classes de animação
│   └── _utilities.scss     — classes auxiliares e utilitários gerais
└── README.md
```

Cada partial tem uma responsabilidade única e bem delimitada. Essa separação facilita a manutenção e permite importar apenas os módulos necessários em outros projetos.

---

## Arquitetura SASS

### Sistema de variáveis

Todas as decisões de design do projeto estão centralizadas no arquivo `_variables.scss`. Isso significa que alterar uma variável reflete automaticamente em todos os componentes que a utilizam. As categorias de variáveis são:

**Cores:** paleta primária, paleta secundária, tons neutros, cores semânticas (sucesso, aviso, erro) e gradientes.

**Tipografia:** famílias de fontes (display, títulos, corpo, monoespaçada), escala de tamanhos, pesos, alturas de linha e espaçamento entre letras.

**Espaçamento:** escala consistente com os níveis xs, sm, md, lg, xl, xxl e xxxl, além de larguras de container e espaçamentos de grid.

**Bordas e sombras:** escala de border-radius, espessuras de borda e sistema de elevação por sombras em cinco níveis.

**Transições e breakpoints:** durações e funções de tempo padronizadas, pontos de quebra responsivos e sistema de camadas z-index.

### Metodologia BEM

Os componentes seguem a convenção de nomenclatura BEM (Block Element Modifier). Isso torna as classes autodescritivas e evita conflitos de especificidade. Exemplos:

- `.card` — bloco
- `.card__title` — elemento do bloco
- `.card--gradient` — modificador do bloco

---

## Layouts demonstrados

### Flexbox

Os padrões de Flexbox demonstrados incluem: cabeçalho de navegação com logo e menu alinhados, layout de media object (imagem ao lado do conteúdo), grade de itens com quebra automática, centralização perfeita horizontal e vertical, rodapé com espaçamento entre elementos, rodapé fixo na base da viewport e cards com alturas iguais.

### CSS Grid

Os padrões de Grid incluem: grades responsivas de 2, 3, 4 e 6 colunas, padrões com `auto-fit` e `auto-fill`, layouts assimétricos, galerias com itens que ocupam mais de uma coluna, layouts estilo dashboard e layouts estilo revista com múltiplas colunas.

---

## Componentes

### Botões

O sistema de botões oferece variantes visuais (primário, secundário, outline, ghost), tamanhos (pequeno, médio, grande), formas (padrão, pílula, arredondado), estados (hover, ativo, desabilitado) e opções de largura total e botão com ícone.

Exemplo de uso:

```html
<button class="button button--primary">Primário</button>
<button class="button button--outline">Outline</button>
<button class="button button--large button--pill">Grande Pílula</button>
```

### Cards

O sistema de cards oferece variante padrão com sombra, variante com borda, variante com gradiente de fundo e efeitos de hover com transição suave.

Exemplo de uso:

```html
<div class="card">
  <h3 class="card__title">Título</h3>
  <p class="card__text">Conteúdo do card.</p>
</div>

<div class="card card--gradient">
  <h3 class="card__title">Card com gradiente</h3>
  <p class="card__text">Fundo em gradiente.</p>
</div>
```

---

## Sistema de Grid

O sistema de Grid pode ser usado diretamente via classes HTML:

```html
<!-- Grade de 3 colunas fixas -->
<div class="grid grid--cols-3">
  <div>Coluna 1</div>
  <div>Coluna 2</div>
  <div>Coluna 3</div>
</div>

<!-- Grade auto-fit, responsiva por padrão -->
<div class="grid grid--auto-fit">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

---

## Animações

A biblioteca de animações inclui fade in, slides em quatro direções (cima, baixo, esquerda, direita), transformações de escala e rotação, animações acionadas por scroll, atrasos escalonados e transições suaves de página.

Exemplo de uso:

```html
<div class="animate--fade-in">Conteúdo</div>
<div class="animate--slide-up animate-delay--1">Conteúdo com atraso</div>
<div class="animate--scale">Conteúdo com escala</div>
```

Todas as animações utilizam as propriedades `transform` e `opacity`, que são aceleradas pela GPU do dispositivo, garantindo fluidez de 60 quadros por segundo.

---

## Classes utilitárias

O arquivo `_utilities.scss` fornece classes auxiliares para espaçamento, cores de fundo, alinhamento de texto, border-radius e sombras:

```html
<div class="mt-lg mb-xl p-md">Espaçamento aplicado via utilitários</div>
<div class="bg-primary text-white">Fundo com cor primária</div>
<div class="text-center rounded-lg shadow-xl">Centralizado, arredondado e elevado</div>
```

---

## Design responsivo

O projeto segue a abordagem mobile-first: os estilos base são definidos para telas pequenas e as variações para telas maiores são adicionadas progressivamente. Os breakpoints utilizados são:

- `xs` — 480px (celulares pequenos)
- `sm` — 640px (celulares grandes)
- `md` — 768px (tablets)
- `lg` — 1024px (notebooks)
- `xl` — 1280px (desktops)
- `xxl` — 1536px (telas grandes)

As colunas das grades se ajustam automaticamente: uma coluna em dispositivos móveis, duas em tablets e três ou quatro em desktops.

---

## Personalização

Para alterar as cores do projeto, edite as variáveis no arquivo `_variables.scss`:

```scss
$color-primary: #FF6B35;    // Cor principal da marca
$color-secondary: #004E89;  // Cor secundária
```

Para ajustar a escala de espaçamento:

```scss
$spacing-md: 1.5rem;
$spacing-lg: 2rem;
```

Para adicionar um novo componente, crie um partial `_nome-do-componente.scss`, importe-o no `main.scss` com `@use 'nome-do-componente'` e siga a convenção BEM para nomear as classes.

---

## Compatibilidade com navegadores

O projeto utiliza recursos modernos do CSS sem polyfills. Funciona nas versões mais recentes de Chrome, Firefox, Safari e Edge. Os recursos utilizados incluem CSS Grid, Flexbox, propriedades customizadas, animações, `backdrop-filter` (com fallbacks) e a função `clamp()`.

---

## Contexto

O scss-demo é um projeto de estudo e demonstração desenvolvido por Guilherme Ribeiro (devgbr86). Ele está arquivado e documentado dentro do md-grid, repositório pessoal que centraliza projetos e referências técnicas.

O projeto demonstra como organizar um sistema de estilos de forma modular e escalável usando SASS, aplicando padrões usados em desenvolvimento frontend profissional sem depender de nenhum framework CSS externo.

Fonte: https://github.com/devgbr86/scss-demo