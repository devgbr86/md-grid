# Visual Studio Code — Instalação, Configuração e Uso

Este artigo explica o que é o Visual Studio Code, como instalá-lo, configurá-lo e usá-lo de forma eficiente no dia a dia. O objetivo é servir como guia de referência completo, cobrindo desde a instalação até os atalhos, extensões e personalizações mais úteis para desenvolvimento web e frontend.

---

## O que é o Visual Studio Code

O Visual Studio Code, conhecido como VS Code, é um editor de código-fonte desenvolvido pela Microsoft. É gratuito, open source e multiplataforma, funcionando em Windows, macOS e Linux.

Apesar de ser chamado de editor, o VS Code se comporta na prática como uma IDE leve. Ele oferece realce de sintaxe, autocompletar inteligente, depuração integrada, controle de versão com Git, terminal embutido e um ecossistema extenso de extensões que adicionam suporte a praticamente qualquer linguagem ou ferramenta.

É atualmente o editor mais utilizado por desenvolvedores web no mundo.

---

## Instalação

### Windows

Acesse https://code.visualstudio.com e clique em "Download for Windows". Execute o instalador e siga os passos. Durante a instalação, é recomendável marcar as opções:

- "Add 'Open with Code' action to Windows Explorer file context menu"
- "Add 'Open with Code' action to Windows Explorer directory context menu"
- "Register Code as an editor for supported file types"
- "Add to PATH"

A opção de adicionar ao PATH permite abrir o VS Code pelo terminal com o comando `code`.

### macOS

Acesse https://code.visualstudio.com e baixe o arquivo `.zip` para macOS. Extraia e mova o aplicativo para a pasta Aplicativos.

Para habilitar o comando `code` no terminal, abra o VS Code, acesse a paleta de comandos com `Cmd + Shift + P`, digite "Shell Command" e selecione "Install 'code' command in PATH".

### Linux (Debian/Ubuntu)

```bash
# Baixar e instalar via apt
wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > packages.microsoft.gpg
sudo install -o root -g root -m 644 packages.microsoft.gpg /etc/apt/trusted.gpg.d/
sudo sh -c 'echo "deb [arch=amd64] https://packages.microsoft.com/repos/vscode stable main" > /etc/apt/sources.list.d/vscode.list'
sudo apt update
sudo apt install code
```

Ou acesse https://code.visualstudio.com/Download e baixe o pacote `.deb` diretamente.

### Verificar instalação

Abra o terminal e execute:

```bash
code --version
```

Para abrir o VS Code na pasta atual pelo terminal:

```bash
code .
```

---

## Interface principal

Ao abrir o VS Code, a interface é dividida em cinco áreas principais:

**Barra de atividades (Activity Bar)**
Localizada na lateral esquerda, contém os ícones de navegação principal: Explorer (arquivos), Search (busca), Source Control (Git), Run and Debug (depuração) e Extensions (extensões).

**Painel lateral (Side Bar)**
Exibe o conteúdo da seção selecionada na Activity Bar. Ao clicar em Explorer, por exemplo, mostra a árvore de arquivos do projeto aberto.

**Editor**
A área central onde os arquivos são abertos e editados. Suporta múltiplas abas e divisão de tela em colunas ou linhas.

**Painel inferior (Panel)**
Contém o terminal integrado, o console de saída, os problemas de código e o console de depuração. Pode ser aberto e fechado com `Ctrl + J` (ou `Cmd + J` no macOS).

**Barra de status (Status Bar)**
Localizada na parte inferior da janela, exibe informações sobre o arquivo atual: linguagem detectada, codificação, número da linha e coluna, branch do Git ativa e notificações de extensões.

---

## Paleta de comandos

A paleta de comandos é o recurso mais importante do VS Code. Ela dá acesso a praticamente todas as funcionalidades do editor sem precisar usar o mouse.

```
Ctrl + Shift + P   (Windows/Linux)
Cmd  + Shift + P   (macOS)
```

Digite qualquer coisa para buscar um comando. Exemplos de uso:

- `> format document` — formatar o arquivo atual
- `> open settings` — abrir as configurações
- `> git commit` — fazer um commit pelo VS Code
- `> toggle terminal` — abrir ou fechar o terminal
- `> change language mode` — trocar a linguagem de sintaxe do arquivo atual

---

## Configurações

O VS Code tem dois níveis de configuração: global (User Settings) e por projeto (Workspace Settings). As configurações de projeto ficam em uma pasta `.vscode/settings.json` na raiz do projeto e sobrescrevem as globais.

### Abrir as configurações

```
Ctrl + ,   (Windows/Linux)
Cmd  + ,   (macOS)
```

As configurações podem ser editadas pela interface gráfica ou diretamente no arquivo JSON. Para abrir o JSON, use a paleta de comandos e digite "Open User Settings JSON".

### Configurações recomendadas para desenvolvimento web

```json
{
  "editor.fontSize": 14,
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "editor.wordWrap": "on",
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.minimap.enabled": false,
  "editor.bracketPairColorization.enabled": true,
  "editor.guides.bracketPairs": true,
  "editor.cursorBlinking": "smooth",
  "editor.renderWhitespace": "boundary",
  "editor.linkedEditing": true,
  "files.autoSave": "onFocusChange",
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true,
  "explorer.confirmDelete": false,
  "explorer.compactFolders": false,
  "terminal.integrated.fontSize": 13,
  "workbench.startupEditor": "none",
  "workbench.colorTheme": "One Dark Pro",
  "workbench.iconTheme": "material-icon-theme"
}
```

**O que cada configuração faz:**

- `editor.formatOnSave` — formata o arquivo automaticamente ao salvar
- `editor.defaultFormatter` — define o Prettier como formatador padrão
- `editor.bracketPairColorization` — coloriza pares de colchetes e chaves por nível de profundidade
- `editor.linkedEditing` — ao renomear uma tag HTML de abertura, renomeia automaticamente a de fechamento
- `files.autoSave` — salva automaticamente ao mudar o foco para outra janela
- `files.trimTrailingWhitespace` — remove espaços em branco no final das linhas ao salvar
- `explorer.compactFolders` — desativa a compactação de pastas com um único filho na árvore de arquivos

---

## Atalhos de teclado essenciais

Conhecer os atalhos transforma a velocidade de trabalho. Os mais usados no dia a dia:

### Navegação

| Acao | Windows/Linux | macOS |
|---|---|---|
| Paleta de comandos | `Ctrl + Shift + P` | `Cmd + Shift + P` |
| Abrir arquivo por nome | `Ctrl + P` | `Cmd + P` |
| Ir para uma linha | `Ctrl + G` | `Ctrl + G` |
| Ir para um símbolo | `Ctrl + Shift + O` | `Cmd + Shift + O` |
| Alternar entre abas | `Ctrl + Tab` | `Ctrl + Tab` |
| Fechar aba atual | `Ctrl + W` | `Cmd + W` |
| Reabrir aba fechada | `Ctrl + Shift + T` | `Cmd + Shift + T` |
| Dividir editor | `Ctrl + \` | `Cmd + \` |

### Edição

| Acao | Windows/Linux | macOS |
|---|---|---|
| Copiar linha | `Ctrl + C` (sem seleção) | `Cmd + C` (sem seleção) |
| Cortar linha | `Ctrl + X` (sem seleção) | `Cmd + X` (sem seleção) |
| Mover linha acima/abaixo | `Alt + Seta` | `Option + Seta` |
| Duplicar linha | `Alt + Shift + Seta` | `Option + Shift + Seta` |
| Deletar linha | `Ctrl + Shift + K` | `Cmd + Shift + K` |
| Adicionar comentário | `Ctrl + /` | `Cmd + /` |
| Formatar documento | `Shift + Alt + F` | `Shift + Option + F` |
| Indentar linha | `Tab` | `Tab` |
| Desindentar linha | `Shift + Tab` | `Shift + Tab` |
| Desfazer | `Ctrl + Z` | `Cmd + Z` |
| Refazer | `Ctrl + Shift + Z` | `Cmd + Shift + Z` |

### Múltiplos cursores e seleção

| Acao | Windows/Linux | macOS |
|---|---|---|
| Adicionar cursor acima/abaixo | `Ctrl + Alt + Seta` | `Cmd + Option + Seta` |
| Selecionar próxima ocorrência | `Ctrl + D` | `Cmd + D` |
| Selecionar todas as ocorrências | `Ctrl + Shift + L` | `Cmd + Shift + L` |
| Cursor em cada linha selecionada | `Shift + Alt + I` | `Shift + Option + I` |

### Terminal

| Acao | Windows/Linux | macOS |
|---|---|---|
| Abrir/fechar terminal | `Ctrl + J` | `Cmd + J` |
| Novo terminal | `` Ctrl + Shift + ` `` | `` Ctrl + Shift + ` `` |
| Alternar entre terminais | `Ctrl + PageUp/Down` | `Cmd + PageUp/Down` |

### Busca

| Acao | Windows/Linux | macOS |
|---|---|---|
| Buscar no arquivo | `Ctrl + F` | `Cmd + F` |
| Substituir no arquivo | `Ctrl + H` | `Cmd + H` |
| Buscar em todos os arquivos | `Ctrl + Shift + F` | `Cmd + Shift + F` |
| Substituir em todos os arquivos | `Ctrl + Shift + H` | `Cmd + Shift + H` |

---

## Terminal integrado

O VS Code tem um terminal completo embutido. Ele abre no diretório do projeto atual, o que elimina a necessidade de alternar entre o editor e um terminal externo.

```
Ctrl + `   (Windows/Linux)
Ctrl + `   (macOS)
```

É possível ter múltiplos terminais abertos simultaneamente, renomeá-los e dividir o painel de terminal em colunas. O tipo de terminal usado (PowerShell, CMD, Bash, Zsh) pode ser configurado nas preferências.

Para definir o Bash como terminal padrão no Windows:

```json
"terminal.integrated.defaultProfile.windows": "Git Bash"
```

---

## IntelliSense

IntelliSense é o sistema de autocompletar do VS Code. Ele sugere completacoes de código, exibe a assinatura de funções, mostra documentação inline e aponta erros em tempo real.

O IntelliSense funciona automaticamente para JavaScript, TypeScript, HTML, CSS e JSON. Para outras linguagens, é necessário instalar a extensão correspondente.

Atalhos relacionados:

| Acao | Atalho |
|---|---|
| Acionar sugestões manualmente | `Ctrl + Space` |
| Ver definição de um símbolo | `F12` |
| Ver definição sem sair do arquivo | `Alt + F12` |
| Ver todas as referencias | `Shift + F12` |
| Renomear símbolo em todo o projeto | `F2` |

---

## Extensões essenciais

As extensões são instaladas pelo ícone de quadrado na Activity Bar ou pela paleta de comandos com "Install Extensions". As mais úteis para desenvolvimento web:

### Qualidade de código

**Prettier — Code Formatter** (`esbenp.prettier-vscode`)
Formata automaticamente HTML, CSS, JavaScript, TypeScript, JSON e outros formatos ao salvar. Elimina discussões sobre estilo de código em equipes.

**ESLint** (`dbaeumer.vscode-eslint`)
Integra o ESLint ao editor, destacando problemas de código em tempo real com sublinhados e mensagens de erro.

**Error Lens** (`usernamehw.errorlens`)
Exibe mensagens de erro e aviso diretamente na linha do código, em vez de apenas sublinhar. Torna os problemas muito mais visíveis.

### HTML e CSS

**Auto Rename Tag** (`formulahendry.auto-rename-tag`)
Ao renomear uma tag HTML de abertura, renomeia automaticamente a tag de fechamento correspondente.

**CSS Peek** (`pranaygp.vscode-css-peek`)
Permite visualizar e navegar até as definicoes CSS de uma classe diretamente no HTML, sem precisar abrir o arquivo CSS.

**HTML CSS Support** (`ecmel.vscode-html-css`)
Adiciona autocompletar de classes CSS no HTML, lendo as classes definidas nos arquivos CSS do projeto.

**IntelliSense for CSS class names** (`zignd.html-css-class-completion`)
Autocompletar de nomes de classes CSS e SCSS diretamente nos atributos `class` do HTML.

### JavaScript e TypeScript

**JavaScript (ES6) code snippets** (`xabikos.JavaScriptSnippets`)
Adiciona snippets de código para padrões comuns do ES6, como `import`, `export`, arrow functions, `console.log` e outros.

**Path IntelliSense** (`christian-kohler.path-intellisense`)
Autocompletar de caminhos de arquivos ao digitar imports e referencias a recursos.

### Git

**GitLens** (`eamodio.gitlens`)
Enriquece o suporte ao Git no VS Code. Exibe quem fez cada linha de código (git blame inline), histórico de arquivos, comparação de branches e muito mais.

**Git Graph** (`mhutchie.git-graph`)
Exibe um grafico visual do histórico de commits e branches do repositório.

### Aparência e produtividade

**One Dark Pro** (`zhuangtongfa.material-theme`)
Tema escuro de alta legibilidade, um dos mais populares para VS Code.

**Material Icon Theme** (`pkief.material-icon-theme`)
Substitui os ícones padrão da árvore de arquivos por ícones coloridos e específicos para cada tipo de arquivo e pasta.

**Live Server** (`ritwickdey.liveserver`)
Inicia um servidor local com live reload para arquivos HTML estáticos. Ao salvar um arquivo, o navegador atualiza automaticamente.

**Live Share** (`ms-vsliveshare.vsliveshare`)
Permite colaboração em tempo real: outro desenvolvedor pode editar o mesmo código remotamente, como um Google Docs para código.

**Indent Rainbow** (`oderwat.indent-rainbow`)
Colore os níveis de indentação com cores diferentes, facilitando a leitura de código profundamente aninhado.

**Thunder Client** (`rangav.vscode-thunder-client`)
Cliente HTTP leve integrado ao VS Code para testar APIs REST, alternativa ao Postman sem sair do editor.

### Como instalar uma extensão pela linha de comando

```bash
code --install-extension esbenp.prettier-vscode
code --install-extension dbaeumer.vscode-eslint
code --install-extension eamodio.gitlens
```

---

## Snippets personalizados

Snippets são atalhos de texto que se expandem em blocos de código. O VS Code permite criar snippets personalizados para qualquer linguagem.

Para criar um snippet, acesse `File > Preferences > Configure User Snippets` (ou use a paleta de comandos com "Configure User Snippets") e escolha a linguagem.

Exemplo de snippet para um componente HTML básico:

```json
{
  "HTML boilerplate": {
    "prefix": "html5",
    "body": [
      "<!DOCTYPE html>",
      "<html lang=\"pt-BR\">",
      "<head>",
      "  <meta charset=\"UTF-8\">",
      "  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">",
      "  <title>${1:Título da Página}</title>",
      "</head>",
      "<body>",
      "  $0",
      "</body>",
      "</html>"
    ],
    "description": "Estrutura HTML5 básica"
  }
}
```

O `${1:Título da Página}` define o primeiro campo de preenchimento com um valor padrão. O `$0` define onde o cursor fica após preencher todos os campos.

---

## Configuração por projeto

É possível ter configurações específicas por projeto criando uma pasta `.vscode` na raiz com os arquivos de configuração:

```
meu-projeto/
└── .vscode/
    ├── settings.json      — configurações do editor para este projeto
    ├── extensions.json    — extensões recomendadas para este projeto
    └── launch.json        — configurações de depuração
```

**`.vscode/extensions.json`** — ao abrir o projeto, o VS Code sugere a instalação das extensões listadas:

```json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ritwickdey.liveserver"
  ]
}
```

**`.vscode/settings.json`** — sobrescreve as configurações globais apenas para este projeto:

```json
{
  "editor.tabSize": 4,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

---

## Integração com Git

O VS Code tem suporte nativo ao Git pela aba Source Control na Activity Bar. Ele exibe os arquivos modificados, permite fazer stage, commit, push e pull sem usar o terminal.

Funcionalidades nativas:

- Visualizar diferenças de arquivos modificados clicando sobre eles
- Fazer stage de arquivos individualmente ou em grupo
- Escrever a mensagem de commit e confirmar com `Ctrl + Enter`
- Sincronizar com o repositório remoto pelo botão de sincronização na Status Bar
- Ver a branch atual e trocar de branch pelo canto inferior esquerdo

Para operações mais avançadas, o terminal integrado ou a extensão GitLens complementam bem o suporte nativo.

---

## Depuração

O VS Code tem um depurador integrado. Para JavaScript e TypeScript rodando no Node.js, é possível depurar sem nenhuma configuração adicional.

Para iniciar uma sessão de depuração simples:

1. Abra o arquivo JavaScript que quer depurar
2. Clique na margem esquerda do editor para adicionar um breakpoint (ponto de parada)
3. Pressione `F5` para iniciar a depuração

O programa pausa na linha marcada e você pode inspecionar variáveis, executar passo a passo e ver a pilha de chamadas.

Para configuracoes mais específicas, o arquivo `.vscode/launch.json` define como o depurador deve iniciar a aplicação.

---

## Emmet

O Emmet é uma ferramenta de expansão de abreviações para HTML e CSS que já vem integrada ao VS Code. Ele permite escrever estruturas HTML complexas com poucos caracteres.

Exemplos de abreviações Emmet:

```
div.container > ul > li*3 > a
```

Expandido resulta em:

```html
<div class="container">
  <ul>
    <li><a href=""></a></li>
    <li><a href=""></a></li>
    <li><a href=""></a></li>
  </ul>
</div>
```

Outros exemplos úteis:

```
!                     — estrutura HTML5 completa
nav>ul>li*5>a         — navegação com 5 itens
.card>.card__title+p  — card com título e parágrafo
input[type=email]     — input com atributo type
p{Texto aqui}         — parágrafo com conteúdo
```

Para acionar a expansão, basta pressionar `Tab` após digitar a abreviação em um arquivo HTML.

---

## Sincronização de configurações

O VS Code permite sincronizar configurações, extensões, snippets e atalhos entre diferentes máquinas usando uma conta GitHub ou Microsoft.

Para ativar, acesse `File > Preferences > Turn on Settings Sync` e faça login com sua conta. Todas as suas configurações ficam armazenadas na nuvem e são aplicadas automaticamente em qualquer instalação do VS Code onde você estiver logado.

---

## Referências

- Documentação oficial do VS Code: https://code.visualstudio.com/docs
- Atalhos de teclado para Windows: https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf
- Atalhos de teclado para macOS: https://code.visualstudio.com/shortcuts/keyboard-shortcuts-macos.pdf
- Atalhos de teclado para Linux: https://code.visualstudio.com/shortcuts/keyboard-shortcuts-linux.pdf
- Marketplace de extensões: https://marketplace.visualstudio.com/vscode
- Documentação do Emmet: https://docs.emmet.io/

---

Este artigo faz parte do arquivo do md-grid, repositório pessoal de projetos e referências técnicas de Guilherme Ribeiro (devgbr86).

Fonte: https://github.com/devgbr86/md-grid