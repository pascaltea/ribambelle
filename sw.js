// Offline support: the app shell and the spots are cached, map tiles are cached as you browse them.
const SHELL = "ribambelle-shell-v1", TILES = "ribambelle-tiles-v1", MAX_TILES = 1200;
const CORE = ["./", "index.html", "spots.json", "manifest.webmanifest", "icon.svg", "icon-192.png",
  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.5.3/leaflet.markercluster.js"];
self.addEventListener("install", e => { e.waitUntil(caches.open(SHELL).then(c => Promise.allSettled(CORE.map(u => c.add(u)))).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== SHELL && k !== TILES).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
async function trim(cache) { const keys = await cache.keys(); if (keys.length > MAX_TILES) await Promise.all(keys.slice(0, keys.length - MAX_TILES).map(k => cache.delete(k))); }
self.addEventListener("fetch", e => {
  const req = e.request; if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.hostname === "tile.openstreetmap.org") {
    e.respondWith(caches.open(TILES).then(async c => { const hit = await c.match(req); if (hit) return hit;
      const res = await fetch(req); if (res.ok || res.type === "opaque") { c.put(req, res.clone()); trim(c); } return res; }));
    return;
  }
  if (url.origin === location.origin) { // network first, so updates arrive; cache when offline
    e.respondWith(fetch(req).then(res => { if (res.ok) caches.open(SHELL).then(c => c.put(req, res.clone())); return res; }).catch(() => caches.match(req, { ignoreSearch: true }).then(r => r || caches.match("index.html"))));
    return;
  }
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => { if (res.ok || res.type === "opaque") caches.open(SHELL).then(c => c.put(req, res.clone())); return res; })));
});
