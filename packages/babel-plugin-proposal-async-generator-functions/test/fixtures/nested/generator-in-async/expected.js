let f =
/*#__PURE__*/
(() => {
  var _ref2 = babelHelpers.asyncToGenerator(function* () {
    let g =
    /*#__PURE__*/
    (() => {
      var _ref = babelHelpers.wrapAsyncGenerator(function* () {
        yield babelHelpers.awaitAsyncGenerator(2);
        yield 3;
      });

      return function g() {
        return _ref.apply(this, arguments);
      };
    })();

    yield 1;
  });

  return function f() {
    return _ref2.apply(this, arguments);
  };
})();
