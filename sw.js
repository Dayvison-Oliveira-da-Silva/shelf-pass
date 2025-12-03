// /appteste/sw.js

const CACHE_NAME = 'shelfpass-cache-v1';

const ASSETS = [
  'index.html',
  'home.html',
  'manifest.json',
  'logo-shelf-med.png',
  'logo-shelf-pass.png',
  'icon-192.png',
  'icon-512.png'
  // se criar arquivos .js ou .css separados, adiciona aqui também
];

// Instalação: pré-cache dos assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

// Ativação: limpa caches antigos
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

// Fetch: responde do cache quando possível
self.addEventListener('fetch', event => {
  // Se for navegação (digitar URL, clicar em link, etc.)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      caches.match('index.html').then(resp => {
        // se tiver index no cache, usa; senão tenta ir na rede
        return resp || fetch(event.request);
      })
    );
    return;
  }

  // Para outros pedidos (imagens, manifest, etc.)
  event.respondWith(
    caches.match(event.request).then(resp => {
      return resp || fetch(event.request);
    })
  );
});
