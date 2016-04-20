meetingPlannerApp.controller('ActivityCtrl', function ($scope, $rootScope, $routeParams,Meeting, ngDialog) {
  $scope.getDataWithPos = function(activity, index, dayID) {
    activity.position = index;
    if (dayID != undefined)
      activity.oldDay = dayID;
    else
      activity.oldDay = null;
    return activity;
  };
  $scope.onDropComplete = function (activity, $event, index, dayID) {
      var day = activity.oldDay;
      if(day === undefined) {
        day = null;
      }
      if (dayID == undefined) {
        dayID = null;
      }
      Meeting.moveActivity(day, activity.position, dayID, index);
  };
  $scope.openDialog = function (activity, index, dayID) {
    if(activity != null) {
      if (dayID != undefined) {
        activity.day = dayID;
      }
      activity.position = index;
    }
    ngDialog.open({
        template: 'partials/createActivity.html',
        className: 'ngdialog-theme-plain',
        controller: 'CreateActivityCtrl',
        data: activity
        });
  };
});
