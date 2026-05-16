const CACHE_NAME = 'ravomix-v8';
const OFFLINE_URL = '/offline.html';
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/offline.html',
  '/sitemap.xml',
  '/robots.txt',
  '/startup-icon-192.png',
  '/startup-icon-512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key.startsWith('ravomix-') && key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.method !== 'GET') return;
  if (request.url.startsWith('chrome-extension://')) return;
  if (request.url.includes('/~oauth')) return;

  // Navigation: network-first, offline fallback page
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          return response;
        })
        .catch(() =>
          caches.match(request).then((r) => r || caches.match(OFFLINE_URL))
        )
        .then((r) => r || new Response('Offline', { status: 503 }))
    );
    return;
  }

  // Assets: stale-while-revalidate
  event.respondWith(
    caches.match(request).then((cached) => {
      const fetchPromise = fetch(request)
        .then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => cached || new Response('', { status: 503 }));

      return cached || fetchPromise;
    })
  );
});
