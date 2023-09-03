function g() {
  return (g = babelHelpers.wrapAsyncGenerator(function* () {
    yield* babelHelpers.asyncGeneratorDelegate(babelHelpers.asyncIterator([1, 2, 3]));
    yield* babelHelpers.asyncGeneratorDelegate(babelHelpers.asyncIterator(iterable));
  })).apply(this, arguments);
}
