// #1649

"use strict";

var Foo = (function () {
  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
  }

  babelHelpers.createClass(Foo, [{
    key: Symbol(),
    value: function () {}
  }, {
    key: Symbol(),
    value: function () {}
  }]);
  return Foo;
})();
