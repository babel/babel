function _toPropertyKey(key) { if (typeof key === "symbol") { return key; } else { return String(key); } }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var z = {};

var _z = z,
    x = _extends({}, _z);

var _z2 = z,
    x = _z2.x,
    y = _objectWithoutPropertiesLoose(_z2, ["x"]);

var _z3 = z,
    x = _z3[x],
    y = _objectWithoutPropertiesLoose(_z3, [x].map(_toPropertyKey));

(function (_ref) {
  let x = _ref.x,
      y = _objectWithoutPropertiesLoose(_ref, ["x"]);
});

var _o = o;
x = _o.x;
y = _o.y;
z = _objectWithoutPropertiesLoose(_o, ["x", "y"]);
_o;
