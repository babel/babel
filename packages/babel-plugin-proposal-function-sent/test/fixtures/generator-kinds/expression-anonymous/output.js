function _skipFirstGeneratorNext(fn) { return function () { var it = fn.apply(this, arguments); it.next(); return it; }; }

(function () {
  let _ref = function* () {
    let _functionSent = yield;

    return _functionSent;
  },
      _ref2 = _skipFirstGeneratorNext(_ref);

  return new Proxy(_ref, {
    apply(target, thisArgument, argumentsList) {
      return Reflect.apply(_ref2, thisArgument, argumentsList);
    }

  });
})()();
