function a() {
  return _a.apply(this, arguments);
}
function _a() {
  _a = babelHelpers.wrapAsyncGenerator(function* () {
    var _loop = babelHelpers.wrapAsyncGenerator(function* (i) {
      var fn = () => i;
      try {
        yield fn();
      } finally {
        yield babelHelpers.awaitAsyncGenerator(null);
      }
    });
    for (var i = 0; i < 3; i++) {
      yield* babelHelpers.asyncGeneratorDelegate(_loop(i));
    }
  });
  return _a.apply(this, arguments);
}
class C {
  m() {
    var _this = this;
    return babelHelpers.wrapAsyncGenerator(function* () {
      var _loop2 = babelHelpers.wrapAsyncGenerator(function* (i) {
        var fn = () => _this.x + i;
        yield fn();
      });
      for (var i = 0; i < 2; i++) {
        yield* babelHelpers.asyncGeneratorDelegate(_loop2(i));
      }
    })();
  }
}
function nested() {
  return _nested.apply(this, arguments);
}
function _nested() {
  _nested = babelHelpers.wrapAsyncGenerator(function* () {
    var _loop3 = babelHelpers.wrapAsyncGenerator(function* (i) {
      var getI = () => i;
      var _loop5 = babelHelpers.wrapAsyncGenerator(function* (j) {
        var getJ = () => getI() + j;
        yield getJ();
      });
      for (var j = 0; j < 2; j++) {
        yield* babelHelpers.asyncGeneratorDelegate(_loop5(j));
      }
    });
    for (var i = 0; i < 2; i++) {
      yield* babelHelpers.asyncGeneratorDelegate(_loop3(i));
    }
    function* syncInner() {
      var _loop4 = function* (k) {
        var getK = () => k;
        yield getK();
      };
      for (var k = 0; k < 2; k++) {
        yield* _loop4(k);
      }
    }
    return syncInner;
  });
  return _nested.apply(this, arguments);
}
