// Minimal service worker so the app meets PWA installability requirements.
// We use a network-first approach (no caching) to avoid stale assets.
self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  // Pass-through; rely on the browser HTTP cache.
  // A noop fetch handler is enough for PWA install prompts.
  event.respondWith(fetch(event.request).catch(() => new Response("", { status: 504 })));
});
