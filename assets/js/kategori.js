/*
========================================
KATEGORI.JS
RINGKASAN PENGELUARAN
========================================
*/

function getPengeluaranPerKategori() {

    const transaksi =
        getTransaksi();

    const kategori = {};

    transaksi.forEach(item => {

        if (item.jenis !== "Keluar") {
            return;
        }

        const nama =
            item.kategori ||
            "Lainnya";

        if (!kategori[nama]) {

            kategori[nama] = 0;

        }

        kategori[nama] +=
            Number(
                item.nominal || 0
            );

    });

    return kategori;

}

function getTopKategori() {

    const data =
        getPengeluaranPerKategori();

    return Object.entries(data)
        .sort(
            (a, b) =>
                b[1] - a[1]
        );

}

function renderKategoriSummary(
    elementId
) {

    const container =
        document.getElementById(
            elementId
        );

    if (!container) return;

    const kategori =
        getTopKategori();

    if (
        kategori.length === 0
    ) {

        container.innerHTML =
            "Belum ada data";

        return;

    }

    container.innerHTML =
        kategori.map(item => `
            <div class="kategori-item">
                <b>${item[0]}</b>
                <span>
                    Rp ${item[1]
                        .toLocaleString("id-ID")}
                </span>
            </div>
        `).join("");

}
