/*
=========================================
Service Worker
Keuangan Pribadi PWA
=========================================
*/

const CACHE_NAME = "keuangan-pribadi-v1";

const FILES_TO_CACHE = [

    "./",

    "./index.html",
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

    "./assets/icons/icon-72.png",
    "./assets/icons/icon-96.png",
    "./assets/icons/icon-128.png",
    "./assets/icons/icon-144.png",
    "./assets/icons/icon-152.png",
    "./assets/icons/icon-192.png",
    "./assets/icons/icon-384.png",
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
                "Cache dibuat"
            );

            return cache.addAll(
                FILES_TO_CACHE
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

                    if(key !== CACHE_NAME){

                        console.log(
                            "Menghapus cache lama:",
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

        .then(response => {

            if(response){

                return response;

            }

            return fetch(
                event.request
            )

            .then(networkResponse => {

                const responseClone =
                networkResponse.clone();

                caches.open(
                    CACHE_NAME
                )

                .then(cache => {

                    cache.put(
                        event.request,
                        responseClone
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
BACKGROUND SYNC
=========================================
*/

self.addEventListener(
    "sync",
    event => {

        console.log(
            "Background Sync:",
            event.tag
        );

    }
);

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
            "Jangan lupa catat transaksi hari ini 📊",

            icon:
            "./assets/icons/icon-192.png",

            badge:
            "./assets/icons/icon-192.png"

        };

        event.waitUntil(

            self.registration.showNotification(
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