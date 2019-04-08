function _skipFirstGeneratorNext(fn) { return function () { var it = fn.apply(this, arguments); it.next(); return it; }; }

let _original_gen = function* gen() {
  let _functionSent = yield;

  return _functionSent;
},
    _modified_gen = _skipFirstGeneratorNext(_original_gen);

let gen;
gen = new Proxy(_original_gen, {
  apply(target, thisArgument, argumentsList) {
    return Reflect.apply(_modified_gen, thisArgument, argumentsList);
  }

});
