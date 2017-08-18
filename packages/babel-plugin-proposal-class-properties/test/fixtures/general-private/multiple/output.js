var _x, _y;

var Foo = function Foo() {
  babelHelpers.classCallCheck(this, Foo);

  _x.set(this, 0);

  _y.set(this, babelHelpers.privateClassPropertyGetSpec(this, _x));
};

_x = new WeakMap();
_y = new WeakMap();