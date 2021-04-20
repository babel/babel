var _x = new WeakMap();

class A {
  constructor() {
    _x.set(this, {
      writable: true,
      value: void 0
    });
  }

  test() {
    _x.has(this);
  }

}
