var BaseController = function (Chaplin) {
  function BaseController() {
    Chaplin.Controller.apply(this, arguments);
  }
  BaseController.prototype = Object.create(Chaplin.Controller.prototype, {
    constructor: {
      value: BaseController,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  BaseController.__proto__ = Chaplin.Controller;
  return BaseController;
}(Chaplin);

var BaseController2 = function (Chaplin) {
  function BaseController2() {
    Chaplin.Controller.Another.apply(this, arguments);
  }
  BaseController2.prototype = Object.create(Chaplin.Controller.Another.prototype, {
    constructor: {
      value: BaseController2,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  BaseController2.__proto__ = Chaplin.Controller.Another;
  return BaseController2;
}(Chaplin);
