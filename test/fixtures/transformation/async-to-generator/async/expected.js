"use strict";

var _asyncToGenerator = function (fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { var callNext = step.bind(gen.next); var callThrow = step.bind(gen["throw"]); function step(arg) { try { var info = this(arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(callNext, callThrow); } } callNext(); }); }; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var Foo = (function () {
  function Foo() {}

  _prototypeProperties(Foo, null, {
    foo: {
      value: _asyncToGenerator(function* () {
        var wat = yield bar();
      }),
      writable: true,
      enumerable: true,
      configurable: true
    }
  });

  return Foo;
})();
