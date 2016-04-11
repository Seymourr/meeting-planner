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

  

    $scope.getDataWithPos = function(activity, index) {
      activity.position = index;
      activity.oldDay = null;
      return activity;
    }

    $scope.onDropComplete = function (activity, $event, index) {
        // TODO: Make orderable
        var day = activity.oldDay;
        if(day === undefined) {
          day = null;
        }
    //    console.log("TO: " + dayID);
        Meeting.moveActivity(day, activity.position, null, index);
    }
});
