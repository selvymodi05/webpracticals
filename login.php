<?php

session_start();

include "db.php";

$username = trim($_POST["username"] ?? "");
$password = $_POST["password"] ?? "";

if ($username == "" || $password == "") {
    echo "<script>
            alert('Please enter username and password!');
            window.location.href='login.html';
          </script>";
    exit();
}

$stmt = $conn->prepare(
    "SELECT id, name, username, password, role FROM users WHERE username = ? LIMIT 1"
);

$stmt->bind_param("s", $username);
$stmt->execute();

$result = $stmt->get_result();

if ($result->num_rows == 0) {
    echo "<script>
            alert('Invalid username or password!');
            window.location.href='login.html';
          </script>";
    exit();
}

$row = $result->fetch_assoc();

if (!password_verify($password, $row["password"])) {
    echo "<script>
            alert('Invalid username or password!');
            window.location.href='login.html';
          </script>";
    exit();
}

session_regenerate_id(true);

$_SESSION["user_id"] = $row["id"];
$_SESSION["name"] = $row["name"];
$_SESSION["username"] = $row["username"];
$_SESSION["role"] = $row["role"];
$_SESSION["last_activity"] = time();

$update = $conn->prepare(
    "UPDATE users SET last_login = NOW() WHERE id = ?"
);

$update->bind_param("i", $row["id"]);
$update->execute();

$update->close();
$stmt->close();
$conn->close();

if ($row["role"] == "admin") {
    header("Location: admin_dashboard.php");
    exit();
} else {
    header("Location: student_dashboard.php");
    exit();
}

?>