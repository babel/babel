var t = function (f) {
  var x = f;
  x = arguments.length <= 1 ? undefined : arguments[1];
  x = arguments.length <= 2 ? undefined : arguments[2];
};

function t(f) {
  var x = f;
  x = arguments.length <= 1 ? undefined : arguments[1];
  x = arguments.length <= 2 ? undefined : arguments[2];
}

function u(f, g) {
  var x = f;
  var y = g;
  x[12] = arguments.length <= 2 ? undefined : arguments[2];
  y.prop = arguments.length <= 3 ? undefined : arguments[3];
  var z = (arguments.length <= 4 ? undefined : arguments[4]) | 0 || 12;
}
