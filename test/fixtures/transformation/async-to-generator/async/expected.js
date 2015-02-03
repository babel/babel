"use strict";

var _asyncToGenerator = function (fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { var callNext = step.bind(null, "next"); var callThrow = step.bind(null, "throw"); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(callNext, callThrow); } } callNext(); }); }; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Foo = (function () {
  function Foo() {
    _classCallCheck(this, Foo);
  }

  _prototypeProperties(Foo, null, {
    foo: {
      value: _asyncToGenerator(function* () {
        var wat = yield bar();
      }),
      writable: true,
      configurable: true
    }
  });

  return Foo;
})();