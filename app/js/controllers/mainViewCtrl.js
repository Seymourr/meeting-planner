meetingPlannerApp.controller('MainViewCtrl', function ($scope,$rootScope, $routeParams, $location, Meeting, Auth) {

  $rootScope.showHelp = false;

  $scope.getDays = function() {
    return Meeting.days;
  };

  $scope.addDay = function () {
    Meeting.addDay();
  };
  $scope.status = "loading";

  Meeting.loginUser(); //Must be here..not in loginctrl (Must be synchronous)
  Meeting.getDaysData().then(function() {
    Meeting.getParkedData().then(function() {
      $scope.status = "ready";
      //First time login?
      Meeting.getUserData().then(function(data) {
        var val = data.val();
        if(val == null || val == undefined || val.firstTimeLogin == true) {
          $scope.firstTimeInit();
          $scope.$apply();
          $scope.triggerClick();
        }

      }, function() {
        console.log("Unexpected error in fetching user data");

      });
      $scope.$apply();

    }, function(error) {
      console.log("Could not get parked data");
    });
  }, function(error) {
    console.log("Could not get days data");
  });

  $scope.showHelp = $rootScope.showHelp;

  $scope.getColorClassByTypeID = function(typeID) {
    return "color-"+Meeting.typeIdToCondensedName(typeID);
  }

  $rootScope.$watch('showHelp', function() {
    $scope.showHelp = $rootScope.showHelp;
  });


  /* NOTE: Controls tutorial button in parkedActivities.html (Must be called here with the loading of the data..*/
  $scope.triggerClick = function () {
        setTimeout(function() {
        angular.element('#showhelp-button').trigger('click');
         }, 400);
  };

 //TODO: Set firsttimelogin to true at beginning..?

  $scope.firstTimeInit = function() {

    Meeting.setUserData(); //Mark user as logged in for first time
    Meeting.addDay();
    var initAct = new Activity("I am an activity", 20, 3, "Keep your notes written here!");
    Meeting.addParkedActivity(initAct, 0);
   }
});
