
<?php

$username = $_POST["username"];
$password = $_POST["password"];

$correct_username = "student";
$correct_password = "123456";

if ($username == $correct_username && $password == $correct_password) {

    header("Location: dashboard.html");
    exit();

} else {

    echo "<h2>Invalid Username or Password</h2>";
    echo "<a href='login.html'>Go Back to Login</a>";

}

?>

