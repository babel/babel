async function f0(x, void) { "f0" }

async function f1(void, x) { "f1" }

async function f2(void) { "f2" }

class C {
  async m0(x, void) { "m0" }

  async m1(void, x) { "m1" }

  async m2(void) { "m2" }
}
