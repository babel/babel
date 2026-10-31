const log = [];
const source = {
  get a() { throw new Error("discarded property read"); },
  get b() { log.push("b"); return 1; }
};
const rhs = () => (log.push("rhs"), source);
const { [(log.push("key"), "a")]: void, b } = rhs();
expect(log).toEqual(["rhs", "key", "b"]);
expect(b).toBe(1);

log.length = 0;
const key = { toString() { log.push("toString"); return "a"; } };
({ [key]: void } = source);
expect(log).toEqual(["toString"]);
const completion = ({ [key]: void } = source);
expect(completion).toBe(source);
expect(log).toEqual(["toString", "toString"]);

log.length = 0;
const { [{ toString() { log.push("inline"); return "a"; } }]: void } = source;
expect(log).toEqual(["inline"]);

log.length = 0;
const { [key]: void, ...rest } = source;
expect(log).toEqual(["toString", "b"]);
expect(rest).toEqual({ b: 1 });

log.length = 0;
expect(() => { const { [key]: void } = null; }).toThrow(TypeError);
expect(log).toEqual([]);
expect(() => { const { [+1n]: void } = source; }).toThrow(TypeError);

const badKey = { [Symbol.toPrimitive]() { log.push("coerce"); return {}; } };
expect(() => { const { [badKey]: void, b } = source; }).toThrow(TypeError);
expect(log).toEqual(["coerce"]);

log.length = 0;
const { ["a"]: void, [null]: void, [!0]: void, [`a${1}`]: void, b: again } = source;
expect(log).toEqual(["b"]);
expect(again).toBe(1);
