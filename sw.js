const CACHE_VERSION = "v2026-02-04"; // CHANGE EVERY DEPLOY
const CACHE_NAME = `cft-pwa-${CACHE_VERSION}`;

const FILES_TO_CACHE = [
  "./",
  "./manifest.json"
  // ❌ DO NOT cache index.html
];

self.addEventListener("install", event => {
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
