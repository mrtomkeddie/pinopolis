// Choose a cache name
const cacheName = 'cache-v1';
// List the files to precache
const precacheResources = ['/', '/_next/static/css/app/layout.css', '/_next/static/chunks/app-pages-internals.js'];

// When the service worker is installed, open a new cache and add all of the precache resources to it
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(precacheResources)));
});

self.addEventListener('activate', (event) => {
  // empty
});

// When there's an incoming fetch request, try and respond with a precached resource, otherwise fall back to the network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    }),
  );
});
