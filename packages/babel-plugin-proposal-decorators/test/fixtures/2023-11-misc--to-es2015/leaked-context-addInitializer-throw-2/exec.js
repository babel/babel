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

const testFn = () => {
  addInitializer(() => null);
};

expect(testFn).toThrow(TypeError);
expect(testFn).toThrow('attempted to call addInitializer after decoration was finished');
