let Promise;
function foo() {
  return _foo.apply(this, arguments);
}
function _foo() {
  _foo = babelHelpers.asyncToGenerator(function* () {
    let Promise;
    yield bar();
    function bar() {
      return _bar.apply(this, arguments);
    }
    function _bar() {
      _bar = babelHelpers.asyncToGenerator(function* () {
        return Promise.resolve();
      });
      return _bar.apply(this, arguments);
    }
  });
  return _foo.apply(this, arguments);
}
