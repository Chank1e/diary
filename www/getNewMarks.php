<?php
include 'db.php';
$log = $_GET['login'];
$sql = "SELECT * FROM `pupils` WHERE `email`='$log'";
$res = mysql_query($sql);
while($row = mysql_fetch_array($res))
  {
    $pupil = $row['id'];
  };


  $sql = "SELECT * FROM `marks` WHERE `pupil_id`='$pupil'";
  $res = mysql_query($sql);
  while($row = mysql_fetch_array($res))
    {
      $data[$row['lesson_id']]['marks'][]=$row['mark'];
      $data[$row['lesson_id']]['date'][]=$row['date'];
      $data[$row['lesson_id']]['whenAdded'][]=$row['whenAdded'];
    };
echo json_encode($data);
?>
