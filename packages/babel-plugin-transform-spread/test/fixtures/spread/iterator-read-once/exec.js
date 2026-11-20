// Symbol.iterator must be read only one time when spreading.
var readCount = 0;
var obj = {};
Object.defineProperty(obj, Symbol.iterator, {
  get: function () {
    readCount++;
    return function () {
      var i = 0;
      return {
        next: function () {
          return i < 2 ? { done: false, value: i++ } : { done: true };
        },
      };
    };
  },
});

expect([...obj]).toEqual([0, 1]);
expect(readCount).toBe(1);
