let agf = (() => {
  var ref = babelHelpers.asyncGenerator.wrap(function* () {
    this;
    yield babelHelpers.asyncGenerator.await(1);
    yield 2;
    return 3;
  });
  return function agf() {
    return ref.apply(this, arguments);
  };
})();
