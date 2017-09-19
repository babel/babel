function _skipFirstGeneratorNext(fn) { return function (...args) { const it = fn.apply(this, args); it.next(); return it; }; }

export default _skipFirstGeneratorNext(function* () {
  let _functionSent = yield;

  return _functionSent;
});
