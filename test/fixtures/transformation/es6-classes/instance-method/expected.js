"use strict";

var _classProps = function (child, staticProps, instanceProps) {
  if (staticProps) Object.defineProperties(child, staticProps);
  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
};

var Test = (function () {
  var Test = function Test() {};

  _classProps(Test, null, {
    test: {
      writable: true,
      value: function () {
        return 5 + 5;
      }
    }
  });

  return Test;
})();
