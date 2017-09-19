function _skipFirstGeneratorNext(fn) { return function (...args) { const it = fn.apply(this, args); it.next(); return it; }; }

class Foo {
  gen() {
    return _skipFirstGeneratorNext(function* () {
      let _functionSent = yield;

      return _functionSent;
    })();
  }

}
