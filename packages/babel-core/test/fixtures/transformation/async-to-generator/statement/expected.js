let foo = function foo() {
  return babelHelpers.asyncToGenerator(function* foo() {
    var wat = yield bar();
  })();
};
