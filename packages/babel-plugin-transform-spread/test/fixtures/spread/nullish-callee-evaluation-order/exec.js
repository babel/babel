const events = [];
const method = null;
const obj = { method: null };
function argument() {
  events.push("argument");
  return [];
}

try {
  method(...argument());
} catch (error) {
  events.push(error.name);
}

try {
  obj.method(...argument());
} catch (error) {
  events.push(error.name);
}

expect(events).toEqual(["argument", "TypeError", "argument", "TypeError"]);
