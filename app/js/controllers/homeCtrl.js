meetingPlannerApp.controller('HomeCtrl', function ($scope, $location, Auth) {
        var offAuth = Auth.$onAuth(function(authData) {
          if (authData) {
            console.log("Authdata changed positive state..", authData);  
            $location.path("/main");
          } else {
            console.log("Logged out");
            $scope.error = "";
          }
        });

        offAuth(); //Try to see if the user is loggedin ?
    $scope.createUser = function() {
      $scope.message = null;
      $scope.error = null;
      Auth.$createUser( {
        email: $scope.email,
        password: $scope.password
      }).then(function(userData){
          $scope.message = "User profile created! Please log in to proceed!";
          console.log($scope.message);
      }).catch(function(error) {
          console.log("Could not create user..", error);
          $scope.error = "Could not register.. Either the email is in use or you typed in no credentials";
      });
    };

    $scope.login = function() {
      $scope.error = null;
      
      Auth.$authWithPassword({
        email: $scope.email,
        password: $scope.password
      }).then(function(authData) {
        console.log("Logged in as:", authData.uid);
        $location.path("/main");
      }).catch(function(error) {
        console.error(error);
        $scope.error = "Could not login with the specified credentials, please try again";
      });
    };
});
