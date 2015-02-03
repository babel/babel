"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var BaseView = function BaseView() {
  _classCallCheck(this, BaseView);

  this.autoRender = true;
};

var BaseView = function BaseView() {
  _classCallCheck(this, BaseView);

  this.autoRender = true;
};

var BaseView = (function () {
  function BaseView() {
    _classCallCheck(this, BaseView);
  }

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