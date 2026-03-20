// MD Grid — main.js
import { register, navigate, initRouter } from "./router.js";

// ── Article registry ──────────────────────────────────────────────
const ARTICLES = {
  websites: [
    { path: "websites/caffe-wiki.md",  label: "Caffe Wikipedia" },
    { path: "websites/scss-demo.md",   label: "SCSS Layout Flexbox Grid Showcase" },
    { path: "websites/tesseract.md",   label: "4D Polytope Visualizer" },
  ],
  tools: [
    { path: "tools/md-editor.md",      label: "Markdown Editor" },
    { path: "tools/snap-code.md",      label: "Code Snippets Screenshots" },
    { path: "tools/img-converter.md",  label: "Image Converter" },
  ],
  api: [
    { path: "api/movie-api.md",        label: "Science Fiction Movie API" },
    { path: "api/api-workerskv.md",    label: "API integration Workers KV" },
  ],
  config: [
    { path: "config/git.md",           label: "Git essentials" },
    { path: "config/vscode.md",        label: "VSCode essentials" },
  ],
  extras: [
    { path: "extras/guides.md",        label: "Guides/Links" },
  ],
};

const CATEGORY_LABELS = {
  websites: "✦ websites",
  tools:    "✦ tools",
  api:      "✦ api",
  config:   "✦ config",
  extras:   "✦ extras",
};

// ── State ─────────────────────────────────────────────────────────
let currentFile = null;

// ── DOM refs ──────────────────────────────────────────────────────
const homeView       = document.getElementById("home-view");
const articleView    = document.getElementById("article-view");
const articleTitle   = document.getElementById("article-title");
const articleContent = document.getElementById("article-content");
const backBtn        = document.getElementById("back-btn");
const sidebarTree    = document.getElementById("sidebar-tree");

// ── Sidebar tree builder ──────────────────────────────────────────
function buildSidebar() {
  sidebarTree.innerHTML = "";

  const rootLabel = document.createElement("div");
  rootLabel.className = "tree-label folder";
  rootLabel.innerHTML = `<span class="icon">▼</span><span class="name">articles/</span>`;
  sidebarTree.appendChild(rootLabel);

  const rootChildren = document.createElement("div");
  rootChildren.className = "tree-children";

  Object.keys(ARTICLES).forEach(cat => {
    const catLabel = document.createElement("div");
    catLabel.className = "tree-label folder";
    catLabel.dataset.cat = cat;
    catLabel.innerHTML = `<span class="icon">▶</span><span class="name">${cat}/</span>`;
    rootChildren.appendChild(catLabel);

    const catChildren = document.createElement("div");
    catChildren.className = "tree-children hidden";
    catChildren.dataset.catBody = cat;

    if (ARTICLES[cat].length === 0) {
      const empty = document.createElement("div");
      empty.className = "tree-label";
      empty.style.color = "#999";
      empty.innerHTML = `<span class="icon"></span><span class="name">(empty)</span>`;
      catChildren.appendChild(empty);
    } else {
      ARTICLES[cat].forEach(article => {
        const fileEl = document.createElement("div");
        fileEl.className = "tree-label file";
        fileEl.dataset.path = article.path;
        fileEl.innerHTML = `<span class="icon">📄</span><span class="name">${article.label}</span>`;
        fileEl.addEventListener("click", () => navigate(`/article/${article.path}`));
        catChildren.appendChild(fileEl);
      });
    }

    rootChildren.appendChild(catChildren);

    catLabel.addEventListener("click", () => {
      const isHidden = catChildren.classList.contains("hidden");
      catChildren.classList.toggle("hidden");
      catLabel.querySelector(".icon").textContent = isHidden ? "▼" : "▶";
    });
  });

  rootLabel.addEventListener("click", () => {
    const isHidden = rootChildren.classList.contains("hidden");
    rootChildren.classList.toggle("hidden");
    rootLabel.querySelector(".icon").textContent = isHidden ? "▼" : "▶";
  });

  sidebarTree.appendChild(rootChildren);
}

// ── Home category grid builder ────────────────────────────────────
function buildHomeGrid() {
  const grid = document.getElementById("category-grid");
  grid.innerHTML = "";

  Object.keys(ARTICLES).forEach(cat => {
    const block = document.createElement("div");
    block.className = "category-block";

    const header = document.createElement("div");
    header.className = "cat-header";
    header.innerHTML = `<span class="toggle-icon">▼</span><span>${CATEGORY_LABELS[cat]}</span>`;
    block.appendChild(header);

    const body = document.createElement("div");
    body.className = "cat-body";

    if (ARTICLES[cat].length === 0) {
      body.innerHTML = `<div class="file-entry" style="color:#999;cursor:default;border-left:none">(no files yet)</div>`;
    } else {
      ARTICLES[cat].forEach(article => {
        const entry = document.createElement("div");
        entry.className = "file-entry";
        entry.dataset.path = article.path;
        entry.innerHTML = `<span class="file-icon">📄</span>${article.label}`;
        entry.addEventListener("click", () => navigate(`/article/${article.path}`));
        body.appendChild(entry);
      });
    }

    block.appendChild(body);

    header.addEventListener("click", () => {
      const isHidden = body.classList.contains("hidden");
      body.classList.toggle("hidden");
      header.querySelector(".toggle-icon").textContent = isHidden ? "▼" : "▶";
    });

    grid.appendChild(block);
  });
}

// ── Article loader ────────────────────────────────────────────────
async function openArticle(filePath) {
  const label = findLabel(filePath);

  document.querySelectorAll(".tree-label.file").forEach(el => {
    el.classList.toggle("active", el.dataset.path === filePath);
  });

  homeView.style.display    = "none";
  articleView.style.display = "block";
  backBtn.classList.add("visible");

  articleTitle.textContent  = label;
  articleContent.innerHTML  = `<p class="loading-msg">Loading…</p>`;
  currentFile = filePath;

  try {
    const res = await fetch(`articles/${filePath}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const mdText = await res.text();
    articleContent.innerHTML = renderMarkdown(mdText);
  } catch (err) {
    articleContent.innerHTML = `<p class="loading-msg" style="color:#c00">
      Could not load <code>articles/${filePath}</code>.<br>
      Make sure the file exists in the <code>articles/</code> folder.
    </p>`;
  }
}

function findLabel(filePath) {
  for (const cat of Object.values(ARTICLES)) {
    const found = cat.find(a => a.path === filePath);
    if (found) return found.label;
  }
  return filePath;
}

// ── Back to home ──────────────────────────────────────────────────
function goHome() {
  currentFile = null;
  homeView.style.display    = "block";
  articleView.style.display = "none";
  backBtn.classList.remove("visible");
  document.querySelectorAll(".tree-label.file").forEach(el => el.classList.remove("active"));
  navigate("/");
}

// ── Markdown renderer ─────────────────────────────────────────────
function renderMarkdown(md) {
  function esc(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  md = md.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
    return `<pre><code class="lang-${lang}">${esc(code.trimEnd())}</code></pre>`;
  });

  const lines = md.split("\n");
  let html = "";
  let inUl = false, inOl = false, inBlockquote = false, inPre = false;

  function closeList() {
    if (inUl) { html += "</ul>"; inUl = false; }
    if (inOl) { html += "</ol>"; inOl = false; }
  }
  function closeBq() {
    if (inBlockquote) { html += "</blockquote>"; inBlockquote = false; }
  }

  for (const line of lines) {
    if (line.startsWith("<pre>")) inPre = true;
    if (inPre) {
      html += line + "\n";
      if (line.includes("</pre>")) inPre = false;
      continue;
    }
    if (/^(\*{3,}|-{3,}|_{3,})$/.test(line.trim())) { closeList(); closeBq(); html += "<hr>"; continue; }
    const hMatch = line.match(/^(#{1,6})\s+(.*)/);
    if (hMatch) { closeList(); closeBq(); html += `<h${hMatch[1].length}>${inlineRender(esc(hMatch[2]))}</h${hMatch[1].length}>`; continue; }
    if (line.startsWith("> ")) { closeList(); if (!inBlockquote) { html += "<blockquote>"; inBlockquote = true; } html += `<p>${inlineRender(esc(line.slice(2)))}</p>`; continue; } else { closeBq(); }
    if (/^[-*+] /.test(line)) { if (inOl) { html += "</ol>"; inOl = false; } if (!inUl) { html += "<ul>"; inUl = true; } html += `<li>${inlineRender(esc(line.replace(/^[-*+] /, "")))}</li>`; continue; }
    if (/^\d+\. /.test(line)) { if (inUl) { html += "</ul>"; inUl = false; } if (!inOl) { html += "<ol>"; inOl = true; } html += `<li>${inlineRender(esc(line.replace(/^\d+\. /, "")))}</li>`; continue; }
    closeList();
    if (line.trim() === "") continue;
    html += `<p>${inlineRender(esc(line))}</p>`;
  }

  closeList(); closeBq();
  return html;
}

function inlineRender(s) {
  s = s.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">');
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  s = s.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  s = s.replace(/__(.+?)__/g, "<strong>$1</strong>");
  s = s.replace(/\*(.+?)\*/g, "<em>$1</em>");
  s = s.replace(/_(.+?)_/g, "<em>$1</em>");
  s = s.replace(/`([^`]+)`/g, "<code>$1</code>");
  s = s.replace(/~~(.+?)~~/g, "<del>$1</del>");
  return s;
}

// ── Init ──────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  buildSidebar();
  buildHomeGrid();

  backBtn.addEventListener("click", goHome);

  document.getElementById("nav-logo-link").addEventListener("click", e => {
    e.preventDefault();
    goHome();
  });

  register("/",               () => goHome());
  register("/article/:path",  (path) => openArticle(path));

  initRouter();
});