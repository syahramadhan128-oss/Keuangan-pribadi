/*
========================================
APP.JS
GLOBAL HELPER
========================================
*/

/*
========================================
RUPIAH FORMAT
========================================
*/

function rupiah(nilai){

    return "Rp " +
    Number(nilai || 0)
    .toLocaleString("id-ID");

}

/*
========================================
FORMAT TANGGAL
========================================
*/

function formatTanggal(tanggal){

    if(!tanggal) return "-";

    return new Date(tanggal)
    .toLocaleDateString(
        "id-ID",
        {
            day:"2-digit",
            month:"long",
            year:"numeric"
        }
    );

}

/*
========================================
TANGGAL HARI INI
========================================
*/

function tanggalHariIni(){

    return new Date()
    .toISOString()
    .split("T")[0];

}

/*
========================================
GENERATE ID
========================================
*/

function generateId(){

    return Date.now();

}

/*
========================================
QUERY SELECTOR
========================================
*/

function $(selector){

    return document.querySelector(
        selector
    );

}

function $all(selector){

    return document.querySelectorAll(
        selector
    );

}

/*
========================================
NOTIFIKASI
========================================
*/

function showToast(
    message,
    type = "success"
){

    const toast =
    document.createElement("div");

    let warna = "#16a34a";

    if(type === "error"){
        warna = "#dc2626";
    }

    if(type === "warning"){
        warna = "#f59e0b";
    }

    if(type === "info"){
        warna = "#2563eb";
    }

    toast.style.position = "fixed";
    toast.style.top = "20px";
    toast.style.right = "20px";
    toast.style.zIndex = "99999";
    toast.style.background = warna;
    toast.style.color = "white";
    toast.style.padding = "12px 16px";
    toast.style.borderRadius = "12px";
    toast.style.boxShadow =
    "0 4px 12px rgba(0,0,0,.2)";
    toast.innerHTML = message;

    document.body.appendChild(
        toast
    );

    setTimeout(()=>{

        toast.remove();

    },3000);

}

/*
========================================
LOADING OVERLAY
========================================
*/

function showLoading(){

    if(
        document.getElementById(
            "globalLoading"
        )
    ){
        return;
    }

    const 