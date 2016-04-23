meetingPlannerApp.factory('TutorialService', function () { 
	// Toggles the tutorial window
  return {
    showHelp: false,
    toggle: function() {
      // Improve this method as needed
      this.showHelp = !this.showHelp;
    }
  };
});
