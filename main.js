document.addEventListener('DOMContentLoaded', function () {
  const yearSelectElement = document.querySelector('#year-select');
  const categorySelectElement = document.querySelector('#category-select');
  const tableBody = document.querySelector('tbody');
  const reportYear = document.querySelector('#report-year');

  function fetchSalesData(year, category) {
      fetch(`db.php?year=${year}&category=${category}`)
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
      const category = categorySelectElement.value;
      reportYear.textContent = year;
      fetchSalesData(year, category);
  }

  yearSelectElement.addEventListener('change', updateReport);
  categorySelectElement.addEventListener('change', updateReport);

  // Fetch initial data for the default year and category
  updateReport();
});
