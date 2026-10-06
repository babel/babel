{
  const events = [];
  const key = name => (events.push("key:" + name), name);
  const fallback = () => (events.push("default:a"), 9);
  const input = {
    get a() { events.push("get:a"); return undefined; },
    get b() { events.push("get:b"); return 2; },
    z: 3,
  };
  let a, b, rest;
  const returned = ({ [key("a")]: a = fallback(), [key("b")]: b, ...rest } = input);
  expect(returned).toBe(input);
  expect([a, b, rest]).toEqual([9, 2, { z: 3 }]);
  expect(events).toEqual(["key:a", "get:a", "default:a", "key:b", "get:b"]);
}

{
  const events = [];
  const key = name => (events.push("key:" + name), name);
  const input = {
    get outer() {
      events.push("get:outer");
      return { get inner() { events.push("get:inner"); return 1; } };
    },
    get last() { events.push("get:last"); return 2; },
  };
  let inner, last, rest;
  ({ [key("outer")]: { [key("inner")]: inner }, [key("last")]: last, ...rest } = input);
  expect([inner, last, rest]).toEqual([1, 2, {}]);
  expect(events).toEqual(["key:outer", "get:outer", "key:inner", "get:inner", "key:last", "get:last"]);
}

{
  const events = [];
  const input = { get a() { events.push("get:a"); throw new TypeError("first getter"); } };
  const later = () => { events.push("later key"); throw new RangeError("second key"); };
  let a, b, rest;
  expect(() => {
    ({ a, [later()]: b, ...rest } = input);
  }).toThrow(TypeError);
  expect(events).toEqual(["get:a"]);
}

{
  const events = [];
  const key = name => (events.push("key:" + name), name);
  const fallback = () => { events.push("default:a"); throw new TypeError("default"); };
  let a, b, rest;
  expect(() => {
    ({ [key("a")]: a = fallback(), [key("b")]: b, ...rest } = {});
  }).toThrow(TypeError);
  expect(events).toEqual(["key:a", "default:a"]);
}

for (const input of [null, undefined]) {
  const events = [];
  const key = () => (events.push("key"), "a");
  let a, rest;
  expect(() => {
    ({ [key()]: a, ...rest } = input);
  }).toThrow(TypeError);
  expect(events).toEqual([]);
}

{
  const events = [];
  const key = name => (events.push("key:" + name), name);
  const input = {
    get a() { events.push("get:a"); return 1; },
    get b() { events.push("get:b"); return 2; },
  };
  const target = {
    set a(value) { events.push("set:a"); expect(value).toBe(1); },
    set b(value) { events.push("set:b"); expect(value).toBe(2); },
    set rest(value) { events.push("set:rest"); expect(value).toEqual({}); },
  };
  ({ [key("a")]: target.a, [key("b")]: target.b, ...target.rest } = input);
  expect(events).toEqual(["key:a", "get:a", "set:a", "key:b", "get:b", "set:b", "set:rest"]);
}
