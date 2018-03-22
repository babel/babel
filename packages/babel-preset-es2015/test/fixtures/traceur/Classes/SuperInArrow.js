var x;

class B {
  m(v) {
    x = v;
  }
}

class D extends B {
  n(x) {
    var f = (x) => {
      super.m(x);
    };
    f(x);
  }
}

new D().n(42);
expect(x).toBe(42);
