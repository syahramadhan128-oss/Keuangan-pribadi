/*
========================================
PROFIL.JS
========================================
*/

/*
========================================
PROFIL PENGGUNA
========================================
*/

function simpanProfil(){

    const profil = {

        nama:
        document.getElementById(
            "nama"
        )?.value || "",

        email:
        document.getElementById(
            "email"
        )?.value || ""

    };

    saveProfile(profil);

    alert(
        "Profil berhasil disimpan"
    );

}

function loadProfil(){

    const profil =
    getProfile();

    if(!profil){
        return;
    }

    const nama =
    document.getElementById(
        "nama"
    );

    const email =
    document.getElementById(
        "email"
    );

    if(nama){
        nama.value =
        profil.nama || "";
    }

    if(email){
        email.value =
        profil.email || "";
    }

}

/*
========================================
PIN ADMIN
========================================
*/

function simpanPIN(){

    const pin =
    document.getElementById(
        "pinAdmin"
    )?.value || "";

    if(pin.length < 4){

        alert(
        "PIN minimal 4 digit"
        );

        return;

    }

    savePIN(pin);

    tampilkanStatusPIN();

    document.getElementById(
        "pinAdmin"
    ).value = "";

    alert(
    "PIN berhasil disimpan"
    );

}

function hapusPIN(){

    const ok =
    confirm(
    "Hapus PIN Admin?"
    );

    if(!ok){
        return;
    }

    deletePIN();

    tampilkanStatusPIN();

    alert(
    "PIN berhasil dihapus"
    );

}

function tampilkanStatusPIN(){

    const status =
    document.getElementById(
        "statusPIN"
    );

    if(!status){
        return;
    }

    const pin =
    getPIN();

    status.innerHTML =
    pin
    ? "✅ PIN Admin Aktif"
    : "❌ PIN Belum Dibuat";

}

/*
========================================
TARGET TABUNGAN
========================================
*/

function simpanTarget(){

    const namaTarget =
    document.getElementById(
        "namaTarget"
    )?.value || "";

    const target =
    Number(
        document.getElementById(
            "target"
        )?.value || 0
    );

    const terkumpul =
    Number(
        document.getElementById(
            "terkumpul"
        )?.value || 0
    );

    if(target <= 0){

        alert(
        "Target harus lebih besar dari 0"
        );

        return;

    }

    saveTargetTabungan({

        namaTarget,
        target,
        terkumpul

    });

    tampilkanTarget();

    alert(
    "Target berhasil disimpan"
    );

}

function tampilkanTarget(){

    const data =
    getTargetTabungan();

    if(!data.target){
        return;
    }

    const persen =
    Math.min(
        100,
        (
            data.terkumpul /
            data.target
        ) * 100
    );

    const progress =
    document.getElementById(
        "progressBar"
    );

    if(progress){

        progress.style.width =
        persen + "%";

    }

    const hasil =
    document.getElementById(
        "hasilTarget"
    );

    if(hasil){

        hasil.innerHTML = `

        <b>${data.namaTarget}</b>
        <br><br>

        Progress:
        <b>${persen.toFixed(1)}%</b>

        <br><br>

        Target:
        Rp ${Number(data.target)
        .toLocaleString("id-ID")}

        <br>

        Terkumpul:
        Rp ${Number(data.terkumpul)
        .toLocaleString("id-ID")}

        `;

    }

}

function loadTarget(){

    const data =
    getTargetTabungan();

    if(!data.target){
        return;
    }

    document.getElementById(
        "namaTarget"
    ).value =
    data.namaTarget || "";

    document.getElementById(
        "target"
    ).value =
    data.target || "";

    document.getElementById(
        "terkumpul"
    ).value =
    data.terkumpul || "";

    tampilkanTarget();

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

    saveDarkMode(
        document.body.classList.contains(
            "dark"
        )
    );

}

function loadDarkTheme(){

    if(getDarkMode()){

        document.body.classList.add(
            "dark"
        );

    }

}

/*
========================================
BACKUP DATA
========================================
*/

function backupData(){

    const data =
    exportBackup();

    const blob =
    new Blob(

        [
            JSON.stringify(
                data,
                null,
                2
            )
        ],

        {
            type:
            "application/json"
        }

    );

    const url =
    URL.createObjectURL(
        blob
    );

    const a =
    document.createElement(
        "a"
    );

    a.href = url;

    a.download =
    "backup-keuangan.json";

    a.click();

    URL.revokeObjectURL(
        url
    );

}

/*
========================================
RESTORE DATA
========================================
*/

function restoreData(){

    const file =
    document.getElementById(
        "restoreFile"
    )?.files[0];

    if(!file){

        alert(
        "Pilih file backup terlebih dahulu"
        );

        return;

    }

    const reader =
    new FileReader();

    reader.onload =
    function(e){

        try{

            const data =
            JSON.parse(
                e.target.result
            );

            importBackup(
                data
            );

            alert(
            "Restore berhasil"
            );

            location.reload();

        }catch(error){

            console.error(
                error
            );

            alert(
            "File backup tidak valid"
            );

        }

    };

    reader.readAsText(
        file
    );

}

/*
========================================
RESET DATA
========================================
*/

function resetSemuaData(){

    const ok =
    confirm(

        "Yakin ingin menghapus seluruh data aplikasi?"

    );

    if(!ok){
        return;
    }

    resetSemuaDataStorage();

}

function resetSemuaDataStorage(){

    resetSemuaData();

    alert(
    "Seluruh data berhasil dihapus"
    );

    location.reload();

}

/*
========================================
INFO APLIKASI
========================================
*/

function tampilkanStatistik(){

    const statistik =
    getStatistik();

    const totalTransaksi =
    document.getElementById(
        "totalTransaksi"
    );

    const totalSaldo =
    document.getElementById(
        "totalSaldo"
    );

    if(totalTransaksi){

        totalTransaksi.innerText =
        statistik.jumlahTransaksi;

    }

    if(totalSaldo){

        totalSaldo.innerText =
        "Rp " +
        statistik.saldo
        .toLocaleString(
            "id-ID"
        );

    }

}

/*
========================================
INIT
========================================
*/

function initProfil(){

    loadDarkTheme();

    loadProfil();

    loadTarget();

    tampilkanStatusPIN();

    tampilkanStatistik();

}

/*
========================================
AUTO LOAD
========================================
*/

document.addEventListener(
    "DOMContentLoaded",
    initProfil
);