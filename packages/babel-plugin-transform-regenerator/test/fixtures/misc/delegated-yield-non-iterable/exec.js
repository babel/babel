function* f(x) {
  yield* x;
};

expect(() => f(undefined).next()).toThrow(TypeError);
expect(() => f(null).next()).toThrow(TypeError);
expect(() => f(false).next()).toThrow(TypeError);
expect(() => f(true).next()).toThrow(TypeError);
expect(() => f(0).next()).toThrow(TypeError);
expect(() => f(1).next()).toThrow(TypeError);
expect(() => f({}).next()).toThrow(TypeError);

// #15172
expect(() => {
  var [x] = {
    [Symbol.iterator]: function* () {
      yield* 0;
    },
  };  
}).toThrow(TypeError);
