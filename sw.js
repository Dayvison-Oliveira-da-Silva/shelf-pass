// /appteste/sw.js
const CACHE_NAME = 'shelfpass-cache-v1';

const ASSETS = [
  '/shelf-pass/',
  '/shelf-pass/index.html',
  '/shelf-pass/home.html',
  '/shelf-pass/manifest.json',
  '/shelf-pass/logo-shelf-med.png',
  '/shelf-pass/logo-shelf-pass.png',
  '/shelf-pass/icon-192.png',
  '/shelf-pass/icon-512.png'
  // se criar arquivos .js ou .css separados, coloca aqui também
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => {
      return resp || fetch(event.request);
    })
  );
});

