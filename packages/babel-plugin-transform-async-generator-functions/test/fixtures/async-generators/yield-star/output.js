function g() {
  return _g.apply(this, arguments);
}
function _g() {
  _g = babelHelpers.wrapAsyncGenerator(function* () {
    yield* babelHelpers.asyncGeneratorDelegate(babelHelpers.asyncIterator([1, 2, 3]));
    yield* babelHelpers.asyncGeneratorDelegate(babelHelpers.asyncIterator(iterable));
  });
  return _g.apply(this, arguments);
}
