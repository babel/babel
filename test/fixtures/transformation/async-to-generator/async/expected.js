"use strict";

var Foo = (function () {
  var _Foo = function Foo() {
    babelHelpers.classCallCheck(this, _Foo);
  };

  babelHelpers.createClass(_Foo, {
    foo: {
      value: babelHelpers.asyncToGenerator(function* () {
        var wat = yield bar();
      })
    }
  });
  return _Foo;
})();