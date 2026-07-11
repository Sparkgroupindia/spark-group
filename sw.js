const CACHE_NAME = "spark-group-v1";

const FILES = [
  "./",
  "./manifest.json"
];

self.addEventListener("install", event => {

  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES))
  );

});

self.addEventListener("activate", event => {

  event.waitUntil(

    caches.keys().then(keys =>

      Promise.all(

        keys.map(key => {

          if(key !== CACHE_NAME){

            return caches.delete(key);

          }

        })

      )

    )

  );

  self.clients.claim();

});

self.addEventListener("fetch", event => {

  // HTML pages = always network first

  if(event.request.mode === "navigate"){

    event.respondWith(

      fetch(event.request)

      .catch(()=>caches.match("./"))

    );

    return;

  }

  // Other files = cache first

  event.respondWith(

    caches.match(event.request)

    .then(response=>response || fetch(event.request))

  );

});
