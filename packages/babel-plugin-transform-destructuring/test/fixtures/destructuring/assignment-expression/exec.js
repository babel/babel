var x;
var logged = [];
var console = {
  log(value) {
    logged.push(value);
  },
};

console.log([x] = [123]);

expect(x).toBe(123);
expect(logged).toEqual([[123]]);
