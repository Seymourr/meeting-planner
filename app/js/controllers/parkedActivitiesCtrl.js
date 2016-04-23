meetingPlannerApp.controller('ParkedActivitiesCtrl', function ($scope,$rootScope, $routeParams,Meeting, ngDialog) {

  /*
  * Fetch the list of parked activities from the model
  */  
  $scope.getParkedActivities = function() {
    return Meeting.parkedActivities;
  };
  
});
