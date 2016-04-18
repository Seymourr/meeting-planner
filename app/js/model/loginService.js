meetingPlannerApp.factory('Auth', function ($firebaseAuth) { 
    var ref = new Firebase("https://torrid-fire-6359.firebaseio.com");
    return $firebaseAuth(ref);
});
