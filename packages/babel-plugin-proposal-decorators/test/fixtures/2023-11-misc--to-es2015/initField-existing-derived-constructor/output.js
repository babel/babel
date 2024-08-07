{
  var _A2;
  let _init_foo, _init_extra_foo;
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
  var _A = /*#__PURE__*/new WeakMap();
  class A extends B {
    constructor() {
      let a = 2;
      self = (super(a), babelHelpers.classPrivateFieldInitSpec(this, _A, _init_foo(this, 42)), this, _init_extra_foo(this));
    }
    get foo() {
      return babelHelpers.classPrivateFieldGet2(_A, this);
    }
    set foo(v) {
      babelHelpers.classPrivateFieldSet2(_A, this, v);
    }
  }
  _A2 = A;
  [_init_foo, _init_extra_foo] = babelHelpers.applyDecs2311(_A2, [], [[deco, 1, "foo"]], 0, void 0, B).e;
  let instance = new A();
  expect(self).toBe(instance);
  expect(a).toBe(2);
  expect(initCalled).toBe(true);
}
{
  const dec = ({
    get,
    set
  }) => {
    return {
      get() {
        return get.call(this) + 100;
      },
      set(v) {
        set.call(this, v);
      }
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
    var _A4;
    let _init_foo2, _init_extra_foo2;
    "super() nested within another constructor should not be transformed";
    let log = [];
    var _A3 = /*#__PURE__*/new WeakMap();
    class A extends B {
      constructor() {
        log.push((super(3), babelHelpers.classPrivateFieldInitSpec(this, _A3, _init_foo2(this, 42)), this, _init_extra_foo2(this)).method());
        new class Dummy extends B {
          constructor() {
            log.push(super(4).method());
          }
        }();
      }
      get foo() {
        return babelHelpers.classPrivateFieldGet2(_A3, this);
      }
      set foo(v) {
        babelHelpers.classPrivateFieldSet2(_A3, this, v);
      }
    }
    _A4 = A;
    [_init_foo2, _init_extra_foo2] = babelHelpers.applyDecs2311(_A4, [], [[dec, 1, "foo"]], 0, void 0, B).e;
    const a = new A();
    expect(log + "").toBe("3,4");
    expect(a.foo).toBe(142);
  }
  {
    "super() not in decorated derived constructor should not be transformed: computed key";
    let log = [];
    new class Dummy extends B {
      constructor() {
        var _A6;
        let _init_foo3, _init_extra_foo3, _computedKey;
        let key;
        var _A5 = /*#__PURE__*/new WeakMap();
        _computedKey = (key = super(5).method(), log.push(key), key);
        class A extends B {
          constructor() {
            log.push((super(6), babelHelpers.classPrivateFieldInitSpec(this, _A5, _init_foo3(this, 42)), babelHelpers.defineProperty(this, _computedKey, void _init_extra_foo3(this))).method());
          }
          get foo() {
            return babelHelpers.classPrivateFieldGet2(_A5, this);
          }
          set foo(v) {
            babelHelpers.classPrivateFieldSet2(_A5, this, v);
          }
        }
        _A6 = A;
        [_init_foo3, _init_extra_foo3] = babelHelpers.applyDecs2311(_A6, [], [[dec, 1, "foo"]], 0, void 0, B).e;
        const a = new A();
        expect(a.foo).toBe(142);
      }
    }();
    expect(log + "").toBe("5,6");
  }
  {
    "super() in decorator expression within decorated derived constructor should be transformed: decorator expression";
    let log = [];
    const noop = () => fn => fn;
    new class extends B {
      constructor() {
        var _A8;
        let _initProto, _init_foo4, _init_extra_foo4, _noopDecs, _ref;
        var _A7 = /*#__PURE__*/new WeakMap();
        _ref = (_noopDecs = noop(log.push(super(7).method())), "foo");
        class A extends B {
          constructor() {
            log.push((super(8), babelHelpers.classPrivateFieldInitSpec(this, _A7, (_initProto(this), _init_foo4(this, 42))), this, _init_extra_foo4(this)).method());
          }
          get [_ref]() {
            return babelHelpers.classPrivateFieldGet2(_A7, this);
          }
          set foo(v) {
            babelHelpers.classPrivateFieldSet2(_A7, this, v);
          }
          noop() {}
        }
        _A8 = A;
        [_init_foo4, _init_extra_foo4, _initProto] = babelHelpers.applyDecs2311(_A8, [], [[dec, 1, "foo"], [_noopDecs, 2, "noop"]], 0, void 0, B).e;
        const a = new A();
        expect(a.foo).toBe(142);
      }
    }();
    expect(log + "").toBe("7,8");
  }
  {
    var _A10;
    let _init_foo5, _init_extra_foo5;
    "super() within decorated derived constructor should be transformed: computed key";
    let log = [];
    var _A9 = /*#__PURE__*/new WeakMap();
    class A extends B {
      constructor() {
        let _ref2;
        let key;
        new (_ref2 = (key = (super(9), babelHelpers.classPrivateFieldInitSpec(this, _A9, _init_foo5(this, 42)), this, _init_extra_foo5(this)).method(), log.push(key), key), class Dummy extends B {
          constructor() {
            log.push((super(10), babelHelpers.defineProperty(this, _ref2, void 0)).method());
          }
        })();
      }
      get foo() {
        return babelHelpers.classPrivateFieldGet2(_A9, this);
      }
      set foo(v) {
        babelHelpers.classPrivateFieldSet2(_A9, this, v);
      }
    }
    _A10 = A;
    [_init_foo5, _init_extra_foo5] = babelHelpers.applyDecs2311(_A10, [], [[dec, 1, "foo"]], 0, void 0, B).e;
    const a = new A();
    expect(log + "").toBe("9,10");
    expect(a.foo).toBe(142);
  }
  {
    var _A12;
    let _init_foo6, _init_extra_foo6;
    "super() within decorated derived constructor should be transformed: decorator expression";
    let log = [];
    const noop = () => fn => fn;
    var _A11 = /*#__PURE__*/new WeakMap();
    class A extends B {
      constructor() {
        var _Dummy2;
        let _initProto2, _noopDecs2, _ref3;
        new (_ref3 = (_noopDecs2 = noop(log.push((super(11), babelHelpers.classPrivateFieldInitSpec(this, _A11, _init_foo6(this, 42)), this, _init_extra_foo6(this)).method())), "noop"), _Dummy2 = class Dummy extends B {
          constructor() {
            log.push(_initProto2(super(12)).method());
          }
          [_ref3]() {}
        }, [_initProto2] = babelHelpers.applyDecs2311(_Dummy2, [], [[_noopDecs2, 2, "noop"]], 0, void 0, B).e, _Dummy2)();
      }
      get foo() {
        return babelHelpers.classPrivateFieldGet2(_A11, this);
      }
      set foo(v) {
        babelHelpers.classPrivateFieldSet2(_A11, this, v);
      }
    }
    _A12 = A;
    [_init_foo6, _init_extra_foo6] = babelHelpers.applyDecs2311(_A12, [], [[dec, 1, "foo"]], 0, void 0, B).e;
    const a = new A();
    expect(log + "").toBe("11,12");
    expect(a.foo).toBe(142);
  }
}
