let g = (() => {
  var _ref = babelHelpers.asyncGenerator.wrap(function* () {
    yield* babelHelpers.asyncGeneratorDelegate(babelHelpers.asyncIterator([1, 2, 3]), babelHelpers.asyncGenerator.await);
    yield* babelHelpers.asyncGeneratorDelegate(babelHelpers.asyncIterator(iterable), babelHelpers.asyncGenerator.await);
  });

  return function g() {
    return _ref.apply(this, arguments);
  };
})();
