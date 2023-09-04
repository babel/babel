class Test {
  static method1() {
    var _this = this;
    return babelHelpers.asyncToGenerator(function* () {
      console.log(_this);
      setTimeout( /*#__PURE__*/babelHelpers.asyncToGenerator(function* () {
        console.log(_this);
      }));
    })();
  }
  static method2() {
    var _this2 = this;
    return babelHelpers.asyncToGenerator(function* () {
      var _ref2;
      console.log(_this2);
      setTimeout(function (_x) {
        return (_ref2 = _ref2 || babelHelpers.asyncToGenerator(function* (arg) {
          console.log(_this2);
        })).apply(this, arguments);
      });
    })();
  }
  method1() {
    var _this3 = this;
    return babelHelpers.asyncToGenerator(function* () {
      console.log(_this3);
      setTimeout( /*#__PURE__*/babelHelpers.asyncToGenerator(function* () {
        console.log(_this3);
      }));
    })();
  }
  method2() {
    var _this4 = this;
    return babelHelpers.asyncToGenerator(function* () {
      var _ref4;
      console.log(_this4);
      setTimeout(function (_x2) {
        return (_ref4 = _ref4 || babelHelpers.asyncToGenerator(function* (arg) {
          console.log(_this4);
        })).apply(this, arguments);
      });
    })();
  }
}
