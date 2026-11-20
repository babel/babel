const dispose = Symbol.dispose || Symbol.for("Symbol.dispose");
let disposed = false;
const error = new Error();

expect(() => {
  for (using x = { [dispose]() { disposed = true; } }, y = (() => { throw error; })(); ; ) {
    throw new Error("unreachable");
  }
}).toThrow(error);

expect(disposed).toBe(true);
