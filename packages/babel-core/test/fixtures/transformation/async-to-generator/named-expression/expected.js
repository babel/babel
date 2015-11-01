var foo = (function () {
  var ref = babelHelpers.asyncToGenerator(function* bar() {
    console.log(bar);
  });
  return function foo() {
    return ref.apply(this, arguments);
  };
})();
