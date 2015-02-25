Meteor.startup(function () {
	if (Games.find().count() == 0) {
		Games.insert({
			name: "Dota 2",
			conditions: [
				{description: "Game lost", dynamic: false},
				{description: "Non-english speaking in team", dynamic: true},
				{description: "GG called after first blood", dynamic: false},
				{description: "Report XXX", dynamic: true},
				{description: "5 carry team", dynamic: false},
				{description: "no wards or no courier", dynamic: false},
				{description: "Pudge/Riki instant locked", dynamic: false}
			]
		});
		Games.insert({
			name: "Counter-Strike: Global Offensive",
			conditions: [
				{description: "Game lost", dynamic: false},
				{description: "Non-english speaking in team", dynamic: true},
				{description: "GG called after first round", dynamic: false},
				{description: "Report XXX", dynamic: true},
				{description: "5 AWPs on team", dynamic: false},
				{description: "Ninja defuses", dynamic: false},
				{description: "Shitty microphone", dynamic: true}
			]
		});
	}
	if (Exercises.find().count() == 0) {
		var exercises = [
			{
				description: "push ups",
				mult: 10,
			},{
				description: "squats",
				mult: 10,
			},{
				description: "cross punch sit ups",
				mult: 10,
			},{
				description: "leg raises",
				mult: 10,
			},{
				description: "tricep dips",
				mult: 10,
			},{
				description: "jumping lunges",
				mult: 10,
			},{
				description: "bicycle crunches",
				mult: 10,
			}
		];
		_.each(exercises, function(ex) {
			Exercises.insert(ex);
		});
	}
});
