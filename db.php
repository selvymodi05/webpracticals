<?php
$servername = "localhost";
$db_username = "root";
$db_password = "";
$db_name = "studenthub";

$conn = new mysqli($servername, $db_username, $db_password, $db_name);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    mobile VARCHAR(20) DEFAULT NULL,
    course VARCHAR(50) DEFAULT NULL,
    year VARCHAR(20) DEFAULT NULL,
    gender VARCHAR(20) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

if (!$conn->query($sql)) {
    die("Table creation failed: " . $conn->error);
}
?>
