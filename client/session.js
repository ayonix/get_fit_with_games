Template.sessions.helpers({
	progress: function() {
		var session = Sessions.findOne(this._id);
		var p = new ReactiveVar(0);
		var open = 0;
		var done = 0;
		_.each(session.exercises, function(ex) {
			if (ex.happened) {
				open += +ex.count;
				done += +ex.countDone;
			}
		});
		if (done == 0) {
			p.set(0);
		} else {
			p.set(done/open * 100);
		}
		return p.get();
	},
});

Template.sessions.rendered = function() {
	$('.ui.progress').progress();
};

Template.sessions.events({
	'click button': function(event, template) {
		Meteor.call("createSession", this.game._id);
	},
});

Template.session.created = function() {
	Template.instance().progress = new ReactiveVar();
	updateProgress(Template.instance());
};

Template.session.helpers({
	progress: function() {
		return Template.instance().progress.get();
	},
});

var updateProgress = function(template) {
	var done = _.reduce(template.data.session.exercises, function(memo, ex) { return (ex.happened) ? memo += +ex.countDone : memo; }, 0);
	var open = _.reduce(template.data.session.exercises, function(memo, ex) { return (ex.happened) ? memo += +ex.count : memo; }, 0);
	template.progress.set(done/open*100);
	$('.ui.progress').progress({percent: template.progress.get()});
}

Template.session.events({
	'change .happened': function(event, template) {
		var sessionId = Template.parentData(1).session._id;
		Meteor.call("markHappened", sessionId, this, event.target.checked);
		updateProgress(template);
	},
	'change .countDone': function(event, template) {
		var sessionId = Template.parentData(1).session._id;
		Meteor.call("updateCountDone", sessionId, this, event.target.value);
		updateProgress(template);

	},
	'change .people': function(event, template) {
		var sessionId = Template.parentData(1).session._id;
		Meteor.call("updatePeople", sessionId, this, event.target.value);
		updateProgress(template);
	}

});

Template.session.rendered = function() {
	$('.ui.progress').progress();
};

Template.exercise.helpers({
	isActive: function() {
		return (this.happened)? " active":"";
	}
});

Template.exercise.rendered = function() {
	$('.ui.checkbox').checkbox();
};

Template.exercise.events({
});
