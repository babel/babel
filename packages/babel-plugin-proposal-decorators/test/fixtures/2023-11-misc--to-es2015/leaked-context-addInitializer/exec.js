let addInitializer;

function callCapturedFunc() {
  addInitializer(() => null);
}

function decMethod(_, context) {
  ({ addInitializer } = context);
  addInitializer(() => null);
}

expect(() => {
  class C {
    @callCapturedFunc
    @decMethod
    m() {}
  }
}).toThrow('attempted to call addInitializer after decoration was finished')
