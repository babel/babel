function fn() {
  return (fn = babelHelpers.wrapAsyncGenerator(function* () {
    yield* babelHelpers.asyncGeneratorDelegate(babelHelpers.asyncIterator([Promise.resolve("ok")])); // CreateAsyncFromSyncIterator
  })).apply(this, arguments);
}
