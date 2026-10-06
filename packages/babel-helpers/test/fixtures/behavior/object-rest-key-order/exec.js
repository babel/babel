{
  const events = [];
  const symbol = Symbol("included");
  const raw = { skip: 1, a: 2, b: 3, [symbol]: 4 };
  Object.defineProperty(raw, "hidden", { value: 5 });
  const label = key => typeof key === "symbol" ? "symbol" : key;
  const source = new Proxy(raw, {
    ownKeys() {
      events.push("ownKeys");
      return [symbol, "skip", "b", "a", "hidden"];
    },
    getOwnPropertyDescriptor(target, key) {
      events.push("descriptor:" + label(key));
      if (key === "skip") throw new Error("excluded descriptor");
      return Reflect.getOwnPropertyDescriptor(target, key);
    },
    get(target, key, receiver) {
      events.push("get:" + label(key));
      return Reflect.get(target, key, receiver);
    },
  });
  expect(HELPER_OBJECT_REST(source, ["skip"])).toEqual({ b: 3, a: 2, [symbol]: 4 });
  expect(events).toEqual([
    "ownKeys", "descriptor:symbol", "get:symbol", "descriptor:b", "get:b",
    "descriptor:a", "get:a", "descriptor:hidden",
  ]);
}

// objectRestNoSymbols allows omitting symbols; its string-key copy must still
// skip excluded descriptors and perform one key snapshot before property reads.
{
  const events = [];
  const source = new Proxy({ skip: 1, keep: 2 }, {
    ownKeys(target) {
      events.push("ownKeys");
      return Reflect.ownKeys(target);
    },
    getOwnPropertyDescriptor(target, key) {
      events.push("descriptor:" + key);
      if (key === "skip") throw new Error("excluded descriptor");
      return Reflect.getOwnPropertyDescriptor(target, key);
    },
    get(target, key, receiver) {
      events.push("get:" + key);
      return Reflect.get(target, key, receiver);
    },
  });
  expect(HELPER_OBJECT_REST_LOOSE(source, ["skip"])).toEqual({ keep: 2 });
  expect(events).toEqual(["ownKeys", "descriptor:keep", "get:keep"]);
}

// An earlier getter can delete a later key or change its enumerability. New
// keys added by that getter are not part of the original key snapshot.
for (const legacy of [false, true]) {
  const savedReflect = globalThis.Reflect;
  const symbol = Symbol("original");
  const added = Symbol("added");
  const source = {
    get a() {
      delete this.b;
      Object.defineProperty(this, "hiddenLater", { enumerable: false });
      Object.defineProperty(this, "madeEnumerable", { enumerable: true });
      this.addedString = 10;
      this[added] = 9;
      return 1;
    },
    b: 2,
    hiddenLater: 3,
    [symbol]: 4,
  };
  Object.defineProperty(source, "madeEnumerable", {
    value: 7,
    enumerable: false,
    configurable: true,
  });
  try {
    if (legacy) globalThis.Reflect = undefined;
    const rest = HELPER_OBJECT_REST(source, []);
    expect(rest).toEqual({ a: 1, madeEnumerable: 7, [symbol]: 4 });
    expect(Object.getOwnPropertySymbols(rest)).toEqual([symbol]);
  } finally {
    globalThis.Reflect = savedReflect;
  }
}

for (const helper of [HELPER_OBJECT_REST, HELPER_OBJECT_REST_LOOSE]) {
  expect(helper("ab", ["0"])).toEqual({ "1": "b" });
  expect(helper(1, [])).toEqual({});
  expect(helper(false, [])).toEqual({});
  expect(helper(null, [])).toEqual({});
  expect(helper(undefined, [])).toEqual({});
}
