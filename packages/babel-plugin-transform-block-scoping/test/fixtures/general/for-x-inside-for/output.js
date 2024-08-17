function w() {
  var _loop = function () {
      var outer = {};
      for (i = 0; i < y; i++) {
        var x = function () {
          return outer;
        };
      }
    },
    i;
  for (var key in someObj) {
    _loop();
  }
}
