meetingPlannerApp.controller('dayviewCtrl', function ($scope,$routeParams,Meeting) {

    $scope.dayID = $routeParams.dayID; //The id of the day for this controller object

    $scope.setDayTimeStart = function(changeH, changeM) {
        Meeting.days[dayID].setStart(changeH, changeM);
    };

    $scope.getDayTimeStartHours = function() {
        var t = Meeting.days[dayID].getStart();
        return t.split(":")[0];
    };

    $scope.getDayTimeStartMinutes= function() {
        var t = Meeting.days[dayID].getStart();
        return t.split(":")[1];
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
