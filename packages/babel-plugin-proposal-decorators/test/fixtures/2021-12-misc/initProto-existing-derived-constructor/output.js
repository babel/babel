{
  var _initProto;
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
    static {
      [_initProto] = babelHelpers.applyDecs(this, [[deco, 2, "method"]], []);
    }
    constructor() {
      let a = 2;
      self = _initProto(super(a));
    }
    method() {}
  }
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
    var _initProto2;
    "super() nested within another constructor should not be transformed";
    let log = [];
    class A extends B {
      static {
        [_initProto2] = babelHelpers.applyDecs(this, [[dec, 2, "method"]], []);
      }
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
    new A();
    expect(log + "").toBe("103,4");
  }
  {
    "super() not in decorated derived constructor should not be transformed: computed key";
    let log = [];
    new class Dummy extends B {
      constructor() {
        var _initProto3, _computedKey;
        let key;
        _computedKey = babelHelpers.toPropertyKey((key = super(5).method(), log.push(key), key));
        class A extends B {
          static {
            [_initProto3] = babelHelpers.applyDecs(this, [[dec, 2, "method"]], []);
          }
          constructor() {
            log.push(_initProto3(super(6)).method());
          }
          method() {
            return this.a;
          }
          [_computedKey];
        }
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
        var _initProto4, _dec;
        _dec = noop(log.push(super(7).method()));
        class A extends B {
          static {
            [_initProto4] = babelHelpers.applyDecs(this, [[dec, 2, "method"], [_dec, 2, "noop"]], []);
          }
          constructor() {
            log.push(_initProto4(super(8)).method());
          }
          method() {
            return this.a;
          }
          noop() {}
        }
        new A();
      }
    }();
    expect(log + "").toBe("7,108");
  }
  {
    var _initProto5;
    "super() within decorated derived constructor should be transformed: computed key";
    let log = [];
    class A extends B {
      static {
        [_initProto5] = babelHelpers.applyDecs(this, [[dec, 2, "method"]], []);
      }
      constructor() {
        let key;
        new class Dummy extends B {
          constructor() {
            log.push(super(10).method());
          }
          [(key = _initProto5(super(9)).method(), log.push(key), key)];
        }();
      }
      method() {
        return this.a;
      }
    }
    new A();
    expect(log + "").toBe("109,10");
  }
  {
    var _initProto6;
    "super() within decorated derived constructor should be transformed: decorator expression";
    let log = [];
    const noop = () => fn => fn;
    class A extends B {
      static {
        [_initProto6] = babelHelpers.applyDecs(this, [[dec, 2, "method"]], []);
      }
      constructor() {
        var _initProto7, _dec2;
        new (_dec2 = noop(log.push(_initProto6(super(11)).method())), class Dummy extends B {
          static {
            [_initProto7] = babelHelpers.applyDecs(this, [[_dec2, 2, "noop"]], []);
          }
          constructor() {
            log.push(_initProto7(super(12)).method());
          }
          noop() {}
        })();
      }
      method() {
        return this.a;
      }
    }
    new A();
    expect(log + "").toBe("111,12");
  }
}
