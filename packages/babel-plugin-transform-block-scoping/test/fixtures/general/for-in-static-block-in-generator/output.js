function* run() {
  var captured;
  class C {
    static {
      var _loop = function (i) {
        captured = function () {
          return i;
        };
      };
      for (var i = 0; i < 2; i++) {
        _loop(i);
      }
    }
  }
  yield 0;
  return captured();
}
var iterator = run();
