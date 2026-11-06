function g() {
  return _g.apply(this, arguments);
}
function _g() {
  _g = babelHelpers.skipFirstGeneratorNext(function* () {
    let _functionSent = yield;
    _functionSent;
    class A {
      [_functionSent = yield 1]() {}
      [_functionSent]() {}
    }
  });
  return _g.apply(this, arguments);
}
