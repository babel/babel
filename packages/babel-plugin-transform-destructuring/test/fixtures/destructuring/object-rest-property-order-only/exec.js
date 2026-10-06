const events = [];
const key = name => (events.push("key:" + name), name);
const input = {
  get a() { events.push("get:a"); return 1; },
  get b() { events.push("get:b"); return 2; },
};
const { [key("a")]: a, [key("b")]: b, ...rest } = input;
expect([a, b, rest]).toEqual([1, 2, {}]);
expect(events).toEqual(["key:a", "get:a", "key:b", "get:b"]);

events.length = 0;
expect(() => {
  const input = { get a() { events.push("get:a"); throw new TypeError("first getter"); } };
  const later = () => { events.push("later key"); throw new RangeError("second key"); };
  const { a, [later()]: b, ...rest } = input;
  return [a, b, rest];
}).toThrow(TypeError);
expect(events).toEqual(["get:a"]);
