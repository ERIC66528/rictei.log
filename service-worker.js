// Cache name
const cacheName = 'staff-attendance-system-v1';

// Files to cache
const filesToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
];

// Install service worker and cache essential files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log('Caching essential files');
      return cache.addAll(filesToCache);
    })
  );
});

// Activate the service worker
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [cacheName];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (!cacheWhitelist.includes(cache)) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetch request and serve from cache if available
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
