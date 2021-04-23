var _g = /*#__PURE__*/new WeakSet();

class C {
  constructor() {
    _g.add(this);
  }

}

function _g2() {
  var _this = this;

  return babelHelpers.wrapAsyncGenerator(function* () {
    _this;
    yield babelHelpers.awaitAsyncGenerator(1);
    yield 2;
    return 3;
  })();
}
