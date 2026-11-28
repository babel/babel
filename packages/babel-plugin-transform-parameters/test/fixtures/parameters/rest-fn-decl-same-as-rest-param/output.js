function f() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return function (args) {
    function args() {}
    return typeof args;
  }(args);
}
function g() {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }
  return function* (args) {
    function args() {}
    yield typeof args;
  }(args);
}
