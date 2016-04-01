meetingPlannerApp.controller('CreateActivityCtrl', function ($scope,$routeParams, $location, Meeting) {
  // Get all available activity types.
  $scope.getActivityTypes = function() {
    return Meeting.getActivityTypes();
  };

  // Fixes the empty row bug in the dropdown 
  $scope.activityTypeID = Meeting.getActivityTypes()[0];

  // Creates a new parked activity
  $scope.saveActivity = function (activityTitle, activityLength, activityTypeID, activityDescription) {
    // For future error messages.
    if (activityTypeID == undefined) {

    }

    else {
      Meeting.addActivity(new Activity(activityTitle, activityLength, activityTypeID, activityDescription));
      $location.path('#/parkedActivities');
    }
  };

});
