async function testDestructuredParams() {
  const log = [];

  async function* outer({ prefix = "r" } = {}) {
    for (let i = 0; i < 3; i++) {
      const fn = () => `${prefix}-${i}`;
      try {
        log.push(`start ${fn()}`);
        yield fn();
      } finally {
        await null;
        log.push(`finally ${fn()}`);
      }
    }
  }

  const it = outer({ prefix: "fn" });
  expect(await it.next()).toEqual({ value: "fn-0", done: false });
  expect(await it.return("bye")).toEqual({ value: "bye", done: true });
  expect(log).toEqual(["start fn-0", "finally fn-0"]);

  log.length = 0;
  class C {
    async *run({ prefix = "m" } = {}) {
      for (let i = 0; i < 3; i++) {
        const fn = () => `${prefix}-${i}`;
        try {
          log.push(`start ${fn()}`);
          yield fn();
        } finally {
          await null;
          log.push(`finally ${fn()}`);
        }
      }
    }
  }

  const it2 = new C().run({ prefix: "cls" });
  expect(await it2.next()).toEqual({ value: "cls-0", done: false });
  expect(await it2.return("bye")).toEqual({ value: "bye", done: true });
  expect(log).toEqual(["start cls-0", "finally cls-0"]);
}

return testDestructuredParams();
