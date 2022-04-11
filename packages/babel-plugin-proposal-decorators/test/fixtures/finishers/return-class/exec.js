class C {}

function decorator(el) {
  return Object.assign(el, {
    finisher() {
      return C;
    },
  });
}

class A {
  @decorator
  foo() {}
}

expect(A).toBe(C);
