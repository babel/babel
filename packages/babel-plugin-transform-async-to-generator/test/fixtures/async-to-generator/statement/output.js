var _ref;
function foo() {
  return (_ref = _ref || babelHelpers.asyncToGenerator(function* () {
    var wat = yield bar();
  })).apply(this, arguments);
}
