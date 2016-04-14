meetingPlannerApp.controller('MainViewCtrl', function ($scope,$routeParams, $location, Meeting, Auth) {
  console.log(Auth.$getAuth());
  $scope.logout = function() {
    Auth.$unauth();
    $location.path("/home");
  }
  $scope.getDays = function() {
    return Meeting.days;
  };

  $scope.addDay = function () {
    Meeting.addDay();
  };
});
