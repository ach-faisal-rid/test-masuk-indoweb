<?php
include 'db.php';

$tables = [];
$sql = "SHOW TABLES";
$result = $conn->query($sql);

while ($row = $result->fetch_row()) {
    $tables[] = $row[0];
}

$sqlScript = "";
foreach ($tables as $table) {
    $query = "SHOW CREATE TABLE $table";
    $result = $conn->query($query);
    $row = $result->fetch_row();

    $sqlScript .= "\n\n" . $row[1] . ";\n\n";

    $query = "SELECT * FROM $table";
    $result = $conn->query($query);

    $columnCount = $result->field_count;

    for ($i = 0; $i < $columnCount; $i++) {
        while ($row = $result->fetch_row()) {
            $sqlScript .= "INSERT INTO $table VALUES(";
            for ($j = 0; $j < $columnCount; $j++) {
                $row[$j] = $row[$j] ? "'" . $row[$j] . "'" : "NULL";
                $sqlScript .= $row[$j];
                if ($j < ($columnCount - 1)) {
                    $sqlScript .= ", ";
                }
            }
            $sqlScript .= ");\n";
        }
    }

    $sqlScript .= "\n";
}

header('Content-Type: application/sql');
header('Content-Disposition: attachment; filename="database_export.sql"');
echo $sqlScript;
?>
