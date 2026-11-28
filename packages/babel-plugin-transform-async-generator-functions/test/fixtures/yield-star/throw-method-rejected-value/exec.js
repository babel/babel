// A rejected value returned by throw() closes the sync iterator.
const log = [];
const err = new Error();

const iterable = {
  [Symbol.iterator]() {
    return {
      next() {
        log.push("next");
        return { value: 1, done: false };
      },
      throw() {
        log.push("throw");
        return { value: Promise.reject(err), done: false };
      },
      return() {
        log.push("return");
        return {};
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
  await expect(it.throw(new Error("ignored"))).rejects.toBe(err);
  expect(log).toEqual(["next", "throw", "return"]);
})();
