var Foo = function Foo() {
  "use strict";

  babelHelpers.classCallCheck(this, Foo);
  babelHelpers.defineProperty(this, "one", babelHelpers.classPrivateFieldGet(this, _private));

  _two.set(this, {
    writable: true,
    value: babelHelpers.classPrivateFieldGet(this, _private)
  });

  _private.set(this, {
    writable: true,
    value: 0
  });

  babelHelpers.defineProperty(this, "three", babelHelpers.classPrivateFieldGet(this, _private));

  _four.set(this, {
    writable: true,
    value: babelHelpers.classPrivateFieldGet(this, _private)
  });
};

var _two = new WeakMap();

var _private = new WeakMap();

var _four = new WeakMap();
