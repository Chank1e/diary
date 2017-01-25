<?php
include 'db.php';
$log = $_GET['login'];
$sql = "SELECT * FROM `pupils` WHERE `email`='$log'";
$res = mysql_query($sql);
while($row = mysql_fetch_array($res))
  {
    $data['name']=$row['name'];
    $pupil = $row['id'];
    $data['id']=$row['id'];
    $data['surname']=$row['surname'];
    $data['otchestvo']=$row['otchestvo'];
    $data['form']=$row['form'];
  };


  $sql = "SELECT * FROM `marks` WHERE `pupil_id`='$pupil'";
  $res = mysql_query($sql);
  while($row = mysql_fetch_array($res))
    {
      $data['allLessons'][$row['lesson_id']]['marks'][]=$row['mark'];
      $data['allLessons'][$row['lesson_id']]['teacher_id']=$row['teacher_id'];
      $data['allLessons'][$row['lesson_id']]['date'][]=$row['date'];
      $teacher = $row['teacher_id'];

      $sqlaa = "SELECT * FROM `teachers` WHERE `id`='$teacher'";
      $resaa = mysql_query($sqlaa);
      while($rowaa = mysql_fetch_array($resaa))
        {
          $data['allLessons'][$row['lesson_id']]['teacherName']=$rowaa['name'];
          $data['allLessons'][$row['lesson_id']]['teacherSurname']=$rowaa['surname'];
          $data['allLessons'][$row['lesson_id']]['teacherOtchestvo']=$rowaa['otchestvo'];
        };
    };

    $sql2 = "SELECT * FROM `lessons`";
    $res2 = mysql_query($sql2);
    while($row2 = mysql_fetch_array($res2))
      {
        $data['allLessons'][$row2['id']]['title']=$row2['title'];
      };
echo json_encode($data);
?>
