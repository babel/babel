function foo(_ref) {
  var a = _ref.a,
      b = _ref.b;
  return function () {
    var a = 3;
    var c = 2;
    var d = a + b + c;
  }();
}
