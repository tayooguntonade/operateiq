/**
 * SA Deal Analyser — Service Worker
 * Enables offline access and "Add to Home Screen" PWA functionality
 */

const CACHE_NAME = 'sa-analyser-v2';
const CACHE_URLS = [
  '/',
  '/index.html',
  '/app.html',
  '/admin.html',
  '/manifest.json',
  '/firebase-config.js',
  '/icon-192.png',
  '/icon-512.png'
];

// Install: cache core files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(CACHE_URLS).catch(() => {
        // Some files may not exist yet — that's OK
      });
    })
  );
  self.skipWaiting();
});

// Activate: clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Fetch: network first, fallback to cache
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Don't intercept Firebase, Google Fonts, CDN calls — always network
  if (
    url.hostname.includes('firebase') ||
    url.hostname.includes('google') ||
    url.hostname.includes('gstatic') ||
    url.hostname.includes('jsdelivr') ||
    url.hostname.includes('rapidapi') ||
    url.hostname.includes('postcodes.io') ||
    url.hostname.includes('newsapi') ||
    url.hostname.includes('company-information') ||
    url.hostname.includes('planning.data')
  ) {
    return; // Let browser handle these normally
  }

  // For local app files: network first, cache fallback
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Cache successful responses
        if (response.ok) {
          const cloned = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, cloned));
        }
        return response;
      })
      .catch(() => {
        // Offline: serve from cache
        return caches.match(event.request).then(cached => {
          if (cached) return cached;
          // Fallback for navigation requests
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html');
          }
        });
      })
  );
});
