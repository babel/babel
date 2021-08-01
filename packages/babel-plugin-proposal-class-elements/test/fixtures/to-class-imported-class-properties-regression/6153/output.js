(function () {
  class Foo {
    constructor() {
      var _this = this;

      babelHelpers.defineProperty(this, "fn", function () {
        return console.log(_this);
      });
    }

  }

  babelHelpers.defineProperty(Foo, "fn", function () {
    return console.log(Foo);
  });
});

(function () {
  var _Bar;

  return _Bar = class Bar {
    constructor() {
      var _this2 = this;

      babelHelpers.defineProperty(this, "fn", function () {
        return console.log(_this2);
      });
    }

  }, babelHelpers.defineProperty(_Bar, "fn", function () {
    return console.log(_Bar);
  }), _Bar;
});

(function () {
  class Baz {
    constructor(_force) {
      var _this3 = this;

      babelHelpers.defineProperty(this, "fn", function () {
        return console.log(_this3);
      });
      babelHelpers.defineProperty(this, "force", force);
    }

  }

  babelHelpers.defineProperty(Baz, "fn", function () {
    return console.log(Baz);
  });
});

var qux = function () {
  class Qux {
    constructor() {
      var _this4 = this;

      babelHelpers.defineProperty(this, "fn", function () {
        return console.log(_this4);
      });
    }

  }

  babelHelpers.defineProperty(Qux, "fn", function () {
    return console.log(Qux);
  });
}.bind(this);
