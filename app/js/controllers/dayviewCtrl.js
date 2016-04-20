meetingPlannerApp.controller('DayviewCtrl', function ($scope,$routeParams, ngDialog, Meeting) {

  var dayID = 0; //The id of the day for this controller object

  $scope.getDayID = function() {
    return dayID;
  };
  $scope.init = function(id) {
    $scope.setID(id);
    $scope.getTitle();
  };
  $scope.getTitle = function() {
    $scope.title = Meeting.days[dayID]._title;
  };

  $scope.setTitle = function(title) {
    Meeting.days[dayID].setTitle(title);
  };

  $scope.setID = function(id) {
      dayID = id;
  };
  $scope.endTime = function() {
    return Meeting.days[dayID].getEnd();
  };
  $scope.getDayLength = function() {
    return Meeting.days[dayID].getTotalLength();
  };

  $scope.getDayActivities = function() {
    return Meeting.days[dayID].getActivities();
  };

  $scope.getActivityTime = function(index) {
    return Meeting.days[dayID].getActivityStart(index);
  };

  $scope.getDistributionComponents = function() {
    // Get the total length of the day
    var totalLength = Meeting.days[dayID].getTotalLength();

    // Get the lengths of each of the types, and normalize by the total length.
    var distributionComponents = [];

    // Check that we dont divide by zero (if we only have zero-length components this would happen)
    if (totalLength != 0) {
      $.each(Meeting.getActivityTypes(), function(index, type) {
        distributionComponents.unshift(Meeting.days[dayID].getLengthByType(index) * 100 / totalLength);
      });
    }
    // If we only have zero lengths on all activities, add 0's to all
    else {
      $.each(Meeting.getActivityTypes(), function(index, type) {
        distributionComponents.unshift(0);
      });
    }

    return distributionComponents;
  };

  $scope.getComponentStyle = function(type) {
    var styles = ["warning","success","danger","info"];
    return styles[type];
  };
  $scope.dt = {
    date: function(newDate) {
     return arguments.length ? (Meeting.days[dayID].setDate(newDate)) : Meeting.days[dayID].getDate();
   },
    time: function(newTime) {
      return arguments.length ? (Meeting.days[dayID].setTime(newTime)) : Meeting.days[dayID].getTime();
    }
  };
  $scope.popup = {
    opened: false
  };
  $scope.dateOptions = {
    formatYear: 'yy',
    maxDate: new Date(2020, 5, 22),
    startingDay: 1
  };
  $scope.open = function() {
    $scope.popup.opened = true;
  };
  $scope.format = 'yyyy/MM/dd';
});
