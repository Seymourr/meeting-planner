meetingPlannerApp.factory('TutorialService', function () { 
    return {
    showHelp: false,
    toggle: function() {
      // Improve this method as needed
      this.showHelp = !this.showHelp;
    }
  };
});
