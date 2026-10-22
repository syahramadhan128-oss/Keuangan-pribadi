/*
=========================================
SERVICE WORKER
Keuangan Pribadi PWA
=========================================
*/

const CACHE_NAME = "keuangan-pribadi-v2";

const APP_ASSETS = [

    "./",

    "./index.html",
    "./login.html",
    "./transaksi.html",
    "./laporan.html",
    "./profil.html",

    "./manifest.json",

    "./assets/css/style.css",

    "./assets/js/storage.js",
    "./assets/js/app.js",
    "./assets/js/auth.js",
    "./assets/js/dashboard.js",
    "./assets/js/transaksi.js",
    "./assets/js/laporan.js",
    "./assets/js/profil.js",

    "./assets/icons/icon-192.png",
    "./assets/icons/icon-512.png"

];

/*
=========================================
INSTALL
=========================================
*/

self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME)
        .then(cache => {

            console.log(
                "✅ Cache Dibuat"
            );

            return cache.addAll(
                APP_ASSETS
            );

        })

    );

    self.skipWaiting();

});

/*
=========================================
ACTIVATE
=========================================
*/

self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys()
        .then(keys => {

            return Promise.all(

                keys.map(key => {

                    if(
                        key !== CACHE_NAME
                    ){

                        console.log(
                            "🗑 Menghapus Cache Lama:",
                            key
                        );

                        return caches.delete(
                            key
                        );

                    }

                })

            );

        })

    );

    self.clients.claim();

});

/*
=========================================
FETCH
CACHE FIRST
=========================================
*/

self.addEventListener("fetch", event => {

    if(
        event.request.method !== "GET"
    ){
        return;
    }

    event.respondWith(

        caches.match(
            event.request
        )

        .then(cacheResponse => {

            if(cacheResponse){

                return cacheResponse;

            }

            return fetch(
                event.request
            )

            .then(networkResponse => {

                if(
                    !networkResponse ||
                    networkResponse.status !== 200
                ){

                    return networkResponse;

                }

                const cloned =
                networkResponse.clone();

                caches.open(
                    CACHE_NAME
                )

                .then(cache => {

                    cache.put(
                        event.request,
                        cloned
                    );

                });

                return networkResponse;

            })

            .catch(() => {

                if(
                    event.request.mode ===
                    "navigate"
                ){

                    return caches.match(
                        "./index.html"
                    );

                }

            });

        })

    );

});

/*
=========================================
PUSH NOTIFICATION
=========================================
*/

self.addEventListener(
    "push",
    event => {

        const title =
        "Keuangan Pribadi";

        const options = {

            body:
            "Jangan lupa mencatat transaksi hari ini 📊",

            icon:
            "./assets/icons/icon-192.png",

            badge:
            "./assets/icons/icon-192.png",

            vibrate:
            [200,100,200]

        };

        event.waitUntil(

            self.registration
            .showNotification(
                title,
                options
            )

        );

    }
);

/*
=========================================
NOTIFICATION CLICK
=========================================
*/

self.addEventListener(
    "notificationclick",
    event => {

        event.notification.close();

        event.waitUntil(

            clients.openWindow(
                "./index.html"
            )

        );

    }
);

/*
=========================================
BACKGROUND SYNC
=========================================
*/

self.addEventListener(
    "sync",
    event => {

        console.log(
            "🔄 Sync:",
            event.tag
        );

    }
);
