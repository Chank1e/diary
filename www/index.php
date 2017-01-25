<?php include 'db.php'; ?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Дневник Single-page application</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/sweetalert2/6.3.2/sweetalert2.min.css">
    <link rel="stylesheet" href="dataPicker/bootstrap-datepicker.min.css">
    <meta name=viewport content="width=device-width, initial-scale=1">
  </head>
  <body ng-app="diary" ng-controller="diaryCtrl">
    <!--MENU -->
    <nav class="navbar navbar-default">
  <div class="container-fluid">

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav" style="cursor:pointer">
        <li ng-click="showMain()" ng-show="isLogged"><a>Главная</a></li>
        <li ng-click="showMarksForDate()" ng-show="isPupil"><a>Оценки по дате</a></li>
        <li ng-click="showStats()" ng-show="isTeacher"><a>Статистика</a></li>
        <li ng-click="showNewTeacher()" ng-show="isTeacher"><a>Новый учитель</a></li>
        <li ng-click="showLogin()" ng-hide="isLogged"><a>Вход/Регистрация</a></li>
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <p class="navbar-text navbar-right"><b>{{logInfo}}</b><br>
          <a ng-show="isLogged" style="cursor:pointer" ng-click="logout()">Выйти</a>
        </p>
      </ul>
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>

    <!--VIEW -->
              <ng-include src="url"></ng-include>


    <!--SCRIPTS-->
    <script src="helpScripts.js" charset="utf-8"></script>
    <!--<script src="https://cdn.jsdelivr.net/sweetalert2/6.3.2/sweetalert2.min.js"></script>-->
    <script src="Libraries/sweetalert2.min.js"></script>
    <script src="Libraries/jquery.min.js"></script>
    <!--<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>-->
    <script src="dataPicker/bootstrap-datepicker.min.js" charset="utf-8"></script>
    <script src="dataPicker/bootstrap-datepicker.ru.min.js" charset="utf-8"></script>
    <script src="Libraries/angular.min.js"></script>
    <!--<script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.10/angular.min.js" charset="utf-8"></script>-->
    <script src="app.js" charset="utf-8"></script>
    <script src="Libraries/bootstrap.min.js"></script>
    <!--<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" charset="utf-8"></script>-->
  </body>
</html>
