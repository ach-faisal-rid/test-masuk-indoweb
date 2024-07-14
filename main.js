document.getElementById("tampilkan").addEventListener("click", function () {
  const year = parseInt(document.getElementById("tahun").value);

  if (isNaN(year)) {
    alert("Masukkan tahun yang valid");
    return;
  }

  fetch(`http://localhost/smkti/test_masuk_indoweb/server.php?year=${year}`)
    .then((response) => response.json())
    .then((data) => {
      let tableData = [];

      data.forEach((row) => {
        tableData.push([
          row.menu,
          row.jan,
          row.feb,
          row.mar,
          row.apr,
          row.mei,
          row.jun,
          row.jul,
          row.ags,
          row.sep,
          row.okt,
          row.nov,
          row.des,
          row.total_sales_year,
        ]);
      });

      const csvData = tableData.map((row) => row.join(",")).join("\n");
      const fileName = `data_penjualan_${year}.csv`;
      const file = new File([csvData], fileName, { type: "text/csv" });

      FileSaver.saveAs(file, fileName);

      // Display the table
      let table = `
            <table>
                <thead>
                    <tr>
                        <th>Menu</th>
                        <th>Jan</th>
                        <th>Feb</th>
                        <th>Mar</th>
                        <th>Apr</th>
                        <th>Mei</th>
                        <th>Jun</th>
                        <th>Jul</th>
                        <th>Ags</th>
                        <th>Sep</th>
                        <th>Okt</th>
                        <th>Nov</th>
                        <th>Des</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
        `;

      tableData.forEach((row) => {
        table += `
                <tr>
                    <td>${row[0]}</td>
                    <td>${row[1].toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}</td>
                    <td>${row[2].toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}</td>
                    <td>${row[3].toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}</td>
                    <td>${row[4].toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}</td>
                    <td>${row[5].toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}</td>
                    <td>${row[6].toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}</td>
                    <td>${row[7].toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}</td>
                    <td>${row[8].toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}</td>
                    <td>${row[9].toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}</td>
                    <td>${row[10].toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}</td>
                    <td>${row[11].toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}</td>
                    <td>${row[12].toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}</td>
                    <td>${row[13].toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}</td>
                </tr>
            `;
      });

      table += `</tbody></table>`;
      document.getElementById("data-table").innerHTML = table;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      alert("Terjadi kesalahan saat mengambil data");
    });
});

document
  .getElementById("downloadDatabase")
  .addEventListener("click", function () {
    alert("Download Database clicked");
  });
