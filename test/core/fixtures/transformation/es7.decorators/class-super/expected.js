"use strict";

var Foo = (function (_Bar) {
  babelHelpers.inherits(Foo, _Bar);

  function Foo() {
    babelHelpers.classCallCheck(this, _Foo);

    babelHelpers.get(Object.getPrototypeOf(_Foo.prototype), "constructor", this).call(this);
  }

  var _Foo = Foo;
  Foo = bar(Foo) || Foo;
  return Foo;
})(Bar);

var Foo2 = (function (_Bar2) {
  babelHelpers.inherits(Foo2, _Bar2);

  function Foo2() {
    babelHelpers.classCallCheck(this, _Foo2);

    babelHelpers.get(Object.getPrototypeOf(_Foo2.prototype), "constructor", this).call(this);
  }

  var _Foo2 = Foo2;
  Foo2 = bar(Foo2) || Foo2;
  return Foo2;
})(Bar);
