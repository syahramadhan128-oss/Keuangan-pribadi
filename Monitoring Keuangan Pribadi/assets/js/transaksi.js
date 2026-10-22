/*
========================================
TRANSAKSI.JS
========================================
*/

let editId = null;

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
FORMAT RUPIAH
========================================
*/

function rupiah(nilai){

    return "Rp " +
    Number(nilai || 0)
    .toLocaleString("id-ID");

}

/*
========================================
SET TANGGAL HARI INI
========================================
*/

function setTanggalHariIni(){

    const tanggal =
    document.getElementById(
        "tanggal"
    );

    if(tanggal){

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

function loadKategori(){

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

    data.forEach(item=>{

        const option =
        document.createElement(
            "option"
        );

        option.value = item;
        option.textContent = item;

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

function resetForm(){

    editId = null;

    document
    .getElementById(
        "formTransaksi"
    )
    .reset();

    setTanggalHariIni();

    loadKategori();

}

/*
========================================
SIMPAN TRANSAKSI
==================