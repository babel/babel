return (async () => {
  const log = [];

  async function main() {
    const promiseDispose = Promise.resolve().then(() => {
      log.push("interleave");
    });

    try {
      await using x = {
        [Symbol.dispose || Symbol.for("Symbol.dispose")]() {
          log.push("dispose");
          throw null;
        },
      };
    } catch (e) {
      log.push("catch");
    }

    await promiseDispose;
  }

  await main();

  expect(log).toEqual(["dispose", "interleave", "catch"]);
})();
