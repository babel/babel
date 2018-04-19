class B {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class C extends B {
  // No constructor
}

var c = new B(1, 2);
expect(1).toBe(c.x);
expect(2).toBe(c.y);

expect(Object.getOwnPropertyDescriptor(B.prototype, 'constructor').enumerable).toBe(false);
expect(Object.getOwnPropertyDescriptor(C.prototype, 'constructor').enumerable).toBe(false);

// Ensure that we don't try to call super() in the default constructor.
class D extends null {}
var d = new D();


class E extends function(x) {
  this.x = x;
} {}

var e = new E(42)
expect(42).toBe(e.x);
