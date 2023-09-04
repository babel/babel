var _ref;
function foo() {
  return (_ref = _ref || babelHelpers.wrapAsyncGenerator(babelHelpers.skipFirstGeneratorNext(function* () {
    let _functionSent = yield;
    _functionSent = yield babelHelpers.awaitAsyncGenerator(_functionSent);
  }))).apply(this, arguments);
}
