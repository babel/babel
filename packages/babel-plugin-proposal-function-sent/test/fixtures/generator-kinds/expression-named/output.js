var _gen;
const foo = function gen() {
  return (_gen = _gen || babelHelpers.skipFirstGeneratorNext(function* () {
    let _functionSent = yield;
    return _functionSent;
  })).apply(this, arguments);
};
