let version = 'v6-attempt';

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(version).then(function(cache) {
            return cache.addAll([
                '/img/1.jpg',
                '/img/2.jpg',
                '/img/3.jpg',
                '/img/4.jpg',
                '/img/5.jpg',
                '/img/6.jpg',
                '/img/7.jpg',
                '/img/8.jpg',
                '/img/9.jpg',
                '/img/9.jpg',
                '/css/styles.css',
                '/css/screen1340styles.css',
                '/data/restaurants.json',
                '/js/main.js',
                '/js/dbhelper.js',
                '/css',
                '/'

            ]);
        })
    );
});

self.addEventListener('activate', function(event) {
    var cacheWhitelist = ['v6-attempt'];
    console.log('activate');
    event.waitUntil(
        caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                if (cacheWhitelist.indexOf(key) === -1) {
                    return caches.delete(key);
                }
            }));
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(caches.match(event.request).then(function(response) {
        // caches.match() always resolves
        // but in case of success response will have value
        if (response !== undefined) {
            return response;
        } else {
            return fetch(event.request).then(function (response) {
                return response;
            }).catch(function () {
                return caches.match('/');
            });
        }
    }));
});
