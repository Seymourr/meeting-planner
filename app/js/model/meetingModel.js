// JavaScript Document

// The possible activity types

meetingPlannerApp.factory('Meeting', function ($resource) {
	var ActivityType = ["Presentation","Group Work","Discussion","Break"];

	// this is our main module that contians days and praked activites
	this.days = [];
	this.parkedActivities = [];

	// adds a new day. if startH and startM (start hours and minutes)
	// are not provided it will set the default start of the day to 08:00
	this.addDay = function (startH, startM) {
		var day;
		if(startH){
			day = new Day(startH,startM);
		} else {
			day = new Day(8,0);
		}
		this.days.push(day);
		return day;
	};

	this.replaceActivity = function(activity, day, position) {
		if(activity != null && position != null) {
			if(day != null) {
				this.days[day]._addActivity(activity, position);
				this.days[day]._removeActivity(position +1); //Check if works
			} else {
				this.parkedActivities.splice(position, 1, activity);
			}
		} else {	
			//error message
			console.log("error in replaceactivity");
		}
	};

	// add an activity to model
	this.addActivity = function (activity, day, position) {
		if(day != null) {
			this.days[day]._addActivity(activity,position);
		} else {
			if (position != null) {
				this.parkedActivities.splice(position,0,activity);
			}
			else this.parkedActivities.push(activity);
		}
	};

	// add an activity to parked activities
	this.addParkedActivity = function(activity, position){
		this.addActivity(activity,null,position);
	};

	// remove an activity on provided position from parked activites
	this.removeParkedActivity = function(position) {
		act = this.parkedActivities.splice(position,1)[0];
		return act;
	};

	// moves activity between the days, or day and parked activities.
	// to park activity you need to set the new day to null
	// to move a parked activity to let's say day 0 you set oldday to null
	// and new day to 0
	this.moveActivity = function(oldday, oldposition, newday, newposition) {
		if(oldday !== null && oldday == newday) {
			this.days[oldday]._moveActivity(oldposition,newposition);
		}else if(oldday == null && newday == null) {
			var activity = this.removeParkedActivity(oldposition);
			this.addParkedActivity(activity,newposition);
		}else if(oldday == null) {
			var activity = this.removeParkedActivity(oldposition);
			this.days[newday]._addActivity(activity,newposition);
		}else if(newday == null) {
			var activity = this.days[oldday]._removeActivity(oldposition);
			this.addParkedActivity(activity,newposition);
		} else {
			var activity = this.days[oldday]._removeActivity(oldposition);
			this.days[newday]._addActivity(activity,newposition);
		}
	};

	// Return all available activity types
	this.getActivityTypes = function() {
		return ActivityType;
	}

	// Return an acitivity type of a specific acitivity id
	this.getActivityType = function(activityTypeId) {
		return ActivityType[activityTypeId];
	}

	// you can use this method to create some test data and test your implementation
	// Used to test parkedActivity.
	this.createTestData = function (){
		this.addDay();
		this.addActivity(new Activity("Introduction",10,0,"Some description"));
		this.addActivity(new Activity("Idea 1",30,0,"Some description"));
		this.addActivity(new Activity("Working in groups",35,1,"Some description"));
		this.addActivity(new Activity("Idea 1 discussion",15,2,"Some description"),0);
		this.addActivity(new Activity("Coffee break",20,3,"Some description"), 0);


		this.addActivity(new Activity("Something",20,0,"Some description"), 0);
		this.addActivity(new Activity("Something",20,1,"Some description"), 0);

		console.log("Day Start: " + this.days[0].getStart());
		console.log("Day End: " + this.days[0].getEnd());
		console.log("Day Length: " + this.days[0].getTotalLength() + " min");

		/*
		$.each(ActivityType, function(index,type) {
			console.log("Day '" + ActivityType[index] + "' Length: " + this.days[0].getLengthByType(index) + " min");
		});
		*/
	}

	this.createTestData();

	return this;
});
