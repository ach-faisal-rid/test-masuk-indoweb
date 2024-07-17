<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "test_penjualan";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(['error' => 'Connection failed: ' . $conn->connect_error]));
}

$year = isset($_GET['year']) ? (int)$_GET['year'] : 0;

if ($year > 0) {
    $sql = "
        SELECT 
            m_menu.nama AS name,
            m_menu.kategori AS type,
            SUM(CASE WHEN MONTH(t_pesanan.tanggal) = 1 THEN t_pesanan_detail.total ELSE 0 END) AS jan,
            SUM(CASE WHEN MONTH(t_pesanan.tanggal) = 2 THEN t_pesanan_detail.total ELSE 0 END) AS feb,
            SUM(CASE WHEN MONTH(t_pesanan.tanggal) = 3 THEN t_pesanan_detail.total ELSE 0 END) AS mar,
            SUM(CASE WHEN MONTH(t_pesanan.tanggal) = 4 THEN t_pesanan_detail.total ELSE 0 END) AS apr,
            SUM(CASE WHEN MONTH(t_pesanan.tanggal) = 5 THEN t_pesanan_detail.total ELSE 0 END) AS mei,
            SUM(CASE WHEN MONTH(t_pesanan.tanggal) = 6 THEN t_pesanan_detail.total ELSE 0 END) AS jun,
            SUM(CASE WHEN MONTH(t_pesanan.tanggal) = 7 THEN t_pesanan_detail.total ELSE 0 END) AS jul,
            SUM(CASE WHEN MONTH(t_pesanan.tanggal) = 8 THEN t_pesanan_detail.total ELSE 0 END) AS ags,
            SUM(CASE WHEN MONTH(t_pesanan.tanggal) = 9 THEN t_pesanan_detail.total ELSE 0 END) AS sep,
            SUM(CASE WHEN MONTH(t_pesanan.tanggal) = 10 THEN t_pesanan_detail.total ELSE 0 END) AS okt,
            SUM(CASE WHEN MONTH(t_pesanan.tanggal) = 11 THEN t_pesanan_detail.total ELSE 0 END) AS nop,
            SUM(CASE WHEN MONTH(t_pesanan.tanggal) = 12 THEN t_pesanan_detail.total ELSE 0 END) AS des,
            SUM(t_pesanan_detail.total) AS total
        FROM 
            t_pesanan_detail
        JOIN 
            t_pesanan ON t_pesanan_detail.t_pesanan_id = t_pesanan.id
        JOIN 
            m_menu ON t_pesanan_detail.m_menu_id = m_menu.id
        WHERE 
            YEAR(t_pesanan.tanggal) = ?
        GROUP BY 
            m_menu.id, m_menu.kategori";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $year);
    $stmt->execute();
    $result = $stmt->get_result();

    $data = [];
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    echo json_encode($data);
} else {
    echo json_encode(['error' => 'Invalid year parameter']);
}

$conn->close();