return (async () => {
  const log = [];

  const promiseDispose = new Promise((resolve, _) => {
    setTimeout(() => {
      log.push("y dispose promise body");
      resolve();
    }, 0);
  });

  {
    await using x = {
      [Symbol.asyncDispose || Symbol.for("Symbol.asyncDispose")]() {
        log.push("x asyncDispose body");
      },
    };
    await using y = {
      [Symbol.dispose || Symbol.for("Symbol.dispose")]() {
        log.push("y dispose body");
        return promiseDispose;
      },
    };
  }

  log.push("body");

  await promiseDispose;

  expect(log).toEqual([
    "y dispose body",
    "x asyncDispose body",
    "body",
    "y dispose promise body",
  ]);
})();
