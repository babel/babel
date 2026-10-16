// A rejected value returned by return() does not close the iterator again.
const log = [];
const err = new Error();

const iterable = {
  [Symbol.iterator]() {
    return {
      next() {
        log.push("next");
        return { value: 1, done: false };
      },
      return() {
        log.push("return");
        return { value: Promise.reject(err), done: false };
      },
    };
  },
};

async function* gen() {
  yield* iterable;
}

return (async () => {
  const it = gen();
  await it.next();
  await expect(it.return()).rejects.toBe(err);
  expect(log).toEqual(["next", "return"]);
})();
