"use strict";

var _inherits = function (child, parent) {
  child.prototype = Object.create(parent && parent.prototype, {
    constructor: {
      value: child,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (parent) child.__proto__ = parent;
};

var BaseController = (function () {
  var _BaseControllerSuper = Chaplin.Controller;
  var BaseController = function BaseController() {
    if (_BaseControllerSuper) {
      _BaseControllerSuper.apply(this, arguments);
    }
  };

  _inherits(BaseController, _BaseControllerSuper);

  return BaseController;
})();

var BaseController2 = (function () {
  var _BaseController2Super = Chaplin.Controller.Another;
  var BaseController2 = function BaseController2() {
    if (_BaseController2Super) {
      _BaseController2Super.apply(this, arguments);
    }
  };

  _inherits(BaseController2, _BaseController2Super);

  return BaseController2;
})();
