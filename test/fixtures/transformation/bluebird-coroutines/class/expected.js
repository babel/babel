"use strict";

var _bluebird = require("bluebird");

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Foo = (function () {
  function Foo() {
    _classCallCheck(this, Foo);
  }

  _prototypeProperties(Foo, null, {
    foo: {
      value: _bluebird.coroutine(function* () {
        var wat = yield bar();
      }),
      writable: true,
      configurable: true
    }
  });

  return Foo;
})();