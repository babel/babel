"use strict";

var _classProps = function (child, staticProps, instanceProps) {
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

  _classProps(_class2, null, { foo: {
    writable: true,
    value: function () {
      this.autoRender = true;
    }
  } });

  return _class2;
})();
