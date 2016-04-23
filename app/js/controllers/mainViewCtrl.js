meetingPlannerApp.controller('MainViewCtrl', function ($scope,$rootScope, $routeParams, $location, Meeting, Auth) {

  /*
  * Fetch the days containing activities from Meeting
  */
  $scope.getDays = function() {
    return Meeting.days;
  };

  /*
  * Add a day to the list of days in Meeting
  */
  $scope.addDay = function () {
    Meeting.addDay();
  };
  $scope.status = "loading";

  /*
  * Initializing code that aquire the data saved in the database for the logged in user
  */
  Meeting.loginUser();
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

  $rootScope.showHelp = false; //A boolean specifying if the tutorial overlay will be shown 
  $scope.showHelp = $rootScope.showHelp; //Copy the value from rootscope to the local scope

  /*
  * Intercept any changes to the boolean showHelp in the rootScope and update the local scope value
  */
  $rootScope.$watch('showHelp', function() {
    $scope.showHelp = $rootScope.showHelp;
  });

  /*
  * Return the color class of an activity by its given type-id
  */
  $scope.getColorClassByTypeID = function(typeID) {
    return "color-"+Meeting.typeIdToCondensedName(typeID);
  }



  /* 
  * Controls tutorial button in parkedActivities.html (Must be called here along with the loading of user data)
  */
  $scope.triggerClick = function () {
        setTimeout(function() {
        angular.element('#showhelp-button').trigger('click');
         }, 400);
  };

 
  /*
  * Initialize a new user to the site by creating some example data and updating the database accordingly
  */
  $scope.firstTimeInit = function() {
    //TODO: Set firsttimelogin to true at beginning..?
    Meeting.setUserData(); //Mark user as logged in for first time
    Meeting.addDay();
    var initAct = new Activity("I am an activity", 20, 3, "Keep your notes written here!");
    Meeting.addParkedActivity(initAct, 0);
   }
});
