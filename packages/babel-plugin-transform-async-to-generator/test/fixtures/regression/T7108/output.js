function _wrapped() {
  _wrapped = babelHelpers.asyncToGenerator(function* () {
    var _this = this;

    console.log(this);

    function _wrapped5() {
      _wrapped5 = babelHelpers.asyncToGenerator(function* () {
        console.log(_this);
      });
      return _wrapped5.apply(this, arguments);
    }

    setTimeout(function () {
      return _wrapped5.apply(this, arguments);
    });
  });
  return _wrapped.apply(this, arguments);
}

function _wrapped2() {
  _wrapped2 = babelHelpers.asyncToGenerator(function* () {
    var _this2 = this;

    console.log(this);

    function _wrapped6() {
      _wrapped6 = babelHelpers.asyncToGenerator(function* (arg) {
        console.log(_this2);
      });
      return _wrapped6.apply(this, arguments);
    }

    setTimeout(function (_x) {
      return _wrapped6.apply(this, arguments);
    });
  });
  return _wrapped2.apply(this, arguments);
}

function _wrapped3() {
  _wrapped3 = babelHelpers.asyncToGenerator(function* () {
    var _this3 = this;

    console.log(this);

    function _wrapped7() {
      _wrapped7 = babelHelpers.asyncToGenerator(function* () {
        console.log(_this3);
      });
      return _wrapped7.apply(this, arguments);
    }

    setTimeout(function () {
      return _wrapped7.apply(this, arguments);
    });
  });
  return _wrapped3.apply(this, arguments);
}

function _wrapped4() {
  _wrapped4 = babelHelpers.asyncToGenerator(function* () {
    var _this4 = this;

    console.log(this);

    function _wrapped8() {
      _wrapped8 = babelHelpers.asyncToGenerator(function* (arg) {
        console.log(_this4);
      });
      return _wrapped8.apply(this, arguments);
    }

    setTimeout(function (_x2) {
      return _wrapped8.apply(this, arguments);
    });
  });
  return _wrapped4.apply(this, arguments);
}

class Test {
  static method1() {
    return _wrapped.apply(this, arguments);
  }

  static method2() {
    return _wrapped2.apply(this, arguments);
  }

  method1() {
    return _wrapped3.apply(this, arguments);
  }

  method2() {
    return _wrapped4.apply(this, arguments);
  }

}
