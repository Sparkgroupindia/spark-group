const CACHE_NAME = "spark-v1";

const urlsToCache = [

"/spark-group/",

"/spark-group/index.html",

"/spark-group/manifest.json",

"/spark-group/icon-192.png",

"/spark-group/icon-512.png"

];

self.addEventListener("install",(event)=>{

event.waitUntil(

caches.open(CACHE_NAME)

.then(cache=>cache.addAll(urlsToCache))

);

self.skipWaiting();

});

self.addEventListener("activate",(event)=>{

event.waitUntil(

clients.claim()

);

});

self.addEventListener("fetch",(event)=>{

event.respondWith(

fetch(event.request)

.then(response=>{

return response;

})

.catch(()=>{

return caches.match(event.request);

})

);

});
