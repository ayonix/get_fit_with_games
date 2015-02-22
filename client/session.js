Template.sessions.helpers({
});

Template.sessions.events({
	'click button': function(event, template) {
		Meteor.call("createSession", this.game._id);
	},
});

Template.exercise.helpers({
	count: function() {
		if (this.people != 0) {
			return this.people * this.mult;
		} else {
			return 2 * this.mult;
		}
	},
});

Template.exercise.events({
	'change .happened': function(event, template) {
		var sessionId = Template.parentData(1).session._id;
		Meteor.call("markHappened", sessionId, this, event.target.checked);
	},
	'change .countDone': function(event, template) {
		var sessionId = Template.parentData(1).session._id;
		Meteor.call("updateCountDone", sessionId, this, event.target.value);
	},
	'change .people': function(event, template) {
		var sessionId = Template.parentData(1).session._id;
		Meteor.call("updatePeople", sessionId, this, event.target.value);
	}
});
