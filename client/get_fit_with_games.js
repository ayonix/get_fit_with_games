Template.games.helpers({
	games: Games.find()
});

Template.layout.rendered = function() {
	var s = Snap("#headerimage");
	Snap.load("/img/kbd.svg", function (f) {
		s.append(f);
		s.select('svg').addClass("keyboard ui image");
	});

	var keycode_mappings = (function() {
		var k = {};

		// letters
		for(var i = 65; i <= 90; i++) {
			var letter = String.fromCharCode(i+32);
			k[i] = "key_" + letter;
		}
		// digits
		for(var i = 48; i <= 57; i++) {
			k[i] = "key_" + (i - 48);
		}
		k[8] = "key_backspace";
		k[9] = "key_tab";
		k[13] = "key_enter";
		k[16] = "key_shift";
		k[17] = "key_ctrl";
		k[18] = "key_alt";
		k[32] = "key_space";

		return k;
	})();

	window.onkeydown = function(k) {
		var code = k.keyCode;
		if(!(code in keycode_mappings)) { return; }
		var keyname = "#" + keycode_mappings[code];
		var time = 100;
		s.select(keyname).animate({'fill-opacity': 1.0}, time, null, function() {
			this.animate({'fill-opacity': 0.0}, time);
		});
	};
}

Template.todo_exercise.events({
	'change .countDone': function(event, template) {
		var sessionId = Template.parentData(1)._id;
		Meteor.call("updateCountDone", sessionId, this, event.target.value);
	}
});

Template.todo.helpers({
	sessions: function() {
		var sess = Sessions.find().fetch();
		_.each(sess, function(s) {
			s.exercises = _.filter(s.exercises, function(x) { return x.happened && x.countDone < x.count; });
		});
		sess = _.reject(sess, function(s) {
			return s.exercises.length == 0;
		});
		return sess;
	}
});

Template.todo.rendered = function() {
	this.find('tbody')._uihooks = {
		insertElement: function(node, next) {
			$(node).hide().insertBefore(next);//.fadeIn(5000);
		},
		removeElement: function(node) {
			$(node).fadeOut(function() {
				this.remove();
			});
		}
	};
};
