let addInitializer;

function decMethod(_, context) {
  ({ addInitializer } = context);
  throw new Error();
}

try {
  class C {
    @decMethod
    m() {}
  }
} catch(_) {}

expect(() => {
  addInitializer(() => null);
}).not.toThrow();
