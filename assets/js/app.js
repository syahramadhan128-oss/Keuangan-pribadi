function rupiah(nominal){

    return "Rp " +
        Number(
            nominal || 0
        ).toLocaleString(
            "id-ID"
        );

}

function generateId(){

    return Date.now()
        .toString();

}

function today(){

    return new Date()
        .toISOString()
        .split("T")[0];

}

document.addEventListener(
    "DOMContentLoaded",
    () => {

        console.log(
            "Keuangan Pribadi v3.0"
        );

    }
);
