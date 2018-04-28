var Foo = function Foo() {
  "use strict";

  babelHelpers.classCallCheck(this, Foo);

  _x.set(this, 0);

  _y.set(this, babelHelpers.classPrivateFieldGet(this, _x));
};

var _x = new WeakMap();

var _y = new WeakMap();
