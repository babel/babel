"use strict";

var Test = (function (Foo) {
  function Test() {
    babelHelpers.classCallCheck(this, Test);

    Foo.prototype.test.whatever();
    Foo.prototype.test.call(this);
  }

  babelHelpers.inherits(Test, Foo);

  Test.test = function test() {
    return Foo.wow.call(this);
  };

  return Test;
})(Foo);