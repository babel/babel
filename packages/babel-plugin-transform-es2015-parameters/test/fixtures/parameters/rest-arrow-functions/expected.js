var concat = function () {
  var x = arguments.length <= 0 || arguments[0] === undefined ? undefined : arguments[0];
  var y = arguments.length <= 1 || arguments[1] === undefined ? undefined : arguments[1];
};

var somefun = function () {
  var get2ndArg = function (a, b) {
    var _b = arguments.length <= 2 || arguments[2] === undefined ? undefined : arguments[2];
    var somef = function (x, y, z) {
      var _a = arguments.length <= 3 || arguments[3] === undefined ? undefined : arguments[3];
    };
    var somefg = function (c, d, e, f) {
      var _a = arguments.length <= 4 || arguments[4] === undefined ? undefined : arguments[4];
    };
    var _d = arguments.length <= 3 || arguments[3] === undefined ? undefined : arguments[3];
  };
  var get3rdArg = function () {
    return arguments.length <= 2 || arguments[2] === undefined ? undefined : arguments[2];
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
