function _skipFirstGeneratorNext(fn) { return function () { var it = fn.apply(this, arguments); it.next(); return it; }; }

export function gen() {
  return _gen.apply(this, arguments);
}

function _gen() {
  _gen = _skipFirstGeneratorNext(function* () {
    let _functionSent = yield;

    return _functionSent;
  });
  return _gen.apply(this, arguments);
}
