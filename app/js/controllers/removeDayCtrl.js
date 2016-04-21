meetingPlannerApp.controller('RemoveDayCtrl', function ($scope, Meeting) {

  var dayID = -1;

  if($scope.ngDialogData){
    dayID = $scope.ngDialogData.dayID;
  }

  $scope.deleteDayNoSave = function() {
    console.log(dayID);
      Meeting.deleteDay(dayID);
  };

  $scope.deleteDaySave = function() {
    console.log(dayID);
      for(var i = Meeting.days[dayID].getActivities().length - 1; i >=0 ; i--) {

        Meeting.moveActivity(dayID, i, null, Meeting.parkedActivity.length -1); //Todo: Better indexing
      }
      Meeting.deleteDay(dayID);
  };
});
