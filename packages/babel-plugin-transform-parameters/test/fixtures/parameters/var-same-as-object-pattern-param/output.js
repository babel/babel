function foo(_ref) {
  var _ref2 = babelHelpers.slicedToArray(_ref, 2),
    a = _ref2[0],
    b = _ref2[1];
  return function (a) {
    var a = 3;
    var c = 2;
    var d = a + b + c;
  }(a);
}
