function _skipFirstGeneratorNext(fn) { return function (...args) { const it = fn.apply(this, args); it.next(); return it; }; }

const foo = (() => {
  var _ref = _skipFirstGeneratorNext(function* () {
    let _functionSent = yield;

    return _functionSent;
  });

  function gen() {
    return _ref.apply(this, arguments);
  }

  return gen;
})();
