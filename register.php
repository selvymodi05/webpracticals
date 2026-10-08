
<?php

include "db.php";

if ($_SERVER["REQUEST_METHOD"] != "POST") {
    header("Location: register.html");
    exit();
}

$name = trim($_POST["name"] ?? "");
$username = trim($_POST["username"] ?? "");
$email = trim($_POST["email"] ?? "");
$mobile = trim($_POST["mobile"] ?? "");
$password = $_POST["password"] ?? "";
$confirm_password = $_POST["confirm_password"] ?? "";
$course = $_POST["course"] ?? "";
$year = $_POST["year"] ?? "";
$gender = $_POST["gender"] ?? "";

if ($name == "" || $username == "" || $email == "" || 
    $mobile == "" || $password == "" || $confirm_password == "" ||
    $course == "" || $year == "" || $gender == "") {

    die("All fields are required.");
}

if (!isset($_POST["terms"])) {
    die("Please agree to the terms.");
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    die("Invalid email address.");
}

if (strlen($username) < 3) {
    die("Username must contain at least 3 characters.");
}

if (strlen($password) < 6) {
    die("Password must contain at least 6 characters.");
}

if ($password != $confirm_password) {
    die("Passwords do not match.");
}

$sql = "SELECT id FROM users WHERE username = ? OR email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $username, $email);
$stmt->execute();

$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo "<h2>Username or Email already exists.</h2>";
    echo "<a href='register.html'>Go Back</a>";

    $stmt->close();
    $conn->close();
    exit();
}

$stmt->close();

$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

$sql = "INSERT INTO users 
        (name, username, email, password, mobile, course, year, gender)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);

$stmt->bind_param(
    "ssssssss",
    $name,
    $username,
    $email,
    $hashedPassword,
    $mobile,
    $course,
    $year,
    $gender
);


if ($stmt->execute()) {

    echo "<!DOCTYPE html>";
    echo "<html>";
    echo "<head>";
    echo "<title>Registration Successful</title>";

    echo "<style>";
    echo "body {
        font-family: Arial, sans-serif;
        background: #f5f1f6;
        text-align: center;
        padding-top: 100px;
    }";

    echo ".box {
        background: white;
        width: 450px;
        max-width: 90%;
        margin: auto;
        padding: 40px;
        border-radius: 20px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    }";

    echo "h2 {
        color: #668d76;
    }";

    echo "a {
        display: inline-block;
        margin-top: 20px;
        padding: 12px 20px;
        background: #b99ac4;
        color: white;
        text-decoration: none;
        border-radius: 8px;
    }";

    echo "</style>";

    echo "</head>";

    echo "<body>";

    echo "<div class='box'>";

    echo "<h2>Registration Successful!</h2>";
    echo "<p>Your account has been registered successfully.</p>";

    echo "<a href='showusers.php'>View Registered Users</a>";

    echo "<br><br>";

    echo "<a href='register.html'>Register Another User</a>";

    echo "</div>";

    echo "</body>";
    echo "</html>";

} else {

    echo "<h2>Registration Failed.</h2>";
    echo "<p>Something went wrong: " . $conn->error . "</p>";

}


$stmt->close();
$conn->close();

?>

