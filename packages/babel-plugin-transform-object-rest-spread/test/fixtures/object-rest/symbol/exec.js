let {
  [Symbol.for("foo")]: foo,
  ...rest
} = {};

expect(foo).toBeUndefined();
expect(rest).toEqual({});

({ [Symbol.for("foo")]: foo, ...rest } = {});

expect(foo).toBeUndefined();
expect(rest).toEqual({});

if ({ [Symbol.for("foo")]: foo, ...rest } = {}) {}

expect(foo).toBeUndefined();
expect(rest).toEqual({});

// The same patterns, with symbol keys to exclude and to copy.
var bar = Symbol.for("bar");
var source = { [Symbol.for("foo")]: "foo", [bar]: "bar", x: 1 };

{
  let {
    [Symbol.for("foo")]: foo,
    ...rest
  } = source;
  expect(foo).toBe("foo");
  expect(Reflect.ownKeys(rest)).toEqual(["x", bar]);
  expect(rest[bar]).toBe("bar");
}

({ [Symbol.for("foo")]: foo, ...rest } = source);
expect(foo).toBe("foo");
expect(Reflect.ownKeys(rest)).toEqual(["x", bar]);
expect(rest[bar]).toBe("bar");

var entered = false;
if ({ [Symbol.for("foo")]: foo, ...rest } = { [Symbol.for("foo")]: "foo2", y: 2 }) {
  entered = true;
}
expect(entered).toBe(true);
expect(foo).toBe("foo2");
expect(rest).toEqual({ y: 2 });
