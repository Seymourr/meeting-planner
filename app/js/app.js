var meetingPlannerApp = angular.module('meetingPlanner', ['ngRoute', 'ngResource', 'ngDialog', 'ngDraggable', 'ui.bootstrap', 'firebase', 'angularSpinner','ngSanitize', 'angularHelpOverlay']);

meetingPlannerApp.run(["$rootScope", "$location", function($rootScope, $location) {
$rootScope.$on("$routeChangeError", function(event, next, previous, error) {
  // We can catch the error thrown when the $requireAuth promise is rejected
  // and redirect the user back to the home page
  if (error === "AUTH_REQUIRED") {
    console.log("AUTH REQUIRED");
    $location.path("/login");
  }
});
}]);

meetingPlannerApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl'
      }).
      when('/main', {
        templateUrl: 'partials/mainView.html',
        controller: 'MainViewCtrl',
        resolve: {
          // controller will not be loaded until $requireAuth resolves
          "currentAuth": ["Auth", function(Auth) {
          // $requireAuth returns a promise so the resolve waits for it to complete
          // If the promise is rejected, it will throw a $stateChangeError (see above)
          return Auth.$requireAuth();
          }]
        }
      }).
      otherwise({
        redirectTo: '/'
      });
  }
]);
