class MyClass {
  constructor() {
    var _this = this;

    function _wrapped() {
      _wrapped = babelHelpers.asyncToGenerator(function* () {
        console.log(_this);
      });
      return _wrapped.apply(this, arguments);
    }

    babelHelpers.defineProperty(this, "myAsyncMethod", function () {
      return _wrapped.apply(this, arguments);
    });
  }

}

(class MyClass2 {
  constructor() {
    var _this2 = this;

    function _wrapped2() {
      _wrapped2 = babelHelpers.asyncToGenerator(function* () {
        console.log(_this2);
      });
      return _wrapped2.apply(this, arguments);
    }

    babelHelpers.defineProperty(this, "myAsyncMethod", function () {
      return _wrapped2.apply(this, arguments);
    });
  }

});

export default class MyClass3 {
  constructor() {
    var _this3 = this;

    function _wrapped3() {
      _wrapped3 = babelHelpers.asyncToGenerator(function* () {
        console.log(_this3);
      });
      return _wrapped3.apply(this, arguments);
    }

    babelHelpers.defineProperty(this, "myAsyncMethod", function () {
      return _wrapped3.apply(this, arguments);
    });
  }

}
