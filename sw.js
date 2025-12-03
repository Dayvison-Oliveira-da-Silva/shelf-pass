// /appteste/sw.js
const CACHE_NAME = 'shelfpass-cache-v1';

const ASSETS = [
  '/appteste/',
  '/appteste/index.html',
  '/appteste/home.html',
  '/appteste/manifest.json',
  '/appteste/logo-shelf-med.png',
  '/appteste/logo-shelf-pass.png',
  '/appteste/icon-192.png',
  '/appteste/icon-512.png'
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
