(function () {
  var _Foo;
  class Foo {
    constructor() {
      var _this = this;
      babelHelpers.defineProperty(this, "fn", function () {
        return console.log(_this);
      });
    }
  }
  _Foo = Foo;
  babelHelpers.defineProperty(Foo, "fn", function () {
    return console.log(_Foo);
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
  var _Baz;
  class Baz {
    constructor(_force) {
      var _this3 = this;
      babelHelpers.defineProperty(this, "fn", function () {
        return console.log(_this3);
      });
      babelHelpers.defineProperty(this, "force", force);
    }
  }
  _Baz = Baz;
  babelHelpers.defineProperty(Baz, "fn", function () {
    return console.log(_Baz);
  });
});
var qux = function () {
  var _Qux;
  class Qux {
    constructor() {
      var _this4 = this;
      babelHelpers.defineProperty(this, "fn", function () {
        return console.log(_this4);
      });
    }
  }
  _Qux = Qux;
  babelHelpers.defineProperty(Qux, "fn", function () {
    return console.log(_Qux);
  });
}.bind(this);
