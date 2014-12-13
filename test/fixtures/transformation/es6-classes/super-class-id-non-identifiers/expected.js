"use strict";

var _extends = function (child, parent) {
  child.prototype = Object.create(parent.prototype, {
    constructor: {
      value: child,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  child.__proto__ = parent;
};

var _QSuper = function () {};

var Q = function Q() {
  _QSuper.apply(this, arguments);
};

_extends(Q, _QSuper);
