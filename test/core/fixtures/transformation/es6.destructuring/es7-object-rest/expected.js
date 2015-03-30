"use strict";

var z = {};
var x = babelHelpers.objectWithoutProperties(z, []);
var x = z.x;
var y = babelHelpers.objectWithoutProperties(z, ["x"]);

(function (_ref) {
  var x = _ref.x;
  var y = babelHelpers.objectWithoutProperties(_ref, ["x"]);
});
