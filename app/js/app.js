
var meetingPlannerApp = angular.module('meetingPlanner', ['ngRoute', 'ngResource', 'ngDialog', 'ngDraggable', 'ui.bootstrap']);

meetingPlannerApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/mainView.html',
        controller: 'MainViewCtrl'
      }).
      when('/test', {
        templateUrl: 'partials/parkedActivities.html',
      }).
      when('/test2', {
        templateUrl: 'partials/createActivity.html',
      }).
      when('/test3', {
        templateUrl: 'partials/dayView.html',
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
