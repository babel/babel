var _fn;
function fn() {
  return (_fn = _fn || babelHelpers.wrapAsyncGenerator(function* () {
    yield* babelHelpers.asyncGeneratorDelegate(babelHelpers.asyncIterator([Promise.resolve("ok")])); // CreateAsyncFromSyncIterator
  })).apply(this, arguments);
}
