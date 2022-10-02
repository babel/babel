const obj = {
  gen() {
    return babelHelpers.skipFirstGeneratorNext(function* () {
      let _functionSent = yield;
      return _functionSent;
    })();
  }
};
