function test(a) {
  let b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  return function (a) {
    var a = a + b;
    return a;
  }(a);
}
