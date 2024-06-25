let argsEval = false;

class A {
  get x() { throw "err" }
}

class B extends A {
  method() {
    super.x(argsEval = true);
  }
}

expect(() => new B().method()).toThrow("err");
expect(argsEval).toBe(false);
