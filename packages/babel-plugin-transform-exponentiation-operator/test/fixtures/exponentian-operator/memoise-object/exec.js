var counters = 0;
Object.defineProperty(global, "reader", {
  get: function () {
    counters += 1;
    return { x: 2 };
  },
  configurable: true
});
reader.x **= 2;
expect(counters).toBe(1);
