meetingPlannerApp.controller('dayviewCtrl', function ($scope,$routeParams,Meeting) {
    $scope.dayID = $routeParams.dayID; //The id of the day for this controller object

    $scope.getDayTimeStart = function() {
        return Meeting.days[dayID].getStart();
    };

    $scope.getDayTimeEnd = function() {
        return Meeting.days[dayID].getEnd();
    };

    $scope.getDayTimeEnd = function() {
        return Meeting.days[dayID].getTotalLength();
    };

    $scope.getDayActivities = function() {
        return Meeting.days[dayID].getActivities();
    };

    $scope.getActivityTime = function(index) {
        return Meeting.days[dayID].getActivityStart(index);
    };
});
