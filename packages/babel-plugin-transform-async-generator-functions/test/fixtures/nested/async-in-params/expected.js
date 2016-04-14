let g = (() => {
  var ref = babelHelpers.asyncGenerator.wrap(function* (x = babelHelpers.asyncToGenerator(function* () {
    yield 1;
  })) {
    yield babelHelpers.asyncGenerator.await(2);
    yield 3;
  });
  return function g(_x) {
    return ref.apply(this, arguments);
  };
})();
