return (async function () {
  // async_null
  {
    const log = [];

    let asyncId = 0,
      pending = Promise.resolve();
    for (let i = 0; i < 10; i++) {
      pending = pending.then(() => asyncId++);
    }

    {
      await using async_null_1 = null,
        async_null_2 = null,
        async_null_3 = null,
        async_null_4 = null;
      log.push(asyncId);
    }

    log.push(asyncId);

    await pending;

    expect(log).toEqual([0, 1]);
  }
  // async_null, async_null
  {
    const log = [];

    let asyncId = 0,
      pending = Promise.resolve();
    for (let i = 0; i < 10; i++) {
      pending = pending.then(() => asyncId++);
    }

    {
      await using async_null_1 = null,
        async_null_2 = null;
      await using async_null_3 = null,
        async_null_4 = null;
      log.push(asyncId);
    }

    log.push(asyncId);

    await pending;

    expect(log).toEqual([0, 1]);
  }
  // async_null, async_from_async
  {
    const log = [];

    let asyncId = 0,
      pending = Promise.resolve();
    for (let i = 0; i < 10; i++) {
      pending = pending.then(() => asyncId++);
    }

    {
      await using async_null_1 = null,
        async_null_2 = null;
      await using async1 = {
        [Symbol.asyncDispose || Symbol.for("Symbol.asyncDispose")]() {
          log.push(asyncId);
        },
      };
      log.push(asyncId);
    }

    log.push(asyncId);

    await pending;

    expect(log).toEqual([0, 0, 2]);
  }
  // async_null, async_from_sync
  {
    const log = [];

    let asyncId = 0,
      pending = Promise.resolve();
    for (let i = 0; i < 10; i++) {
      pending = pending.then(() => asyncId++);
    }

    {
      await using async_null_1 = null,
        async_null_2 = null;
      await using async1 = {
        [Symbol.dispose || Symbol.for("Symbol.dispose")]() {
          log.push(asyncId);
        },
      };
      log.push(asyncId);
    }

    log.push(asyncId);

    await pending;

    expect(log).toEqual([0, 0, 2]);
  }
  // async_null, async_from_sync_throw
  {
    const log = [];

    let asyncId = 0,
      pending = Promise.resolve();
    for (let i = 0; i < 10; i++) {
      pending = pending.then(() => asyncId++);
    }

    try {
      await using async_null_1 = null,
        async_null_2 = null;
      await using async1 = {
        [Symbol.dispose || Symbol.for("Symbol.dispose")]() {
          log.push(asyncId);
          throw new Error();
        },
      };
      log.push(asyncId);
    } catch {}

    log.push(asyncId);

    await pending;

    expect(log).toEqual([0, 0, 2]);
  }
  // async_null, sync
  {
    const log = [];

    let asyncId = 0,
      pending = Promise.resolve();
    for (let i = 0; i < 10; i++) {
      pending = pending.then(() => asyncId++);
    }

    {
      await using async_null_1 = null,
        async_null_2 = null;
      using sync1 = {
        [Symbol.dispose || Symbol.for("Symbol.dispose")]() {
          log.push(asyncId);
        },
      };
      log.push(asyncId);
    }

    log.push(asyncId);

    await pending;

    expect(log).toEqual([0, 0, 1]);
  }
  // async_null, async_from_async, async_null
  {
    const log = [];

    let asyncId = 0,
      pending = Promise.resolve();
    for (let i = 0; i < 10; i++) {
      pending = pending.then(() => asyncId++);
    }

    {
      await using async_null_1 = null,
        async_null_2 = null;
      await using async1 = {
        [Symbol.asyncDispose || Symbol.for("Symbol.asyncDispose")]() {
          log.push(asyncId);
        },
      };
      await using async_null_3 = null,
        async_null_4 = null;
      log.push(asyncId);
    }

    log.push(asyncId);

    await pending;

    expect(log).toEqual([0, 0, 2]);
  }
  // async_null, async_from_sync, async_null
  {
    const log = [];

    let asyncId = 0,
      pending = Promise.resolve();
    for (let i = 0; i < 10; i++) {
      pending = pending.then(() => asyncId++);
    }

    {
      await using async_null_1 = null,
        async_null_2 = null;
      await using async1 = {
        [Symbol.dispose || Symbol.for("Symbol.dispose")]() {
          log.push(asyncId);
        },
      };
      await using async_null_3 = null,
        async_null_4 = null;
      log.push(asyncId);
    }

    log.push(asyncId);

    await pending;

    expect(log).toEqual([0, 0, 2]);
  }
  // async_null, async_from_sync_throw, async_null
  {
    const log = [];

    let asyncId = 0,
      pending = Promise.resolve();
    for (let i = 0; i < 10; i++) {
      pending = pending.then(() => asyncId++);
    }

    try {
      await using async_null_1 = null,
        async_null_2 = null;
      await using async1 = {
        [Symbol.dispose || Symbol.for("Symbol.dispose")]() {
          log.push(asyncId);
          throw new Error();
        },
      };
      await using async_null_3 = null,
        async_null_4 = null;
      log.push(asyncId);
    } catch {}

    log.push(asyncId);

    await pending;

    expect(log).toEqual([0, 0, 2]);
  }
  // async_null, sync, async_null
  {
    const log = [];

    let asyncId = 0,
      pending = Promise.resolve();
    for (let i = 0; i < 10; i++) {
      pending = pending.then(() => asyncId++);
    }

    {
      await using async_null_1 = null,
        async_null_2 = null;
      using sync1 = {
        [Symbol.dispose || Symbol.for("Symbol.dispose")]() {
          log.push(asyncId);
        },
      };
      await using async_null_3 = null,
        async_null_4 = null;
      log.push(asyncId);
    }

    log.push(asyncId);

    await pending;

    expect(log).toEqual([0, 1, 4]);
  }
  // sync, async_null, sync, async_null
  {
    const log = [];

    let asyncId = 0,
      pending = Promise.resolve();
    for (let i = 0; i < 10; i++) {
      pending = pending.then(() => asyncId++);
    }

    {
      using sync1 = {
        [Symbol.dispose || Symbol.for("Symbol.dispose")]() {
          log.push(asyncId);
        },
      }; // asyncId: 2
      await using async_null_1 = null,
        async_null_2 = null;
      using sync2 = {
        [Symbol.dispose || Symbol.for("Symbol.dispose")]() {
          log.push(asyncId);
        },
      }; // asyncId: 1
      await using async_null_3 = null,
        async_null_4 = null;
      log.push(asyncId);
    }

    log.push(asyncId);

    await pending;

    expect(log).toEqual([0, 1, 2, 4]);
  }
  // sync_throw, async_null, sync, async_null
  {
    const log = [];

    let asyncId = 0,
      pending = Promise.resolve();
    for (let i = 0; i < 10; i++) {
      pending = pending.then(() => asyncId++);
    }

    try {
      using sync1 = {
        [Symbol.dispose || Symbol.for("Symbol.dispose")]() {
          log.push(asyncId);
          throw new Error();
        },
      }; // asyncId: 2
      await using async_null_1 = null,
        async_null_2 = null;
      using sync2 = {
        [Symbol.dispose || Symbol.for("Symbol.dispose")]() {
          log.push(asyncId);
        },
      }; // asyncId: 1
      await using async_null_3 = null,
        async_null_4 = null;
      log.push(asyncId);
    } catch {}

    log.push(asyncId);

    await pending;

    expect(log).toEqual([0, 1, 2, 4]);
  }
})();
