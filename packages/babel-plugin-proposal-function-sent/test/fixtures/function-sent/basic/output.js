function gen() {
  return (gen = babelHelpers.skipFirstGeneratorNext(function* () {
    let _functionSent = yield;
    let sent = _functionSent;
  })).apply(this, arguments);
}
