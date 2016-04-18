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
  $scope.status = "loading";

  Meeting.loginUser();

  Meeting.getDaysData().then(function() {
    Meeting.getParkedData().then(function() {
      $scope.status = "ready";
      console.log("JABADABADOO");
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
  }
});
