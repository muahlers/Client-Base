<?php
  // Grabo cookie en la base de datos.
  if($_COOKIE["pehm"]) {
    echo "Entering Database: </br>";
    // Include config file
    require_once "config.php";

    $sql = "INSERT INTO log (username, level, road, service1level) VALUES (?,?,?,?)";

    if($stmt = mysqli_prepare($link, $sql)){
        // Bind variables to the prepared statement as parameters
        mysqli_stmt_bind_param($stmt, "ssss", $param_username, $param_level, $param_road, $param_service1level);

        $json = stripslashes($_COOKIE["pehm"]);
        $obj = json_decode($json, true);

        $param_username = $obj["username"];
        $param_level = $obj["level"];
        $param_road = $obj["road"];
        $param_service1level = $obj["service1level"];
        // Attempt to execute the prepared statement
        if(mysqli_stmt_execute($stmt)){
            echo "DB log caputre.";
          }
        // Close statement
        mysqli_stmt_close($stmt);
        }
      // Close connection
      mysqli_close($link);
      // Erase Cookie
      setcookie("pehm", "bye,bye: hola", time() + (86400 * 15), "/");
    }

    header("location: hiscore.php");
    exit;
?>
