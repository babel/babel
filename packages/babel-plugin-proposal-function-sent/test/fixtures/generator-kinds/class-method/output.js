function _skipFirstGeneratorNext(fn) { return function () { var it = fn.apply(this, arguments); it.next(); return it; }; }

class Foo {
  gen() {
    return _skipFirstGeneratorNext(function* () {
      let _functionSent = yield;

      return _functionSent;
    })();
  }

}
