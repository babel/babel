"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) {
  if (staticProps) Object.defineProperties(child, staticProps);
  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
};

var Test = (function () {
  var Test = function Test() {};

  _prototypeProperties(Test, null, {
    test: {
      value: function () {
        return 5 + 5;
      },
      writable: true,
      enumerable: true,
      configurable: true
    }
  });

  return Test;
})();
