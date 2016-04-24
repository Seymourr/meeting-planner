meetingPlannerApp.controller('LoginCtrl', function ($scope, $location, Auth, Meeting) {

  /*
  * A listener which react whenever authentication state changes - used to quickly log in cookied' users
  */
  var offAuth = Auth.$onAuth(function(authData) {
    if (authData) {
      $location.path("/main"); //Proceed to main view
    } else {
      $scope.error = "";
    }
  });

  offAuth(); //Try to see if the user is loggedin

  $scope.status = "undecided";

  /*
  * Create a user, given input of type email and password's
  */
  $scope.createUser = function() {
    if($scope.email == null || $scope.email == "") {
        $scope.error = "You must specify an email address.";
        return;
    } else if($scope.password == null || $scope.password == "") {
        $scope.error = "You must specify a password.";
        return;
    } else if($scope.password != $scope.passwordRepeated) {
        $scope.error = "The passwords do not match, please repeat your password in the third bar";
        return;
    }

    Auth.$createUser( {
      email: $scope.email,
      password: $scope.password
    }).then(function(userData){
        $scope.message = "User profile created! Please log in to proceed!";
        $scope.status = "login";
        $scope.error = null;
        $scope.passwordRepeated = "";

    }).catch(function(error) {
       $scope.error = "The email is either occupied or in the wrong format.";
       $scope.message = null;
    });
  };

  /*
  * Login a user given credentials in the form of email and password
  */
  $scope.login = function() {
    $scope.error = null;

    if($scope.email == null || $scope.email == "") {
        $scope.error = "You must specify an email address.";
        return;
    } else if($scope.password == null || $scope.password == "") {
        $scope.error = "You must specify a password.";
        return;
    }
    
    Auth.$authWithPassword({
      email: $scope.email,
      password: $scope.password
    }).then(function(authData) {
      $location.path("/main");
    }, function(error) {
       $scope.error = "Your credentials are incorrect, please correct them and try again.";
       $scope.message = null;
    });
  };

  /*
  * Logout a user and reset the model's (Meetings) variables.
  */
  $scope.logout = function() {
    Auth.$unauth();
    Meeting.reset();
    $location.path("/home"); //Redirect to login-screen
  };

  /*
  * Intercept changes on the status variable, and reset system variables if needed
  */
  $scope.$watch('status', function() {
      $scope.error = null;
      if($scope.status == "undecided") $scope.message = null;
  });
});
