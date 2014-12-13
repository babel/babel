"use strict";

var _classProps = function (child, staticProps, instanceProps) {
  if (staticProps) Object.defineProperties(child, staticProps);
  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
};

var Test = function Test() {};

_classProps(Test, null, {
  test: {
    set: function (val) {
      this._test = val;
    },
    enumerable: true
  }
});
