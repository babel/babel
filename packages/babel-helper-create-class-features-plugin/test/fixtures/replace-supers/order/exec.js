let argsEval = false;
let err = {};

class A {
  get x() { throw {} }
}

class B extends A {
  method() {
    super.x(argsEval = true);
  }
}

expect(() => new B().method()).toThrow(err);
expect(argsEval).toBe(false);
