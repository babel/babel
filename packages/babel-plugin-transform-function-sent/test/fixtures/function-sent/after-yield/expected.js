function _skipFirstGeneratorNext(fn) { return function () { var it = fn.apply(this, arguments); it.next(); return it; }; }

_skipFirstGeneratorNext(function* () {
  const _functionSent = yield;

  const a = yield;
  const b = _functionSent;
  return [a, b];
})();