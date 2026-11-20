/*
========================================
SYNC.JS
FIREBASE SYNC
========================================
*/

async function syncTransaksi() {

    try {

        const user =
            auth.currentUser;

        if (!user) {

            console.log(
                "Belum login Google"
            );

            return;

        }

        const transaksi =
            getTransaksi();

        for (
            let item of transaksi
        ) {

            await db
                .collection("users")
                .doc(user.uid)
                .collection(
                    "transactions"
                )
                .doc(
                    String(item.id)
                )
                .set(item);

        }

        console.log(
            "Sync berhasil"
        );

    } catch (error) {

        console.error(error);

    }

}

async function loadCloudData() {

    try {

        const user =
            auth.currentUser;

        if (!user) return;

        const snapshot =
            await db
                .collection("users")
                .doc(user.uid)
                .collection(
                    "transactions"
                )
                .get();

        const data = [];

        snapshot.forEach(doc => {

            data.push(
                doc.data()
            );

        });

        saveTransaksi(data);

    } catch (error) {

        console.error(error);

    }

}
