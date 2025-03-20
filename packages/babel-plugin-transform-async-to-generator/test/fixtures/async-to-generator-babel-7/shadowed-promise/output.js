let Promise;
function foo() {
  return _foo.apply(this, arguments);
}
function _foo() {
  _foo = babelHelpers.asyncToGenerator(function* () {
    yield new Promise(resolve => {
      resolve();
    });
  });
  return _foo.apply(this, arguments);
}
