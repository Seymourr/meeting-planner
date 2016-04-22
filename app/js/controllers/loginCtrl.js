meetingPlannerApp.controller('LoginCtrl', function ($scope, $location, Auth, Meeting) {

    var offAuth = Auth.$onAuth(function(authData) {
      if (authData) {
        $location.path("/main");
      } else {
        console.log("Logged out");
        $scope.error = "";
      }
    });

    offAuth(); //Try to see if the user is loggedin ?

    $scope.status = "undecided";

    $scope.createUser = function() {
      $scope.message = null;
      $scope.error = null;

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
      }).catch(function(error) {
         $scope.error = "The email is either occupied or in the wrong format.";
         $scope.message = null;
      });
    };

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
        console.log("Logged in as:", authData.uid);
        $location.path("/main");
      }, function(error) {
         $scope.error = "Your credentials are incorrect, please correct them and try again.";
         $scope.message = null;
      });
    };

    $scope.logout = function() {
      Auth.$unauth();
      Meeting.reset();
      $location.path("/home");
    };


     $scope.$watch('status', function() {
        $scope.error = null;
        $scope.message = null;
    });
});
