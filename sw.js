//credit to https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers for the help on understanding

let version = 'v6-attempt';

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(version)
            .then(function(cache) {
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
                '/img/10.jpg',
                '/css/styles.css',
                '/css/screen1340styles.css',
                '/css/screen760styles.css',
                '/data/restaurants.json',
                '/js/main.js',
                '/js/dbhelper.js',
                '/css',
                '/',
                '/index.html',
                'restaurant.html'

            ]);
        })
    );
});

self.addEventListener('activate', function(event) {
    var whitelist = ['v6-attempt'];
    console.log('activate');
    event.waitUntil(
        caches.keys()
            .then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                if (whitelist.indexOf(key) === -1) {
                    return caches.delete(key);
                }
            }));
        })
    );
});

//copies pages it has been on before...but not the ones it hasn't
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
            return response || fetch(event.request)
                .then(function(response) {
                let responseClone = response.clone();
                caches.open(version)
                    .then(function(cache) {
                    cache.put(event.request, responseClone);
                });
                return response;
            });
        }).catch(function(err) {
            return console.log(err);
        })
    );
});
