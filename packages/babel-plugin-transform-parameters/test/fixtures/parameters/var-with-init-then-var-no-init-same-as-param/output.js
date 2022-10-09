function f() {
  var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
  var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
  return function (a) {
    var _a = {
        a: 4
      },
      a = _a.a;
    return a + b;
  }(a);
}
