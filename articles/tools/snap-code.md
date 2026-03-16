# snap-code

O snap-code é uma ferramenta que roda diretamente no navegador e serve para gerar capturas de tela de trechos de código. O usuário cola o código, ajusta as opções visuais e exporta o resultado como uma imagem PNG, sem precisar instalar nada nem depender de serviços externos.

Todo o processamento acontece no lado do cliente, ou seja, dentro do próprio navegador. Nenhum código digitado é enviado a qualquer servidor.

Acesso: https://devgbr86.github.io/snap-code/

---

## O que o projeto faz

A ferramenta recebe um trecho de código como entrada e o transforma em uma imagem estilizada e exportável. Isso é útil para compartilhar código em redes sociais, documentações, apresentações ou qualquer situação em que uma imagem formatada comunica melhor do que texto puro.

A imagem final é gerada a partir de um elemento Canvas do HTML, o que garante um resultado preciso em qualquer plataforma onde a imagem for visualizada.

---

## Como funciona

O fluxo de uso é dividido em três etapas, refletidas diretamente na interface:

**Etapa 1 — Colar o código**
O usuário digita ou cola qualquer trecho de código na área do editor.

**Etapa 2 — Personalizar**
Antes de gerar a imagem, é possível ajustar diversos parâmetros visuais:

- **Linguagem** — define a gramática de realce de sintaxe aplicada ao código. As opções disponíveis são JavaScript, TypeScript, Python, Rust, Go, CSS, Bash e HTML. O realce é processado pelo PrismJS ou pelo HighlightJS.
- **Tema** — define a paleta de cores do bloco de código. Os temas disponíveis são Night Owl, Dracula, Monokai, Nord, GitHub Dark e Solarized Dark.
- **Plano de fundo** — define a cor ou o gradiente que aparece atrás da janela de código.
- **Tamanho da fonte** — controla o tamanho do texto dentro do bloco de código. O valor padrão é 14px.
- **Espaçamento interno** — define a margem interna ao redor do código. O valor padrão é 40px.
- **Estilo da janela** — adiciona uma moldura decorativa ao redor do bloco de código. As opções são macOS (com os botões coloridos característicos), Windows (com os ícones de minimizar, maximizar e fechar) ou Nenhum.
- **Exibir título** — ativa ou desativa um rótulo com o nome do arquivo na parte superior da janela de código.
- **Nome do arquivo** — define o texto exibido como rótulo quando o título está ativado.
- **Sombra** — adiciona ou remove uma sombra abaixo da janela de código, criando um efeito de profundidade.
- **Números de linha** — ativa ou desativa a exibição da numeração das linhas no lado esquerdo do bloco.

**Etapa 3 — Exportar**
Após a configuração, o usuário pode:
- Visualizar uma prévia ao vivo na página
- Baixar o resultado como arquivo PNG
- Copiar a imagem diretamente para a área de transferência

---

## Tecnologias utilizadas

O projeto é construído com HTML, CSS e JavaScript puros, sem frameworks ou ferramentas de compilação.

- **HTML Canvas** é utilizado para transformar a representação visual do DOM em dados de pixel exportáveis como imagem.
- **PrismJS** e **HighlightJS** realizam a tokenização da sintaxe e o mapeamento de cores para cada linguagem suportada.
- As funções de exportação utilizam a API do Canvas para gerar tanto um arquivo para download quanto uma imagem compatível com a área de transferência do sistema operacional.

---

## Estrutura do projeto

```
snap-code/
├── index.html      — marcação e estrutura da aplicação
├── main.css        — todos os estilos visuais, temas e regras responsivas
├── main.js         — lógica da aplicação, renderização no canvas e funções de exportação
├── assets/icons/   — ícones utilizados na interface
├── robots.txt      — regras de rastreamento para mecanismos de busca
└── sitemap.xml     — mapa do site para indexação
```

---

## Contexto

O snap-code é um projeto utilitário desenvolvido por Guilherme Ribeiro (devgbr86). Ele está arquivado e documentado dentro do md-grid, repositório pessoal que centraliza projetos e referências técnicas.

O projeto demonstra como APIs nativas do navegador, em especial o Canvas, podem ser usadas para produzir imagens a partir de conteúdo dinâmico e estilizado, sem depender de um servidor ou de um serviço de renderização externo.

Fonte: https://github.com/devgbr86/snap-code