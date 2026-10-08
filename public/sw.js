const CACHE_NAME = 'panchang-v3';

// Core shell assets to precache immediately on install
const STATIC_PRECACHE = [
  '/',
  '/index.html',
  '/atultiwari',
  '/dates',
  '/manifest.json',
  '/Logo_Panchang.png',
  '/vite.svg'
];

// 1. Install event: Pre-cache shell assets & skip waiting immediately
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_PRECACHE);
    }).then(() => self.skipWaiting())
  );
});

// 2. Activate event: Clean up previous cache versions & claim clients immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. Fetch event: Ultra-fast Stale-While-Revalidate for navigation, Cache-First for assets
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only handle GET requests
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Ignore non-http(s) schemes (e.g., chrome-extension://)
  if (!url.protocol.startsWith('http')) return;

  // A. Navigation requests (Opening the app, refreshing, SPA routes)
  // STRATEGY: Instant Cache Return with Background Revalidation (Stale-While-Revalidate)
  if (request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        // Look up cache first for instantaneous startup (< 20ms)
        const cachedResponse =
          (await caches.match(request)) ||
          (await caches.match('/index.html')) ||
          (await caches.match('/atultiwari')) ||
          (await caches.match('/'));

        // Background network revalidation to keep content always up-to-date
        const networkFetchPromise = fetch(request)
          .then(async (networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const cache = await caches.open(CACHE_NAME);
              cache.put(request, networkResponse.clone());
              cache.put('/index.html', networkResponse.clone());
            }
            return networkResponse;
          })
          .catch(() => null);

        // If cached response exists, return it IMMEDIATELY for super fast app launch!
        if (cachedResponse) {
          return cachedResponse;
        }

        // If not yet in cache (first time load), wait for network
        const networkResponse = await networkFetchPromise;
        if (networkResponse) {
          return networkResponse;
        }

        // Offline fallback
        return (await caches.match('/index.html')) || (await caches.match('/'));
      })()
    );
    return;
  }

  // B. Static assets: JS, CSS, images, fonts, icons
  // STRATEGY: Cache-First with Dynamic Cache Population
  event.respondWith(
    caches.match(request).then(async (cachedResponse) => {
      if (cachedResponse) {
        // Ultra-fast instant response from local cache!
        return cachedResponse;
      }

      // Asset not yet cached; fetch from network and store in cache
      try {
        const networkResponse = await fetch(request);
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
        }
        return networkResponse;
      } catch {
        return cachedResponse;
      }
    })
  );
});

// 4. Message listener for instant updates
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
