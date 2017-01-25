var app = angular.module("diary", []);

app.controller("diaryCtrl", function ($scope,$http) {
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

    function roundPlus(x, n) { //x - число, n - количество знаков
      if(isNaN(x) || isNaN(n)) return false;
      var m = Math.pow(10,n);
      return Math.round(x*m)/m;
    };

$scope.average = function(a){
  if(typeof a!=='undefined'){
    let b=0;
    a.forEach(function(item){b+=parseInt(item);});
    return roundPlus(b/a.length,2);
  }
};


    //REGISTRATION
    $scope.registration = function(){
      var msg   = $('#registrationForm').serialize();
        $.ajax({
          type: 'POST',
          url: 'registration_db.php',
          data: msg,
          success: function(data) {
              window.location.href="/";
          },
          error:  function(xhr, str){
            window.location.href="/";
          }
        });
    };

    //NEW TEACHER
    $scope.addTeacher = function(){
      var msg11   = $('#teacherForm').serialize();
        $.ajax({
          type: 'POST',
          url: 'newTeacher_db.php',
          data: msg11,
          success: function(data) {
              window.location.href="/";
          },
          error:  function(xhr, str){
            window.location.href="/";
          }
        });
    };


    //IS LOGGED

    var getLogin = get_cookie('login'),
        getPass = get_cookie('password'),
        getType = get_cookie('type');
        if(getType=="pupil"){var Type="ученик";$scope.isPupil=true;$scope.isTeacher=false;}
        else if(getType=="teacher"){var Type="учитель";$scope.isTeacher=true;$scope.isPupil=false;};

    if(getLogin&&getPass){
      $scope.logInfo='Привет '+Type+','+getLogin;
      $scope.isLogged=true;
    } else {
      $scope.logInfo = 'Вы не вошли';
      $scope.isLogged=false;
    };

    //DATA


    if($scope.isTeacher){
      $.ajax({
      dataType: 'json',
      url: 'getTeacherData.php?login='+getLogin,
      success: function(jsondata){
        $scope.teacher=jsondata;
        console.log(jsondata);
      },
      error:function(dd){
        console.log(dd);
      },
      async:false
    });


    //СРЕДНИЙ БАЛЛ
    var marks=[];
    var avMarks = [];
        for(let i=8;i<=11;i++){
          if($scope.teacher.marks!=='no'&&typeof $scope.teacher.marks[i]!=='undefined'){
            marks[i]=0;
            for(let a=0;a<$scope.teacher.marks[i].length;a++){
              marks[i]+=parseInt($scope.teacher.marks[i][a]);
            };
            avMarks[i]=roundPlus(marks[i]/$scope.teacher.marks[i].length,2);
          };
        };
    $scope.avMarks = avMarks;
    $scope.delimoe = 4;
    if(typeof $scope.avMarks[8]==='undefined'){$scope.delimoe-=1;$scope.avMarks[8]=0;};
    if(typeof $scope.avMarks[9]==='undefined'){$scope.delimoe-=1;$scope.avMarks[9]=0;};
    if(typeof $scope.avMarks[10]==='undefined'){$scope.delimoe-=1;$scope.avMarks[10]=0;};
    if(typeof $scope.avMarks[11]==='undefined'){$scope.delimoe-=1;$scope.avMarks[11]=0;};
    $scope.fullAverage = ($scope.avMarks[8]+$scope.avMarks[9]+$scope.avMarks[10]+$scope.avMarks[11])/$scope.delimoe;
    $scope.fullAverage = roundPlus($scope.fullAverage,2);

    if(isNaN($scope.fullAverage)){$scope.fullAverage=0;};
  };

//DATA PUPIL
  if($scope.isPupil){
    function dataFromBase(){
      $http({
          url: 'getPupilData.php?login='+getLogin,
          method: "GET"
      }).success(function(data, status, headers, config) {
          if(data!==$scope.pupil){
            $scope.pupil = data;
            console.log(data);
            setInterval(newMarksFromBase,5000);
          };
      }).error(function(data, status, headers, config) {
          $scope.status = status;
      });
      /*$.ajax({
        dataType: 'json',
        url: 'getPupilData.php?login='+getLogin,
        success: function(jsondata){
          $scope.pupil=jsondata;
          console.log(jsondata);
        },
        error:function(dd){
        },
        async:false
      });*/
    };

    function newMarksFromBase(){
      $http({
          url: 'getNewMarks.php?login='+getLogin,
          method: "GET"
      }).success(function(data, status, headers, config) {
          $scope.newMarks = data;

          for(key in $scope.newMarks)
          {
            $scope.pupil.allLessons[key].date = $scope.newMarks[key].date;
            $scope.pupil.allLessons[key].marks = $scope.newMarks[key].marks;
            $scope.newMarks[key].whenAdded.forEach(function(item,i,arr){
              $scope.newMarkPredmet = $scope.newMarks[key].marks[i];
              $scope.newMarkLesson = $scope.pupil.allLessons[key].title;
              let date = item.substr(0,10),
                  whenAdded = item.slice(-8),
                  dateObj = new Date();

                  if(dateObj.getFullYear()==date.slice(-4)&&dateObj.getMonth()+1==parseInt(date.substr(3,2))&&dateObj.getDate()==date.substr(0,2)){
                    let time = (parseInt(whenAdded.substr(0,2))*3600)+(parseInt(whenAdded.substr(3,2))*60)+parseInt(whenAdded.slice(-2));
                    let rrTime = (parseInt(dateObj.getHours())*3600)+(parseInt(dateObj.getMinutes())*60)+parseInt(dateObj.getSeconds());
                    if(Math.abs(time-rrTime)<5){swal({title:'Новая оценка!',text:$scope.newMarkPredmet+' '+$scope.newMarkLesson,type:'success'});};
                  };
            });
          };


      }).error(function(data, status, headers, config) {
          $scope.status = status;
      });};

    dataFromBase();
    $scope.showLessonMarks = function(a){
      $scope.moreLessonId=a+1;
      $scope.url = $scope.lessonMarksView;
      $scope.moreLessonTitle = $scope.pupil.allLessons[a+1].title;
      $scope.moreLessonDates = $scope.pupil.allLessons[a+1].date;
      $scope.moreLessonTeacher = $scope.pupil.allLessons[a+1].teacherSurname + ' ' +$scope.pupil.allLessons[a+1].teacherName + ' ' + $scope.pupil.allLessons[a+1].teacherOtchestvo;
    };
};

    //login

    $scope.login = function(){
      var logFormData   = $('#logForm').serialize();
        $.ajax({
          type: 'POST',
          url: 'login_db.php',
          data: logFormData,
          success: function(data) {
              /*if(data=='teacher'){
                alert('ПРИВЕТ УЧИТЕЛЬ');
              } else if(data=='pupil'){
                alert('ПРИВЕТ УЧЕНИК');
              } else {
                alert('НИКТО');
              };*/
              if(data=='teacher'){welcomeText = 'Добро пожаловать, Учитель'} else if(data=='pupil'){welcomeText = 'Добро пожаловать, Ученик'} else {welcomeText = 'Неверный логин =('}
              swal({text:welcomeText});
              setTimeout(function(){window.location.href="/"},1000);
          },
          error:  function(xhr, str){
            window.location.href="/";
          }
        });
    };

    //Add mark

    $scope.setMark = function(){
      var newMarkData   = $('#addMark').serialize();
        $.ajax({
          type: 'POST',
          url: 'setMark_db.php',
          data: newMarkData,
          success: function(data) {
              window.location.href="/";
          }
        });
    };


    //LOGOUT
    $scope.logout = function() {
      delete_cookie('login');
      delete_cookie('password');
      delete_cookie('type');
      window.location.href="/";
    };



    //Find marks for date

    $scope.findMarksFromDate = function(date){
      let howMuchLessons = 0;
      for(key in $scope.pupil.allLessons){
        howMuchLessons++;
      };
      $scope.findedMarks=[];
      let a=0;
      for(let y = 1;y<=howMuchLessons;y++){
        if(typeof $scope.pupil.allLessons[y].date!=='undefined'){
          $scope.pupil.allLessons[y].date.forEach(function(item,i){
            if(item==date){
              $scope.findedMarks[a] = {'mark':$scope.pupil.allLessons[y].marks[i],
                                       'lesson':$scope.pupil.allLessons[y].title,
                                       'teacher':$scope.pupil.allLessons[y].teacherSurname + ' ' + $scope.pupil.allLessons[y].teacherName + ' ' +$scope.pupil.allLessons[y].teacherOtchestvo
            };
              /*$scope.findedMarks[a].mark = $scope.pupil.allLessons[y].marks[i];
              $scope.findedMarks[a].lesson = $scope.pupil.allLessons[y].title;
              $scope.findedMarks[a].teacher = $scope.pupil.allLessons[y].teacherSurname + ' ' + $scope.pupil.allLessons[y].teacherName + ' ' +$scope.pupil.allLessons[y].teacherOtchestvo;
              */a++;
            };
          });
        };
      };
    };


    //location

    if($scope.isLogged){
      $scope.url = $scope.mainView;
    } else {
      $scope.url = $scope.loginView;
    };

// test email

$scope.isValidEmailAddress = function (emailAddress) {
  var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
  return pattern.test(emailAddress);
  }
$scope.isValidRegEmail = false;
$scope.testEmail = function(a){
(!$scope.isValidEmailAddress(a))?$scope.isValidRegEmail = true:$scope.isValidRegEmail = false;
};




});
