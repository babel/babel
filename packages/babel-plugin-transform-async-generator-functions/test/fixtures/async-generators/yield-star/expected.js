let g = (() => {
  var ref = babelHelpers.asyncGenerator.wrap(function* () {
    yield* babelHelpers.asyncGeneratorDelegate(babelHelpers.asyncIterator([1, 2, 3]), babelHelpers.asyncGenerator.await);
    yield* babelHelpers.asyncGeneratorDelegate(babelHelpers.asyncIterator(iterable), babelHelpers.asyncGenerator.await);
  });
  return function g() {
    return ref.apply(this, arguments);
  };
})();
