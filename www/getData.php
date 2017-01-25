<?php
include 'db.php';

$sql = "SELECT * FROM `lessons`";
$res = mysql_query($sql);
while($row = mysql_fetch_array($res))
  {
    $data['title'][]=$row['title'];
    $data['id'][]=$row['id'];
  }
echo json_encode($data);
?>
