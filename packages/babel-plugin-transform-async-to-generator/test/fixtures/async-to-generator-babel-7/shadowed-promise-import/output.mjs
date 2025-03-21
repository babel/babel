import Promise from 'somewhere';
function foo() {
  return _foo.apply(this, arguments);
}
function _foo() {
  _foo = babelHelpers.asyncToGenerator(function* () {
    yield Promise.resolve();
  });
  return _foo.apply(this, arguments);
}
