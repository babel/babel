{
  var _initProto, _A;
  let self, a, initCalled;
  function deco(_, context) {
    context.addInitializer(() => {
      initCalled = true;
    });
  }
  class B {
    constructor(s) {
      a = s;
    }
  }
  class A extends B {
    constructor() {
      let a = 2;
      self = _initProto(super(a));
    }
    method() {}
  }
  _A = A;
  [_initProto] = babelHelpers.applyDecs2311(_A, [], [[deco, 2, "method"]], 0, void 0, B).e;
  let instance = new A();
  expect(self).toBe(instance);
  expect(a).toBe(2);
  expect(initCalled).toBe(true);
}
{
  const dec = fn => {
    return function () {
      return fn.call(this) + 100;
    };
  };
  class B {
    constructor(v) {
      this.a = v;
    }
    method() {
      return this.a;
    }
  }
  {
    var _initProto2, _A2;
    "super() nested within another constructor should not be transformed";
    let log = [];
    class A extends B {
      constructor() {
        log.push(_initProto2(super(3)).method());
        new class Dummy extends B {
          constructor() {
            log.push(super(4).method());
          }
        }();
      }
      method() {
        return this.a;
      }
    }
    _A2 = A;
    [_initProto2] = babelHelpers.applyDecs2311(_A2, [], [[dec, 2, "method"]], 0, void 0, B).e;
    new A();
    expect(log + "").toBe("103,4");
  }
  {
    "super() not in decorated derived constructor should not be transformed: computed key";
    let log = [];
    new class Dummy extends B {
      constructor() {
        var _initProto3, _computedKey, _A3;
        let key;
        _computedKey = babelHelpers.toPropertyKey((key = super(5).method(), log.push(key), key));
        class A extends B {
          constructor() {
            log.push((super(6), babelHelpers.defineProperty(this, _computedKey, void _initProto3(this))).method());
          }
          method() {
            return this.a;
          }
        }
        _A3 = A;
        [_initProto3] = babelHelpers.applyDecs2311(_A3, [], [[dec, 2, "method"]], 0, void 0, B).e;
        new A();
      }
    }();
    expect(log + "").toBe("5,106");
  }
  {
    "super() in decorator expression within decorated derived constructor should be transformed: decorator expression";
    let log = [];
    const noop = () => fn => fn;
    new class extends B {
      constructor() {
        var _initProto4, _noopDecs, _A4;
        _noopDecs = noop(log.push(super(7).method()));
        class A extends B {
          constructor() {
            log.push(_initProto4(super(8)).method());
          }
          method() {
            return this.a;
          }
          noop() {}
        }
        _A4 = A;
        [_initProto4] = babelHelpers.applyDecs2311(_A4, [], [[dec, 2, "method"], [_noopDecs, 2, "noop"]], 0, void 0, B).e;
        new A();
      }
    }();
    expect(log + "").toBe("7,108");
  }
  {
    var _initProto5, _A5;
    "super() within decorated derived constructor should be transformed: computed key";
    let log = [];
    class A extends B {
      constructor() {
        let _ref;
        let key;
        new (_ref = (key = _initProto5(super(9)).method(), log.push(key), key), class Dummy extends B {
          constructor() {
            log.push((super(10), babelHelpers.defineProperty(this, _ref, void 0)).method());
          }
        })();
      }
      method() {
        return this.a;
      }
    }
    _A5 = A;
    [_initProto5] = babelHelpers.applyDecs2311(_A5, [], [[dec, 2, "method"]], 0, void 0, B).e;
    new A();
    expect(log + "").toBe("109,10");
  }
  {
    var _initProto6, _A6;
    "super() within decorated derived constructor should be transformed: decorator expression";
    let log = [];
    const noop = () => fn => fn;
    class A extends B {
      constructor() {
        var _initProto7, _noopDecs2, _Dummy2;
        new (_noopDecs2 = noop(log.push(_initProto6(super(11)).method())), (_Dummy2 = class Dummy extends B {
          constructor() {
            log.push(_initProto7(super(12)).method());
          }
          noop() {}
        }, [_initProto7] = babelHelpers.applyDecs2311(_Dummy2, [], [[_noopDecs2, 2, "noop"]], 0, void 0, B).e, _Dummy2))();
      }
      method() {
        return this.a;
      }
    }
    _A6 = A;
    [_initProto6] = babelHelpers.applyDecs2311(_A6, [], [[dec, 2, "method"]], 0, void 0, B).e;
    new A();
    expect(log + "").toBe("111,12");
  }
}
