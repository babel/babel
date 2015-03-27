"use strict";

var Foo = (function () {
  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
  }

  babelHelpers.createClass(Foo, [{
    key: "foo",
    value: babelHelpers.asyncToGenerator(function* () {
      var wat = yield bar();
    })
  }]);
  return Foo;
})();
