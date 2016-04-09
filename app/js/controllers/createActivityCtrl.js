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
      console.log("Error in createActivity..");
    } else { 
      var act = new Activity(activityTitle, activityLength, Meeting.getActivityTypes().indexOf(activityTypeID), activityDescription);
      if($scope.ngDialogData) {
        if($scope.ngDialogData.day != null) {
          Meeting.replaceActivity(act, $scope.ngDialogData.day, $scope.ngDialogData.position);
        } else {
          //Should have position.. 
          Meeting.replaceActivity(act, null, $scope.ngDialogData.position);
        }
      } else {
        Meeting.addActivity(act);
      }
      
    }
  };

  if($scope.ngDialogData){
    $scope.activityTitle = $scope.ngDialogData.getName();
    $scope.activityLength = $scope.ngDialogData.getLength();
    $scope.activityTypeID = Meeting.getActivityType($scope.ngDialogData.getTypeId());
    $scope.activityDescription = $scope.ngDialogData.getDescription();
  }
});
