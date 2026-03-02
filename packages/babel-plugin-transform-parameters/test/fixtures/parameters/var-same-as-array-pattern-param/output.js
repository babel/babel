function foo(_ref) {
  var a = _ref.a,
    b = _ref.b;
  return function (a) {
    var a = 3;
    var c = 2;
    var d = a + b + c;
  }(a);
}
