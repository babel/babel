function _skipFirstGeneratorNext(fn) { return function () { var it = fn.apply(this, arguments); it.next(); return it; }; }

const foo = function () {
  var _gen = _skipFirstGeneratorNext(function* () {
    let _functionSent = yield;

    return _functionSent;
  });

  function gen() {
    return _gen.apply(this, arguments);
  }

  return gen;
}();
