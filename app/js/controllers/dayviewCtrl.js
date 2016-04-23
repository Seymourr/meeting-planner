meetingPlannerApp.controller('DayviewCtrl', function ($scope, $rootScope, $routeParams, ngDialog, Meeting) {

  var dayID = 0; //The id of the day for this controller object

  /*
  * Return the local variable dayID
  */
  $scope.getDayID = function() {
    return dayID;
  };

  /*
  * Initialize this controller object by setting it's id and fetching the day's title
  */
  $scope.init = function(id) {
    $scope.setID(id);
    $scope.getTitle();
  };

  /*
  * Set the title of the day of this controller
  */
  $scope.getTitle = function() {
    $scope.title = Meeting.days[dayID]._title;
  };

  var timer = 0;

  /*
  * Change the title of this day and only push to database after changes seem done
  */
  $scope.setTitle = function(title) {
    Meeting.days[dayID].setTitle(title);

    if(timer != 0) {
      clearTimeout(timer);
    }

    timer = setTimeout(function() {
      Meeting.updateDayDatabase(); //Todo: Update singular day only?
    }, 500);
  };


  /*
  * Set the dayID variable
  */
  $scope.setID = function(id) {
      dayID = id;
  };

  /*
  * Return the end time string of the day this controller serve
  */
  $scope.endTime = function() {
    return Meeting.days[dayID].getEnd();
  };

  /*
  * Return the length of the day this controller serve
  */
  $scope.getDayLength = function() {
    return Meeting.days[dayID].getTotalLength();
  };

  /*
  * Return the activities of the day this controller serve
  */
  $scope.getDayActivities = function() {
    return Meeting.days[dayID].getActivities();
  };

  /*
  * Return the length of the activity with the given index position in the day this controller serve
  */
  $scope.getActivityTime = function(index) {
    return Meeting.days[dayID].getActivityStart(index);
  };

  $scope.distCompTypes = [];

  /*
  * Calculate over the activities in the day this controller serve and write up the distribution bar
  */
  $scope.getDistributionComponents = function() {
    $scope.distCompTypes = [];
    // Get the total length of the day
    var totalLength = Meeting.days[dayID].getTotalLength();

    // Get the lengths of each of the types, and normalize by the total length.
    var distributionComponents = [];

    // Check that we dont divide by zero (if we only have zero-length components this would happen)
    // Unshift the condensed type (lower case and cleared spaces) to distCompTypes
    if (totalLength != 0) {
      $.each(Meeting.getActivityTypes(), function(index, type) {
        distributionComponents.unshift(Meeting.days[dayID].getLengthByType(index) * 100 / totalLength);
        $scope.distCompTypes.unshift(index);
      });
    }
    // If we only have zero lengths on all activities, add 0's to all
    else {
      $.each(Meeting.getActivityTypes(), function(index, type) {
        distributionComponents.unshift(0);
        $scope.distCompTypes.unshift(index);
      });
    }
   // console.log($scope.distCompTypes);
    return distributionComponents;
  };

  /*
  * Return or set the day-time object attached to this day controller
  */
  $scope.dt = {
    date: function(newDate) {
      if(arguments.length) {
        Meeting.days[dayID].setDate(newDate);
         Meeting.updateDayDatabase();
      } else {
        return Meeting.days[dayID].getDate()
      }
    }
  };

  /*
  * Variable used for day-time-popup
  */
  $scope.popup = {
    opened: false
  };

  /*
  * Specifies boundaries for the day-time object
  */
  $scope.dateOptions = {
    formatYear: 'yy',
    maxDate: new Date(2020, 5, 22),
    startingDay: 1
  };

  /*
  * Mark the day-time-popup as opened when called
  */
  $scope.open = function() {
    $scope.popup.opened = true;
  };

  $scope.format = 'yyyy/MM/dd'; //Day-time format

  /*
  * Opens the dialog box which provide user's with the option to remove the day attached to this controller
  */
  $scope.openRemoveDayDialog = function () {
    ngDialog.open({
        template: 'partials/removeDay.html',
        className: 'ngdialog-theme-plain',
        controller: 'RemoveDayCtrl',
        data: {"dayID": dayID}
    });
  };
  
});
