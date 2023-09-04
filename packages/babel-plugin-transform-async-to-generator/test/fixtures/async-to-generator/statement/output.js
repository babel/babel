var _foo;
function foo() {
  return (_foo = _foo || babelHelpers.asyncToGenerator(function* () {
    var wat = yield bar();
  })).apply(this, arguments);
}
