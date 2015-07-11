"use strict";

var Test = function Test() {
  babelHelpers.classCallCheck(this, Test);

  this.state = "test";
};

var Foo = (function (_Bar) {
  babelHelpers.inherits(Foo, _Bar);

  function Foo() {
    babelHelpers.classCallCheck(this, Foo);

    babelHelpers.get(Object.getPrototypeOf(Foo.prototype), "constructor", this).call(this);
    this.state = "test";
  }

  return Foo;
})(Bar);

var ConstructorScoping = function ConstructorScoping() {
  babelHelpers.classCallCheck(this, ConstructorScoping);

  var bar = undefined;
  {
    var _bar = undefined;
  }
};
