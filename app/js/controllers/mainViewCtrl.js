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
      $scope.$apply();

    }, function(error) {
      console.log("Could not get parked data");
    });
  }, function(error) {
    console.log("Could not get days data");
  });

  $scope.getColor = function (id) {
    var style = ["blue", "red", "green", "yellow"];
    return style[id];
  };
  $scope.showHelp = $rootScope.showHelp;

  $rootScope.$watch('showHelp', function() {
    $scope.showHelp = $rootScope.showHelp;
  });

});
