meetingPlannerApp.controller('CreateActivityCtrl', function ($scope,$routeParams, $location, Meeting) {
  $scope.getActivityTypes = function() {
    return Meeting.getActivityTypes();
  };
  $scope.activityTypeID = Meeting.getActivityTypes()[0];
  $scope.saveActivity = function (activityTitle, activityLength, activityTypeID, activityDescription) {
    console.log(activityTypeID);
    if (activityTypeID == undefined) {

    }
    else {
      Meeting.addActivity(new Activity(activityTitle, activityLength, activityTypeID, activityDescription));
      $location.path('#/parkedActivities');
    }
  };
});
