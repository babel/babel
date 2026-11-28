const obj = {
  gen() {
    return babelHelpers.skipFirstGeneratorNext(async function* () {
      let _functionSent = yield;
      await 1;
      return _functionSent;
    })();
  }
};
class A {
  static gen() {
    return babelHelpers.skipFirstGeneratorNext(async function* () {
      let _functionSent2 = yield;
      return _functionSent2;
    })();
  }
  #gen() {
    return babelHelpers.skipFirstGeneratorNext(async function* () {
      let _functionSent3 = yield;
      return _functionSent3;
    })();
  }
}
