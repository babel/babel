function _skipFirstGeneratorNext(fn) { return function () { var it = fn.apply(this, arguments); it.next(); return it; }; }

export default function () {
  return _ref.apply(this, arguments);
}

function _ref() {
  _ref = _skipFirstGeneratorNext(function* () {
    let _functionSent = yield;

    return _functionSent;
  });
  return _ref.apply(this, arguments);
}
