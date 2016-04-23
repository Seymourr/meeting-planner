meetingPlannerApp.controller('ParkedActivitiesCtrl', function ($scope,$rootScope, $routeParams,Meeting, ngDialog) {
  $scope.getParkedActivities = function() {
    return Meeting.parkedActivities;
  };
  
  $scope.getMsg = function(index) {
  	if(index == 0) return "Hej";
  	return undefined;
  };

  
 
  
});
