<?php
header('Access-Control-Allow-Origin: *');

$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "test_penjualan";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$year = isset($_GET['year']) ? (int)$_GET['year'] : 0;

if ($year > 0) {
    $sql = "
        SELECT 
            m_menu.nama AS menu,
            SUM(CASE WHEN MONTH(t_pesanan.tanggal) = 1 THEN t_pesanan_detail.total ELSE 0 END) AS Jan,
            SUM(CASE WHEN MONTH(t_pesanan.tanggal) = 2 THEN t_pesanan_detail.total ELSE 0 END) AS Feb,
            SUM(CASE WHEN MONTH(t_pesanan.tanggal) = 3 THEN t_pesanan_detail.total ELSE 0 END) AS Mar,
            SUM(CASE WHEN MONTH(t_pesanan.tanggal) = 4 THEN t_pesanan_detail.total ELSE 0 END) AS Apr,
            SUM(CASE WHEN MONTH(t_pesanan.tanggal) = 5 THEN t_pesanan_detail.total ELSE 0 END) AS Mei,
            SUM(CASE WHEN MONTH(t_pesanan.tanggal) = 6 THEN t_pesanan_detail.total ELSE 0 END) AS Jun,
            SUM(CASE WHEN MONTH(t_pesanan.tanggal) = 7 THEN t_pesanan_detail.total ELSE 0 END) AS Jul,
            SUM(CASE WHEN MONTH(t_pesanan.tanggal) = 8 THEN t_pesanan_detail.total ELSE 0 END) AS Ags,
            SUM(CASE WHEN MONTH(t_pesanan.tanggal) = 9 THEN t_pesanan_detail.total ELSE 0 END) AS Sep,
            SUM(CASE WHEN MONTH(t_pesanan.tanggal) = 10 THEN t_pesanan_detail.total ELSE 0 END) AS Okt,
            SUM(CASE WHEN MONTH(t_pesanan.tanggal) = 11 THEN t_pesanan_detail.total ELSE 0 END) AS Nov,
            SUM(CASE WHEN MONTH(t_pesanan.tanggal) = 12 THEN t_pesanan_detail.total ELSE 0 END) AS Des,
            SUM(t_pesanan_detail.total) AS Total
        FROM 
            t_pesanan_detail
        JOIN 
            t_pesanan ON t_pesanan_detail.t_pesanan_id = t_pesanan.id
        JOIN 
            m_menu ON t_pesanan_detail.m_menu_id = m_menu.id
        WHERE 
            YEAR(t_pesanan.tanggal) = ?
        GROUP BY 
            m_menu.id";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $year);
    $stmt->execute();
    $result = $stmt->get_result();

    header('Content-Type: text/csv');
    header('Content-Disposition: attachment;filename="sales_report_' . $year . '.csv"');

    $output = fopen('php://output', 'w');

    fputcsv($output, array('Menu', 'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des', 'Total'));

    while ($row = $result->fetch_assoc()) {
        fputcsv($output, $row);
    }

    fclose($output);
} else {
    echo "Invalid year parameter";
}

$conn->close();