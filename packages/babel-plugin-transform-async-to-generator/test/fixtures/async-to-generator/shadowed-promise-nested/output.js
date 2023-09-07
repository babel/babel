var _foo;
let Promise;
function foo() {
  return (_foo = _foo || babelHelpers.asyncToGenerator(function* () {
    var _bar;
    let Promise;
    yield bar();
    function bar() {
      return (_bar = _bar || babelHelpers.asyncToGenerator(function* () {
        return Promise.resolve();
      })).apply(this, arguments);
    }
  })).apply(this, arguments);
}
