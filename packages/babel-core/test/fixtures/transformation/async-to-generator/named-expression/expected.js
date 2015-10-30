var foo = function () {
  return babelHelpers.asyncToGenerator(function* bar() {
    console.log(bar);
  })();
};

foo();
