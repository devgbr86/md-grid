# Git e GitHub — Instalação, Configuração e Comandos

Este artigo explica o que são Git e GitHub, como instalá-los e configurá-los, e como usar os comandos essenciais no dia a dia. O objetivo é ser um guia de referência completo, do zero ao fluxo de trabalho real em projetos.

---

## O que é Git

Git é um sistema de controle de versão distribuído. Ele registra o histórico de alterações de um projeto ao longo do tempo, permitindo que você volte a versões anteriores, trabalhe em paralelo com outras pessoas e mantenha um registro completo de tudo que foi feito no código.

Cada desenvolvedor tem uma cópia completa do repositório na sua máquina, incluindo todo o histórico. Isso significa que a maior parte das operações é local e rápida, sem depender de conexão com internet.

## O que é GitHub

GitHub é uma plataforma de hospedagem de repositórios Git na nuvem. Ele adiciona uma interface visual, ferramentas de colaboração, controle de acesso e funcionalidades como pull requests, issues e actions em cima do Git.

Git é a ferramenta. GitHub é o serviço que hospeda e facilita a colaboração em torno dela. Existem alternativas ao GitHub como GitLab e Bitbucket, mas o fluxo de trabalho é essencialmente o mesmo.

---

## Instalação

### Windows

Acesse https://git-scm.com/download/win e baixe o instalador. Durante a instalação, as opções padrão funcionam bem para a maioria dos casos. O instalador inclui o Git Bash, um terminal que simula um ambiente Unix no Windows.

Após a instalação, abra o Git Bash ou o Prompt de Comando e verifique:

```bash
git --version
```

### macOS

O macOS geralmente já vem com uma versão do Git. Para instalar a versão mais recente, use o Homebrew:

```bash
brew install git
```

Se não tiver o Homebrew instalado:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### Linux (Debian/Ubuntu)

```bash
sudo apt update
sudo apt install git
```

### Verificar instalação

```bash
git --version
# Exemplo de saída: git version 2.43.0
```

---

## Configuração inicial

Antes de usar o Git pela primeira vez, é necessário informar quem você é. Essas informações aparecem em todos os commits que você fizer.

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"
```

A flag `--global` aplica a configuração para todos os repositórios da sua máquina. Para sobrescrever em um repositório específico, use a mesma flag sem `--global` dentro da pasta do projeto.

### Definir o editor padrão

O Git abre um editor de texto em algumas operações, como ao escrever mensagens de commit mais longas. Para definir o VS Code como editor:

```bash
git config --global core.editor "code --wait"
```

### Definir o nome padrão da branch principal

Por convenção moderna, a branch principal é chamada de `main` em vez de `master`:

```bash
git config --global init.defaultBranch main
```

### Verificar todas as configurações

```bash
git config --list
```

---

## Criando uma conta no GitHub

Acesse https://github.com e crie uma conta gratuita. O nome de usuário escolhido será parte da URL dos seus repositórios públicos, como `github.com/seuusuario/nome-do-repo`.

---

## Autenticação com GitHub

Para enviar código ao GitHub pelo terminal, é necessário autenticar sua máquina. O método recomendado atualmente é via chave SSH ou via GitHub CLI.

### Método 1 — Chave SSH

**1. Gerar uma chave SSH:**

```bash
ssh-keygen -t ed25519 -C "seu@email.com"
```

Pressione Enter para aceitar o caminho padrão. Defina uma senha se quiser ou deixe em branco.

**2. Copiar a chave pública:**

```bash
# macOS
cat ~/.ssh/id_ed25519.pub | pbcopy

# Linux
cat ~/.ssh/id_ed25519.pub
# Copie manualmente o conteúdo exibido

# Windows (Git Bash)
cat ~/.ssh/id_ed25519.pub | clip
```

**3. Adicionar no GitHub:**

Acesse https://github.com/settings/keys, clique em "New SSH key", cole a chave copiada e salve.

**4. Testar a conexão:**

```bash
ssh -T git@github.com
# Saída esperada: Hi seuusuario! You've successfully authenticated...
```

### Método 2 — GitHub CLI

Instale o GitHub CLI em https://cli.github.com e autentique com:

```bash
gh auth login
```

Siga as instruções no terminal. Após autenticado, os comandos `git push` e `git pull` funcionarão automaticamente.

---

## Conceitos fundamentais

Antes dos comandos, é importante entender os três estados em que um arquivo pode estar no Git:

**Working Directory (Diretório de trabalho)**
É onde você edita os arquivos. Alterações feitas aqui ainda não estão sendo rastreadas pelo Git.

**Staging Area (Área de preparação)**
É uma area intermediária onde você prepara as alterações que quer incluir no próximo commit. Você escolhe explicitamente o que vai para o commit.

**Repository (Repositório)**
É o histórico permanente de commits. Uma vez commitado, o registro fica salvo no histórico do Git.

O fluxo básico é: editar arquivos no Working Directory, mover as alterações desejadas para a Staging Area com `git add`, e então registrar essas alterações no histórico com `git commit`.

---

## Comandos essenciais

### Inicializar um repositório

```bash
git init
```

Cria um repositório Git vazio na pasta atual. Gera uma pasta oculta `.git` que armazena todo o histórico.

### Clonar um repositório existente

```bash
git clone https://github.com/usuario/repositorio.git
```

Baixa o repositório remoto completo, incluindo todo o histórico, para uma nova pasta local com o mesmo nome do repositório. Para clonar em uma pasta com nome diferente:

```bash
git clone https://github.com/usuario/repositorio.git nome-da-pasta
```

### Verificar o estado atual

```bash
git status
```

Mostra quais arquivos foram modificados, quais estão na Staging Area e quais ainda não são rastreados pelo Git.

### Adicionar arquivos à Staging Area

```bash
# Adicionar um arquivo específico
git add nome-do-arquivo.txt

# Adicionar uma pasta inteira
git add src/

# Adicionar todas as alterações do diretório atual
git add .
```

### Criar um commit

```bash
git commit -m "mensagem descrevendo o que foi feito"
```

O commit registra permanentemente no histórico todas as alterações que estavam na Staging Area. A mensagem deve ser clara e descrever o que a alteração faz, não o que você fez (por exemplo: "adiciona validação de formulário" em vez de "trabalhei no formulário").

### Adicionar e commitar em um único comando

```bash
git commit -am "mensagem do commit"
```

A flag `-a` adiciona automaticamente todos os arquivos já rastreados pelo Git que foram modificados. Arquivos novos ainda precisam de `git add` explícito.

### Ver o histórico de commits

```bash
# Histórico completo
git log

# Histórico resumido, um commit por linha
git log --oneline

# Histórico com grafo de branches
git log --oneline --graph --all
```

### Ver as alterações feitas

```bash
# Alterações no Working Directory (ainda não adicionadas)
git diff

# Alterações na Staging Area (prontas para commit)
git diff --staged
```

---

## Trabalhando com repositórios remotos

### Conectar um repositório local ao GitHub

Após criar o repositório no GitHub (sem inicializar com README), conecte o repositório local:

```bash
git remote add origin https://github.com/usuario/repositorio.git
```

`origin` é o nome convencional dado ao repositório remoto principal. Você pode verificar os remotos configurados com:

```bash
git remote -v
```

### Enviar commits para o GitHub

```bash
git push origin main
```

Na primeira vez, pode ser necessário definir o upstream:

```bash
git push -u origin main
```

Após isso, basta usar `git push` nas próximas vezes.

### Baixar atualizações do repositório remoto

```bash
# Baixa e aplica as alterações remotas na branch atual
git pull

# Equivalente explícito
git pull origin main
```

### Baixar sem aplicar

```bash
git fetch origin
```

O `git fetch` baixa as atualizações do remoto mas não as aplica na sua branch local. Útil para inspecionar o que mudou antes de integrar.

---

## Branches

Branches permitem trabalhar em funcionalidades ou correções de forma isolada sem afetar o código principal.

### Listar branches

```bash
# Branches locais
git branch

# Branches locais e remotas
git branch -a
```

### Criar uma nova branch

```bash
git branch nome-da-branch
```

### Mudar para uma branch

```bash
git checkout nome-da-branch

# Ou com o comando mais moderno
git switch nome-da-branch
```

### Criar e mudar para a nova branch em um único comando

```bash
git checkout -b nome-da-branch

# Ou
git switch -c nome-da-branch
```

### Mesclar uma branch na branch atual

```bash
# Estando na branch main
git merge nome-da-branch
```

O Git integra o histórico da branch especificada na branch onde você está.

### Deletar uma branch

```bash
# Deletar localmente (somente se já foi mergeada)
git branch -d nome-da-branch

# Forçar a exclusão
git branch -D nome-da-branch

# Deletar no remoto
git push origin --delete nome-da-branch
```

---

## Desfazendo alterações

### Descartar alterações em um arquivo (antes do add)

```bash
git checkout -- nome-do-arquivo.txt

# Ou com o comando mais moderno
git restore nome-do-arquivo.txt
```

### Remover um arquivo da Staging Area (após o add, antes do commit)

```bash
git reset HEAD nome-do-arquivo.txt

# Ou com o comando mais moderno
git restore --staged nome-do-arquivo.txt
```

### Desfazer o último commit mantendo as alterações

```bash
git reset --soft HEAD~1
```

O commit é desfeito, mas as alterações voltam para a Staging Area.

### Desfazer o último commit descartando as alterações

```bash
git reset --hard HEAD~1
```

Use com cuidado. As alterações são perdidas permanentemente.

### Criar um commit que desfaz outro (sem reescrever o histórico)

```bash
git revert abc1234
```

Onde `abc1234` é o hash do commit que você quer desfazer. Esse é o método mais seguro para desfazer algo em um repositório compartilhado, pois não reescreve o histórico.

---

## Guardando alterações temporariamente

O `stash` permite salvar o trabalho em andamento sem criar um commit, útil quando você precisa trocar de branch rapidamente.

```bash
# Guardar alterações atuais
git stash

# Ver lista de stashes salvos
git stash list

# Aplicar o stash mais recente e removê-lo da lista
git stash pop

# Aplicar sem remover da lista
git stash apply

# Aplicar um stash específico
git stash apply stash@{2}

# Descartar o stash mais recente
git stash drop
```

---

## O arquivo .gitignore

O `.gitignore` lista arquivos e pastas que o Git deve ignorar e não rastrear. É essencial para não versionar arquivos desnecessários como dependências, builds e variáveis de ambiente.

Crie um arquivo chamado `.gitignore` na raiz do projeto. Exemplo de conteúdo:

```
# Dependências
node_modules/

# Build
dist/
build/

# Variáveis de ambiente
.env
.env.local

# Cache e logs
.cache/
*.log

# Arquivos de sistema
.DS_Store
Thumbs.db

# Editor
.vscode/
.idea/
```

O site https://gitignore.io gera arquivos `.gitignore` prontos para diversas linguagens e ambientes.

---

## Fluxo de trabalho típico

Este é o ciclo de uso mais comum ao trabalhar em um projeto:

```bash
# 1. Atualizar a branch principal antes de começar
git switch main
git pull

# 2. Criar uma branch para a nova funcionalidade
git switch -c feature/nome-da-funcionalidade

# 3. Fazer alterações nos arquivos...

# 4. Verificar o que mudou
git status
git diff

# 5. Adicionar as alterações
git add .

# 6. Commitar com mensagem descritiva
git commit -m "adiciona componente de navegação responsivo"

# 7. Enviar a branch para o GitHub
git push -u origin feature/nome-da-funcionalidade

# 8. Abrir um Pull Request no GitHub para revisão
# (feito pela interface do GitHub)

# 9. Após o merge, atualizar a branch principal
git switch main
git pull

# 10. Deletar a branch local que não é mais necessária
git branch -d feature/nome-da-funcionalidade
```

---

## Convenção de mensagens de commit

Mensagens de commit claras tornam o histórico legível e útil. A convenção Conventional Commits é amplamente adotada:

```
tipo(escopo opcional): descricao curta no imperativo

Corpo opcional com mais detalhes sobre o que foi feito e por quê.
```

Tipos comuns:

| Tipo | Quando usar |
|---|---|
| `feat` | nova funcionalidade |
| `fix` | correcao de bug |
| `docs` | alteracao em documentacao |
| `style` | formatacao, ponto e vírgula, sem mudanca de lógica |
| `refactor` | refatoracao de código sem mudar comportamento |
| `test` | adicao ou correcao de testes |
| `chore` | tarefas de manutencao, configuracoes, build |

Exemplos:

```
feat: adiciona exportação em formato WebP
fix: corrige calculo de padding no canvas
docs: atualiza README com instrucoes de instalacao
style: formata arquivo main.js com Prettier
refactor: separa lógica de exportacao em funcao dedicada
```

---

## Referências

- Documentação oficial do Git: https://git-scm.com/doc
- Pro Git (livro completo, gratuito, em português): https://git-scm.com/book/pt-br/v2
- Aprendizado interativo de branches: https://learngitbranching.js.org/?locale=pt_BR
- Guia para situacoes complicadas no Git: https://ohshitgit.com/pt_BR
- Conventional Commits: https://www.conventionalcommits.org/pt-br/v1.0.0/
- Gerador de .gitignore: https://www.gitignore.io

---

Este artigo faz parte do arquivo do md-grid, repositório pessoal de projetos e referências técnicas de Guilherme Ribeiro (devgbr86).

Fonte: https://github.com/devgbr86/md-grid