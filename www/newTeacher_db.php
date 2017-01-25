<?php
include 'db.php';
$name = $_POST['tecName'];
$surname = $_POST['tecSurname'];
$otchestvo = $_POST['tecOtchestvo'];
$lesson = $_POST['tecLesson'];
$email = $_POST['tecEmail'];
$password = $_POST['tecPassword'];
$strSQL = "INSERT INTO teachers (name,surname,otchestvo,lesson_id,email,password) VALUES ('$name','$surname','$otchestvo','$lesson','$email','$password')";
$result = mysql_query($strSQL) or die(mysql_error());
?>
