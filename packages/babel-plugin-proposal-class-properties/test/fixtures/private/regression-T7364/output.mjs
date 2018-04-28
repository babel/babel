var _class;

class MyClass {
  constructor() {
    var _this = this;

    _myAsyncMethod.set(this,
    /*#__PURE__*/
    babelHelpers.asyncToGenerator(function* () {
      console.log(_this);
    }));
  }

}

var _myAsyncMethod = new WeakMap();

_class = class MyClass2 {
  constructor() {
    var _this2 = this;

    _myAsyncMethod2.set(this,
    /*#__PURE__*/
    babelHelpers.asyncToGenerator(function* () {
      console.log(_this2);
    }));
  }

};

var _myAsyncMethod2 = new WeakMap();

export default class MyClass3 {
  constructor() {
    var _this3 = this;

    _myAsyncMethod3.set(this,
    /*#__PURE__*/
    babelHelpers.asyncToGenerator(function* () {
      console.log(_this3);
    }));
  }

}

var _myAsyncMethod3 = new WeakMap();
