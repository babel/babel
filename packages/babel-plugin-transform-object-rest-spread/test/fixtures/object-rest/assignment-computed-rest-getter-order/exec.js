const events = [];
const source = {
  get a() { events.push("get:a"); return 1; },
  get b() { events.push("get:b"); return 2; },
};
function key(name) {
  events.push("key:" + name);
  return name;
}
let a, b, rest;
({ [key("a")]: a, [key("b")]: b, ...rest } = source);
expect(events).toEqual(["key:a", "get:a", "key:b", "get:b"]);
