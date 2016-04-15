// This is a day consturctor. You can use it to create days,
// but there is also a specific function in the Model that adds
// days to the model, so you don't need call this yourself.
function Day(startH,startM) {
	this._title = "";
	this._startTime = new Date();
	this._startTime.setHours(startH);
	this._startTime.setMinutes(startM);
	this._activities = [];

	this.setTitle = function(newTitle) {
		this._title = newTitle;
	};
	this.getTitle = function() {
		return this._title;
	};
	this.getDate = function() {
		return this._startTime;
	};
	this.setDate = function(date) {
		if (date != null)
			this._startTime = date;
	};
	this.getTime = function() {
		return this._startTime;
	};
	this.setTime = function(newTime) {
		this._startTime = newTime;
	};
	// returns the total length of the acitivities in
	// a day in minutes
	this.getTotalLength = function () {
		var totalLength = 0;
		$.each(this._activities,function(index,activity){
			totalLength += activity.getLength();
		});
		return totalLength;
	};

	// the end time of the day
	this.getEnd = function() {
		if (this._startTime != null)
			return new Date(this._startTime.getFullYear(), this._startTime.getMonth(), this._startTime.getDate(), this._startTime.getHours(), (this._startTime.getMinutes() + this.getTotalLength()));
	};

	// returns the string representation Hours:Minutes of
	// the start time of the day
	this.getStart = function() {
		return this._date;
	};

	// returns the length (in minutes) of activities of certain type
	this.getLengthByType = function (typeid) {
		var length = 0;
		$.each(this._activities,function(index,activity){
			if(activity.getTypeId() == typeid){
				length += activity.getLength();
			}
		});
		return length;
	};

	//  returns the activies set for this day
	this.getActivities = function() {
		return this._activities;
	};
	// adds an activity to specific position
	// if the position is not provided then it will add it to the
	// end of the list
	this._addActivity = function(activity,position){
		if(position != null){
			this._activities.splice(position,0,activity);
		} else {
			this._activities.push(activity);
		}
	};

	// removes an activity from specific position
	// this method will be called when needed from the model
	// don't call it directly
	this._removeActivity = function(position) {
		return this._activities.splice(position,1)[0];
	};

	// moves activity inside one day
	// this method will be called when needed from the model
	// don't call it directly
	this._moveActivity = function(oldposition,newposition) {
		// In case new position is greater than the old position and we are not moving
		// to the last position of the array
		if(newposition > oldposition && newposition < this._activities.length - 1) {
			newposition--;
		}
		var activity = this._removeActivity(oldposition);
		this._addActivity(activity, newposition);
	};

	this.getActivityStart = function(index){
		if (this._startTime != null) {
		var counter = 0;
		for(var i = 0; i < this._activities.length; i++) {
			if(i == index) break;
			counter += this._activities[i].getLength();
		}
		return new Date(this._startTime.getFullYear(), this._startTime.getMonth(), this._startTime.getDate(), this._startTime.getHours(), (this._startTime.getMinutes() + counter));
	}
	};
}
