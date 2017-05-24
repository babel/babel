var foo = (() => {
  var _ref = babelHelpers.asyncToGenerator(function* () {
    console.log(bar);
  });

  function bar() {
    return _ref.apply(this, arguments);
  }

  return bar;
})();
