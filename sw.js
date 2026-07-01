// Hush service worker — offline app shell.
// Bump CACHE when assets change so clients pull fresh copies.
const CACHE = "hush-v1";
const ASSETS = [
  "./", "./index.html", "./manifest.json",
  "./favicon.ico", "./favicon-32.png", "./favicon-16.png",
  "./apple-touch-icon.png", "./icon-192.png", "./icon-512.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const isDoc = req.mode === "navigate" || req.destination === "document";
  if (isDoc) {
    // network-first for the page so updates show up; fall back to cache offline
    e.respondWith(
      fetch(req).then(r => { const cp = r.clone(); caches.open(CACHE).then(c => c.put(req, cp)); return r; })
        .catch(() => caches.match(req).then(r => r || caches.match("./index.html")))
    );
  } else {
    // cache-first for static assets (icons, manifest)
    e.respondWith(
      caches.match(req).then(r => r || fetch(req).then(resp => {
        const cp = resp.clone(); caches.open(CACHE).then(c => c.put(req, cp)); return resp;
      }))
    );
  }
});
