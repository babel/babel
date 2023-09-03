function fn() {
  return (fn = babelHelpers.wrapAsyncGenerator(function* () {
    yield* babelHelpers.asyncGeneratorDelegate(babelHelpers.asyncIterator([Promise.resolve("ok")]), babelHelpers.awaitAsyncGenerator); // CreateAsyncFromSyncIterator
  })).apply(this, arguments);
}
