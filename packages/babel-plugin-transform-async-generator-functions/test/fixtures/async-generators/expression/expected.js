(() => {
  var ref = babelHelpers.asyncGenerator.wrap(function* () {
    this;
    yield babelHelpers.asyncGenerator.await(1);
    yield 2;
    return 3;
  });

  function agf() {
    return ref.apply(this, arguments);
  }

  return agf;
})();
