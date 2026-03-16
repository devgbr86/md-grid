# Skill Vault

Cofre pessoal implantado no Cloudflare Pages com autenticação baseada em token, notas persistentes e downloads de arquivos. Toda a lógica de backend roda em Cloudflare Workers com armazenamento em KV.

---

## Stack

- **Cloudflare Pages** — hospedagem estática
- **Cloudflare Workers** — backend serverless (`_worker.js`)
- **Cloudflare KV** — armazenamento persistente para tokens, notas e logs de acesso
- **Vanilla JS + CSS** — sem frameworks, sem etapa de build

---

## Estrutura do projeto

```
/
├── _worker.js          # Worker: autenticação + API de notas + proteção de assets
├── index.html          # Tela de login e shell do cofre
├── assets/
│   ├── css/main.css    # Todos os estilos
│   └── js/main.js      # Lógica de autenticação, notas e downloads
├── downloads/          # Arquivos protegidos (.md, .epub, .pdf, etc.)
└── README.md
```

---

## Autenticação

O acesso é controlado por um token de nome de usuário armazenado diretamente no KV. O cliente envia o token e o Worker o valida contra o namespace KV.

- Os tokens são gerenciados manualmente pelo painel do Cloudflare KV
- Para criar um acesso: adicione uma chave `{usuario}` com qualquer valor (por exemplo: `ativo`)
- Para revogar um acesso: exclua a chave do KV
- Os dados das notas são armazenados separadamente em `notas:{usuario}` e não são afetados por alterações nos tokens

### Esquema de chaves do KV

| Chave | Descrição |
|---|---|
| `{usuario}` | Token de acesso. O valor pode ser qualquer string. |
| `notes:{usuario}` | Array JSON com as notas do usuário. |
| `log:{YYYY-MM-DD}` | Log de acesso diário. Expira após 30 dias. |

---

## Endpoints da API

Todos os endpoints são tratados pelo `_worker.js`.

### POST /api/auth
Valida um token de nome de usuário e retorna a confirmação de sessão.

**Requisição**
```json
{ "username": "seu-token" }
```

**Resposta**
```json
{ "success": true, "token": "<uuid>", "user": "seu-token" }
```

---

### POST /api/validate
Verifica se um nome de usuário ainda é válido no KV.

**Requisição**
```json
{ "username": "seu-token" }
```

**Resposta**
```json
{ "valid": true }
```

---

### GET /api/notes
Retorna o array de notas do usuário autenticado.

**Headers**
```
Authorization: Bearer {usuario}
```

**Resposta**
```json
{ "notes": [ { "id": "...", "titulo": "...", "conteudo": "...", "criadoEm": "...", "atualizadoEm": "..." } ] }
```

---

### POST /api/notes
Salva o array completo de notas do usuário autenticado, sobrescrevendo o estado anterior.

**Headers**
```
Authorization: Bearer {usuario}
Content-Type: application/json
```

**Requisição**
```json
{ "notes": [ ... ] }
```

---

## Notas

Cada objeto de nota segue esta estrutura:

```json
{
  "id": "1700000000000",
  "titulo": "Título da nota",
  "conteudo": "Corpo da nota",
  "criadoEm": "2026-01-01T00:00:00.000Z",
  "atualizadoEm": "2026-01-01T00:00:00.000Z"
}
```

As notas são armazenadas como um array JSON no KV. O array completo é enviado a cada operação de salvamento (o último a escrever prevalece).

---

## Downloads

Os arquivos dentro de `downloads/` são servidos como assets estáticos pelo Cloudflare Pages. A lista de downloads é definida em `main.js`:

```js
const downloads = [
  { nome: "Bio", arquivo: "downloads/bio.md", ext: "md" },
  { nome: "Frontend Blueprint 2026", arquivo: "downloads/FrontendBlueprint2026.epub", ext: "epub" },
];
```

Para adicionar um arquivo: faça o upload para `downloads/` e adicione uma nova entrada ao array.

---

## Implantação

1. Conecte o repositório ao Cloudflare Pages
2. Crie um namespace KV (por exemplo: `VAULT_KV`) no painel do Cloudflare
3. Vincule o namespace ao projeto Pages em **Settings > Functions > KV namespace bindings** com o nome de variável `VAULT_KV`
4. Faça o deploy — nenhum comando de build é necessário

---

## Autor

Desenvolvido por Guilherme Ribeiro — [fronthub.pages.dev](https://fronthub.pages.dev)