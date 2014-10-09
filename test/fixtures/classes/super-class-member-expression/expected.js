var BaseController = function (Chaplin) {
  function BaseController() {
  }
  BaseController.prototype = Object.create(Chaplin.Controller.prototype, {
    constructor: {
      value: BaseController,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  return BaseController;
}(Chaplin);

var BaseController2 = function (Chaplin) {
  function BaseController2() {
  }
  BaseController2.prototype = Object.create(Chaplin.Controller.Another.prototype, {
    constructor: {
      value: BaseController2,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  return BaseController2;
}(Chaplin);
