let addInitializer;

function callCapturedFunc() {
  addInitializer(() => null);
}

function decMethod(_, context) {
  ({ addInitializer } = context);
  addInitializer(() => null);
}

const testFn = () => {
  class C {
    @callCapturedFunc
    @decMethod
    m() {}
  }
};

expect(testFn).toThrow(TypeError);
expect(testFn).toThrow('attempted to call addInitializer after decoration was finished')
