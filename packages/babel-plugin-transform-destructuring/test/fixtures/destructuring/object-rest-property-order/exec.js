// Each property's key, read, and binding initialization must finish before the
// next property's computed key is evaluated, including with an object rest.
{
  const events = [];
  const key = name => (events.push("key:" + name), name);
  const fallback = () => (events.push("default:a"), 9);
  const input = {
    get a() { events.push("get:a"); return undefined; },
    get b() { events.push("get:b"); return 2; },
    get z() { events.push("get:z"); return 3; },
  };
  const { [key("a")]: a = fallback(), [key("b")]: b, ...rest } = input;
  expect([a, b, rest]).toEqual([9, 2, { z: 3 }]);
  expect(events).toEqual(["key:a", "get:a", "default:a", "key:b", "get:b", "get:z"]);
}

{
  const events = [];
  const key = name => (events.push("key:" + name), name);
  const input = {
    get outer() {
      events.push("get:outer");
      return {
        get inner() { events.push("get:inner"); return 1; },
        extra: 2,
      };
    },
    get last() { events.push("get:last"); return 3; },
  };
  const { [key("outer")]: { [key("inner")]: inner, ...inside }, [key("last")]: last, ...rest } = input;
  expect([inner, inside, last, rest]).toEqual([1, { extra: 2 }, 3, {}]);
  expect(events).toEqual(["key:outer", "get:outer", "key:inner", "get:inner", "key:last", "get:last"]);
}

{
  const events = [];
  const input = { get a() { events.push("get:a"); throw new TypeError("first getter"); } };
  const later = () => { events.push("later key"); throw new RangeError("second key"); };
  expect(() => {
    const { a, [later()]: b, ...rest } = input;
    return [a, b, rest];
  }).toThrow(TypeError);
  expect(events).toEqual(["get:a"]);
}

{
  const events = [];
  const key = name => (events.push("key:" + name), name);
  const input = { get a() { events.push("get:a"); return undefined; } };
  const fallback = () => { events.push("default:a"); throw new TypeError("default"); };
  expect(() => {
    const { [key("a")]: a = fallback(), [key("b")]: b, ...rest } = input;
    return [a, b, rest];
  }).toThrow(TypeError);
  expect(events).toEqual(["key:a", "get:a", "default:a"]);
}

{
  const events = [];
  const key = name => (events.push("key:" + name), name);
  const input = {
    get a() { events.push("get:a"); return 1; },
    get b() { events.push("get:b"); return 2; },
    z: 3,
  };
  let a, b, rest;
  ({ [key("a")]: a, [key("b")]: b, ...rest } = input);
  expect([a, b, rest]).toEqual([1, 2, { z: 3 }]);
  expect(events).toEqual(["key:a", "get:a", "key:b", "get:b"]);

  events.length = 0;
  function binding({ [key("a")]: a, [key("b")]: b, ...rest }) {
    return [a, b, rest];
  }
  expect(binding(input)).toEqual([1, 2, { z: 3 }]);
  expect(events).toEqual(["key:a", "get:a", "key:b", "get:b"]);
}
