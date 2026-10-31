var x, y, z, w;
const log = [];
const g = value => (log.push(value), "g");

function fn(arg) {
  [x, y] = arg;
  const f = () => ({ z } = arg);
  expect(f()).toBe(arg);
  return g(([w] = arg));
}

const arg = Object.assign(["e0", "e1"], { z: "z" });
expect(fn(arg)).toBe("g");
expect(x).toBe("e0");
expect(y).toBe("e1");
expect(z).toBe("z");
expect(w).toBe("e0");
expect(log).toEqual([arg]);
expect(log[0]).toBe(arg);
