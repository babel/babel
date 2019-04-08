function _skipFirstGeneratorNext(fn) { return function () { var it = fn.apply(this, arguments); it.next(); return it; }; }

(function () {
  let _ref = function* () {
    let _functionSent = yield;

    const a = _functionSent;
    const b = _functionSent;
    _functionSent = yield 4;
    const c = _functionSent;
    const d = _functionSent = yield;
    const e = _functionSent;
    return [a, b, c, d, e];
  },
      _ref2 = _skipFirstGeneratorNext(_ref);

  return new Proxy(_ref, {
    apply(target, thisArgument, argumentsList) {
      return Reflect.apply(_ref2, thisArgument, argumentsList);
    }

  });
})()();
