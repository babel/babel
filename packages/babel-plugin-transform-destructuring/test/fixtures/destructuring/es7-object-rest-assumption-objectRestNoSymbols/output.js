const _excluded = ["x"];
var z = {};
var _z = z,
  x = babelHelpers.extends({}, (babelHelpers.objectDestructuringEmpty(_z), _z));
var _z2 = z,
  x = _z2.x,
  y = babelHelpers.objectWithoutPropertiesLoose(_z2, ["x"]);
var _z3 = z,
  x = _z3[x],
  y = babelHelpers.objectWithoutPropertiesLoose(_z3, [x].map(babelHelpers.toPropertyKey));
(function (_ref) {
  let x = _ref.x,
    y = babelHelpers.objectWithoutPropertiesLoose(_ref, _excluded);
});
var _o = o;
x = _o.x;
y = _o.y;
z = babelHelpers.objectWithoutPropertiesLoose(_o, ["x", "y"]);
_o;
