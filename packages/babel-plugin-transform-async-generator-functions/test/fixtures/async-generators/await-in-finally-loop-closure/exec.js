async function testBasic() {
  const log = [];

  async function* outer() {
    for (let i = 0; i < 3; i++) {
      const fn = () => i;
      try {
        log.push(`round ${fn()} started`);
        yield i;
      } finally {
        await null;
        log.push(`round ${fn()} finally`);
      }
    }
  }

  const it = outer();
  expect(await it.next()).toEqual({ value: 0, done: false });
  expect(await it.return("bye")).toEqual({ value: "bye", done: true });
  expect(await it.next()).toEqual({ value: undefined, done: true });
  expect(log).toEqual(["round 0 started", "round 0 finally"]);
}

async function testOuterFinallyAndReturn() {
  const log = [];

  async function* outer(stopEarly) {
    try {
      for (let i = 0; i < 3; i++) {
        const fn = () => i;
        try {
          log.push(`start ${fn()}`);
          if (stopEarly && i === 1) return `ret ${fn()}`;
          yield i;
        } finally {
          await null;
          log.push(`inner finally ${fn()}`);
        }
      }
    } finally {
      await null;
      log.push("outer finally");
    }
  }

  const it = outer(false);
  expect(await it.next()).toEqual({ value: 0, done: false });
  expect(await it.return("bye")).toEqual({ value: "bye", done: true });
  expect(log).toEqual(["start 0", "inner finally 0", "outer finally"]);

  log.length = 0;
  const it2 = outer(true);
  expect(await it2.next()).toEqual({ value: 0, done: false });
  expect(await it2.next()).toEqual({ value: "ret 1", done: true });
  expect(log).toEqual([
    "start 0",
    "inner finally 0",
    "start 1",
    "inner finally 1",
    "outer finally",
  ]);
}

async function testNestedLoops() {
  const log = [];

  async function* nested() {
    for (let i = 0; i < 2; i++) {
      const getI = () => i;
      for (let j = 0; j < 2; j++) {
        const getJ = () => `${getI()}-${j}`;
        try {
          log.push(`start ${getJ()}`);
          yield getJ();
        } finally {
          await null;
          log.push(`finally ${getJ()}`);
        }
      }
    }
  }

  const it = nested();
  expect(await it.next()).toEqual({ value: "0-0", done: false });
  expect(await it.return("stop")).toEqual({ value: "stop", done: true });
  expect(log).toEqual(["start 0-0", "finally 0-0"]);
}

async function testMethodsAndThisArguments() {
  const log = [];

  class C {
    constructor(tag) {
      this.tag = tag;
    }

    async *run() {
      for (let i = 0; i < 3; i++) {
        const fn = () => `${this.tag}:${arguments[0]}:${i}`;
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

  const it = new C("cls").run("arg");
  expect(await it.next()).toEqual({ value: "cls:arg:0", done: false });
  expect(await it.return("done")).toEqual({ value: "done", done: true });
  expect(log).toEqual(["start cls:arg:0", "finally cls:arg:0"]);

  log.length = 0;
  const obj = {
    tag: "obj",
    async *run() {
      for (let i = 0; i < 3; i++) {
        const fn = () => `${this.tag}:${i}`;
        try {
          log.push(`start ${fn()}`);
          yield fn();
        } finally {
          await null;
          log.push(`finally ${fn()}`);
        }
      }
    },
  };

  const it2 = obj.run();
  expect(await it2.next()).toEqual({ value: "obj:0", done: false });
  expect(await it2.return("done")).toEqual({ value: "done", done: true });
  expect(log).toEqual(["start obj:0", "finally obj:0"]);
}

async function testNestedSyncGenerator() {
  async function* outer() {
    function* inner() {
      for (let i = 0; i < 2; i++) {
        const fn = () => i;
        yield fn();
      }
    }
    yield Array.from(inner());
  }

  const it = outer();
  expect(await it.next()).toEqual({ value: [0, 1], done: false });
  expect(await it.next()).toEqual({ value: undefined, done: true });
}

async function test() {
  await testBasic();
  await testOuterFinallyAndReturn();
  await testNestedLoops();
  await testMethodsAndThisArguments();
  await testNestedSyncGenerator();
}

return test();
