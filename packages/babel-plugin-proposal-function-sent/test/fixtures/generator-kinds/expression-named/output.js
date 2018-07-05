function _skipFirstGeneratorNext(fn) { return function () { var it = fn.apply(this, arguments); it.next(); return it; }; }

function _gen() {
  _gen = _skipFirstGeneratorNext(function* gen() {
    let _functionSent = yield;

    return _functionSent;
  });
  return _gen.apply(this, arguments);
}

const foo = function gen() {
  return _gen.apply(this, arguments);
};
