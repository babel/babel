"use strict";

var _excluded = ["a"];
function F(_ref) {
  var a = _ref.a,
    O = babelHelpers.objectWithoutProperties(_ref, _excluded);
  var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : O;
}
