<?php
include 'db.php';
$name = $_POST['regName'];
$surname = $_POST['regSurname'];
$otchestvo = $_POST['regOtchestvo'];
$form = $_POST['regForm'];
$email = $_POST['regEmail'];
$password = $_POST['regPassword'];
$strSQL = "INSERT INTO pupils (name,surname,otchestvo,form,email,password) VALUES ('$name','$surname','$otchestvo','$form','$email','$password')";
$result = mysql_query($strSQL) or die(mysql_error());
?>
