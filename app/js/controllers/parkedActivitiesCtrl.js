meetingPlannerApp.controller('ParkedActivitiesCtrl', function ($scope,$routeParams,Meeting, ngDialog) {
  $scope.getParkedActivities = function() {
    return Meeting.parkedActivities;
  };
});
