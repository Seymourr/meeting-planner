meetingPlannerApp.controller('CreateActivityCtrl', function ($scope,$routeParams, $location, Meeting) {

  /*
  * Get all available activity types.
  */
  $scope.getActivityTypes = function() {
    return Meeting.getActivityTypes();
  };

  
  /*
  * Quote status, list of quotes for slides, authors, and control variables
  */
  $scope.qStatus = "";
  $scope.quote = "";
  $scope.author = "";
  $scope.showSpinner = false; //For the loading-status spinner
  $scope.isNewActivity = false; 
  var quoteLengthLimit = 300;

  $scope.activityTypeID = Meeting.getActivityTypes()[0]; // Fixes the empty row bug in the dropdown

  /*
  * Creates a new parked activity
  */ 
  $scope.saveActivity = function (activityTitle, activityLength, activityTypeID, activityDescription) {
    // For future error messages.
    if (activityTypeID == undefined) {
      console.log("Error in createActivity..");
    } else {
      if(activityDescription == null || activityDescription == undefined) activityDescription = "";

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

  /*
  * Delete a parked activity, specified by day (null for parked-activities) and position
  */
  $scope.deleteActivity = function(day, position) {
    Meeting.deleteActivity($scope.ngDialogData.day, $scope.ngDialogData.position);
  };

  /*
  * Load data sent to this controller/dialog
  */
  if($scope.ngDialogData){
    $scope.activityTitle = $scope.ngDialogData.getName();
    $scope.activityLength = $scope.ngDialogData.getLength();
    $scope.activityTypeID = Meeting.getActivityType($scope.ngDialogData.getTypeId());
    $scope.activityDescription = $scope.ngDialogData.getDescription();
  } else {
    $scope.isNewActivity = true;
  }

  /*
  * Load a new quote
  */
  $scope.loadQuote = function() {
    // Refresh quote
    Meeting.refreshQuote();
    $scope.showSpinner = true;
    $scope.qStatus = "Loading quote...";

    // Since the API does not support search by max length, keep fetching quotes until they are under the limit we have set
    // Does not happen often, since most quotes are just a sentence.
    Meeting.Quote.query(function(data) {
      // If the quote is below length limit, use it
      if (data[0].content.length < quoteLengthLimit) {
        $scope.quote = data[0].content;
        $scope.author = "- "+data[0].title;
        $scope.qStatus = "";
        $scope.showSpinner = false;
      }
      // Else if the quote was too long, get a new one from the quote API
      else {
        Meeting.refreshQuote();
        $scope.loadQuote();
      }
    },function(data){
      $scope.qStatus = "There was an error getting the quote";
      $scope.showSpinner = false;
    });
  };

  $scope.loadQuote();
});
