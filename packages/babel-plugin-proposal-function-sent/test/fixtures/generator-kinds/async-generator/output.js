function foo() {
  return _foo.apply(this, arguments);
}
function _foo() {
  _foo = babelHelpers.wrapAsyncGenerator(babelHelpers.skipFirstGeneratorNext(function* () {
    let _functionSent = yield;
    _functionSent = yield babelHelpers.awaitAsyncGenerator(_functionSent);
  }));
  return _foo.apply(this, arguments);
}
