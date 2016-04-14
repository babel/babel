let g = (() => {
  var ref = babelHelpers.asyncGenerator.wrap(function* () {
    var _this = this;

    (function () {
      return _this;
    });
    function f() {
      () => this;
    }
    babelHelpers.asyncToGenerator(function* () {
      _this;
      yield 1;
    });
    yield babelHelpers.asyncGenerator.await(1);
  });
  return function g() {
    return ref.apply(this, arguments);
  };
})();
