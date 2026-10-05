// A rejected promise in a `done: true` result does not close the iterator.
const log = [];
const err = new Error();

const iterable = {
  [Symbol.iterator]() {
    return {
      next() {
        log.push("next");
        return { value: Promise.reject(err), done: true };
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
  expect(log).toEqual(["next"]);
})();
