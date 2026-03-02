// https://github.com/tc39/ecma262/pull/2819

let done = false;
let inner = {
  [Symbol.asyncIterator]: () => ({
    next() {
      if (done) {
        return Promise.resolve({ done: true });
      }
      done = true;
      return Promise.resolve({ done: false, value: Promise.resolve(0) });
    },
  }),
};

async function* outer() {
  yield* inner;
}

return (async function () {
  for await (let x of outer()) {
    expect(x).toBeInstanceOf(Promise);
    expect(await x).toBe(0);
  }
})();
