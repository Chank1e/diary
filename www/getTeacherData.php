<?php
include 'db.php';
$log = $_GET['login'];
$sql = "SELECT * FROM `teachers` WHERE `email`='$log'";
$res = mysql_query($sql);
while($row = mysql_fetch_array($res))
  {
    $data['name']=$row['name'];
    $teacher = $row['id'];
    $data['id']=$row['id'];
    $data['surname']=$row['surname'];
    $data['otchestvo']=$row['otchestvo'];
    $lesson_id=$row['lesson_id'];
  };





  $sql2 = "SELECT * FROM `lessons` WHERE `id`='$lesson_id'";
  $res2 = mysql_query($sql2);
  while($row2 = mysql_fetch_array($res2))
    {
      $data['lesson']=$row2['title'];
    };

    $sql2 = "SELECT * FROM `lessons`";
    $res2 = mysql_query($sql2);
    $a=0;
    while($row2 = mysql_fetch_array($res2))
      {
        $data['allLessons'][$a]['title']=$row2['title'];
        $data['allLessons'][$a]['id']=$row2['id'];
        $a++;
      };




    $sql3 = "SELECT * FROM `pupils`";
    $res3 = mysql_query($sql3);
    $i=0;
    while($row3 = mysql_fetch_array($res3))
      {
        $data['pupils'][$i]['name']=$row3['name'];
        $data['pupils'][$i]['surname']=$row3['surname'];
        $data['pupils'][$i]['otchestvo']=$row3['otchestvo'];
        $data['pupils'][$i]['id']=$row3['id'];
        $data['pupils'][$i]['form']=$row3['form'];
        $i++;
      };



      $sql4 = "SELECT * FROM `marks` WHERE `teacher_id`='$teacher'";
      $res4 = mysql_query($sql4);
      while($row4 = mysql_fetch_array($res4))
        {
          $pupil=$row4['pupil_id'];

          $ss="SELECT * FROM `pupils` WHERE `id`='$pupil'";
          $rr=mysql_query($ss);
          while($ww=mysql_fetch_array($rr)){
            $form=$ww['form'];
          }

          $data['marks'][$form][]=$row4['mark'];
        };
        if(!$data['marks']){$data['marks']='no';};
echo json_encode($data);
?>
