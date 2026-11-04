// If return() throws while closing because of a rejected value,
// the original rejection wins.
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
        throw new Error("from return");
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
