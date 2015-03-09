if (Meteor.isClient) {
	Meteor.subscribe('games');
}

Router.configure({
	layoutTemplate: 'layout'
});

Router.map(function() {
	this.route('home', {
		path: '/',
		waitOn: function() {
			return Meteor.subscribe('todo');
		}
	});
	this.route('sessions',{
		path: 'sessions/:_id',
		waitOn: function() {
			return [
				Meteor.subscribe('sessionsForGame', this.params._id),
				Meteor.subscribe('exercises')
			];
		},
		data: function() {
			return {
				game: Games.findOne({_id: this.params._id}),
				sessions: Sessions.find({}, {sort: {dateTime: -1}})
			};
		}
	});
	this.route('session', {
		path: 'session/:_id',
		waitOn: function() {
			return Meteor.subscribe('session', this.params._id);
		},
		data: function() {
			return {
				session: Sessions.findOne(this.params._id)
			};
		}
	});
});
