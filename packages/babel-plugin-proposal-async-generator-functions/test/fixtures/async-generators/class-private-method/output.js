var _g = new WeakSet();

class C {
  constructor() {
    _g.add(this);
  }

}

var _g2 = function _g2() {
  var _this = this;

  return babelHelpers.wrapAsyncGenerator(function* () {
    _this;
    yield babelHelpers.awaitAsyncGenerator(1);
    yield 2;
    return 3;
  })();
};
