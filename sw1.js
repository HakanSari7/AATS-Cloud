const CACHE_NAME = 'aats-cache-v2';
const urlsToCache = [
  '/',               // Ana sayfa rotan
  '/dashboard',      // Dashboard rotan
  '/manifest.json'   // Manifest dosyan
];

// Kurulum aşamasında dosyaları önbelleğe al
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Dosyalar önbelleğe alınıyor...');
        return cache.addAll(urlsToCache);
      })
      .catch(err => console.error('Önbelleğe alma hatası:', err))
  );
});

// İnternet yokken önbellekteki dosyaları getir
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});