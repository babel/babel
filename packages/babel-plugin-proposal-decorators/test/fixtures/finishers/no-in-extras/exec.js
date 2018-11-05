class C {}

function decorator(el) {
  return Object.assign(el, {
    extras: [
      Object.assign({}, el, {
        key: "bar",
        finisher() {
          return C;
        }
      })
    ]
  });
}

expect(() => {
  class A {
    @decorator
    foo() {}
  }
}).toThrow();
