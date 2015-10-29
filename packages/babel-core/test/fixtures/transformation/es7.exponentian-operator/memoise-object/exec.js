var counters = 0;
Object.defineProperty(global, "reader", {
  get() {
    counters += 1;
    return { x: 2 };
  },
  configurable: true
});
reader.x **= 2;
assert.ok(counters === 1);
