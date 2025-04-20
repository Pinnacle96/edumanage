const CACHE_NAME = "edumanage-cache";
const urlsToCache = [
  "/",
  "/index.html",
  "/icon.png",
  "/icon-512.png",
  "https://cdn.tailwindcss.com",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
      .catch((err) => console.error("Cache open failed:", err))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) return response;
      return fetch(event.request).catch(() => {
        console.warn("Fetch failed for:", event.request.url);
        return caches.match("/index.html"); // Fallback to index.html
      });
    })
  );
});
