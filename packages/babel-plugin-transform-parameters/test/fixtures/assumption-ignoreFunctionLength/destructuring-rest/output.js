// #3861
function t(x, _ref) {
  if (x === void 0) {
    x = "default";
  }

  var a = _ref.a,
      b = _ref.b;

  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  console.log(x, a, b, args);
}
