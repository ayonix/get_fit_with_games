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