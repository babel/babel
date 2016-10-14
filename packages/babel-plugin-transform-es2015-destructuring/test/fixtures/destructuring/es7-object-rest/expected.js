var z = {};
var x = babelHelpers.objectWithoutProperties(z, []);
var x = z.x,
    y = babelHelpers.objectWithoutProperties(z, ["x"]);
var x = z[x],
    y = babelHelpers.objectWithoutProperties(z, [x]);

(function (_ref) {
  var x = _ref.x,
      y = babelHelpers.objectWithoutProperties(_ref, ["x"]);
});
