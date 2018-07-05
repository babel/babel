function _method() {
  _method = babelHelpers.asyncToGenerator(function* method1() {
    var _this = this;

    console.log(this);

    function _wrapped() {
      _wrapped = babelHelpers.asyncToGenerator(function* () {
        console.log(_this);
      });
      return _wrapped.apply(this, arguments);
    }

    setTimeout(function () {
      return _wrapped.apply(this, arguments);
    });
  });
  return _method.apply(this, arguments);
}

function _method2() {
  _method2 = babelHelpers.asyncToGenerator(function* method2() {
    var _this2 = this;

    console.log(this);

    function _wrapped2() {
      _wrapped2 = babelHelpers.asyncToGenerator(function* (arg) {
        console.log(_this2);
      });
      return _wrapped2.apply(this, arguments);
    }

    setTimeout(function (_x) {
      return _wrapped2.apply(this, arguments);
    });
  });
  return _method2.apply(this, arguments);
}

function _method3() {
  _method3 = babelHelpers.asyncToGenerator(function* method1() {
    var _this3 = this;

    console.log(this);

    function _wrapped3() {
      _wrapped3 = babelHelpers.asyncToGenerator(function* () {
        console.log(_this3);
      });
      return _wrapped3.apply(this, arguments);
    }

    setTimeout(function () {
      return _wrapped3.apply(this, arguments);
    });
  });
  return _method3.apply(this, arguments);
}

function _method4() {
  _method4 = babelHelpers.asyncToGenerator(function* method2() {
    var _this4 = this;

    console.log(this);

    function _wrapped4() {
      _wrapped4 = babelHelpers.asyncToGenerator(function* (arg) {
        console.log(_this4);
      });
      return _wrapped4.apply(this, arguments);
    }

    setTimeout(function (_x2) {
      return _wrapped4.apply(this, arguments);
    });
  });
  return _method4.apply(this, arguments);
}

class Test {
  static method1() {
    return _method.apply(this, arguments);
  }

  static method2() {
    return _method2.apply(this, arguments);
  }

  method1() {
    return _method3.apply(this, arguments);
  }

  method2() {
    return _method4.apply(this, arguments);
  }

}
