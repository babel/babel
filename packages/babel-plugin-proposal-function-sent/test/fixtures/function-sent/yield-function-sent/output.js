babelHelpers.skipFirstGeneratorNext(function* () {
  let _functionSent = yield;
  _functionSent = yield _functionSent;
})();
