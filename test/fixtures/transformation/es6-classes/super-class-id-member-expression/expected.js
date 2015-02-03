"use strict";

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var BaseController = (function (_Chaplin$Controller) {
  function BaseController() {
    _classCallCheck(this, BaseController);

    if (Object.getPrototypeOf(BaseController) !== null) {
      Object.getPrototypeOf(BaseController).apply(instance, arguments);
    }
  }

  _inherits(BaseController, _Chaplin$Controller);

  return BaseController;
})(Chaplin.Controller);

var BaseController2 = (function (_Chaplin$Controller$Another) {
  function BaseController2() {
    _classCallCheck(this, BaseController2);

    if (Object.getPrototypeOf(BaseController2) !== null) {
      Object.getPrototypeOf(BaseController2).apply(instance, arguments);
    }
  }

  _inherits(BaseController2, _Chaplin$Controller$Another);

  return BaseController2;
})(Chaplin.Controller.Another);