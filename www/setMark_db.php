<?php
include 'db.php';
$pupil = $_POST['markPupil'];
$teacher = $_POST['markTeacher'];
$mark = $_POST['markMark'];
$date = $_POST['markDate'];
$whenAdded = date('d.m.Y H:i:s');
if($date===''){$date = date("d.m.Y");}
$sql = "SELECT * FROM `teachers` WHERE `id`='$teacher'";
$res = mysql_query($sql);
while($row = mysql_fetch_array($res)){
  $lesson = $row['lesson_id'];
};
$strSQL = "INSERT INTO `marks` (pupil_id,teacher_id,mark,lesson_id,date,whenAdded) VALUES ('$pupil','$teacher','$mark','$lesson','$date','$whenAdded')";
$result = mysql_query($strSQL) or die(mysql_error());
?>
