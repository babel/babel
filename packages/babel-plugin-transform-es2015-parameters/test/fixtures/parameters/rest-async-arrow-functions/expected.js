var concat = function () {
  var ref = babelHelpers.asyncToGenerator(function* () {
    var x = arguments.length <= 0 ? undefined : arguments[0];
    var y = arguments.length <= 1 ? undefined : arguments[1];
  });
  return function concat() {
    return ref.apply(this, arguments);
  };
}();

var x = function () {
  var ref = babelHelpers.asyncToGenerator(function* () {
    for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
      rest[_key] = arguments[_key];
    }

    if (noNeedToWork) return 0;
    return rest;
  });
  return function x() {
    return ref.apply(this, arguments);
  };
}();
