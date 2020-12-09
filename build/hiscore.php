<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Hi - Score</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.css">
    <style type="text/css">
        body{ font: 14px sans-serif; }
        .wrapper{ width: 350px; padding: 20px; }
    </style>
    <script>
    </script>
</head>
<body>
    <div class="wrapper">
        <h2>Hi-Score</h2>

        <?php
        require_once "config.php";

        $sql = "SELECT username, level, road FROM log ORDER BY level DESC LIMIT 40";
        $result = mysqli_query($link, $sql);

        echo '<table style="width:100%">';
        echo '<tr><th>Username</th><th>Level</th><th>Road</th><th>Service</th></tr>';
        $row = mysqli_fetch_array($result,  MYSQLI_BOTH);

        while ($row){
          echo "<tr>";
          echo "<td> ".$row["username"]." </td><td> ".$row[1]." </td><td> ".$row[2]." </td><td> ".$row[3]." </td>";
          $row = mysqli_fetch_array($result, MYSQLI_BOTH);
          echo "</tr>";
        }
        echo "</table>";

        /* liberar la serie de resultados */
        mysqli_free_result($result);

        // Close connection
        mysqli_close($link);
        ?>

        <p>
            <a href="game.php" class="btn btn-warning">Play Again</a>
            <a href="logout.php" class="btn btn-danger">Sign Out of Your Account</a>
        </p>
    </div>
</body>
</html>
