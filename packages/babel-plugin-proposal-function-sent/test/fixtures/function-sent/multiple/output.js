function _skipFirstGeneratorNext(fn) { return function () { var it = fn.apply(this, arguments); it.next(); return it; }; }

function _wrapped() {
  _wrapped = _skipFirstGeneratorNext(function* () {
    let _functionSent = yield;

    const a = _functionSent;
    const b = _functionSent;
    _functionSent = yield 4;
    const c = _functionSent;
    const d = _functionSent = yield;
    const e = _functionSent;
    return [a, b, c, d, e];
  });
  return _wrapped.apply(this, arguments);
}

(function () {
  return _wrapped.apply(this, arguments);
})();
