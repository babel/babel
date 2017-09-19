function _skipFirstGeneratorNext(fn) { return function (...args) { const it = fn.apply(this, args); it.next(); return it; }; }

const obj = {
  gen() {
    return _skipFirstGeneratorNext(function* () {
      let _functionSent = yield;

      return _functionSent;
    })();
  }

};
