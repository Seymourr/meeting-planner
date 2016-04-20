meetingPlannerApp.controller('ParkedActivitiesCtrl', function ($scope,$rootScope, $routeParams,Meeting, ngDialog) {
  $scope.getParkedActivities = function() {
    return Meeting.parkedActivities;
  };

  $scope.toggle = function() {
    $rootScope.showHelp = !$rootScope.showHelp;
  }
});
