function _skipFirstGeneratorNext(fn) { return function (...args) { const it = fn.apply(this, args); it.next(); return it; }; }

_skipFirstGeneratorNext(function* () {
  let _functionSent = yield;

  _functionSent = yield _functionSent;
})();
