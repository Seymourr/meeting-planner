meetingPlannerApp.controller('ActivityCtrl', function ($scope, $rootScope, $routeParams,Meeting, ngDialog) {

  /*
  * Return a modified activity object that also contain its index in its container and day (if in one)
  */
  $scope.getDataWithPos = function(activity, index, dayID) {
    activity.position = index;
    if (dayID != undefined)
      activity.oldDay = dayID;
    else
      activity.oldDay = null;
    return activity;
  };

	var justDropped = false;

  /*
  * Action to take when the drop of an activity is done
  */
  $scope.onDropComplete = function (activity, $event, index, dayID) {
	  // This function is sometimes fired twice, probably because of overlapping dropzones.
	  // There is a pull request that attempts to fix this bug:
	  // https://github.com/fatlinesofcode/ngDraggable/pull/224

	  // This workaround allows the callback to be fired only once in a short amount of time
	  if (!justDropped) {
		  justDropped = true;
		  setTimeout(function () {
			  justDropped = false;
		  }, 100);

		  var day = activity.oldDay;
		  if (day === undefined) {
			  day = null;
		  }
		  if (dayID == undefined) {
			  dayID = null;
		  }
		  Meeting.moveActivity(day, activity.position, dayID, index);
      }
  };

  /*
  * Open a dialog which allow the user to modify the specified activity
  */
  $scope.openEditActivityDialog = function (activity, index, dayID) {
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

  /*
  * Removes the activity dropped down to the html tag with this function attached to it via ng-draggable attributes
  */
  $scope.dropAndRemoveActivity = function(activity, $event) {
    var day = activity.oldDay;
    if(day == undefined) {
      day == null
    }
    Meeting.deleteActivity(day, activity.position);
  };
  
});
