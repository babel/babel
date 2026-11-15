return async function () {
  const events = [];

  const resources = [1, 2].map(id => ({
    id,
    async [Symbol.asyncDispose || Symbol.for("Symbol.asyncDispose")]() {
      await Promise.resolve();
      events.push(`dispose:${id}`);
    },
  }));

  for (await using x of resources) {
    events.push(`body:${x.id}`);
  }

  expect(events).toEqual(["body:1", "dispose:1", "body:2", "dispose:2"]);
}();
