"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) {
  if (staticProps) Object.defineProperties(child, staticProps);
  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
};

var BaseView = function BaseView() {
  this.autoRender = true;
};

var BaseView = function () {
  this.autoRender = true;
};

var BaseView = (function () {
  var _class2 = function () {};

  _prototypeProperties(_class2, null, {
    foo: {
      value: function () {
        this.autoRender = true;
      },
      writable: true,
      enumerable: true,
      configurable: true
    }
  });

  return _class2;
})();
