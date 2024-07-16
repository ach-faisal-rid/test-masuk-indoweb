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
