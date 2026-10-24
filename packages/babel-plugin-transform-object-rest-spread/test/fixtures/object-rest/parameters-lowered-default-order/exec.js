// The default value of a following parameter is evaluated after the
// object rest copy of the previous one.
const log = [];
const source = { get x() { log.push("get"); return 1; } };
const g = () => (log.push("default"), { y: 2 });
function f({ ...a }, { ...b } = g()) {
  return [a, b];
}
expect(f(source)).toEqual([{ x: 1 }, { y: 2 }]);
expect(log).toEqual(["get", "default"]);
