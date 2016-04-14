let f = (() => {
  var ref = babelHelpers.asyncToGenerator(function* () {
    let g = (() => {
      var ref = babelHelpers.asyncGenerator.wrap(function* () {
        yield babelHelpers.asyncGenerator.await(2);
        yield 3;
      });
      return function g() {
        return ref.apply(this, arguments);
      };
    })();

    yield 1;
  });
  return function f() {
    return ref.apply(this, arguments);
  };
})();
