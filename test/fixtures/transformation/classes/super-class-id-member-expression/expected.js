"use strict";

var _extends = function (child, parent) {
  child.prototype = Object.create(parent.prototype, { constructor: {
    value: child,
    enumerable: false,
    writable: true,
    configurable: true
  } });
  child.__proto__ = parent;
};

var BaseController = (function (Chaplin) {
  var BaseController = function BaseController() {
    Chaplin.Controller.apply(this, arguments);
  };

  _extends(BaseController, Chaplin.Controller);

  return BaseController;
})(Chaplin);

var BaseController2 = (function (Chaplin) {
  var BaseController2 = function BaseController2() {
    Chaplin.Controller.Another.apply(this, arguments);
  };

  _extends(BaseController2, Chaplin.Controller.Another);

  return BaseController2;
})(Chaplin);
