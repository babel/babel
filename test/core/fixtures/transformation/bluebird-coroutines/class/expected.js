"use strict";

var _bluebird = require("bluebird");

var Foo = (function () {
  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
  }

  babelHelpers.createClass(Foo, [{
    key: "foo",
    value: _bluebird.coroutine(function* () {
      var wat = yield bar();
    })
  }]);
  return Foo;
})();
