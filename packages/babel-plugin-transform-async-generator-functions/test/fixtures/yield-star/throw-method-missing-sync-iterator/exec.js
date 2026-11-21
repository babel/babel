// If the sync iterator has no throw(), the wrapper closes it and rejects
// with a TypeError (ecma262#2600).
const log = [];

const iterable = {
  [Symbol.iterator]() {
    return {
      next() {
        log.push("next");
        return { value: 1, done: false };
      },
      return() {
        log.push("return");
        return { done: true };
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
  await expect(it.throw(new Error())).rejects.toBeInstanceOf(TypeError);
  expect(log).toEqual(["next", "return"]);
})();
