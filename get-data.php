<?php
include 'db.php';

$year = isset($_GET['year']) ? $_GET['year'] : date('Y');

$sql = "SELECT * FROM sales WHERE YEAR(date) = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $year);
$stmt->execute();
$result = $stmt->get_result();

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);
?>