/*
========================================
LAPORAN.JS
========================================
*/

let chartUtama = null;
let chartKategori = null;

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
AMBIL FILTER
========================================
*/

function getFilteredData(){

    let data =
    getTransaksi();

    const bulan =
    document.getElementById(
        "filterBulan"
    )?.value || "";

    const jenis =
    document.getElementById(
        "filterJenis"
    )?.value || "";

    if(bulan){

        data =
        data.filter(item =>

            item.tanggal &&
            item.tanggal.startsWith(
                bulan
            )

        );

    }

    if(jenis){

        data =
        data.filter(item =>

            item.jenis === jenis

        );

    }

    return data;

}

/*
========================================
HITUNG STATISTIK
========================================
*/

function getSummary(){

    const data =
    getFilteredData();

    let masuk = 0;
    let keluar = 0;

    const kategoriMap = {};

    data.forEach(item => {

        const nominal =
        Number(item.nominal || 0);

        if(
            item.jenis === "Masuk"
        ){

            masuk += nominal;

        }else{

            keluar += nominal;

            kategoriMap[
                item.kategori
            ] =
            (kategoriMap[
                item.kategori
            ] || 0)
            + nominal;

        }

    });

    return {

        transaksi:data,

        masuk,
        keluar,

        saldo:
        masuk - keluar,

        kategoriMap

    };

}

/*
========================================
SUMMARY CARD
========================================
*/

function renderSummary(){

    const stats =
    getSummary();

    document.getElementById(
        "totalMasuk"
    ).innerHTML =
    rupiah(stats.masuk);

    document.getElementById(
        "totalKeluar"
    ).innerHTML =
    rupiah(stats.keluar);

    document.getElementById(
        "saldo"
    ).innerHTML =
    rupiah(stats.saldo);

}

/*
========================================
HEALTH SCORE
========================================
*/

function renderHealthScore(){

    const stats =
    getSummary();

    const scoreEl =
    document.getElementById(
        "score"
    );

    if(!scoreEl){
        return;
    }

    let score = 100;

    if(stats.masuk > 0){

        const rasio =
        (stats.keluar /
        stats.masuk) * 100;

        score =
        Math.max(
            0,
            Math.round(
                100 - rasio
            )
        );

    }

    scoreEl.innerHTML =
    score + "/100";

}

/*
========================================
INSIGHT
========================================
*/

function renderInsight(){

    const stats =
    getSummary();

    const insight =
    document.getElementById(
        "insight"
    );

    if(!insight){
        return;
    }

    if(
        stats.transaksi.length === 0
    ){

        insight.innerHTML =
        "Belum ada transaksi yang tersimpan.";

        return;

    }

    if(stats.saldo > 0){

        insight.innerHTML =
        "✅ Kondisi keuangan sehat. Pemasukan masih lebih besar daripada pengeluaran.";

    }else if(stats.saldo === 0){

        insight.innerHTML =
        "⚠️ Pemasukan dan pengeluaran saat ini seimbang.";

    }else{

        insight.innerHTML =
        "🚨 Pengeluaran melebihi pemasukan. Perlu evaluasi pengeluaran.";

    }

}

/*
========================================
TABEL LAPORAN
========================================
*/

function renderTable(){

    const tbody =
    document.getElementById(
        "dataTable"
    );

    if(!tbody){
        return;
    }

    const data =
    [...getFilteredData()]
    .reverse();

    if(data.length === 0){

        tbody.innerHTML =
        `
        <tr>
            <td colspan="5"
            style="text-align:center">
            Belum ada data
            </td>
        </tr>
        `;

        return;

    }

    tbody.innerHTML =
    data.map(item => `

    <tr>

        <td>
        ${item.tanggal}
        </td>

        <td>
        ${item.jenis}
        </td>

        <td>
        ${item.kategori}
        </td>

        <td>
        ${item.deskripsi || "-"}
        </td>

        <td>
        ${rupiah(item.nominal)}
        </td>

    </tr>

    `).join("");

}

/*
========================================
GRAFIK UTAMA
========================================
*/

function renderChartUtama(){

    const canvas =
    document.getElementById(
        "chartUtama"
    );

    if(!canvas){
        return;
    }

    const stats =
    getSummary();

    if(chartUtama){
        chartUtama.destroy();
    }

    chartUtama =
    new Chart(canvas,{

        type:"doughnut",

        data:{

            labels:[
                "Pemasukan",
                "Pengeluaran"
            ],

            datasets:[{

                data:[
                    stats.masuk,
                    stats.keluar
                ],

                backgroundColor:[
                    "#16a34a",
                    "#dc2626"
                ]

            }]

        },

        options:{

            responsive:true,

            plugins:{
                legend:{
                    position:"bottom"
                }
            }
        }

    });

}

/*
========================================
GRAFIK KATEGORI
========================================
*/

function renderChartKategori(){

    const canvas =
    document.getElementById(
        "chartKategori"
    );

    if(!canvas){
        return;
    }

    const stats =
    getSummary();

    if(chartKategori){
        chartKategori.destroy();
    }

    chartKategori =
    new Chart(canvas,{

        type:"bar",

        data:{

            labels:
            Object.keys(
                stats.kategoriMap
            ),

            datasets:[{

                label:
                "Pengeluaran",

                data:
                Object.values(
                    stats.kategoriMap
                ),

                backgroundColor:
                "#2563eb"

            }]

        },

        options:{

            responsive:true,

            scales:{
                y:{
                    beginAtZero:true
                }
            }

        }

    });

}

/*
========================================
EXPORT EXCEL
========================================
*/

function exportExcel(){

    const data =
    getFilteredData();

    if(data.length === 0){

        alert(
        "Tidak ada data untuk diexport"
        );

        return;

    }

    const workbook =
    XLSX.utils.book_new();

    const worksheet =
    XLSX.utils.json_to_sheet(
        data
    );

    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Transaksi"
    );

    XLSX.writeFile(
        workbook,
        "LaporanKeuangan.xlsx"
    );

}

/*
========================================
RESET DATA
========================================
*/

function hapusSemuaData(){

    const ok =
    confirm(
        "Yakin ingin menghapus seluruh data transaksi?"
    );

    if(!ok){
        return;
    }

    clearTransaksi();

    render();

}

/*
========================================
RENDER SEMUA
========================================
*/

function render(){

    renderSummary();

    renderHealthScore();

    renderInsight();

    renderTable();

    renderChartUtama();

    renderChartKategori();

}

/*
========================================
EVENT FILTER
========================================
*/

function initFilter(){

    const bulan =
    document.getElementById(
        "filterBulan"
    );

    const jenis =
    document.getElementById(
        "filterJenis"
    );

    bulan?.addEventListener(
        "change",
        render
    );

    jenis?.addEventListener(
        "change",
        render
    );

}

/*
========================================
SET BULAN SEKARANG
========================================
*/

function setDefaultMonth(){

    const el =
    document.getElementById(
        "filterBulan"
    );

    if(!el){
        return;
    }

    const now =
    new Date();

    el.value =
    `${now.getFullYear()}-${String(
        now.getMonth() + 1
    ).padStart(2,"0")}`;

}

/*
========================================
INIT
========================================
*/

function initLaporan(){

    setDefaultMonth();

    initFilter();

    render();

}

/*
========================================
AUTO LOAD
========================================
*/

document.addEventListener(
    "DOMContentLoaded",
    initLaporan
);