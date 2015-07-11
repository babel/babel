"use strict";

var Foo = function Foo() {
  babelHelpers.classCallCheck(this, Foo);
};

var Bar = (function (_Foo) {
  babelHelpers.inherits(Bar, _Foo);

  Bar.prototype.methodA = function methodA() {};

  function Bar() {
    babelHelpers.classCallCheck(this, Bar);

    _Foo.call(this);
  }

  Bar.prototype.methodB = function methodB() {};

  return Bar;
})(Foo);
