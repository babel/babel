function _skipFirstGeneratorNext(fn) { return function (...args) { const it = fn.apply(this, args); it.next(); return it; }; }

_skipFirstGeneratorNext(function* () {
  let _functionSent = yield;

  const a = _functionSent;
  const b = _functionSent;
  _functionSent = yield 4;
  const c = _functionSent;
  const d = _functionSent = yield;
  const e = _functionSent;
  return [a, b, c, d, e];
})();
