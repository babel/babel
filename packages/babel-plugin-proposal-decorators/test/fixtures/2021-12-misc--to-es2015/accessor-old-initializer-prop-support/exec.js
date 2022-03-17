let originalWarn = console.warn;
let message;

console.warn = (m) => message = m;

function decAccessor() {
  return {
    initializer: () => 123,
  };
}

class C {
  @decAccessor accessor a;
}

let c = new C();

expect(c.a).toBe(123);
expect(message).toBe('.initializer has been renamed to .init as of March 2022');

console.warn = originalWarn;
