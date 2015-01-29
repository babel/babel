"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var BaseView = function BaseView() {
  this.autoRender = true;
};

var BaseView = function BaseView() {
  this.autoRender = true;
};

var BaseView = (function () {
  function BaseView() {}

  _prototypeProperties(BaseView, null, {
    foo: {
      value: function foo() {
        this.autoRender = true;
      },
      writable: true,
      configurable: true
    }
  });

  return BaseView;
})();