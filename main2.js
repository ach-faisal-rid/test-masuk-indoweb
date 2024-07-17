document.addEventListener('DOMContentLoaded', function () {
    const yearSelectElement = document.querySelector('#year-select');
    const downloadBtn = document.querySelector('#download-btn');
    const tableBody = document.querySelector('tbody');
    const reportYear = document.querySelector('#report-year');

    function fetchSalesData(year) {
        fetch(`http://localhost/smkti/test_masuk_indoweb/db2.php?year=${year}`)
            .then(response => response.json())
            .then(data => {
                tableBody.innerHTML = ''; // Clear existing rows
                if (data.error) {
                    console.error('Error fetching sales data:', data.error);
                    const tr = document.createElement('tr');
                    tr.innerHTML = `<td colspan="15">Error fetching data: ${data.error}</td>`;
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

                    // Group data by category
                    let groupedData = {
                        Makanan: [],
                        Minuman: []
                    };

                    data.forEach(row => {
                        grandTotal.Jan += parseInt(row.Jan);
                        grandTotal.Feb += parseInt(row.Feb);
                        grandTotal.Mar += parseInt(row.Mar);
                        grandTotal.Apr += parseInt(row.Apr);
                        grandTotal.Mei += parseInt(row.Mei);
                        grandTotal.Jun += parseInt(row.Jun);
                        grandTotal.Jul += parseInt(row.Jul);
                        grandTotal.Ags += parseInt(row.Ags);
                        grandTotal.Sep += parseInt(row.Sep);
                        grandTotal.Okt += parseInt(row.Okt);
                        grandTotal.Nov += parseInt(row.Nov);
                        grandTotal.Des += parseInt(row.Des);
                        grandTotal.Total += parseInt(row.Total);

                        if (row.category === 'Makanan') {
                            groupedData.Makanan.push(row);
                        } else if (row.category === 'Minuman') {
                            groupedData.Minuman.push(row);
                        }
                    });

                    // Function to create rows for a category
                    function createCategoryRows(category, rows) {
                        let categoryHTML = `
                            <tr class="category-header">
                                <td colspan="15">${category}</td>
                            </tr>
                        `;
                        rows.forEach(row => {
                            categoryHTML += `
                                <tr>
                                    <td>${row.menu}</td>
                                    <td>${parseInt(row.Jan).toLocaleString()}</td>
                                    <td>${parseInt(row.Feb).toLocaleString()}</td>
                                    <td>${parseInt(row.Mar).toLocaleString()}</td>
                                    <td>${parseInt(row.Apr).toLocaleString()}</td>
                                    <td>${parseInt(row.Mei).toLocaleString()}</td>
                                    <td>${parseInt(row.Jun).toLocaleString()}</td>
                                    <td>${parseInt(row.Jul).toLocaleString()}</td>
                                    <td>${parseInt(row.Ags).toLocaleString()}</td>
                                    <td>${parseInt(row.Sep).toLocaleString()}</td>
                                    <td>${parseInt(row.Okt).toLocaleString()}</td>
                                    <td>${parseInt(row.Nov).toLocaleString()}</td>
                                    <td>${parseInt(row.Des).toLocaleString()}</td>
                                    <td>${parseInt(row.Total).toLocaleString()}</td>
                                </tr>
                            `;
                        });
                        return categoryHTML;
                    }

                    // Add rows for Makanan and Minuman categories
                    if (groupedData.Makanan.length > 0) {
                        tableBody.innerHTML += createCategoryRows('Makanan', groupedData.Makanan);
                    }
                    if (groupedData.Minuman.length > 0) {
                        tableBody.innerHTML += createCategoryRows('Minuman', groupedData.Minuman);
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
                    tr.innerHTML = `<td colspan="15">No data available for ${year}</td>`;
                    tableBody.appendChild(tr);
                }
            })
            .catch(error => {
                console.error('Error fetching sales data:', error);
                const tr = document.createElement('tr');
                tr.innerHTML = `<td colspan="15">Error fetching data: ${error}</td>`;
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

    yearSelectElement.addEventListener('change', updateReport);
    downloadBtn.addEventListener('click', downloadData);

    // Fetch initial data for the default year
    updateReport();
});
