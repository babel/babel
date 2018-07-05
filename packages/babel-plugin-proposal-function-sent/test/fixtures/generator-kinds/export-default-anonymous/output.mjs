function _skipFirstGeneratorNext(fn) { return function () { var it = fn.apply(this, arguments); it.next(); return it; }; }

function _wrapped() {
  _wrapped = _skipFirstGeneratorNext(function* () {
    let _functionSent = yield;

    return _functionSent;
  });
  return _wrapped.apply(this, arguments);
}

export default function () {
  return _wrapped.apply(this, arguments);
}
