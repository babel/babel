const foo = function () {
  var _gen = babelHelpers.skipFirstGeneratorNext(function* () {
    let _functionSent = yield;
    return _functionSent;
  });
  function gen() {
    return _gen.apply(this, arguments);
  }
  return gen;
}();
