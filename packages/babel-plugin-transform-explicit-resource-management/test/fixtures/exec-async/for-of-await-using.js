return async function () {
  const log = [];
  const resource = name => ({
    async [Symbol.asyncDispose || Symbol.for("Symbol.asyncDispose")]() {
      log.push("dispose start " + name);
      await null;
      await null;
      log.push("dispose end " + name);
    },
  });

  for (await using x of [resource("a"), resource("b")]) {
    log.push("body");
  }
  log.push("after");

  expect(log).toEqual([
    "body",
    "dispose start a",
    "dispose end a",
    "body",
    "dispose start b",
    "dispose end b",
    "after",
  ]);

  log.length = 0;
  for (await using x of [resource("c"), resource("d")]) {
    log.push("body");
    break;
  }
  expect(log).toEqual(["body", "dispose start c", "dispose end c"]);

  log.length = 0;
  const err = new Error("body");
  let caught;
  try {
    for (await using x of [resource("e")]) {
      throw err;
    }
  } catch (e) {
    caught = e;
  }
  expect(caught).toBe(err);
  expect(log).toEqual(["dispose start e", "dispose end e"]);
}();
