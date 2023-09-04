var _g;
function g() {
  return (_g = _g || babelHelpers.wrapAsyncGenerator(function* () {
    yield* babelHelpers.asyncGeneratorDelegate(babelHelpers.asyncIterator([1, 2, 3]), babelHelpers.awaitAsyncGenerator);
    yield* babelHelpers.asyncGeneratorDelegate(babelHelpers.asyncIterator(iterable), babelHelpers.awaitAsyncGenerator);
  })).apply(this, arguments);
}
