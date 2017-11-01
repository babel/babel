class MyClass {
  constructor() {
    var _this = this;

    babelHelpers.defineProperty(this, "myAsyncMethod",
    /*#__PURE__*/
    babelHelpers.asyncToGenerator(function* () {
      console.log(_this);
    }));
  }

}

(class MyClass2 {
  constructor() {
    var _this2 = this;

    babelHelpers.defineProperty(this, "myAsyncMethod",
    /*#__PURE__*/
    babelHelpers.asyncToGenerator(function* () {
      console.log(_this2);
    }));
  }

});

export default class MyClass3 {
  constructor() {
    var _this3 = this;

    babelHelpers.defineProperty(this, "myAsyncMethod",
    /*#__PURE__*/
    babelHelpers.asyncToGenerator(function* () {
      console.log(_this3);
    }));
  }

}
