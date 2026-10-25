const _excluded = ["a"],
  _excluded2 = ["c"];
var o = {
  set x(_ref) {
    var {
        a
      } = _ref,
      b = babelHelpers.objectWithoutProperties(_ref, _excluded);
    return arguments;
  },
  set y(_ref2) {
    var _arguments = arguments;
    let {
        c = z
      } = _ref2,
      d = babelHelpers.objectWithoutProperties(_ref2, _excluded2);
    return function () {
      var z;
      return _arguments;
    }();
  }
};
