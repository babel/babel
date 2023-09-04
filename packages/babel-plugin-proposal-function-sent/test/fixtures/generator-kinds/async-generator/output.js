var _foo;
function foo() {
  return (_foo = _foo || babelHelpers.wrapAsyncGenerator(babelHelpers.skipFirstGeneratorNext(function* () {
    let _functionSent = yield;
    _functionSent = yield babelHelpers.awaitAsyncGenerator(_functionSent);
  }))).apply(this, arguments);
}
