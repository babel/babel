function f() {
  arguments = function () {
    "use strict";

    return arguments;
  }.apply(void 0, arguments);
  var _arguments2 = arguments;
  let q = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : eval("1");
  return function () {
    var _arguments = _arguments2;
    let [_ref = () => m] = _arguments2.length > 1 && _arguments2[1] !== undefined ? _arguments2[1] : [],
      m = babelHelpers.objectWithoutProperties(Object.assign(Object.create(null), (babelHelpers.objectDestructuringEmpty(_ref), _ref)), []);
    return function () {
      return [q, _arguments[0], _arguments.length];
    }();
  }();
}
