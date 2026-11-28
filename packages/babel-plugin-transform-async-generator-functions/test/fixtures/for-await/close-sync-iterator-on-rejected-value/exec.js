// When a sync iterator yields a rejected promise, the async-from-sync wrapper
// closes the sync iterator (ecma262#2600).
const log = [];
const err = new Error();

const iterable = {
  [Symbol.iterator]() {
    return {
      next() {
        log.push("next");
        return { value: Promise.reject(err), done: false };
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
