const _excluded = ["x"];
var z = {};
var _z = z,
  x = babelHelpers.objectWithoutProperties(Object.assign(Object.create(null), (babelHelpers.objectDestructuringEmpty(_z), _z)), []);
var _z2 = z,
  x = _z2.x,
  y = babelHelpers.objectWithoutProperties(_z2, ["x"]);
var _z3 = z;
babelHelpers.objectDestructuringEmpty(_z3);
var _babelHelpers$toPrope = babelHelpers.toPropertyKey(x),
  x = _z3[_babelHelpers$toPrope],
  y = babelHelpers.objectWithoutProperties(_z3, [_babelHelpers$toPrope]);
(function (_ref) {
  var x = _ref.x,
    y = babelHelpers.objectWithoutProperties(_ref, _excluded);
});
var _o = o;
x = _o.x;
y = _o.y;
z = babelHelpers.objectWithoutProperties(_o, ["x", "y"]);
_o;
