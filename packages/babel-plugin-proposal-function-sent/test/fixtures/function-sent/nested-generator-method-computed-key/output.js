function g() {
  return _g.apply(this, arguments);
}
function _g() {
  _g = babelHelpers.skipFirstGeneratorNext(function* () {
    let _functionSent = yield;
    var o = {
      [_functionSent = yield _functionSent]() {
        return babelHelpers.skipFirstGeneratorNext(function* () {
          let _functionSent2 = yield;
          _functionSent2 = yield _functionSent2;
        })();
      }
    };
  });
  return _g.apply(this, arguments);
}
