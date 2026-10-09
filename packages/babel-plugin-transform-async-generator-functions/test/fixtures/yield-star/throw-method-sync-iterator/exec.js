const log = [];

// A sync iterable: yield* in an async generator wraps it with
// CreateAsyncFromSyncIterator, which must forward .throw() to the inner .throw().
const syncIterable = {
  [Symbol.iterator]() {
    return {
      next() {
        log.push("next");
        return { value: "a", done: false };
      },
      throw(e) {
        log.push("throw:" + e.message);
        return { value: "handled", done: true };
      },
      return() {
        log.push("return");
        return { value: undefined, done: true };
      },
    };
  },
};

async function* outer() {
  const result = yield* syncIterable;
  log.push("result:" + result);
}

return (async () => {
  const iterator = outer();

  let res = await iterator.next();
  expect(res).toEqual({ value: "a", done: false });
  expect(log).toEqual(["next"]);

  res = await iterator.throw(new Error("TEST"));
  expect(res).toEqual({ value: undefined, done: true });
  expect(log).toEqual(["next", "throw:TEST", "result:handled"]);
})();
