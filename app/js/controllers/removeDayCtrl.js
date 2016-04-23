meetingPlannerApp.controller('RemoveDayCtrl', function ($scope, Meeting) {

  var dayID = -1; //The position of this day relative to this.days in Meeting

  if($scope.ngDialogData){
    dayID = $scope.ngDialogData.dayID; //Get dayID
  }

  /*
  * Delete this day and all its activity contents (if any)
  */
  $scope.deleteDayNoSave = function() {
      Meeting.deleteDay(dayID);
  };

  /*
  * Delete this day, but preserve its activities by moving them to parked state
  */
  $scope.deleteDaySave = function() {
      for(var i = Meeting.days[dayID].getActivities().length - 1; i >=0 ; i--) {

        Meeting.moveActivity(dayID, i, null, Meeting.parkedActivities.length); //Todo: Better indexing
      }
      $scope.deleteDayNoSave();
  };
});
