Meteor.startup(function () {
	if (Games.find().count() == 0) {
		Games.insert({
			name: "Dota 2",
			conditions: [
				"Game lost",
				"Non-english speaking in team",
				"GG called after first blood",
				"Report XXX",
				"5 carry team",
				"no wards or no courier",
				"Pudge/Riki instant locked"
			]
		});
		Games.insert({
			name: "Counter-Strike: Global Offensive",
			conditions: [
				"Game lost",
				"Non-english speaking in team",
				"GG called after first round",
				"Report XXX",
				"5 AWPs on team",
				"Ninja defuses",
				"Shitty microphone",
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
