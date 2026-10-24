// The following parameters are evaluated after the object rest copy.
let log = [];
const g = () => (log.push("default"), "d");
const source = { get x() { log.push("get"); return 1; } };

function f({ ...a }, b = g()) {
  return [a, b];
}
expect(() => f(null)).toThrow(TypeError);
expect(log).toEqual([]);
expect(f(source)).toEqual([{ x: 1 }, "d"]);
expect(log).toEqual(["get", "default"]);

log = [];
const h = ({ ...a }, b = g(), c = a) => [a, b, c];
expect(() => h(null)).toThrow(TypeError);
expect(log).toEqual([]);

log = [];
const iterable = { *[Symbol.iterator]() { log.push("iterate"); yield 1; } };
function i({ ...a }, [b]) {
  return b;
}
expect(i(source, iterable)).toBe(1);
expect(log).toEqual(["get", "iterate"]);

function pure({ ...a }, b = 1, c) {
  return [a, b, c];
}
expect(pure({}, undefined, 3)).toEqual([{}, 1, 3]);
expect(pure.length).toBe(1);
