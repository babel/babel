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
