meetingPlannerApp.controller('MainViewCtrl', function ($scope,$routeParams,Meeting) {
  $scope.getDays = function() {
    return Meeting.days;
  };

  $scope.addDay = function () {
    Meeting.addDay();
  };
});
