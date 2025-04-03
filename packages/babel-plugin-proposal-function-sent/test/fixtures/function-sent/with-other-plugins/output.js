let t;
const o = {
  s() {
    return babelHelpers.skipFirstGeneratorNext(function* () {
      let _functionSent = yield;
      t || (t = 'value'); // former logical assignment - ✔ Transformed
      _functionSent;
      t || (t = 'value'); // latter logical assignment - ❌ Not transformed
    })();
  }
};
