"use strict";

var _classProps = function (child, staticProps, instanceProps) {
  if (staticProps) Object.defineProperties(child, staticProps);

  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
};

var Test = (function () {
  var Test = function Test() {};

  _classProps(Test, null, {
    bar: {
      get: function () {
        throw new Error("wow");
      }
    }
  });

  return Test;
})();

var test = new Test();
test.bar;
