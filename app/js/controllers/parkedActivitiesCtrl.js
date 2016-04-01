meetingPlannerApp.controller('ParkedActivitiesCtrl', function ($scope,$routeParams,Meeting) {
  $scope.getParkedActivities = function() {
    return Meeting.parkedActivities;
  }
  
  // Returns an activity type of a specific activity id
  $scope.getActivityType = function(activityTypeId){
    return Meeting.getActivityType(activityTypeId);
  }
});
