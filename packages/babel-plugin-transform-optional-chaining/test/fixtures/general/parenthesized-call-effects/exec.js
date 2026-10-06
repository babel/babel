for (const method of [null, undefined, 1, false]) {
  const events = [];
  const obj = { method };
  expect(() => (obj?.method)(events.push("argument"))).toThrow(TypeError);
  expect(events).toEqual(["argument"]);

  events.length = 0;
  expect(() => (obj?.method)((() => {
    events.push("argument");
    throw new RangeError();
  })())).toThrow(RangeError);
  expect(events).toEqual(["argument"]);

  events.length = 0;
  const args = {
    *[Symbol.iterator]() {
      events.push("spread");
      yield 1;
    },
  };
  expect(() => (obj?.method)(...args)).toThrow(TypeError);
  expect(events).toEqual(["spread"]);
}

for (const obj of [null, undefined]) {
  const events = [];
  expect(() => (obj?.method)(events.push("argument"))).toThrow(TypeError);
  expect(events).toEqual(["argument"]);
}

{
  const events = [];
  const obj = {
    method(value) {
      expect(this).toBe(obj);
      expect(value).toBe(1);
      events.push("call");
    },
  };
  for (const key of ["bind", "call", "apply"]) {
    Object.defineProperty(obj.method, key, {
      get() {
        throw new Error("must not access function properties");
      },
    });
  }
  (obj?.method)(events.push("argument"));
  expect(events).toEqual(["argument", "call"]);
}

{
  const events = [];
  let obj;
  const original = {
    get method() {
      events.push("get");
      obj = null;
      return function () {
        expect(this).toBe(original);
        events.push("call");
      };
    },
  };
  obj = original;
  (obj?.method)(events.push("argument"));
  expect(events).toEqual(["get", "argument", "call"]);
}

{
  const events = [];
  const receiver = {
    method() {
      expect(this).toBe(receiver);
      events.push("call");
    },
  };
  const obj = {
    get nested() {
      events.push("nested");
      return receiver;
    },
  };
  (obj?.nested[events.push("key") && "method"])(events.push("argument"));
  expect(events).toEqual(["nested", "key", "argument", "call"]);
}

{
  const obj = { method: null };
  function* run() {
    (obj?.method)(yield "argument");
  }
  const iterator = run();
  expect(iterator.next()).toEqual({ value: "argument", done: false });
  expect(() => iterator.next(1)).toThrow(TypeError);
  const throwing = run();
  throwing.next();
  expect(() => throwing.throw(new RangeError())).toThrow(RangeError);
}

return (async function () {
  const events = [];
  const obj = { method: null };
  const argument = async () => {
    events.push("argument");
    return 1;
  };
  await expect((async () => (obj?.method)(await argument()))()).rejects.toThrow(TypeError);
  expect(events).toEqual(["argument"]);
  await expect((async () => (obj?.method)(await Promise.reject(new RangeError())))()).rejects.toThrow(RangeError);
})();
