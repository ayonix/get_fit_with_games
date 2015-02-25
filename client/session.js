Template.sessionItem.helpers({
	progress: function() {
		return Template.instance().progress.get();
	},
});

Template.sessionItem.rendered = function() {
	$('.ui.progress').progress({showActivity: false});
};

Template.sessionItem.created = function() {
	Template.instance().progress = new ReactiveVar();

	this.autorun(function() {
		updateProgress(Template.instance(), Template.instance().data);
	});
};

Template.sessions.events({
	'click #createSession': function(event, template) {
		Meteor.call("createSession", this.game._id);
	},
});

Template.session.created = function() {
	Template.instance().progress = new ReactiveVar();

	this.autorun(function() {
		updateProgress(Template.instance(), Template.instance().data.session);
	});
};

Template.session.helpers({
	progress: function() {
		return Template.instance().progress.get();
	},
});

var updateProgress = function(template, session) {
	var done = _.reduce(session.exercises, function(memo, ex) { return (ex.happened) ? memo += +ex.countDone : memo; }, 0);
	var open = _.reduce(session.exercises, function(memo, ex) { return (ex.happened) ? memo += +ex.count : memo; }, 0);
	template.progress.set(done/open*100);
	$('#'+session._id).progress({percent: template.progress.get(), showActivity: false});
}

Template.session.events({
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

Template.session.rendered = function() {
	$('.ui.progress').progress({showActivity: false});
};

Template.exercise.helpers({
	isActive: function() {
		return (this.happened)? " active":"";
	}
});

Template.exercise.rendered = function() {
	$('.ui.checkbox').checkbox();
};
