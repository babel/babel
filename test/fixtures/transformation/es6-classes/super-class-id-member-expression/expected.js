"use strict";

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var BaseController = (function (_Chaplin$Controller) {
  function BaseController() {
    if (Object.getPrototypeOf(BaseController) !== null) {
      Object.getPrototypeOf(BaseController).apply(this, arguments);
    }
  }

  _inherits(BaseController, _Chaplin$Controller);

  return BaseController;
})(Chaplin.Controller);

var BaseController2 = (function (_Chaplin$Controller$Another) {
  function BaseController2() {
    if (Object.getPrototypeOf(BaseController2) !== null) {
      Object.getPrototypeOf(BaseController2).apply(this, arguments);
    }
  }

  _inherits(BaseController2, _Chaplin$Controller$Another);

  return BaseController2;
})(Chaplin.Controller.Another);