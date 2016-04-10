meetingPlannerApp.controller('ParkedActivitiesCtrl', function ($scope,$routeParams,Meeting, ngDialog) {
  $scope.getParkedActivities = function() {
    return Meeting.parkedActivities;
  };
  
  // Returns an activity type of a specific activity id
  $scope.getActivityType = function(activityTypeId){
    return Meeting.getActivityType(activityTypeId);
  };

  $scope.openDialog = function (activity, index) {
    if(activity != null) {
        activity.position = index;
    }
    ngDialog.open({
        template: 'partials/createActivity.html', 
        className: 'ngdialog-theme-plain',
        controller: 'CreateActivityCtrl',
        data: activity
        });
  };

    $scope.onDragComplete = function ($data, $event) {
        // TODO: Remove activity from parked activities
    };
});
