/*
==================================
STORAGE.JS
Database Local Storage
==================================
*/

const STORAGE_KEY = "transaksi";
const PROFILE_KEY = "profil";
const TARGET_KEY = "targetTabungan";
const PIN_KEY = "adminPIN";

/*
==================================
TRANSAKSI
==================================
*/

function getTransaksi() {

    try {

        return JSON.parse(
            localStorage.getItem(STORAGE_KEY)
        ) || [];

    } catch (e) {

        console.error(e);
        return [];

    }

}

function saveTransaksi(data) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
    );

}

function addTransaksi(transaksi) {

    const data = getTransaksi();

    data.push(transaksi);

    saveTransaksi(data);

}

function updateTransaksi(id, transaksiBaru) {

    const data = getTransaksi();

    const index =
    data.findIndex(
        item => item.id === id
    );

    if (index !== -1) {

        data[index] = {
            ...transaksiBaru,
            id: id
        };

        saveTransaksi(data);

        return true;

    }

    return false;

}

function deleteTransaksi(id) {

    const data =
    getTransaksi().filter(
        item => item.id !== id
    );

    saveTransaksi(data);

}

function clearTransaksi() {

    localStorage.removeItem(
        STORAGE_KEY
    );

}

function getTransaksiById(id) {

    return getTransaksi().find(
        item => item.id === id
    );

}

/*
==================================
PROFIL
==================================
*/

function getProfile() {

    try {

        return JSON.parse(
            localStorage.getItem(PROFILE_KEY)
        ) || {};

    } catch (e) {

        return {};

    }

}

function saveProfile(profile) {

    localStorage.setItem(
        PROFILE_KEY,
        JSON.stringify(profile)
    );

}

/*
==================================
TARGET TABUNGAN
==================================
*/

function getTargetTabungan() {

    try {

        return JSON.parse(
            localStorage.getItem(TARGET_KEY)
        ) || {};

    } catch (e) {

        return {};

    }

}

function saveTargetTabungan(data) {

    localStorage.setItem(
        TARGET_KEY,
        JSON.stringify(data)
    );

}

function deleteTargetTabungan() {

    localStorage.removeItem(
        TARGET_KEY
    );

}

/*
==================================
PIN ADMIN
==================================
*/

function getPIN() {

    return localStorage.getItem(
        PIN_KEY
    );

}

function savePIN(pin) {

    localStorage.setItem(
        PIN_KEY,
        pin
    );

}

function deletePIN() {

    localStorage.removeItem(
        PIN_KEY
    );

}

function verifyPIN(inputPIN) {

    return inputPIN === getPIN();

}

/*
==================================
DARK MODE
==================================
*/

function saveDarkMode(status) {

    localStorage.setItem(
        "darkMode",
        status
    );

}

function getDarkMode() {

    return localStorage.getItem(
        "darkMode"
    ) === "true";

}

/*
==================================
STATISTIK
==================================
*/

function getStatistik() {

    const data =
    getTransaksi();

    let pemasukan = 0;
    let pengeluaran = 0;

    data.forEach(item => {

        const nominal =
        Number(item.nominal || 0);

        if (item.jenis === "Masuk") {

            pemasukan += nominal;

        } else {

            pengeluaran += nominal;

        }

    });

    return {

        pemasukan,

        pengeluaran,

        saldo:
        pemasukan - pengeluaran,

        jumlahTransaksi:
        data.length

    };

}

/*
==================================
FILTER
==================================
*/

function filterByMonth(bulan) {

    const data =
    getTransaksi();

    if (!bulan) return data;

    return data.filter(item =>
        item.tanggal &&
        item.tanggal.startsWith(bulan)
    );

}

function filterByJenis(jenis) {

    const data =
    getTransaksi();

    if (!jenis) return data;

    return data.filter(item =>
        item.jenis === jenis
    );

}

/*
==================================
EXPORT BACKUP
==================================
*/

function exportBackup() {

    const backup = {

        transaksi:
        getTransaksi(),

        profil:
        getProfile(),

        target:
        getTargetTabungan(),

        pin:
        getPIN(),

        tanggalExport:
        new Date()
        .toISOString()

    };

    return backup;

}

/*
==================================
IMPORT BACKUP
==================================
*/

function importBackup(data) {

    if (data.transaksi) {

        saveTransaksi(
            data.transaksi
        );

    }

    if (data.profil) {

        saveProfile(
            data.profil
        );

    }

    if (data.target) {

        saveTargetTabungan(
            data.target
        );

    }

    if (data.pin) {

        savePIN(
            data.pin
        );

    }

}

/*
==================================
RESET SEMUA DATA
==================================
*/

function resetSemuaData() {

    localStorage.removeItem(
        STORAGE_KEY
    );

    localStorage.removeItem(
        PROFILE_KEY
    );

    localStorage.removeItem(
        TARGET_KEY
    );

    localStorage.removeItem(
        PIN_KEY
    );

}

console.log(
    "storage.js loaded"
);