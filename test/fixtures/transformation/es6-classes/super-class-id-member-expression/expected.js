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

var BaseController = function BaseController() {
  if (Chaplin.Controller) {
    Chaplin.Controller.apply(this, arguments);
  }
};

_inherits(BaseController, Chaplin.Controller);

var BaseController2 = function BaseController2() {
  if (Chaplin.Controller.Another) {
    Chaplin.Controller.Another.apply(this, arguments);
  }
};

_inherits(BaseController2, Chaplin.Controller.Another);
