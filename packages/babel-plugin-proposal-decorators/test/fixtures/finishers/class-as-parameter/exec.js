var C;

function decorator(el) {
  return Object.assign(el, {
    finisher(Class) {
      C = Class;
    },
  });
}

class A {
  @decorator
  foo() {}
}

expect(C).toBe(A);
