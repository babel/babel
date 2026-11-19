return async function () {
  const log = [];
  const resource = name => ({
    async [Symbol.asyncDispose || Symbol.for("Symbol.asyncDispose")]() {
      log.push(`dispose ${name}`);
    }
  });

  for (await using x = resource("x"); log.length < 2; ) {
    log.push(`body ${log.length}`);
  }

  expect(log).toEqual(["body 0", "body 1", "dispose x"]);
}();
