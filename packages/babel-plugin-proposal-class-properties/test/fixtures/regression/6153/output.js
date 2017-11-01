var _this = this;

(function () {
  class Foo {
    constructor() {
      var _this2 = this;

      babelHelpers.defineProperty(this, "fn", function () {
        return console.log(_this2);
      });
    }

  }

  babelHelpers.defineProperty(Foo, "fn", function () {
    return console.log(_this);
  });
});

(function () {
  var _class, _temp;

  return _temp = _class = class Bar {
    constructor() {
      var _this3 = this;

      babelHelpers.defineProperty(this, "fn", function () {
        return console.log(_this3);
      });
    }

  }, babelHelpers.defineProperty(_class, "fn", function () {
    return console.log(_this);
  }), _temp;
});

(function () {
  class Baz {
    constructor(_force) {
      var _this4 = this;

      babelHelpers.defineProperty(babelHelpers.defineProperty(this, "fn", function () {
        return console.log(_this4);
      }), "force", force);
    }

  }

  babelHelpers.defineProperty(Baz, "fn", function () {
    return console.log(_this);
  });
});

var qux = function () {
  var _this6 = this;

  class Qux {
    constructor() {
      var _this5 = this;

      babelHelpers.defineProperty(this, "fn", function () {
        return console.log(_this5);
      });
    }

  }

  babelHelpers.defineProperty(Qux, "fn", function () {
    return console.log(_this6);
  });
}.bind(this);
