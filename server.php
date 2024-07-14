<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "test_penjualan";

// Buat koneksi
$conn = new mysqli($servername, $username, $password, $dbname);

// Periksa koneksi
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$year = isset($_GET['year']) ? intval($_GET['year']) : date('Y');

// Prepare statement
$sql = "SELECT m.menu, 
              SUM(CASE WHEN MONTH(p.tanggal) = 1 THEN pd.jumlah ELSE 0 END) AS jan,
              SUM(CASE WHEN MONTH(p.tanggal) = 2 THEN pd.jumlah ELSE 0 END) AS feb,
              SUM(CASE WHEN MONTH(p.tanggal) = 3 THEN pd.jumlah ELSE 0 END) AS mar,
              SUM(CASE WHEN MONTH(p.tanggal) = 4 THEN pd.jumlah ELSE 0 END) AS apr,
              SUM(CASE WHEN MONTH(p.tanggal) = 5 THEN pd.jumlah ELSE 0 END) AS mei,
              SUM(CASE WHEN MONTH(p.tanggal) = 6 THEN pd.jumlah ELSE 0 END) AS jun,
              SUM(CASE WHEN MONTH(p.tanggal) = 7 THEN pd.jumlah ELSE 0 END) AS jul,
              SUM(CASE WHEN MONTH(p.tanggal) = 8 THEN pd.jumlah ELSE 0 END) AS ags,
              SUM(CASE WHEN MONTH(p.tanggal) = 9 THEN pd.jumlah ELSE 0 END) AS sep,
              SUM(CASE WHEN MONTH(p.tanggal) = 10 THEN pd.jumlah ELSE 0 END) AS okt,
              SUM(CASE WHEN MONTH(p.tanggal) = 11 THEN pd.jumlah ELSE 0 END) AS nov,
              SUM(CASE WHEN MONTH(p.tanggal) = 12 THEN pd.jumlah ELSE 0 END) AS des,
              SUM(pd.jumlah) AS total_sales_year
        FROM t_pesanan p
        JOIN t_pesanan_detail pd ON p.id = pd.id_pesanan
        JOIN m_menu m ON pd.id_menu = m.id
        WHERE YEAR(p.tanggal) = ?
        GROUP BY m.menu";

$stmt = $conn->prepare($sql);
$stmt->bind_param('i', $year);
$stmt->execute();

$result = $stmt->get_result();

$data = array();
if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    $data[] = $row;
  }
} else {
  $data["message"] = "No records found";
}

echo json_encode($data);

$stmt->close();
$conn->close();
