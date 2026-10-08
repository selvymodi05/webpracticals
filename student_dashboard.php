<?php

include "auth.php";

if ($_SESSION["role"] != "student") {
    die("Access Denied.");
}

?>

<!DOCTYPE html>
<html>
<head>
    <title>Student Dashboard</title>
</head>
<body>

<h1>Student Dashboard</h1>

<h2>Welcome, <?php echo htmlspecialchars($_SESSION["name"]); ?></h2>

<p>Username: <?php echo htmlspecialchars($_SESSION["username"]); ?></p>

<p>Role: Student</p>

<a href="logout.php">Logout</a>

</body>
</html>