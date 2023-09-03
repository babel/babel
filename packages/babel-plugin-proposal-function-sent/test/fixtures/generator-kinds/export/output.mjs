export function gen() {
  return (gen = babelHelpers.skipFirstGeneratorNext(function* () {
    let _functionSent = yield;
    return _functionSent;
  })).apply(this, arguments);
}
