// #15177
var [x] = {
  [Symbol.iterator]: function* () {
    yield* {
      [Symbol.iterator]: x => [],
    };
  },
};
