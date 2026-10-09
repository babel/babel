let disposed = false;
let beforeBreak;

while (true) {
  using x = {
    [Symbol.dispose || Symbol.for("Symbol.dispose")]() {
      disposed = true;
    }
  };
  beforeBreak = disposed;
  break;
}

expect(beforeBreak).toBe(false);
expect(disposed).toBe(true);
