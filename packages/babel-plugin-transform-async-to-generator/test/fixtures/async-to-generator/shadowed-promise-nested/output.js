var _ref;
let Promise;
function foo() {
  return (_ref = _ref || babelHelpers.asyncToGenerator(function* () {
    var _ref2;
    let Promise;
    yield bar();
    function bar() {
      return (_ref2 = _ref2 || babelHelpers.asyncToGenerator(function* () {
        return Promise.resolve();
      })).apply(this, arguments);
    }
  })).apply(this, arguments);
}
