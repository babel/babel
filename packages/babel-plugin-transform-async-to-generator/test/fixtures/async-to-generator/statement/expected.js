let foo = (() => {
  var ref = babelHelpers.asyncToGenerator(function* () {
    var wat = yield bar();
  });
  return function foo() {
    return ref.apply(this, arguments);
  };
})();
