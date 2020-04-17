function _skipFirstGeneratorNext(fn) { return function () { var it = fn.apply(this, arguments); it.next(); return it; }; }

_skipFirstGeneratorNext(function* () {
  let _functionSent = yield;

  _functionSent = yield _functionSent;
})();
