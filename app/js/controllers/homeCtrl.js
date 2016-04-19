meetingPlannerApp.controller('HomeCtrl', function ($scope, $location, Auth, Meeting) {
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
          $scope.error = null;
      }).catch(function(error) {
         if($scope.email == null || $scope.email == "") {
          $scope.error = "You must specify an email address.";
         } else if($scope.password == null || $scope.password == "") {
          $scope.error = "You must specify a password.";
         } else {
          $scope.error = "The email is either occupied or in the wrong format.";
         }
         $scope.message = null;
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
      }, function(error) {
         if($scope.email == null || $scope.email == "") {
          $scope.error = "You must specify a registered email address.";
         } else if($scope.password == null || $scope.password == "") {
          $scope.error = "You must specify a password.";
         } else {
          $scope.error = "Your credentials are incorrect, please correct them and try again.";
         }
         $scope.message = null;
      });
    };

    // Quote status, list of quotes for slides, and authors
    $scope.qStatus = "";
    $scope.quotes = [];
    $scope.authors = [];
    this.getQuote = function(index) {
      if (index < quotes.length) {
        console.log($scope.quotes[index]);
        return $scope.quotes[index];
      }
      else return "";
    };
    // Load n quotes
    this.loadQuotes = function(n) {
      $scope.qStatus = "Loading quote...";
      Meeting.Quote.query({numQuotes:n},function(data) {
        for (var i = 0; i < data.length; i++) {
          $scope.quotes.push(data[i].content);
          $scope.authors.push("- "+data[i].title);
          $scope.qStatus = "";
        }
      },function(data){
        console.log(data);
        $scope.qStatus = "There was an error getting the quote";
      });
    };
    this.loadQuotes(4);

});
