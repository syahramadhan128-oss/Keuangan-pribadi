/*
========================================
TRANSAKSI.JS v3.1 FIRESTORE
========================================
*/

let editId = null;

let transaksiData = [];

/*
========================================
KATEGORI
========================================
*/

const kategoriMasuk = [
    "Gaji",
    "Bonus",
    "THR",
    "Freelance",
    "Investasi",
    "Income Lain"
];

const kategoriKeluar = [
    "Tagihan Rumah",
    "Kebutuhan Harian",
    "Cicilan Rumah",
    "Keperluan Pribadi",
    "Kendaraan",
    "Medical",
    "Keperluan Bayi"
];

/*
========================================
HELPER
========================================
*/

function rupiah(nilai) {

    return "Rp " +
        Number(nilai || 0)
        .toLocaleString("id-ID");

}

/*
========================================
FIRESTORE
========================================
*/

function transaksiCollection() {

    const user =
        auth.currentUser;

    if (!user) {

        throw new Error(
            "Login Google terlebih dahulu"
        );

    }

    return db
        .collection("users")
        .doc(user.uid)
        .collection("transactions");

}

/*
========================================
TANGGAL HARI INI
========================================
*/

function setTanggalHariIni() {

    const tanggal =
        document.getElementById(
            "tanggal"
        );

    if (tanggal) {

        tanggal.value =
            new Date()
            .toISOString()
            .split("T")[0];

    }

}

/*
========================================
LOAD KATEGORI
========================================
*/

function loadKategori() {

    const jenis =
        document.getElementById(
            "jenis"
        ).value;

    const kategori =
        document.getElementById(
            "kategori"
        );

    kategori.innerHTML = "";

    const data =
        jenis === "Masuk"
        ? kategoriMasuk
        : kategoriKeluar;

    data.forEach(item => {

        const option =
            document.createElement(
                "option"
            );

        option.value =
            item;

        option.textContent =
            item;

        kategori.appendChild(
            option
        );

    });

}

/*
========================================
RESET FORM
========================================
*/

function resetForm() {

    editId = null;

    document
        .getElementById(
            "formTransaksi"
        )
        .reset();

    document.getElementById(
        "editActions"
    ).style.display =
        "none";

    setTanggalHariIni();

    loadKategori();

}

/*
========================================
SIMPAN FIRESTORE
========================================
*/

async function simpanTransaksi(event) {

    event.preventDefault();

    try {

        const transaksi = {

            id:
                Date.now(),

            tanggal:
                document.getElementById(
                    "tanggal"
                ).value,

            jenis:
                document.getElementById(
                    "jenis"
                ).value,

            kategori:
                document.getElementById(
                    "kategori"
                ).value,

            deskripsi:
                document.getElementById(
                    "deskripsi"
                ).value,

            nominal:
                Number(
                    document.getElementById(
                        "nominal"
                    ).value
                ),

            createdAt:
                firebase.firestore.Timestamp.now()

        };

        await transaksiCollection()
            .doc(
                String(
                    transaksi.id
                )
            )
            .set(
                transaksi
            );

        document.getElementById(
            "status"
        ).innerHTML =
        "✅ Transaksi berhasil disimpan";

        resetForm();

        await loadTransaksi();

    }
    catch(error){

        console.error(error);

        document.getElementById(
            "status"
        ).innerHTML =
        "❌ Gagal menyimpan transaksi";

    }

}

/*
========================================
LOAD TRANSAKSI
========================================
*/

async function loadTransaksi() {

    try {

        const snapshot =
            await transaksiCollection()
            .orderBy(
                "tanggal",
                "desc"
            )
            .get();

        transaksiData = [];

        snapshot.forEach(doc => {

            transaksiData.push(
                doc.data()
            );

        });

        renderTransaksi();

        updateStatistik();

    }
    catch(error){

        console.error(error);

    }

}

/*
========================================
RENDER
========================================
*/

function renderTransaksi() {

    const container =
        document.getElementById(
            "daftarTransaksi"
        );

    if (!container) return;

    if (
        transaksiData.length === 0
    ) {

        container.innerHTML =
            "Belum ada transaksi";

        return;

    }

    container.innerHTML =
        transaksiData.map(item => `

        <div
            class="card"
            style="cursor:pointer"
            onclick="editTransaksi(${item.id})">

            <b>
                ${item.kategori}
            </b>

            <br>

            ${item.deskripsi || "-"}

            <br>

            ${item.tanggal}

            <br>

            <span
                style="
                color:
                ${
                    item.jenis === "Masuk"
                    ? "#16a34a"
                    : "#dc2626"
                }">

                ${rupiah(
                    item.nominal
                )}

            </span>

        </div>

        `).join("");

}

/*
========================================
EDIT
========================================
*/

function editTransaksi(id) {

    const transaksi =
        transaksiData.find(

            item =>
            item.id === id

        );

    if (!transaksi) {

        return;

    }

    editId = id;

    document.getElementById(
        "tanggal"
    ).value =
        transaksi.tanggal;

    document.getElementById(
        "jenis"
    ).value =
        transaksi.jenis;

    loadKategori();

    document.getElementById(
        "kategori"
    ).value =
        transaksi.kategori;

    document.getElementById(
        "deskripsi"
    ).value =
        transaksi.deskripsi;

    document.getElementById(
        "nominal"
    ).value =
        transaksi.nominal;

    document.getElementById(
        "editActions"
    ).style.display =
        "block";

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}

/*
========================================
UPDATE
========================================
*/

async function updateTransaksi() {

    if (!editId) return;

    try {

        const data = {

            id:
                editId,

            tanggal:
                document.getElementById(
                    "tanggal"
                ).value,

            jenis:
                document.getElementById(
                    "jenis"
                ).value,

            kategori:
                document.getElementById(
                    "kategori"
                ).value,

            deskripsi:
                document.getElementById(
                    "deskripsi"
                ).value,

            nominal:
                Number(
                    document.getElementById(
                        "nominal"
                    ).value
                )

        };

        await transaksiCollection()
            .doc(
                String(editId)
            )
            .set(data);

        resetForm();

        await loadTransaksi();

    }
    catch(error){

        console.error(error);

    }

}

/*
========================================
DELETE
========================================
*/

async function hapusTransaksiForm() {

    if (!editId) return;

    const ok =
        confirm(
            "Hapus transaksi ini?"
        );

    if (!ok) return;

    try {

        await transaksiCollection()
            .doc(
                String(editId)
            )
            .delete();

        resetForm();

        await loadTransaksi();

    }
    catch(error){

        console.error(error);

    }

}

/*
========================================
BATAL EDIT
========================================
*/

function batalEdit() {

    resetForm();

}

/*
========================================
SEARCH
========================================
*/

function cariTransaksi() {

    const keyword =
        document
        .getElementById(
            "searchTransaksi"
        )
        .value
        .toLowerCase();

    const hasil =
        transaksiData.filter(item =>

            item.kategori
            .toLowerCase()
            .includes(keyword)

            ||

            (item.deskripsi || "")
            .toLowerCase()
            .includes(keyword)

        );

    const container =
        document.getElementById(
            "daftarTransaksi"
        );

    container.innerHTML =
        hasil.map(item => `

        <div
            class="card"
            onclick="editTransaksi(${item.id})">

            <b>${item.kategori}</b>

            <br>

            ${item.deskripsi || "-"}

            <br>

            ${rupiah(item.nominal)}

        </div>

        `).join("");

}

/*
========================================
STATISTIK
========================================
*/

function updateStatistik() {

    const total =
        document.getElementById(
            "jumlahTransaksi"
        );

    if (total) {

        total.innerHTML =
            transaksiData.length;

    }

}

/*
========================================
AUTH CHECK
========================================
*/

function cekLogin() {

    const user =
        auth.currentUser;

    if (!user) {

        alert(
            "Silakan Login Google terlebih dahulu"
        );

        location.href =
            "login.html";

        return false;

    }

    return true;

}

/*
========================================
INIT
========================================
*/

document.addEventListener(
    "DOMContentLoaded",
    () => {

        auth.onAuthStateChanged(
            async user => {

                if (!user) {

                    return;

                }

                setTanggalHariIni();

                loadKategori();

                await loadTransaksi();

            }
        );

        document
            .getElementById(
                "jenis"
            )
            .addEventListener(
                "change",
                loadKategori
            );

        document
            .getElementById(
                "formTransaksi"
            )
            .addEventListener(
                "submit",
                simpanTransaksi
            );

        document
            .getElementById(
                "searchTransaksi"
            )
            .addEventListener(
                "input",
                cariTransaksi
            );

    }
);
