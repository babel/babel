var foo = (function () {
  var ref = babelHelpers.asyncToGenerator(function* () {
    console.log(bar);
  });
  return function bar() {
    return ref.apply(this, arguments);
  };
})();
