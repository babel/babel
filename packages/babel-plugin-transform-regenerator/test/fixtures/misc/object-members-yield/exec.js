function* gen(__proto__) {
  return {
    ...(yield "spread"),
    [yield "key"]: 1,
    [yield "method"]() {},
    get [yield "getter"]() {},
    __proto__,
    last: yield "last",
  };
}

const proto = {};
const it = gen(proto);
expect(it.next().value).toBe("spread");
expect(it.next({ a: 0 }).value).toBe("key");
expect(it.next("b").value).toBe("method");
expect(it.next("c").value).toBe("getter");
expect(it.next("d").value).toBe("last");

const { value, done } = it.next(2);
expect(done).toBe(true);
expect(Object.keys(value)).toEqual(["a", "b", "c", "d", "__proto__", "last"]);
expect(value.a).toBe(0);
expect(value.b).toBe(1);
expect(typeof value.c).toBe("function");
expect(typeof Object.getOwnPropertyDescriptor(value, "d").get).toBe("function");
expect(Object.getOwnPropertyDescriptor(value, "__proto__").value).toBe(proto);
expect(Object.getPrototypeOf(value)).toBe(Object.prototype);
expect(value.last).toBe(2);
