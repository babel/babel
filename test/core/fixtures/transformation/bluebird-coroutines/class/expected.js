"use strict";

var _bluebird2 = require("bluebird");

var _bluebird3 = babelHelpers.interopRequireWildcard(_bluebird2);

var Foo = (function () {
  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
  }

  babelHelpers.createClass(Foo, [{
    key: "foo",
    value: _bluebird3["default"].coroutine(function* () {
      var wat = yield bar();
    })
  }]);
  return Foo;
})();
