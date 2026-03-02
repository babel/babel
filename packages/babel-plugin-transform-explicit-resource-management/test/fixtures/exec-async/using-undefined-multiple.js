return (async function () {
  const log = [];

  function disposable(name) {
    return {
      async [Symbol.dispose || Symbol.for("Symbol.dispose")]() {
        log.push(name);
      },
    };
  }

  async function f() {
    using y = disposable("y");
    await using x = undefined;
    log.push("f body");
  }

  const promise = f();

  log.push("body");

  await promise;

  expect(log).toEqual(["f body", "body", "y"]);
})();
