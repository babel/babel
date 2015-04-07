"use strict";

var Foo = (function () {
  var Foo = function Foo() {
    babelHelpers.classCallCheck(this, Foo);
  };

  Foo = foo(Foo) || Foo;
  return Foo;
})();

var Bar = (function () {
  var Bar = function Bar() {
    babelHelpers.classCallCheck(this, Bar);
  };

  Bar = foo(Bar) || Bar;
  Bar = bar(Bar) || Bar;
  return Bar;
})();

var Foo2 = (function () {
  var Foo = function Foo() {
    babelHelpers.classCallCheck(this, Foo);
  };

  Foo = bar(Foo) || Foo;
  return Foo;
})();

var Bar2 = (function () {
  var Bar = function Bar() {
    babelHelpers.classCallCheck(this, Bar);
  };

  Bar = foo(Bar) || Bar;
  Bar = bar(Bar) || Bar;
  return Bar;
})();

var Baz = (function () {
  var Baz = function Baz(baz) {
    babelHelpers.classCallCheck(this, Baz);

    this.baz = baz;
  };

  Baz = foo(Baz) || Baz;
  return Baz;
})();
