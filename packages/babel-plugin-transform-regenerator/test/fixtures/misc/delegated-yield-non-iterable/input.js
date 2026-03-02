// #15172
var [x] = {
  [Symbol.iterator]: function* () {
    yield* 0;
  }
};
