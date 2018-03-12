class MyClass {
  constructor() {
    var _this = this;

    Object.defineProperty(this, "myAsyncMethod", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function () {
        var _ref = babelHelpers.asyncToGenerator(function* () {
          console.log(_this);
        });

        return function value() {
          return _ref.apply(this, arguments);
        };
      }()
    });
  }

}

(class MyClass2 {
  constructor() {
    var _this2 = this;

    Object.defineProperty(this, "myAsyncMethod", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function () {
        var _ref2 = babelHelpers.asyncToGenerator(function* () {
          console.log(_this2);
        });

        return function value() {
          return _ref2.apply(this, arguments);
        };
      }()
    });
  }

});

export default class MyClass3 {
  constructor() {
    var _this3 = this;

    Object.defineProperty(this, "myAsyncMethod", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function () {
        var _ref3 = babelHelpers.asyncToGenerator(function* () {
          console.log(_this3);
        });

        return function value() {
          return _ref3.apply(this, arguments);
        };
      }()
    });
  }

}
