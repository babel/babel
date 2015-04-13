"use strict";

var Foo = (function () {
  var _Foo = Foo;

  function Foo() {
    babelHelpers.classCallCheck(this, _Foo);
  }

  Foo = foo(Foo) || Foo;
  return Foo;
})();

var Bar = (function () {
  var _Bar = Bar;

  function Bar() {
    babelHelpers.classCallCheck(this, _Bar);
  }

  Bar = bar(Bar) || Bar;
  Bar = foo(Bar) || Bar;
  return Bar;
})();

var Foo2 = (function () {
  var _Foo2 = Foo;

  function Foo() {
    babelHelpers.classCallCheck(this, _Foo2);
  }

  Foo = bar(Foo) || Foo;
  return Foo;
})();

var Bar2 = (function () {
  var _Bar2 = Bar;

  function Bar() {
    babelHelpers.classCallCheck(this, _Bar2);
  }

  Bar = bar(Bar) || Bar;
  Bar = foo(Bar) || Bar;
  return Bar;
})();

var Baz = (function () {
  var _Baz = Baz;

  function Baz(baz) {
    babelHelpers.classCallCheck(this, _Baz);

    this.baz = baz;
  }

  Baz = foo(Baz) || Baz;
  return Baz;
})();
