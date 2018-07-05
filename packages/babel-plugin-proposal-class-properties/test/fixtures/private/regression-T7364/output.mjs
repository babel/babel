var _class;

class MyClass {
  constructor() {
    var _this = this;

    function _wrapped() {
      _wrapped = babelHelpers.asyncToGenerator(function* () {
        console.log(_this);
      });
      return _wrapped.apply(this, arguments);
    }

    _myAsyncMethod.set(this, function () {
      return _wrapped.apply(this, arguments);
    });
  }

}

var _myAsyncMethod = new WeakMap();

_class = class MyClass2 {
  constructor() {
    var _this2 = this;

    function _wrapped2() {
      _wrapped2 = babelHelpers.asyncToGenerator(function* () {
        console.log(_this2);
      });
      return _wrapped2.apply(this, arguments);
    }

    _myAsyncMethod2.set(this, function () {
      return _wrapped2.apply(this, arguments);
    });
  }

};

var _myAsyncMethod2 = new WeakMap();

export default class MyClass3 {
  constructor() {
    var _this3 = this;

    function _wrapped3() {
      _wrapped3 = babelHelpers.asyncToGenerator(function* () {
        console.log(_this3);
      });
      return _wrapped3.apply(this, arguments);
    }

    _myAsyncMethod3.set(this, function () {
      return _wrapped3.apply(this, arguments);
    });
  }

}

var _myAsyncMethod3 = new WeakMap();
