Meteor.publish('games', function() {
	return Games.find();
});

Meteor.publish('exercises', function() {
	return Exercises.find();
});

Meteor.publish('sessionsForGame', function(gameId) {
	return Sessions.find({gameId: gameId, userId: this.userId});
});

Meteor.publish('session', function(sessionId) {
	return Sessions.find({_id: sessionId, userId: this.userId});
});
