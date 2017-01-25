<?php
          $sql = "SELECT * FROM `lessons`";
          $res = mysql_query($sql);
          while($row = mysql_fetch_array($res))
            {
              echo '<h3>'.$row['title'].'</h3>';
            }
?>
