const CACHE_NAME = "spark-group-v3";

self.addEventListener("install", function(event){

self.skipWaiting();

});


self.addEventListener("activate", function(event){

event.waitUntil(
clients.claim()
);

});


self.addEventListener("fetch", function(event){

event.respondWith(
fetch(event.request)
);

});
