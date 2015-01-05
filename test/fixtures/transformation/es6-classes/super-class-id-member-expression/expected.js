"use strict";

var _inherits = function (child, parent) {
  if (typeof parent !== "function" && parent !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof parent);
  }
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
  var _Chaplin$Controller = Chaplin.Controller;
  var BaseController = function BaseController() {
    if (_Chaplin$Controller !== null) {
      _Chaplin$Controller.apply(this, arguments);
    }
  };

  _inherits(BaseController, _Chaplin$Controller);

  return BaseController;
})();

var BaseController2 = (function () {
  var _Chaplin$Controller$Another = Chaplin.Controller.Another;
  var BaseController2 = function BaseController2() {
    if (_Chaplin$Controller$Another !== null) {
      _Chaplin$Controller$Another.apply(this, arguments);
    }
  };

  _inherits(BaseController2, _Chaplin$Controller$Another);

  return BaseController2;
})();
