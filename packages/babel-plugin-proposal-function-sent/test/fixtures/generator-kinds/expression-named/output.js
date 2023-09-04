var _ref;
const foo = function gen() {
  return (_ref = _ref || babelHelpers.skipFirstGeneratorNext(function* () {
    let _functionSent = yield;
    return _functionSent;
  })).apply(this, arguments);
};
