var _x, _y;

var Foo = function Foo() {
  babelHelpers.classCallCheck(this, Foo);
  Object.defineProperty(this, _x, {
    writable: true,
    value: 0
  });
  Object.defineProperty(this, _y, {
    writable: true,
    value: babelHelpers.classPrivateFieldBase(this, _x)[_x]
  });
};

_x = babelHelpers.classPrivateFieldKey("x");
_y = babelHelpers.classPrivateFieldKey("y");
