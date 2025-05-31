let disposed = false;
let beforeReturn;

(function () {
  using x = {
    [Symbol.dispose || Symbol.for("Symbol.dispose")]() {
      disposed = true;
    }
  };
  beforeReturn = disposed;
  return 0;
})();

expect(beforeReturn).toBe(false);
expect(disposed).toBe(true);
