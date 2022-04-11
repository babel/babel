var A_called = false;
var X_called = false;

class A { constructor() { A_called = true } }
class X { constructor() { X_called = true } }
class B extends A {}

B.prototype.__proto__ = X.prototype;
B.__proto__ = X;

expect(new B() instanceof B).toBe(true);
expect(new B() instanceof A).toBe(false);
expect(new B() instanceof X).toBe(true);
expect(A_called).toBe(false);
expect(X_called).toBe(true);
