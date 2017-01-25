<?php
include 'db.php';
$email = $_POST['logEmail'];
$password = $_POST['logPass'];
    $sql1 = "SELECT * FROM `pupils` WHERE `email`='$email' AND `password`='$password'";
    $query1 = mysql_query($sql1);
    $sql2 = "SELECT * FROM `teachers` WHERE `email`='$email' AND `password`='$password'";
    $query2 = mysql_query($sql2);
    $rows1 = mysql_num_rows($query1);
    $rows2 = mysql_num_rows($query2);
    if($rows1!==0){
      $data = 'pupil';
      setcookie("login", $email);
      setcookie("password", $password);
      setcookie("type",$data);
    } elseif($rows2!==0){
      $data = 'teacher';
      setcookie("login", $email);
      setcookie("password", $password);
      setcookie("type",$data);
    } else {
      $data = 'invalid';
    }
    echo $data;
?>
