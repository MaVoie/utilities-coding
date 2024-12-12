/* eslint-disable no-restricted-globals */

// This service worker can be customized!
// See https://developers.google.com/web/tools/workbox/modules
// for the list of available Workbox modules, or add any other
// code you'd like.
// You can also remove this file if you'd prefer not to use a
// service worker, and the Workbox build step will be skipped.
import { clientsClaim } from "workbox-core";
import { ExpirationPlugin } from "workbox-expiration";
import { precacheAndRoute, createHandlerBoundToURL } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import {
  StaleWhileRevalidate,
  CacheFirst,
  NetworkFirst,
} from "workbox-strategies";
import { setCacheNameDetails } from "workbox-core";

setCacheNameDetails({
  prefix: "MaVoie",
  precache: "precache",
  runtime: "runtime",
});

clientsClaim();

// Precache and route all assets generated by your build process.
precacheAndRoute(self.__WB_MANIFEST);

// App Shell-style routing
const appShellHandler = createHandlerBoundToURL("/index.html");

registerRoute(
  ({ request }) => request.mode === "navigate",
  ({ event }) => appShellHandler(event)
);

// Cache Firebase Storage requests
registerRoute(
  ({ url }) => url.origin === "https://firebasestorage.googleapis.com",
  new StaleWhileRevalidate({
    cacheName: "firebase-storage",
    plugins: [
      new CacheFirst({
        maxEntries: 50,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
      }),
    ],
  })
);

// Cache static assets
registerRoute(
  ({ request }) =>
    request.destination === "style" ||
    request.destination === "script" ||
    request.destination === "image",
  new CacheFirst({
    cacheName: "static-assets",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
      }),
    ],
  })
);

// Cache API requests
registerRoute(
  ({ url }) => url.pathname.startsWith("/api/"),
  new NetworkFirst({
    cacheName: "api-responses",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 5 * 60, // 5 minutes
      }),
    ],
  })
);

// Listen for version change messages
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "VERSION_CHANGE") {
    currentVersion = event.data.version;
    console.log(`Received version change to: ${currentVersion}`);

    // Optionally, you can trigger a cache cleanup here
    // cleanupOldCaches();
  }

  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// Function to clean up old caches
async function cleanupOldCaches() {
  const cacheNames = await caches.keys();
  const oldCacheNames = cacheNames.filter(
    (name) => !name.includes(`v${currentVersion}`)
  );

  await Promise.all(oldCacheNames.map((name) => caches.delete(name)));
}

// Optional: Add offline fallback
const offlineFallbackPage = "/offline.html";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("offline-cache").then((cache) => cache.add(offlineFallbackPage))
  );
});

// Optional: Handle offline navigations
self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match(offlineFallbackPage);
      })
    );
  }
});
