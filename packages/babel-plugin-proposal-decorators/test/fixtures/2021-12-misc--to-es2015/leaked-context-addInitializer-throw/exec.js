let addInitializer;

function decMethod(_, context) {
  ({ addInitializer } = context);
  addInitializer(() => null);
}

try {
  class C {
    @decMethod
    m() {}
  }
} finally {}

expect(() => {
  addInitializer(() => null);
}).toThrow('attempted to call addInitializer after decoration was finished')
