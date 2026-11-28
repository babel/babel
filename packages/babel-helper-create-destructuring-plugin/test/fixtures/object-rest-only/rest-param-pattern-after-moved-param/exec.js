const log = [];
const k = () => {
  log.push("key");
  return "0";
};
function f([{ ...a }], ...{ [k()]: b }) {
  return [a, b];
}

// The first parameter is destructured before the key of the rest pattern.
expect(() => f()).toThrow(TypeError);
expect(log).toEqual([]);

expect(f([{ x: 1 }], 2)).toEqual([{ x: 1 }, 2]);
expect(log).toEqual(["key"]);
