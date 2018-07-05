function f() {
  var _this = this;

  function _wrapped() {
    _wrapped = babelHelpers.asyncToGenerator(function* () {
      _this;
    });
    return _wrapped.apply(this, arguments);
  }

  let g = function () {
    return _wrapped.apply(this, arguments);
  };
}

function _wrapped2() {
  _wrapped2 = babelHelpers.asyncToGenerator(function* () {
    var _this2 = this;

    function _wrapped3() {
      _wrapped3 = babelHelpers.asyncToGenerator(function* (b) {
        _this2;
      });
      return _wrapped3.apply(this, arguments);
    }

    var c = function (_x) {
      return _wrapped3.apply(this, arguments);
    };
  });
  return _wrapped2.apply(this, arguments);
}

class Class {
  m() {
    return _wrapped2.apply(this, arguments);
  }

}
