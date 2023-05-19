let disposed = false;
let beforeEnd;

{
  using x = {
    [Symbol.dispose || Symbol.for("Symbol.dispose")]() {
      disposed = true;
    }
  };
  beforeEnd = disposed;
}

expect(beforeEnd).toBe(false);
expect(disposed).toBe(true);
