let init = false;
let initializer = false;

function decorator() {
  return {
    get init() {
      init = true;
      return () => {};
    },
    get initializer() {
      initializer = true;
      return () => {};
    }
  };
}

class A {
  @decorator
  accessor x;
}

new A();

expect(init).toBe(true);
expect(initializer).toBe(false);
