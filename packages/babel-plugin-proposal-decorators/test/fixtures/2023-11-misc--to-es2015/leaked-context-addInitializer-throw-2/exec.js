let addInitializer;

function decMethod(_, context) {
  ({ addInitializer } = context);
  return null;
}

try {
  class C {
    @decMethod
    m() {}
  }
} catch(_) {}

expect(() => {
  addInitializer(() => null);
}).toThrow('attempted to call addInitializer after decoration was finished');
