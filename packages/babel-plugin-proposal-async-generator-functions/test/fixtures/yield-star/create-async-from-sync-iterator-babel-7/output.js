function fn() {
  return _fn.apply(this, arguments);
}
function _fn() {
  _fn = babelHelpers.wrapAsyncGenerator(function* () {
    yield* babelHelpers.asyncGeneratorDelegate(babelHelpers.asyncIterator([Promise.resolve("ok")]), babelHelpers.awaitAsyncGenerator); // CreateAsyncFromSyncIterator
  });
  return _fn.apply(this, arguments);
}
