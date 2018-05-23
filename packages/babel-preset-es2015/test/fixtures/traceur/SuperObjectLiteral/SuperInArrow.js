var x;

var p = {
  m(v) {
    x = v;
  }
};

var o = {
  __proto__: p,
  n(x) {
    var f = (x) => {
      super.m(x);
    };
    f(x);
  }
};

o.n(42);
expect(x).toBe(42);
