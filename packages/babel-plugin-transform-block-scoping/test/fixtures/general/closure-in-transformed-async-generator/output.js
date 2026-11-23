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
function withoutFinally() {
  return _withoutFinally.apply(this, arguments);
}
function _withoutFinally() {
  _withoutFinally = babelHelpers.wrapAsyncGenerator(function* () {
    var _loop2 = function* (i) {
      var fn = () => i;
      yield fn();
    };
    for (var i = 0; i < 3; i++) {
      yield* _loop2(i);
    }
    var _loop3 = function* (_i) {
      var fn = () => _i;
      try {
        yield fn();
      } catch (e) {
        yield e;
      }
    };
    for (var _i = 0; _i < 3; _i++) {
      yield* _loop3(_i);
    }
    var _loop4 = function* (_i2) {
      var fn = () => {
        try {
          return _i2;
        } finally {
          sideEffect();
        }
      };
      yield fn();
    };
    for (var _i2 = 0; _i2 < 3; _i2++) {
      yield* _loop4(_i2);
    }
  });
  return _withoutFinally.apply(this, arguments);
}
class C {
  m() {
    var _this = this;
    return babelHelpers.wrapAsyncGenerator(function* () {
      var _loop5 = babelHelpers.wrapAsyncGenerator(function* (i) {
        var fn = () => _this.x + i;
        try {
          yield fn();
        } finally {
          yield babelHelpers.awaitAsyncGenerator(null);
        }
      });
      for (var i = 0; i < 2; i++) {
        yield* babelHelpers.asyncGeneratorDelegate(_loop5(i));
      }
    })();
  }
  mPlain() {
    var _this2 = this;
    return babelHelpers.wrapAsyncGenerator(function* () {
      var _loop6 = function* (i) {
        var fn = () => _this2.x + i;
        yield fn();
      };
      for (var i = 0; i < 2; i++) {
        yield* _loop6(i);
      }
    })();
  }
}
function nested() {
  return _nested.apply(this, arguments);
}
function _nested() {
  _nested = babelHelpers.wrapAsyncGenerator(function* () {
    var _loop7 = babelHelpers.wrapAsyncGenerator(function* (i) {
      var getI = () => i;
      var _loop0 = babelHelpers.wrapAsyncGenerator(function* (j) {
        var getJ = () => getI() + j;
        try {
          yield getJ();
        } finally {
          yield babelHelpers.awaitAsyncGenerator(null);
        }
      });
      for (var j = 0; j < 2; j++) {
        yield* babelHelpers.asyncGeneratorDelegate(_loop0(j));
      }
    });
    for (var i = 0; i < 2; i++) {
      yield* babelHelpers.asyncGeneratorDelegate(_loop7(i));
    }
    var _loop8 = babelHelpers.wrapAsyncGenerator(function* (_i3) {
      var getI = () => _i3;
      try {
        var _loop1 = function* (j) {
          var getJ = () => getI() + j;
          yield getJ();
        };
        for (var j = 0; j < 2; j++) {
          yield* _loop1(j);
        }
      } finally {
        yield babelHelpers.awaitAsyncGenerator(null);
      }
    });
    for (var _i3 = 0; _i3 < 2; _i3++) {
      yield* babelHelpers.asyncGeneratorDelegate(_loop8(_i3));
    }
    function* syncInner() {
      var _loop9 = function* (k) {
        var getK = () => k;
        try {
          yield getK();
        } finally {
          cleanup();
        }
      };
      for (var k = 0; k < 2; k++) {
        yield* _loop9(k);
      }
    }
    return syncInner;
  });
  return _nested.apply(this, arguments);
}
