function _g() {
  _g = babelHelpers.wrapAsyncGenerator(function* g() {
    yield* babelHelpers.asyncGeneratorDelegate(babelHelpers.asyncIterator([1, 2, 3]), babelHelpers.awaitAsyncGenerator);
    yield* babelHelpers.asyncGeneratorDelegate(babelHelpers.asyncIterator(iterable), babelHelpers.awaitAsyncGenerator);
  });
  return _g.apply(this, arguments);
}

function g() {
  return _g.apply(this, arguments);
}
