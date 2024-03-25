function w() {
  var _loop = function () {
      var outer = {};
      for (key in someObj) {
        var x = function () {
          return outer;
        };
      }
    },
    key;
  for (var i = 0; i < y; i++) {
    _loop();
  }
}
function w2() {
  var _loop2 = function () {
      var outer = {};
      for (key of someObj) {
        var x = function () {
          return outer;
        };
      }
    },
    key;
  for (var i = 0; i < y; i++) {
    _loop2();
  }
}
