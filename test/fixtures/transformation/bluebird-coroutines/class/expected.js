"use strict";

var _bluebird = require("bluebird");

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var Foo = (function () {
  function Foo() {}

  _prototypeProperties(Foo, null, {
    foo: {
      value: _bluebird.coroutine(function* () {
        var wat = yield bar();
      }),
      enumerable: false,
      writable: true,
      configurable: true
    }
  });

  return Foo;
})();