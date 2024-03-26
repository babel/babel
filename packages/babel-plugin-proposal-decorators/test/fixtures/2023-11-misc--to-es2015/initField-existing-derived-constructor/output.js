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
      self = ((super(a), babelHelpers.classPrivateFieldInitSpec(this, _A, _init_foo(this, 42)), this), _init_extra_foo(this));
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
