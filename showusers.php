
<?php

include "db.php";

$sql = "SELECT * FROM users ORDER BY id DESC";

$result = $conn->query($sql);

?>

<!DOCTYPE html>
<html>

<head>

    <title>Registered Users</title>

    <style>

        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            padding: 40px;
            font-family: Arial, sans-serif;
            background: linear-gradient(
                135deg,
                #fffaf5,
                #f5efff,
                #fceef5,
                #eef7ff
            );
            color: #443b47;
        }

        h2 {
            text-align: center;
            margin-bottom: 30px;
        }

        .table-box {
            width: 100%;
            overflow-x: auto;
            background: white;
            padding: 20px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        table {
            width: 100%;
            border-collapse: collapse;
            min-width: 900px;
        }

        th {
            background: #b99ac4;
            color: white;
            padding: 14px;
        }

        td {
            padding: 12px;
            text-align: center;
            border-bottom: 1px solid #ddd;
        }

        tr:hover {
            background: #faf4fb;
        }

        .buttons {
            text-align: center;
            margin-top: 30px;
        }

        a {
            display: inline-block;
            padding: 12px 20px;
            margin: 5px;
            background: #b99ac4;
            color: white;
            text-decoration: none;
            border-radius: 8px;
        }

        a:hover {
            background: #9f82aa;
        }

    </style>

</head>

<body>

    <h2>Registered Users</h2>

    <div class="table-box">

        <table>

            <tr>

                <th>ID</th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Course</th>
                <th>Year</th>
                <th>Gender</th>
                <th>Registered On</th>

            </tr>

            <?php

            if ($result->num_rows > 0) {

                while ($row = $result->fetch_assoc()) {

                    echo "<tr>";

                    echo "<td>" . htmlspecialchars($row["id"]) . "</td>";

                    echo "<td>" . htmlspecialchars($row["name"]) . "</td>";

                    echo "<td>" . htmlspecialchars($row["username"]) . "</td>";

                    echo "<td>" . htmlspecialchars($row["email"]) . "</td>";

                    echo "<td>" . htmlspecialchars($row["mobile"] ?? "") . "</td>";

                    echo "<td>" . htmlspecialchars($row["course"] ?? "") . "</td>";

                    echo "<td>" . htmlspecialchars($row["year"] ?? "") . "</td>";

                    echo "<td>" . htmlspecialchars($row["gender"] ?? "") . "</td>";

                    echo "<td>" . htmlspecialchars($row["created_at"] ?? "") . "</td>";

                    echo "</tr>";

                }

            } else {

                echo "<tr>";

                echo "<td colspan='9'>";

                echo "No registered users found.";

                echo "</td>";

                echo "</tr>";

            }

            ?>

        </table>

    </div>


    <div class="buttons">

        <a href="register.html">
            Register Another User
        </a>

        <a href="login.html">
            Go to Login
        </a>

    </div>

</body>

</html>

<?php

$conn->close();

?>

