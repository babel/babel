var f0 = function (a) {
  var b = arguments.length <= 1 || arguments[1] === undefined ? a : arguments[1];
  var c = arguments.length <= 2 || arguments[2] === undefined ? b : arguments[2];

  return [a, b, c];
};

assert.deepEqual(f0(1), [1, 1, 1]);

var f1 = function (_ref) {
  var a = _ref.a;
  var b = arguments.length <= 1 || arguments[1] === undefined ? a : arguments[1];
  var c = arguments.length <= 2 || arguments[2] === undefined ? b : arguments[2];

  return [a, b, c];
};

assert.deepEqual(f1({ a: 1 }), [1, 1, 1]);

var f2 = function (_ref2) {
  var a = _ref2.a;
  var b = arguments.length <= 1 || arguments[1] === undefined ? a : arguments[1];
  var c = arguments.length <= 2 || arguments[2] === undefined ? a : arguments[2];

  return [a, b, c];
};

assert.deepEqual(f2({ a: 1 }), [1, 1, 1]);
