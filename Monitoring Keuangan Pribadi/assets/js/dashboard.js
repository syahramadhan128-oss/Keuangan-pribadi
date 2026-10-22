/*
==================================
DASHBOARD.JS
==================================
*/

let expenseChart = null;

/*
==================================
FORMAT RUPIAH
==================================
*/

function rupiah(nilai){

    return "Rp " +
    Number(nilai || 0)
    .toLocaleString("id-ID");

}

/*
==================================
SET BULAN SAAT INI
==================================
*/

function setDefaultMonth(){

    const now = new Date();

    const bulan =
    String(now.getMonth() + 1)
    .padStart(2, "0");

    const filter =
    document.getElementById("filterBulan");

    if(filter){

