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

function _m() {
  _m = babelHelpers.asyncToGenerator(function* m() {
    var _this2 = this;

    function _wrapped2() {
      _wrapped2 = babelHelpers.asyncToGenerator(function* (b) {
        _this2;
      });
      return _wrapped2.apply(this, arguments);
    }

    var c = function (_x) {
      return _wrapped2.apply(this, arguments);
    };
  });
  return _m.apply(this, arguments);
}

class Class {
  m() {
    return _m.apply(this, arguments);
  }

}
