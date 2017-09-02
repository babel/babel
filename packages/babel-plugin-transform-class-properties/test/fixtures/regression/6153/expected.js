var _this = this;

(function () {
  class Foo {
    constructor() {
      var _this2 = this;

      Object.defineProperty(this, "fn", {
        configurable: true,
        enumerable: true,
        writable: true,
        value: function () {
          return console.log(_this2);
        }
      });
    }

  }

  Object.defineProperty(Foo, "fn", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: function () {
      return console.log(_this);
    }
  });
});

(function () {
  var _class, _temp;

  return _temp = _class = class Bar {
    constructor() {
      var _this3 = this;

      Object.defineProperty(this, "fn", {
        configurable: true,
        enumerable: true,
        writable: true,
        value: function () {
          return console.log(_this3);
        }
      });
    }

  }, Object.defineProperty(_class, "fn", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: function () {
      return console.log(_this);
    }
  }), _temp;
});

(function () {
  class Baz {
    constructor(force) {
      _initialiseProps.call(this);
    }

  }

  Object.defineProperty(Baz, "fn", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: function () {
      return console.log(_this);
    }
  });

  var _initialiseProps = function () {
    var _this4 = this;

    Object.defineProperty(this, "fn", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function () {
        return console.log(_this4);
      }
    });
    Object.defineProperty(this, "force", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: force
    });
  };
});

var qux = function () {
  var _this6 = this;

  class Qux {
    constructor() {
      var _this5 = this;

      Object.defineProperty(this, "fn", {
        configurable: true,
        enumerable: true,
        writable: true,
        value: function () {
          return console.log(_this5);
        }
      });
    }

  }

  Object.defineProperty(Qux, "fn", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: function () {
      return console.log(_this6);
    }
  });
}.bind(this);
