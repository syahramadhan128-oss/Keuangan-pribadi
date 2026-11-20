/*
========================================
EXPORT EXCEL
========================================
*/

function exportExcel() {

    const data =
        getTransaksi();

    const worksheet =
        XLSX.utils.json_to_sheet(
            data
        );

    const workbook =
        XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Transaksi"
    );

    XLSX.writeFile(
        workbook,
        "laporan-keuangan.xlsx"
    );

}
