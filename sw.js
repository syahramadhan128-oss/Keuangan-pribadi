/*
=========================================
SERVICE WORKER
Keuangan Pribadi v3.0
=========================================
*/

const CACHE_NAME =
    "keuangan-pribadi-v3";

/*
=========================================
FILES CACHE
=========================================
*/

const APP_ASSETS = [

    "./",

    "./index.html",
    "./login.html",
    "./transaksi.html",
    "./laporan.html",
    "./profil.html",

    "./manifest.json",

    "./assets/css/style.css",

    "./assets/js/firebase-config.js",

    "./assets/js/auth.js",

    "./assets/js/storage.js",

    "./assets/js/app.js",

    "./assets/js/dashboard.js",

    "./assets/js/transaksi.js",

    "./assets/js/laporan.js",

    "./assets/js/profil.js",

    "./assets/js/kategori.js",

    "./assets/js/sync.js",

    "./assets/js/excel-import.js",

    "./assets/js/excel-export.js",

    "./assets/icons/icon-192.png",

    "./assets/icons/icon-512.png"

];

/*
=========================================
INSTALL
=========================================
*/

self.addEventListener(
    "install",
    event => {

        event.waitUntil(

            caches
            .open(CACHE_NAME)
            .then(cache => {

                console.log(
                    "✅ Cache dibuat"
                );

                return cache.addAll(
                    APP_ASSETS
                );

            })

        );

        self.skipWaiting();

    }
);

/*
=========================================
ACTIVATE
=========================================
*/

self.addEventListener(
    "activate",
    event => {

        event.waitUntil(

            caches.keys()
            .then(keys => {

                return Promise.all(

                    keys.map(key => {

                        if (
                            key !== CACHE_NAME
                        ) {

                            console.log(
                                "🗑 Hapus cache lama:",
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

    }
);

/*
=========================================
FETCH
CACHE FIRST
=========================================
*/

self.addEventListener(
    "fetch",
    event => {

        if (
            event.request.method !==
            "GET"
        ) {
            return;
        }

        event.respondWith(

            caches.match(
                event.request
            )

            .then(response => {

                if (response) {

                    return response;

                }

                return fetch(
                    event.request
                )

                .then(networkResponse => {

                    if (
                        !networkResponse ||
                        networkResponse.status !== 200
                    ) {

                        return networkResponse;

                    }

                    const clone =
                        networkResponse.clone();

                    caches
                    .open(CACHE_NAME)
                    .then(cache => {

                        cache.put(
                            event.request,
                            clone
                        );

                    });

                    return networkResponse;

                })

                .catch(() => {

                    if (
                        event.request.mode ===
                        "navigate"
                    ) {

                        return caches.match(
                            "./index.html"
                        );

                    }

                });

            })

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
            "🔄 Background Sync:",
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
            "Jangan lupa mencatat pemasukan dan pengeluaran hari ini.",

            icon:
            "./assets/icons/icon-192.png",

            badge:
            "./assets/icons/icon-192.png",

            vibrate:
            [200, 100, 200],

            data: {

                url:
                "./transaksi.html"

            }

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

                event.notification.data.url

            )

        );

    }
);

/*
=========================================
MESSAGE EVENT
=========================================
*/

self.addEventListener(
    "message",
    event => {

        if (
            event.data &&
            event.data.type ===
            "SKIP_WAITING"
        ) {

            self.skipWaiting();

        }

    }
);

/*
=========================================
ONLINE STATUS
=========================================
*/

self.addEventListener(
    "online",
    () => {

        console.log(
            "🌐 Online"
        );

    }
);

/*
=========================================
OFFLINE STATUS
=========================================
*/

self.addEventListener(
    "offline",
    () => {

        console.log(
            "📴 Offline"
        );

    }
);

console.log(
    "✅ SW v3 Loaded"
);
