(function () {
  var _class;
  class Foo {
    constructor() {
      var _this = this;
      babelHelpers.defineProperty(this, "fn", function () {
        return console.log(_this);
      });
    }
  }
  _class = Foo;
  babelHelpers.defineProperty(Foo, "fn", function () {
    return console.log(_class);
  });
});
(function () {
  var _class2;
  return _class2 = class Bar {
    constructor() {
      var _this2 = this;
      babelHelpers.defineProperty(this, "fn", function () {
        return console.log(_this2);
      });
    }
  }, babelHelpers.defineProperty(_class2, "fn", function () {
    return console.log(_class2);
  }), _class2;
});
(function () {
  var _class3;
  class Baz {
    constructor(_force) {
      var _this3 = this;
      babelHelpers.defineProperty(this, "fn", function () {
        return console.log(_this3);
      });
      babelHelpers.defineProperty(this, "force", force);
    }
  }
  _class3 = Baz;
  babelHelpers.defineProperty(Baz, "fn", function () {
    return console.log(_class3);
  });
});
var qux = function () {
  var _class4;
  class Qux {
    constructor() {
      var _this4 = this;
      babelHelpers.defineProperty(this, "fn", function () {
        return console.log(_this4);
      });
    }
  }
  _class4 = Qux;
  babelHelpers.defineProperty(Qux, "fn", function () {
    return console.log(_class4);
  });
}.bind(this);
