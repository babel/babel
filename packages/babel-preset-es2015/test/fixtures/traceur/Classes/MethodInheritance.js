class MethodsA {
  ma() {}
}

class MethodsB extends MethodsA {
  mb() {}
}

class MethodsC extends MethodsB {
  mc() {}
}

// ----------------------------------------------------------------------------

var a = new MethodsA();
var b = new MethodsB();
var c = new MethodsC();

var pa = Object.getPrototypeOf(a);
var pb = Object.getPrototypeOf(b);
var pc = Object.getPrototypeOf(c);

assertNoOwnProperties(a);
assertNoOwnProperties(b);
assertNoOwnProperties(c);

expect(pa).toHaveProperty('ma');
expect(pa).not.toHaveProperty('mb');
expect(pa).not.toHaveProperty('mc');
expect(pb).toHaveProperty('mb');
expect(pb).not.toHaveProperty('ma');
expect(pb).not.toHaveProperty('mc');
expect(pc).toHaveProperty('mc');
expect(pc).not.toHaveProperty('ma');
expect(pc).not.toHaveProperty('mb');
