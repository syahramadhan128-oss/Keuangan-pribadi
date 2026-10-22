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

    const loading =
    document.createElement("div");

    loading.id =
    "globalLoading";

    loading.innerHTML =
    `
    <div class="loading-box">
        ⏳ Memproses...
    </div>
    `;

    loading.style.position =
    "fixed";

    loading.style.top = "0";
    loading.style.left = "0";
    loading.style.right = "0";
    loading.style.bottom = "0";

    loading.style.background =
    "rgba(0,0,0,.4)";

    loading.style.display =
    "flex";

    loading.style.alignItems =
    "center";

    loading.style.justifyContent =
    "center";

    loading.style.zIndex =
    "999999";

    document.body.appendChild(
        loading
    );

}

function hideLoading(){

    const loading =
    document.getElementById(
        "globalLoading"
    );

    if(loading){

        loading.remove();

    }

}

/*
========================================
DARK MODE
========================================
*/

function toggleDarkMode(){

    document.body.classList.toggle(
        "dark"
    );

    localStorage.setItem(
        "darkMode",
        document.body.classList.contains(
            "dark"
        )
    );

}

function loadDarkMode(){

    const dark =
    localStorage.getItem(
        "darkMode"
    );

    if(dark === "true"){

        document.body.classList.add(
            "dark"
        );

    }

}

/*
========================================
DOWNLOAD FILE
========================================
*/

function downloadFile(
    filename,
    content,
    type =
    "application/json"
){

    const blob =
    new Blob(
        [content],
        {type}
    );

    const url =
    URL.createObjectURL(
        blob
    );

    const a =
    document.createElement("a");

    a.href = url;
    a.download = filename;

    a.click();

    URL.revokeObjectURL(url);

}

/*
========================================
EXPORT JSON
========================================
*/

function exportJson(
    filename,
    data
){

    downloadFile(
        filename,
        JSON.stringify(
            data,
            null,
            2
        )
    );

}

/*
========================================
SALDO CEPAT
========================================
*/

function hitungSaldo(data){

    let masuk = 0;
    let keluar = 0;

    data.forEach(item=>{

        const nominal =
        Number(
            item.nominal || 0
        );

        if(
            item.jenis === "Masuk"
        ){

            masuk += nominal;

        }else{

            keluar += nominal;

        }

    });

    return {

        masuk,

        keluar,

        saldo:
        masuk - keluar

    };

}

/*
========================================
JUMLAH BULAN
========================================
*/

function getCurrentMonth(){

    const now =
    new Date();

    return `${now.getFullYear()}-${String(
        now.getMonth() + 1
    ).padStart(2,"0")}`;

}

/*
========================================
BACK TO TOP
========================================
*/

function scrollTopPage(){

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}

/*
========================================
COPY TEXT
========================================
*/

function copyText(text){

    navigator.clipboard
    .writeText(text)
    .then(()=>{

        showToast(
            "Berhasil disalin"
        );

    });

}

/*
========================================
LOCAL STORAGE
========================================
*/

function getStorage(key){

    const data =
    localStorage.getItem(key);

    try{

        return JSON.parse(data);

    }catch{

        return data;

    }

}

function setStorage(
    key,
    value
){

    if(
        typeof value ===
        "object"
    ){

        localStorage.setItem(
            key,
            JSON.stringify(value)
        );

    }else{

        localStorage.setItem(
            key,
            value
        );

    }

}

function removeStorage(key){

    localStorage.removeItem(
        key
    );

}

/*
========================================
INIT APP
========================================
*/

function initApp(){

    loadDarkMode();

    console.log(
        "✅ App Initialized"
    );

}

document.addEventListener(
    "DOMContentLoaded",
    initApp
);