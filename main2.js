document.addEventListener('DOMContentLoaded', function () {
    const btnTampil = document.querySelector('.show-btn');
    if (btnTampil) {
        btnTampil.addEventListener('click', () => updateReport());
    } else {
        console.error('Button with id "show-btn" not found.');
    }
    const btnDownload = document.querySelector('.download-btn')
    if (btnDownload) {
        btnDownload.addEventListener('click', () => downloadData());
    } else {
        console.error('Button with id "download-btn" not found.');
    }

    const yearSelectElement = document.querySelector('#year-select');
    const tableBody = document.querySelector('tbody');
    const reportYear = document.querySelector('#report-year');

    function fetchSalesData(year) {
        if (!year) {
            return;
        }
        fetch(`http://localhost/smkti/test_masuk_indoweb/db2.php?year=${year}`)
            .then(response => response.json())
            .then(data => {
                tableBody.innerHTML = ''; // Clear existing rows
                if (data.error) {
                    console.error('Error fetching sales data:', data.error);
                    const tr = document.createElement('tr');
                    tr.innerHTML = `<td colspan="14">Error fetching data: ${data.error}</td>`;
                    tableBody.appendChild(tr);
                } else if (data.length > 0) {
                    let grandTotal = {
                        Jan: 0,
                        Feb: 0,
                        Mar: 0,
                        Apr: 0,
                        Mei: 0,
                        Jun: 0,
                        Jul: 0,
                        Ags: 0,
                        Sep: 0,
                        Okt: 0,
                        Nov: 0,
                        Des: 0,
                        Total: 0
                    };

                    const dataMakanan = data.filter(item => item.type === 'makanan');
                    const dataMinuman = data.filter(item => item.type === 'minuman');

                    let trMakanan = document.createElement('tr');
                    trMakanan.innerHTML = `<td colspan="14" style="background: #cccccc">Makanan</td>`;
                    tableBody.appendChild(trMakanan);

                    if (dataMakanan.length === 0) {
                        let trMakananEmpty = document.createElement('tr');
                        trMakananEmpty.innerHTML = `<td colspan="14" style="background: #fcd6d6">Data Kosong</td>`;
                        tableBody.appendChild(trMakananEmpty);
                    } else {
                        dataMakanan.forEach(row => {
                            grandTotal.Jan += parseInt(row.jan);
                            grandTotal.Feb += parseInt(row.feb);
                            grandTotal.Mar += parseInt(row.mar);
                            grandTotal.Apr += parseInt(row.apr);
                            grandTotal.Mei += parseInt(row.mei);
                            grandTotal.Jun += parseInt(row.jun);
                            grandTotal.Jul += parseInt(row.jul);
                            grandTotal.Ags += parseInt(row.ags);
                            grandTotal.Sep += parseInt(row.sep);
                            grandTotal.Okt += parseInt(row.okt);
                            grandTotal.Nov += parseInt(row.nop);
                            grandTotal.Des += parseInt(row.des);
                            grandTotal.Total += parseInt(row.total);

                            const tr = document.createElement('tr');
                            tr.innerHTML = `
                                <td>${row.name}</td>
                                <td>${parseInt(row.jan).toLocaleString()}</td>
                                <td>${parseInt(row.feb).toLocaleString()}</td>
                                <td>${parseInt(row.mar).toLocaleString()}</td>
                                <td>${parseInt(row.apr).toLocaleString()}</td>
                                <td>${parseInt(row.mei).toLocaleString()}</td>
                                <td>${parseInt(row.jun).toLocaleString()}</td>
                                <td>${parseInt(row.jul).toLocaleString()}</td>
                                <td>${parseInt(row.ags).toLocaleString()}</td>
                                <td>${parseInt(row.sep).toLocaleString()}</td>
                                <td>${parseInt(row.okt).toLocaleString()}</td>
                                <td>${parseInt(row.nop).toLocaleString()}</td>
                                <td>${parseInt(row.des).toLocaleString()}</td>
                                <td>${parseInt(row.total).toLocaleString()}</td>
                            `;
                            tableBody.appendChild(tr);
                        });
                    }

                    let trMinuman = document.createElement('tr');
                    trMinuman.innerHTML = `<td colspan="14" style="background: #cccccc">Minuman</td>`;
                    tableBody.appendChild(trMinuman);

                    if (dataMinuman.length === 0) {
                        let trMinumanEmpty = document.createElement('tr');
                        trMinumanEmpty.innerHTML = `<td colspan="14" style="background: #fcd6d6">Data Kosong</td>`;
                        tableBody.appendChild(trMinumanEmpty);
                    } else {
                        dataMinuman.forEach(row => {
                            grandTotal.Jan += parseInt(row.jan);
                            grandTotal.Feb += parseInt(row.feb);
                            grandTotal.Mar += parseInt(row.mar);
                            grandTotal.Apr += parseInt(row.apr);
                            grandTotal.Mei += parseInt(row.mei);
                            grandTotal.Jun += parseInt(row.jun);
                            grandTotal.Jul += parseInt(row.jul);
                            grandTotal.Ags += parseInt(row.ags);
                            grandTotal.Sep += parseInt(row.sep);
                            grandTotal.Okt += parseInt(row.okt);
                            grandTotal.Nov += parseInt(row.nop);
                            grandTotal.Des += parseInt(row.des);
                            grandTotal.Total += parseInt(row.total);

                            const tr = document.createElement('tr');
                            tr.innerHTML = `
                                <td>${row.name}</td>
                                <td>${parseInt(row.jan).toLocaleString()}</td>
                                <td>${parseInt(row.feb).toLocaleString()}</td>
                                <td>${parseInt(row.mar).toLocaleString()}</td>
                                <td>${parseInt(row.apr).toLocaleString()}</td>
                                <td>${parseInt(row.mei).toLocaleString()}</td>
                                <td>${parseInt(row.jun).toLocaleString()}</td>
                                <td>${parseInt(row.jul).toLocaleString()}</td>
                                <td>${parseInt(row.ags).toLocaleString()}</td>
                                <td>${parseInt(row.sep).toLocaleString()}</td>
                                <td>${parseInt(row.okt).toLocaleString()}</td>
                                <td>${parseInt(row.nop).toLocaleString()}</td>
                                <td>${parseInt(row.des).toLocaleString()}</td>
                                <td>${parseInt(row.total).toLocaleString()}</td>
                            `;
                            tableBody.appendChild(tr);
                        });
                    }

                    // Add Grand Total row
                    const trTotal = document.createElement('tr');
                    trTotal.classList.add('total-row');
                    trTotal.innerHTML = `
                        <td>Grand Total</td>
                        <td>${grandTotal.Jan.toLocaleString()}</td>
                        <td>${grandTotal.Feb.toLocaleString()}</td>
                        <td>${grandTotal.Mar.toLocaleString()}</td>
                        <td>${grandTotal.Apr.toLocaleString()}</td>
                        <td>${grandTotal.Mei.toLocaleString()}</td>
                        <td>${grandTotal.Jun.toLocaleString()}</td>
                        <td>${grandTotal.Jul.toLocaleString()}</td>
                        <td>${grandTotal.Ags.toLocaleString()}</td>
                        <td>${grandTotal.Sep.toLocaleString()}</td>
                        <td>${grandTotal.Okt.toLocaleString()}</td>
                        <td>${grandTotal.Nov.toLocaleString()}</td>
                        <td>${grandTotal.Des.toLocaleString()}</td>
                        <td>${grandTotal.Total.toLocaleString()}</td>
                    `;
                    tableBody.appendChild(trTotal);
                } else {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `<td colspan="14">No data available for ${year}</td>`;
                    tableBody.appendChild(tr);
                }
            })
            .catch(error => {
                console.error('Error fetching sales data:', error);
                const tr = document.createElement('tr');
                tr.innerHTML = `<td colspan="14">Error fetching data: ${error}</td>`;
                tableBody.appendChild(tr);
            });
    }

    function updateReport() {
        const year = yearSelectElement.value;
        reportYear.textContent = year;
        fetchSalesData(year);
    }

    function downloadData() {
        const year = yearSelectElement.value;
        window.location.href = `http://localhost/smkti/test_masuk_indoweb/export2.php?year=${year}`;
    }
});
