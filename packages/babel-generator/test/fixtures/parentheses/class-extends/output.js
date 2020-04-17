class A1 extends (() => {}) {}

class A2 extends (B = C) {}

class A3 extends (B || C) {}

class A4 extends (B + C) {}

class A5 extends B() {}

class A6 extends class {} {}

class A7 extends (B ? C : D) {}

class A8 extends new B() {}

class A9 extends (B, C) {}

class A10 extends {} {}

class A11 extends B.C {}

class A12 extends function () {} {}

class A13 extends (void B) {}

class A14 extends (++B) {}

async function f1() {
  class A15 extends (await C) {}
}

function* f2() {
  class A16 extends (yield 1) {}
}
