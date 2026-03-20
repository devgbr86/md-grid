// MD Grid — router.js

// ── State ─────────────────────────────────────────────────
const routes = {};

// ── Public API ────────────────────────────────────────────
export function register(path, handler) {
  routes[path] = handler;
}

export function navigate(path) {
  location.hash = path;
}

// ── Internal ──────────────────────────────────────────────
function resolve() {
  const hash  = location.hash.replace("#", "") || "/";
  const clean = hash.length > 1 ? hash.replace(/\/$/, "") : hash;

  // Dynamic article route: /article/:category/:filename
  const articleMatch = clean.match(/^\/article\/(.+)$/);
  if (articleMatch) {
    const handler = routes["/article/:path"];
    if (handler) { handler(articleMatch[1]); return; }
  }

  const handler = routes[clean] ?? routes["/"];
  if (handler) handler();
}

export function initRouter() {
  window.addEventListener("hashchange", resolve);
  resolve();
}