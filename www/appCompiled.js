"use strict";

var app = angular.module("diary", []);

app.controller("diaryCtrl", function ($scope) {
  $scope.mainView = "main.html";
  $scope.loginView = "login.html";
  $scope.statsView = "stats.html";
  $scope.newTeacherView = "newTeacher.html";
  $scope.lessonMarksView = "lessonMarks.html";
  $scope.marksForDateView = "marksForDate.html";

  $scope.showNewTeacher = function () {
    $scope.url = $scope.newTeacherView;
  };

  $scope.showMarksForDate = function () {
    $scope.url = $scope.marksForDateView;
  };

  $scope.showLogin = function () {
    $scope.url = $scope.loginView;
  };

  $scope.showMain = function () {
    $scope.url = $scope.mainView;
  };

  $scope.showStats = function () {
    $scope.url = $scope.statsView;
  };

  function roundPlus(x, n) {
    //x - число, n - количество знаков
    if (isNaN(x) || isNaN(n)) return false;
    var m = Math.pow(10, n);
    return Math.round(x * m) / m;
  };

  $scope.average = function (a) {
    if (typeof a !== 'undefined') {
      var b = 0;
      a.forEach(function (item) {
        b += parseInt(item);
      });
      return roundPlus(b / a.length, 2);
    }
  };

  //REGISTRATION
  $scope.registration = function () {
    var msg = $('#registrationForm').serialize();
    $.ajax({
      type: 'POST',
      url: 'registration_db.php',
      data: msg,
      success: function success(data) {
        window.location.href = "/";
      },
      error: function error(xhr, str) {
        window.location.href = "/";
      }
    });
  };

  //NEW TEACHER
  $scope.addTeacher = function () {
    var msg11 = $('#teacherForm').serialize();
    $.ajax({
      type: 'POST',
      url: 'newTeacher_db.php',
      data: msg11,
      success: function success(data) {
        window.location.href = "/";
      },
      error: function error(xhr, str) {
        window.location.href = "/";
      }
    });
  };

  //IS LOGGED

  var getLogin = get_cookie('login'),
      getPass = get_cookie('password'),
      getType = get_cookie('type');
  if (getType == "pupil") {
    var Type = "ученик";$scope.isPupil = true;$scope.isTeacher = false;
  } else if (getType == "teacher") {
    var Type = "учитель";$scope.isTeacher = true;$scope.isPupil = false;
  };

  if (getLogin && getPass) {
    $scope.logInfo = 'Привет ' + Type + ',' + getLogin;
    $scope.isLogged = true;
  } else {
    $scope.logInfo = 'Вы не вошли';
    $scope.isLogged = false;
  };

  //DATA


  if ($scope.isTeacher) {
    $.ajax({
      dataType: 'json',
      url: 'getTeacherData.php?login=' + getLogin,
      success: function success(jsondata) {
        $scope.teacher = jsondata;
        console.log(jsondata);
      },
      error: function error(dd) {
        console.log(dd);
      },
      async: false
    });

    //СРЕДНИЙ БАЛЛ
    var marks = [];
    var avMarks = [];
    for (var i = 8; i <= 11; i++) {
      if ($scope.teacher.marks !== 'no' && typeof $scope.teacher.marks[i] !== 'undefined') {
        marks[i] = 0;
        for (var a = 0; a < $scope.teacher.marks[i].length; a++) {
          marks[i] += parseInt($scope.teacher.marks[i][a]);
        };
        avMarks[i] = roundPlus(marks[i] / $scope.teacher.marks[i].length, 2);
      };
    };
    $scope.avMarks = avMarks;
    $scope.delimoe = 4;
    if (typeof $scope.avMarks[8] === 'undefined') {
      $scope.delimoe -= 1;$scope.avMarks[8] = 0;
    };
    if (typeof $scope.avMarks[9] === 'undefined') {
      $scope.delimoe -= 1;$scope.avMarks[9] = 0;
    };
    if (typeof $scope.avMarks[10] === 'undefined') {
      $scope.delimoe -= 1;$scope.avMarks[10] = 0;
    };
    if (typeof $scope.avMarks[11] === 'undefined') {
      $scope.delimoe -= 1;$scope.avMarks[11] = 0;
    };
    $scope.fullAverage = ($scope.avMarks[8] + $scope.avMarks[9] + $scope.avMarks[10] + $scope.avMarks[11]) / $scope.delimoe;
    $scope.fullAverage = roundPlus($scope.fullAverage, 2);

    if (isNaN($scope.fullAverage)) {
      $scope.fullAverage = 0;
    };
  };

  //DATA PUPIL
  if ($scope.isPupil) {
    var dataFromBase = function dataFromBase() {
      $.ajax({
        dataType: 'json',
        url: 'getPupilData.php?login=' + getLogin,
        success: function success(jsondata) {
          $scope.pupil = jsondata;
          console.log(jsondata);
        },
        error: function error(dd) {},
        async: false
      });
    };

    ;
    dataFromBase();
    $scope.showLessonMarks = function (a) {
      $scope.moreLessonId = a + 1;
      $scope.url = $scope.lessonMarksView;
      $scope.moreLessonTitle = $scope.pupil.allLessons[a + 1].title;
      $scope.moreLessonDates = $scope.pupil.allLessons[a + 1].date;
      $scope.moreLessonTeacher = $scope.pupil.allLessons[a + 1].teacherSurname + ' ' + $scope.pupil.allLessons[a + 1].teacherName + ' ' + $scope.pupil.allLessons[a + 1].teacherOtchestvo;
    };
  };

  //login

  $scope.login = function () {
    var logFormData = $('#logForm').serialize();
    $.ajax({
      type: 'POST',
      url: 'login_db.php',
      data: logFormData,
      success: function success(data) {
        /*if(data=='teacher'){
          alert('ПРИВЕТ УЧИТЕЛЬ');
        } else if(data=='pupil'){
          alert('ПРИВЕТ УЧЕНИК');
        } else {
          alert('НИКТО');
        };*/
        window.location.href = "/";
        console.log(data);
      },
      error: function error(xhr, str) {
        window.location.href = "/";
      }
    });
  };

  //Add mark

  $scope.setMark = function () {
    var newMarkData = $('#addMark').serialize();
    $.ajax({
      type: 'POST',
      url: 'setMark_db.php',
      data: newMarkData,
      success: function success(data) {
        window.location.href = "/";
      }
    });
  };

  //LOGOUT
  $scope.logout = function () {
    delete_cookie('login');
    delete_cookie('password');
    delete_cookie('type');
    window.location.href = "/";
  };

  //Find marks for date

  $scope.findMarksFromDate = function (date) {
    var howMuchLessons = 0;
    for (key in $scope.pupil.allLessons) {
      howMuchLessons++;
    };
    console.log(howMuchLessons);
    $scope.findedMarks = [];
    var a = 0;

    var _loop = function _loop(y) {
      if (typeof $scope.pupil.allLessons[y].date !== 'undefined') {
        $scope.pupil.allLessons[y].date.forEach(function (item, i) {
          console.log(item);
          if (item == date) {
            $scope.findedMarks[a] = { 'mark': $scope.pupil.allLessons[y].marks[i],
              'lesson': $scope.pupil.allLessons[y].title,
              'teacher': $scope.pupil.allLessons[y].teacherSurname + ' ' + $scope.pupil.allLessons[y].teacherName + ' ' + $scope.pupil.allLessons[y].teacherOtchestvo
            };
            /*$scope.findedMarks[a].mark = $scope.pupil.allLessons[y].marks[i];
            $scope.findedMarks[a].lesson = $scope.pupil.allLessons[y].title;
            $scope.findedMarks[a].teacher = $scope.pupil.allLessons[y].teacherSurname + ' ' + $scope.pupil.allLessons[y].teacherName + ' ' +$scope.pupil.allLessons[y].teacherOtchestvo;
            */a++;
          };
        });
      };
    };

    for (var y = 1; y <= howMuchLessons; y++) {
      _loop(y);
    };
  };

  //location

  if ($scope.isLogged) {
    $scope.url = $scope.mainView;
  } else {
    $scope.url = $scope.loginView;
  };
});
