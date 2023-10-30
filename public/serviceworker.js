const CACHE_NAME = 'my-site-v1';


const CACHE_URLS = ['/', 'index.html',
  'animals.html',
  '404.html',
  'kids.html',
  'about-us.html',
  'bookings.html',
  'prototype.html',
  'manifest.json',
  'style.css',
  'kids-style.css',
  '/images/Animals/48906862383_dd56b2d74e_o.jpg',
  '/images/Animals/45694686581_45e3a9a001_o.jpg',
  '/images/Animals/45694689711_64a42a1a68_o.jpg',
  '/images/Animals/tiger.jpg"',
  '/images/Animals/lion_banner.jpg',
  '/images/Animals/cartoon.png',
  '/images/Animals/otter.jpg',
  '/images/Animals/tiger.jpg',
  '/images/Animals/kangaroo.jpg',
  '/images/Animals/bear.jpg',
  '/images/Animals/50351644241_182cc31b6d_o.jpg',
  '/images/logo/log.svg',
];



self.addEventListener("install", function (event) {
  console.log("Service worker installed");
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        console.log("Cache opened");
        return cache.addAll(CACHE_URLS);
      })
  );
});


self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName.startsWith('my-site-') && CACHE_NAME !== cacheName) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});


self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        console.log(`Return ${event.request.url} from cache`);
        return response;
      }
      console.log(`Fetch ${event.request.url} from network`);
      return fetch(event.request);
    })
  );
});
