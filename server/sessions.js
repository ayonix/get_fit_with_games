Meteor.methods({
	createSession: function(gameId) {
		if (this.userId) {
			var game = Games.findOne(gameId);
			var availableExercises = Exercises.find().fetch();
			var exercises = [];
			_.each(game.conditions, function(cond, index) {
				var exercise = availableExercises[index];
				exercises[index] = {
					condition: cond,
					exercise: exercise.description,
					people: 0,
					mult: exercise.mult,
					happened: false,
					countDone: 0,
				};
			});

			Sessions.insert({
				gameId: gameId,
				userId: this.userId,
				dateTime: new Date(),
				exercises: exercises,
			});
		}
	},
	markHappened: function(sessionId, exercise, checked) {
		Sessions.update({_id: sessionId, "exercises.condition": exercise.condition}, {$set: {"exercises.$.happened": checked}});
	},
	updateCountDone: function(sessionId, exercise, countDone) {
		Sessions.update({_id: sessionId, "exercises.condition": exercise.condition}, {$set: {"exercises.$.countDone": countDone}});
	},
	updatePeople: function(sessionId, exercise, people) {
		Sessions.update({_id: sessionId, "exercises.condition": exercise.condition}, {$set: {"exercises.$.people": people}});
	},
})
