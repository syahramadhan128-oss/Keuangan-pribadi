/*
========================================
EXCEL IMPORT
========================================
*/

function importExcel(file) {

    const reader =
        new FileReader();

    reader.onload =
        function(e) {

        const workbook =
            XLSX.read(
                e.target.result,
                {
                    type: "binary"
                }
            );

        const data =
            XLSX.utils.sheet_to_json(
                workbook.Sheets[
                    workbook.SheetNames[0]
                ]
            );

        const transaksi =
            getTransaksi();

        data.forEach(row => {

            transaksi.push({

                id: Date.now() +
                    Math.random(),

                tanggal:
                    row.Tanggal,

                kategori:
                    row.Kategori,

                deskripsi:
                    row.Deskripsi,

                jenis:
                    row.Jenis,

                nominal:
                    Number(
                        row.Nominal
                    )

            });

        });

        saveTransaksi(
            transaksi
        );

        alert(
            "Import berhasil"
        );

    };

    reader.readAsBinaryString(
        file
    );

}
