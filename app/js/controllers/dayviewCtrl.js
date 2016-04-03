meetingPlannerApp.controller('DayviewCtrl', function ($scope,$routeParams,Meeting) {

    var dayID = 0; //The id of the day for this controller object

    $scope.setID = function(id) {
        dayID = id;
    };

    $scope.setDayTimeStart = function(changeH, changeM) {
        Meeting.days[dayID].setStart(changeH, changeM);
    };

    $scope.getDayTimeStartHours = function() {
        var t = Meeting.days[dayID].getStart();
        return parseInt(t.split(":")[0]);
    };

    $scope.getDayTimeStartMinutes= function() {
        var t = Meeting.days[dayID].getStart();
        return parseInt(t.split(":")[1]);
    };

    $scope.getDayTimeEnd = function() {
        var t = Meeting.days[dayID].getEnd();
        var ts = t.split(":");
        if(ts[0].length == 1) ts[0] = "0" + ts[0];
        if(ts[1].length == 1) ts[1] = "0" + ts[1];
        t = ts[0] + ":" + ts[1];
        return t;
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

    $scope.dayStartTimeHours = $scope.getDayTimeStartHours();
    $scope.dayStartTimeMinutes = $scope.getDayTimeStartMinutes();

});
