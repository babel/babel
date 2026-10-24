const log = [];
const source = {
  get a() { throw new Error("discarded property read"); },
  get b() { log.push("b"); return 1; }
};
function f({ [(log.push("key"), "a")]: void }) { log.push("body"); }
f(source);
expect(log).toEqual(["key", "body"]);
log.length = 0;
expect(() => f(null)).toThrow(TypeError);
expect(log).toEqual([]);

const key = { toString() { log.push("toString"); return "a"; } };
function g({ [key]: void, b }) { return b; }
expect(g(source)).toBe(1);
expect(log).toEqual(["toString", "b"]);
