function fn() {
  return babelHelpers.callAsyncGenerator(function* () {
    yield* babelHelpers.asyncGeneratorDelegate(babelHelpers.asyncIterator([Promise.resolve("ok")])); // CreateAsyncFromSyncIterator
  }, this, arguments);
}
