// JavaScript Document

// The possible activity types

meetingPlannerApp.factory('Meeting', function ($resource, Auth,$route) {
	var ActivityType = ["Presentation","Group Work","Discussion","Break"];

	// this is our main module that contians days and praked activites
    var firebaseString = "https://torrid-fire-6359.firebaseio.com/users/";
	var ref; //Contains a database reference for a specific user


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
		this.updateDayDatabase();
		return day;
	};

    this.deleteDay = function(id) {
        this.days.splice(id, 1);
        $route.reload(); //Recalculate dayID for all days
        this.updateDayDatabase();
        this.updateParkedDatabase();
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
        this.updateDayDatabase();
        this.updateParkedDatabase();
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
        this.updateDayDatabase();
        this.updateParkedDatabase();
	};

    this.deleteActivity = function(day, position) {
        if(day == null) {
            this.removeParkedActivity(position);
            this.updateParkedDatabase();
        } else {
            this.days[day]._removeActivity(position);
            this.updateDayDatabase();
        }
    };

	// add an activity to parked activities
	this.addParkedActivity = function(activity, position){
		this.addActivity(activity,null,position);
        this.updateParkedDatabase();
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
        this.updateDayDatabase();
        this.updateParkedDatabase();
	};

	// Return all available activity types
	this.getActivityTypes = function() {
		return ActivityType;
	};

	// Return an acitivity type of a specific acitivity id
	this.getActivityType = function(activityTypeId) {
		return ActivityType[activityTypeId];
	};

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
		this.addActivity(new Activity("Idea 1 discussion",15,2,"Some description"),0);
		this.addActivity(new Activity("Coffee break",20,3,"Some description"), 0);
		this.addActivity(new Activity("Something",20,0,"Some description"), 0);
		this.addActivity(new Activity("Something",20,1,"Some description"), 0);
		this.addActivity(new Activity("Idea 1 discussion",15,2,"Some description"),0);
		this.addActivity(new Activity("Coffee break",20,3,"Some description"), 0);
		this.addActivity(new Activity("Something",20,0,"Some description"), 0);
		this.addActivity(new Activity("Something",20,1,"Some description"), 0);

		console.log("Day Start: " + this.days[0].getStart());
		console.log("Day End: " + this.days[0].getEnd());
		console.log("Day Length: " + this.days[0].getTotalLength() + " min");
	};
	// Quote API resource
	this.Quote = $resource('http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1?nonce=:'+Math.random());

	// Refreshes the quote by adding a new nonce to the URL, to prevent browser caching
	this.refreshQuote = function() {
		this.Quote = $resource('http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1?nonce=:'+Math.random());
	};
	//Should only be called once in every client visit!
    this.getDaysData = function() {
        var d;
        var parent = this;
        return ref.child("days").once("value").then(function(data) {
            var newD = [];
            d = data.val();

            if(d == null) return;

            for(var i = 0; i < d.length; i++) {
                newD.push(new Day(1, 1));

                newD[newD.length - 1]._startTime = new Date(d[i].dayTime); //Must have..

                var title = d[i].dayTitle;
                if(title == null || title == undefined) title = "";
                newD[newD.length - 1]._title = title;

                if(d[i].dayActivities == undefined || d[i].dayActivities == null) continue;
                var activities = d[i].dayActivities;  //Array
                var localAct = [];
                for(var j = 0; j < activities.length; j++) {
                    var name = activities[j].name;
                    var len = activities[j].length;
                    var type = activities[j].typeid;
                    var desc = activities[j].description;
                    localAct.push(new Activity(name, len, type, desc));
                }
                newD[newD.length - 1]._activities = localAct;
            }
            parent.days = newD;
        });
    };

    //Should only be called once in every client visit!
    this.getParkedData = function() {
        var activities;
        var localAct = [];
        var parent = this;
        return ref.child("parkedActivities").once("value").then(function(data) {
            activities = data.val();

            if(activities == undefined || activities == null) return;
            for(var j = 0; j < activities.length; j++) {
                var name = activities[j].name;
                var len = activities[j].length;
                var type = activities[j].typeid;
                var desc = activities[j].description;
                localAct.push(new Activity(name, len, type, desc));
            }

            parent.parkedActivities = localAct;
        });
    };

    //Days.. TODO: Day by day ?
    this.updateDayDatabase = function() {
        var data = [];
        for(var i = 0; i < this.days.length; i++) {
            var activities = [];
            var aList = this.days[i]._activities;
            for(var j = 0; j < aList.length; j++) {
                activities.push({
                    "name": aList[j].getName(),
                    "length": aList[j].getLength(),
                    "typeid": aList[j].getTypeId(),
                    "description": aList[j].getDescription()
                });
            }
            if(this.days[i]._startTime == null) {
                continue; //Skip to push this day..Good fix?
            }
            data.push({
                "dayTitle": this.days[i]._title,
                "dayTime": this.days[i]._startTime.getTime(),
                "dayActivities": activities
            });
        }
        ref.child("days").set(data);
    };

    //Parked activities..
    this.updateParkedDatabase = function() {
        var activities = [];
        for(var i = 0; i < this.parkedActivities.length; i++) {
            activities.push({
                    "name": this.parkedActivities[i].getName(),
                    "length": this.parkedActivities[i].getLength(),
                    "typeid": this.parkedActivities[i].getTypeId(),
                    "description": this.parkedActivities[i].getDescription()
            });
        }
        ref.child("parkedActivities").set(activities);
    };

    this.reset = function() {
        this.parkedActivities = [];
        this.days = [];
    };

    this.loginUser = function() {
        var userstr = Auth.$getAuth().uid + "/";
        ref = new Firebase(firebaseString + userstr);
    };


  //  this.loginUser(); //Login the current user in Auth (Sets ref to new firebase db)

	return this;
});
