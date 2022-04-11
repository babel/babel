function foo() {
  var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
  return function (a) {
    var a = 1;
  }(a);
}
