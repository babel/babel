{
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
  class A extends B {
    static {
      [_init_foo, _init_extra_foo] = babelHelpers.applyDecs2311(this, [], [[deco, 1, "foo"]], 0, void 0, B).e;
    }
    constructor() {
      let a = 2;
      self = (super(a), _init_extra_foo(this));
    }
    #A = _init_foo(this, 42);
    get foo() {
      return this.#A;
    }
    set foo(v) {
      this.#A = v;
    }
  }
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
    let _init_foo2, _init_extra_foo2;
    "super() nested within another constructor should not be transformed";
    let log = [];
    class A extends B {
      static {
        [_init_foo2, _init_extra_foo2] = babelHelpers.applyDecs2311(this, [], [[dec, 1, "foo"]], 0, void 0, B).e;
      }
      constructor() {
        log.push((super(3), _init_extra_foo2(this)).method());
        new class Dummy extends B {
          constructor() {
            log.push(super(4).method());
          }
        }();
      }
      #A = _init_foo2(this, 42);
      get foo() {
        return this.#A;
      }
      set foo(v) {
        this.#A = v;
      }
    }
    const a = new A();
    expect(log + "").toBe("3,4");
    expect(a.foo).toBe(142);
  }
  {
    "super() not in decorated derived constructor should not be transformed: computed key";
    let log = [];
    new class Dummy extends B {
      constructor() {
        let _init_foo3, _init_extra_foo3, _computedKey;
        let key;
        class A extends B {
          static {
            [_init_foo3, _init_extra_foo3] = babelHelpers.applyDecs2311(this, [], [[dec, 1, "foo"]], 0, void 0, B).e;
          }
          constructor() {
            log.push(super(6).method());
          }
          #A = _init_foo3(this, 42);
          get foo() {
            return this.#A;
          }
          set foo(v) {
            this.#A = v;
          }
          [_computedKey = (key = super(5).method(), log.push(key), key)] = void _init_extra_foo3(this);
        }
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
        let _initProto, _init_foo4, _init_extra_foo4, _noopDecs;
        class A extends B {
          static {
            [_init_foo4, _init_extra_foo4, _initProto] = babelHelpers.applyDecs2311(this, [], [[dec, 1, "foo"], [_noopDecs, 2, "noop"]], 0, void 0, B).e;
          }
          constructor() {
            log.push((super(8), _init_extra_foo4(this)).method());
          }
          #A = (_initProto(this), _init_foo4(this, 42));
          get [(_noopDecs = noop(log.push(super(7).method())), "foo")]() {
            return this.#A;
          }
          set foo(v) {
            this.#A = v;
          }
          noop() {}
        }
        const a = new A();
        expect(a.foo).toBe(142);
      }
    }();
    expect(log + "").toBe("7,8");
  }
  {
    let _init_foo5, _init_extra_foo5;
    "super() within decorated derived constructor should be transformed: computed key";
    let log = [];
    class A extends B {
      static {
        [_init_foo5, _init_extra_foo5] = babelHelpers.applyDecs2311(this, [], [[dec, 1, "foo"]], 0, void 0, B).e;
      }
      constructor() {
        let key;
        new class Dummy extends B {
          constructor() {
            log.push(super(10).method());
          }
          [(key = (super(9), _init_extra_foo5(this)).method(), log.push(key), key)];
        }();
      }
      #A = _init_foo5(this, 42);
      get foo() {
        return this.#A;
      }
      set foo(v) {
        this.#A = v;
      }
    }
    const a = new A();
    expect(log + "").toBe("9,10");
    expect(a.foo).toBe(142);
  }
  {
    let _init_foo6, _init_extra_foo6;
    "super() within decorated derived constructor should be transformed: decorator expression";
    let log = [];
    const noop = () => fn => fn;
    class A extends B {
      static {
        [_init_foo6, _init_extra_foo6] = babelHelpers.applyDecs2311(this, [], [[dec, 1, "foo"]], 0, void 0, B).e;
      }
      constructor() {
        let _initProto2, _noopDecs2;
        new class Dummy extends B {
          static {
            [_initProto2] = babelHelpers.applyDecs2311(this, [], [[_noopDecs2, 2, "noop"]], 0, void 0, B).e;
          }
          constructor() {
            log.push(_initProto2(super(12)).method());
          }
          [(_noopDecs2 = noop(log.push((super(11), _init_extra_foo6(this)).method())), "noop")]() {}
        }();
      }
      #A = _init_foo6(this, 42);
      get foo() {
        return this.#A;
      }
      set foo(v) {
        this.#A = v;
      }
    }
    const a = new A();
    expect(log + "").toBe("11,12");
    expect(a.foo).toBe(142);
  }
}
