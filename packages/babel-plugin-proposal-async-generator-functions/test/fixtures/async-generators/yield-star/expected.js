let g = (() => {
  var _ref = babelHelpers.wrapAsyncGenerator(function* () {
    yield* babelHelpers.asyncGeneratorDelegate(babelHelpers.asyncIterator([1, 2, 3]), babelHelpers.awaitAsyncGenerator);
    yield* babelHelpers.asyncGeneratorDelegate(babelHelpers.asyncIterator(iterable), babelHelpers.awaitAsyncGenerator);
  });

  return function g() {
    return _ref.apply(this, arguments);
  };
})();
