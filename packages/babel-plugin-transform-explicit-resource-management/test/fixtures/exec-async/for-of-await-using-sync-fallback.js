return async function () {
  const log = [];
  const resource = {
    [Symbol.dispose || Symbol.for("Symbol.dispose")]() {
      log.push("dispose");
    },
  };

  const p = (async () => {
    for (await using x of [resource]) {
      log.push("body");
    }
    log.push("after");
  })();
  log.push("sync");
  await p;

  // `await using` must await the result of a sync `Symbol.dispose` too,
  // so the loop is resumed only after the current job has finished.
  expect(log).toEqual(["body", "dispose", "sync", "after"]);
}();
