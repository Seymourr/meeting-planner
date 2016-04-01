meetingPlannerApp.controller('ParkedActivitiesCtrl', function ($scope,$routeParams,Meeting) {
  $scope.getParkedActivities = function() {
    return Meeting.parkedActivities;
  }
});
