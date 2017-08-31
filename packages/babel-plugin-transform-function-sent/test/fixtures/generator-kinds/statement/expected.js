let gen = (() => {
  var _ref = _skipFirstGeneratorNext(function* () {
    let _functionSent = yield;

    return _functionSent;
  });

  return function gen() {
    return _ref.apply(this, arguments);
  };
})();

function _skipFirstGeneratorNext(fn) { return function () { var it = fn.apply(this, arguments); it.next(); return it; }; }
