function g() {
  return _g.apply(this, arguments);
}
function _g() {
  _g = babelHelpers.skipFirstGeneratorNext(function* () {
    let _functionSent = yield;
    class A {
      [_functionSent]() {}
    }
    var o = {
      *[_functionSent]() {}
    };
  });
  return _g.apply(this, arguments);
}
