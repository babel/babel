let self, a, initCalled;

function deco(_, context) {
  context.addInitializer(() => {
    initCalled = true;
  })
}

class B {
  constructor(s) {
    a = s;
  }
}

class A extends B {
  constructor() {
    let a = 2;
    self = super(a);
  }

  @deco
  method() {}
}

let instance = new A();
expect(self).toBe(instance);
expect(a).toBe(2);
expect(initCalled).toBe(true);
