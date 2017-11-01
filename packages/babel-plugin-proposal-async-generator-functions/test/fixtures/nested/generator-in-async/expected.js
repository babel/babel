let f = (() => {
  var _ref = babelHelpers.asyncToGenerator(function* () {
    let g = (() => {
      var _ref2 = babelHelpers.wrapAsyncGenerator(function* () {
        yield babelHelpers.awaitAsyncGenerator(2);
        yield 3;
      });

      return function g() {
        return _ref2.apply(this, arguments);
      };
    })();

    yield 1;
  });

  return function f() {
    return _ref.apply(this, arguments);
  };
})();
