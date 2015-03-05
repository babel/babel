"use strict";

var Test = function Test() {
  babelHelpers.classCallCheck(this, Test);

  this.state = "test";
};

var Foo = (function (Bar) {
  function Foo() {
    babelHelpers.classCallCheck(this, Foo);

    this.state = "test";
  }

  babelHelpers.inherits(Foo, Bar);
  return Foo;
})(Bar);