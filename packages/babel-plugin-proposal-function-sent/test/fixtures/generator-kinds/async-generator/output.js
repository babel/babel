function foo() {
  return babelHelpers.newAsyncGenerator(babelHelpers.skipFirstGeneratorNext(function* () {
    let _functionSent = yield;
    _functionSent = yield babelHelpers.awaitAsyncGenerator(_functionSent);
  }), this, arguments);
}
