var _myAsyncMethod, _myAsyncMethod2, _class, _myAsyncMethod3;

class MyClass {
  constructor() {
    var _this = this;

    _myAsyncMethod.set(this, babelHelpers.asyncToGenerator(function* () {
      console.log(_this);
    }));
  }

}

_myAsyncMethod = new WeakMap();
_class = class MyClass2 {
  constructor() {
    var _this2 = this;

    _myAsyncMethod2.set(this, babelHelpers.asyncToGenerator(function* () {
      console.log(_this2);
    }));
  }

};
_myAsyncMethod2 = new WeakMap();
export default class MyClass3 {
  constructor() {
    var _this3 = this;

    _myAsyncMethod3.set(this, babelHelpers.asyncToGenerator(function* () {
      console.log(_this3);
    }));
  }

}
_myAsyncMethod3 = new WeakMap();
