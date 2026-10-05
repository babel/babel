// If PromiseResolve throws synchronously on the yielded value (here, a
// promise whose "constructor" getter throws), the wrapper closes the sync
// iterator and rejects with that error (ecma262#2600).
const log = [];
const err = new Error();

const poisoned = Promise.resolve(1);
Object.defineProperty(poisoned, "constructor", {
  get() {
    throw err;
  },
});

const iterable = {
  [Symbol.iterator]() {
    return {
      next() {
        log.push("next");
        return { value: poisoned, done: false };
      },
      return() {
        log.push("return");
        return { done: true };
      },
    };
  },
};

return (async () => {
  await expect(
    (async () => {
      for await (const x of iterable);
    })(),
  ).rejects.toBe(err);
  expect(log).toEqual(["next", "return"]);
})();
