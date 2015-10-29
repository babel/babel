var concat = function () {
  var x = arguments[0];
  var y = arguments[1];
};

var somefun = function () {
  var get2ndArg = function (a, b) {
    var _b = arguments[2];
    var somef = function (x, y, z) {
      var _a = arguments[3];
    };
    var somefg = function (c, d, e, f) {
      var _a = arguments[4];
    };
    var _d = arguments[3];
  };
  var get1stArg = function () {
    return arguments[0];
  };
};

function demo1() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return function (i) {
    return args[i + 0];
  };
}
