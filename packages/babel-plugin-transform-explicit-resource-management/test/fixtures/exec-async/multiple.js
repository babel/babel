return async function () {
  let log = [];

  function disposable(name){
    return {
      async [Symbol.asyncDispose || Symbol.for("Symbol.asyncDispose")]() {
        log.push(name);
      }
    };
  }

  {
    await using x = disposable("x");
    await using y = disposable("y"), z = disposable("z");
    await using w = disposable("w");
    log.push("body");
  }

  expect(log).toEqual(["body", "w", "z", "y", "x"]);
}();