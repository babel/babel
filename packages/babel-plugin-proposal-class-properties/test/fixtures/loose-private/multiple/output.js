var _x, _y;

var Foo = function Foo() {
  babelHelpers.classCallCheck(this, Foo);
  Object.defineProperty(this, _x, {
    writable: true,
    value: 0
  });
  Object.defineProperty(this, _y, {
    writable: true,
    value: this[_x]
  });
};

_x = babelHelpers.privateClassPropertyKey("x");
_y = babelHelpers.privateClassPropertyKey("y");
