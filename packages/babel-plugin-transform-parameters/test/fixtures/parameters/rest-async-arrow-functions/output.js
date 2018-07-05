function _wrapped() {
  _wrapped = babelHelpers.asyncToGenerator(function* () {
    var x = arguments.length <= 0 ? undefined : arguments[0];
    var y = arguments.length <= 1 ? undefined : arguments[1];
  });
  return _wrapped.apply(this, arguments);
}

var concat = function () {
  return _wrapped.apply(this, arguments);
};

function _wrapped2() {
  _wrapped2 = babelHelpers.asyncToGenerator(function* () {
    if (noNeedToWork) return 0;

    for (var _len = arguments.length, rest = new Array(_len), _key = 0; _key < _len; _key++) {
      rest[_key] = arguments[_key];
    }

    return rest;
  });
  return _wrapped2.apply(this, arguments);
}

var x = function () {
  return _wrapped2.apply(this, arguments);
};
