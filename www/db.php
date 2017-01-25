<?php
$host='localhost'; // имя хоста (уточняется у провайдера)
$database='diary'; // имя базы данных, которую вы должны создать
$user='diary'; // заданное вами имя пользователя, либо определенное провайдером
$pswd='123456'; // заданный вами пароль

$dbh = mysql_connect($host, $user, $pswd) or die("Не могу соединиться с MySQL.");
mysql_select_db($database) or die("Не могу подключиться к базе.");
mysql_query("SET NAMES 'utf8'");
mysql_query("SET CHARACTER SET 'utf8'");
mysql_query("SET SESSION collation_connection = 'utf8_general_ci'");
?>
