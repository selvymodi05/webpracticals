<?php

include "auth.php";

if ($_SESSION["role"] != "admin") {
    die("Access Denied.");
}

?>

<!DOCTYPE html>
<html>
<head>
    <title>Admin Dashboard</title>
</head>
<body>

<h1>Admin Dashboard</h1>

<h2>Welcome, <?php echo htmlspecialchars($_SESSION["name"]); ?></h2>

<p>Username: <?php echo htmlspecialchars($_SESSION["username"]); ?></p>

<p>Role: Admin</p>

<a href="logout.php">Logout</a>

</body>
</html>