function _wrapped() {
  _wrapped = babelHelpers.asyncToGenerator(function* () {
    var _this = this;

    c(function () {
      return _this;
    });
  });
  return _wrapped.apply(this, arguments);
}

function f() {
  g(function () {
    return _wrapped.apply(this, arguments);
  });
}

function _wrapped2() {
  _wrapped2 = babelHelpers.asyncToGenerator(function* () {
    var _this2 = this;

    console.log('async wrapper:', this === 'foo');

    (function () {
      console.log('nested arrow:', _this2 === 'foo');
    })();
  });
  return _wrapped2.apply(this, arguments);
}

(function () {
  return _wrapped2.apply(this, arguments);
}).call('foo');
