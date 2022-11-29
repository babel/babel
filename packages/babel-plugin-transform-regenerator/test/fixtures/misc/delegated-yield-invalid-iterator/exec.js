// #15177
expect(() => {
  var [x] = {
    [Symbol.iterator]: function* () {
      yield* {
        [Symbol.iterator]: x => [],
      };
    },
  };
}).toThrow(TypeError);
