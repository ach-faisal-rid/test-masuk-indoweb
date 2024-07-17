document.addEventListener('DOMContentLoaded', function () {
    const selectElement = document.querySelector('#year-select');
    const tableBody = document.querySelector('tbody');
    const reportYear = document.querySelector('#report-year');

    function fetchSalesData(year) {
        fetch(`http://localhost/smkti/test_masuk_indoweb/server.php?year=${year}`)
            .then(response => response.json())
            .then(data => {
                tableBody.innerHTML = ''; // Clear existing rows
                if (data.length > 0) {
                    data.forEach(row => {
                        const tr = document.createElement('tr');
                        tr.innerHTML = `
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
                        `;
                        tableBody.appendChild(tr);
                    });
                } else {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `<td colspan="14">No data available for ${year}</td>`;
                    tableBody.appendChild(tr);
                }
            })
            .catch(error => console.error('Error fetching sales data:', error)
        );
    }

    selectElement.addEventListener('change', function () {
        const year = this.value;
        reportYear.textContent = year;
        fetchSalesData(year);
    });

    // Fetch initial data for the default year (2019)
    fetchSalesData(selectElement.value);
});