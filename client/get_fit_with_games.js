Template.games.helpers({
	games: Games.find(),
});
Template.layout.rendered = function() {
	//console.log(document.getElementById("headerimage"))
	var s = Snap("#headerimage");
	Snap.load("/img/kbd.svg", function (f) {
		//f.select("polygon[fill='#09B39C']").attr({fill: "#bada55"});
		//var g = f.select("g");
		s.append(f);
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
		var time = 100
		s.select(keyname).animate({'fill-opacity': 1.0}, time, null, function() {
			this.animate({'fill-opacity': 0.0}, time);
		});
	};
}