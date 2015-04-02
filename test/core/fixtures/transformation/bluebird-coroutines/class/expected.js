"use strict";

var _bluebird2 = require("bluebird");

var Foo = (function () {
  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
  }

  babelHelpers.createClass(Foo, [{
    key: "foo",
    value: _bluebird2.coroutine(function* () {
      var wat = yield bar();
    })
  }]);
  return Foo;
})();
