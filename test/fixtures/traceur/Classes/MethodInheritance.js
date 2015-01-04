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

assertHasOwnProperty(pa, 'ma');
assertLacksOwnProperty(pa, 'mb', 'mc');
assertHasOwnProperty(pb, 'mb');
assertLacksOwnProperty(pb, 'ma', 'mc');
assertHasOwnProperty(pc, 'mc');
assertLacksOwnProperty(pc, 'ma', 'mb');
