const log = [];
const key = { [globalThis.Symbol.toPrimitive]() { log.push("key"); return "a"; } };
function read(Symbol) {
  const { [Symbol.for("key")]: a, ...rest } = { a: 1, b: 2 };
  return [a, rest];
}
expect(read({ for() { return key; } })).toEqual([1, { b: 2 }]);
expect(log).toEqual(["key"]);
