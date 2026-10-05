// If the sync iterator has no throw() and its return() throws,
// the wrapper rejects with the error from return().
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
        throw err;
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
  await expect(it.throw(new Error())).rejects.toBe(err);
  expect(log).toEqual(["next", "return"]);
})();
