class A extends (() => {}) {}

class A extends (B = C) {}

class A extends (B || C) {}

class A extends (B + C) {}

class A extends B() {}

class A extends class {} {}

class A extends (B ? C : D) {}

class A extends (new B()) {}

class A extends (B, C) {}

class A extends {} {}

class A extends B.C {}

class A extends function () {} {}

class A extends (void B) {}

class A extends (++B) {}

async function f() {
  class A extends (await C) {}
}

function* f() {
  class A extends (yield 1) {}
}
