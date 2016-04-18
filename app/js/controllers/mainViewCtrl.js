meetingPlannerApp.controller('MainViewCtrl', function ($scope,$routeParams, $location, Meeting, Auth) {
  $scope.logout = function() {
    Auth.$unauth();
    Meeting.reset();
    $location.path("/home");
  }
  $scope.getDays = function() {
    return Meeting.days;
  };

  $scope.addDay = function () {
    Meeting.addDay();
  };

  Meeting.loginUser();
  Meeting.getDaysData().then(function() {
    Meeting.getParkedData().then(function() {
      $scope.$apply();
    }, function(error) {
      console.log("Could not get parked data");
    });
  }, function(error) {
    console.log("Could not get days data");
  });

});
