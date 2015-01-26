"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var Test = (function () {
  function Test() {}

  _prototypeProperties(Test, null, {
    bar: {
      get: function () {
        throw new Error("wow");
      },
      enumerable: true,
      configurable: true
    }
  });

  return Test;
})();

var test = new Test();
test.bar;