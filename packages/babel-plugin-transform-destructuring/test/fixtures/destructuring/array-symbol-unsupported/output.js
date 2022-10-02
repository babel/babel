var a = (() => [1, 2, 3])();

// !!! In order to run this test, this shouldn't be optimized using type inference
// If it's optimized and doesn't call toArray, please modify this test
// and exec.js
var _a = babelHelpers.toArray(a),
  first = _a[0],
  rest = _a.slice(1);
